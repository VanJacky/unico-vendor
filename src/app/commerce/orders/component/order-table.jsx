'use client';

import React, { useState, useEffect } from 'react';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import YDIcon from "@/utils/yd-icon";
import { Badge } from "@/components/badge";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/dropdown";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { Link } from "@/components/link";
import { Heading } from "@/components/heading";
import { Input, InputGroup } from "@/components/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Select } from "@/components/select";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/dialog";
import { Field, Fieldset, Label, Legend } from "@/components/fieldset";
import { getUserList, fetchGoodsList, createOrderOnly, getOrderList } from '../api/action';

export default function OrderTable({ orders: initialOrders }) {
    const [orders, setOrders] = useState(initialOrders);
    const [expandedRows, setExpandedRows] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [cameraActive, setCameraActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [userPagination, setUserPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const [selectedProductPrice, setSelectedProductPrice] = useState(0);

    const toggleExpand = (orderId) => {
        setExpandedRows((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };
    const [selectedTab, setSelectedTab] = useState('All');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const handleOrderFormSubmit = () => {
        if (!selectedUser || !selectedProduct) {
            // 显示错误提示
            return;
        }

        // 关闭订单信息弹窗，打开支付选择弹窗
        closeDialog();
        setShowPaymentDialog(true);
    };

    const handleCreateOnly = () => {
        const orderData = {
            userId: selectedUser.id,
            productName: products.find(p => p.id === parseInt(selectedProduct))?.title,
            price: selectedProductPrice
        };

 
        createOrderOnly(orderData)
            .then(() => {
                setShowPaymentDialog(false);

            })
            .catch(error => {
                // 显示错误提示
            });
    };

    const handleImmediatePayment = () => {
        setCameraActive(true);
    };

    // Add search handler
    const handleUserSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        // 重置分页到第一页
        setUserPagination(prev => ({
            ...prev,
            current: 1
        }));
    };

    // 获取商品列表
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchGoodsList();
                setProducts(data || []);
            } catch (error) {
                console.error('获取商品列表失败:', error);
            }
        };

        loadProducts();
    }, []);

    // 获取用户列表
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const options = {
                    data: {
                        current: userPagination.current,
                        pageSize: userPagination.pageSize,
                        keyword: searchTerm
                    }
                };
                const { list, pagination } = await getUserList(options);
                setUsers(list);
                setUserPagination(prev => ({
                    ...prev,
                    total: pagination.total
                }));
                setFilteredUsers(list);
            } catch (error) {
                console.error('获取用户列表失败:', error);
            }
        };

        loadUsers();
    }, [userPagination.current, userPagination.pageSize, searchTerm]);

    // 修改获取订单列表的实现
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const options = {
                    data: {
                        current: 1,
                        pageSize: 10,
                        keyword: ''
                    }
                };
                const { list } = await getOrderList(options);
                
                // 合并后端数据和模拟数据
                const formattedList = list.map(order => ({
                    ...order,
                    date: order.createTime,
                    customer: {
                        name: order.user?.nickName || '未知用户',
                        email: order.user?.email || '-',
                        address: order.address || '-'
                    },
                    phoneNumber: order.user?.phone || '-',
                    amount: {
                        usd: `$${order.price}` // 直接使用美元单位
                    },
                    shipping: {
                        method: order.logistics ? '快递配送' : '自提',
                        trackingNumber: order.logistics?.trackingNumber || '-'
                    },
                    status: getOrderStatus(order.status),
                    products: [{
                        name: order.title || '未知商品',
                        quantity: 1
                    }],
                    notes: order.remark || '-'
                }));

                setOrders(prev => [...prev, ...formattedList]);
            } catch (error) {
                console.error('获取订单列表失败:', error);
            }
        };

        loadOrders();
    }, []);

    // 添加订单状态映射函数
    const getOrderStatus = (status) => {
        const statusMap = {
            0: 'Pending',
            1: 'Completed',
            2: 'Cancelled',
            // 根据需要添加更多状态映射
        };
        return statusMap[status] || 'Unknown';
    };

    const handleProductSelect = (e) => {
        const productId = e.target.value;
        setSelectedProduct(productId);

        // 找到选中商品的价格
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            setSelectedProductPrice(product.price);
        }
    };

    return (
        <main>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-sm:w-full sm:flex-1">
                    <Heading>Orders</Heading>
                    <div className="mt-4 flex max-w-xl gap-4">
                        <div className="flex-1">
                            <InputGroup>
                                <MagnifyingGlassIcon />
                                <Input name="search" placeholder="Search orders&hellip;" />
                            </InputGroup>
                        </div>
                        <div>
                            <Select name="sort_by">
                                <option value="name">Sort by name</option>
                                <option value="date">Sort by date</option>
                                <option value="status">Sort by status</option>
                            </Select>
                        </div>
                    </div>
                </div>
                <Button onClick={openDialog}>Create Order</Button>
            </div>
            <div className="mt-7 py-2 sm:mt-7">
                <div className="sm:hidden">
                    <label htmlFor="current-tab" className="sr-only">
                        Select a tab
                    </label>
                    <select
                        id="current-tab"
                        name="current-tab"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={selectedTab}
                        onChange={(e) => handleTabChange(e.target.value)}
                    >
                        {['All', 'Not Shipped', 'Shipped', 'Completed', 'Awaiting Pickup', 'Pending After-Sales', 'Cancelled', 'Refunded'].map((tab) => (
                            <option key={tab} value={tab}>
                                {tab}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
            <div>
                <Table className=" mt-10 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>Order number</TableHeader>
                            <TableHeader>Purchase date</TableHeader>
                            <TableHeader>Customer</TableHeader>
                            <TableHeader>Phone Number</TableHeader>
                            <TableHeader>Amount</TableHeader>
                            <TableHeader>Shipping Method</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Action</TableHeader>
                            <TableHeader></TableHeader>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <React.Fragment key={order.id}>
                                <TableRow className="cursor-pointer" onClick={() => toggleExpand(order.id)}>

                                    <TableCell>{order.id}</TableCell>
                                    <TableCell className="text-zinc-500">{order.date}</TableCell>
                                    <TableCell>{order.customer.name}</TableCell>
                                    <TableCell>{order.phoneNumber}</TableCell>
                                    <TableCell>{order.amount.usd}</TableCell>
                                    <TableCell>{order.shipping.method}</TableCell>

                                    <TableCell>
                                        {/*<div className="flex items-center gap-2">*/}
                                        {/*    <Avatar src={order.event.thumbUrl} className="size-6"/>*/}
                                        {/*    <span>{order.event.name}</span>*/}
                                        {/*</div>*/}
                                        <Badge className="max-sm:hidden"
                                            color={order.status === 'Completed' ? 'lime' : 'zinc'}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    {/*<TableCell className="text-right">US{order.amount.usd}</TableCell>*/}
                                    <TableCell>
                                        <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                            <Dropdown>
                                                <DropdownButton plain aria-label="More options">
                                                    <EllipsisHorizontalIcon />
                                                </DropdownButton>
                                                <DropdownMenu anchor="bottom end">
                                                    <DropdownItem>
                                                        <a href={`/commerce${order.url}`} title={`Order #${order.id}`}
                                                            className="block w-full h-full">
                                                            View
                                                        </a>


                                                    </DropdownItem>
                                                    <DropdownItem>Edit</DropdownItem>
                                                    <DropdownItem>Delete</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {expandedRows[order.id] ? (
                                            <YDIcon src="/icons/up.svg" alt="Expanded Order Icon" className='w-3 h-3' />
                                        ) : (
                                            <YDIcon src="/icons/down.svg" alt="Collapsed Order Icon" className='w-3 h-3' />
                                        )}
                                    </TableCell>

                                </TableRow>
                                {expandedRows[order.id] && (
                                    <TableRow className="bg-gray-50 w-full">
                                        <TableCell colSpan="9" className="p-0">
                                            <Table className="w-full [--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableHeader>Product Information</TableHeader>
                                                        <TableHeader>User Address</TableHeader>
                                                        <TableHeader>User Email</TableHeader>
                                                        <TableHeader>Tracking Number</TableHeader>
                                                        <TableHeader>User Notes</TableHeader>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell className="font-medium">{`${order.products[0].name} x ${order.products[0].quantity}`} </TableCell>
                                                        <TableCell className="text-zinc-500">{order.customer.address}</TableCell>
                                                        <TableCell className="text-zinc-500" >{order.customer.email}</TableCell>
                                                        <TableCell className="text-zinc-500">{order.shipping.trackingNumber}</TableCell>
                                                        <TableCell className="whitespace-normal break-words text-zinc-500">
                                                            {order.notes}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={showPaymentDialog} onClose={() => {
                setShowPaymentDialog(false);
                setCameraActive(false);
            }} size="md">
                <DialogTitle>Complete Order Creation</DialogTitle>
                <DialogBody>
                    <div className="space-y-6">
                        {!cameraActive ? (
                            <div className="space-y-4">
                                <Button
                                    className="w-full"
                                    onClick={handleImmediatePayment}
                                >
                                    Immediate Payment
                                </Button>
                                <Button
                                    className="w-full"
                                    onClick={handleCreateOnly}
                                >
                                    Create Only
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-64 h-64 bg-gray-100 flex items-center justify-center">
                                    <video
                                        id="camera-feed"
                                        autoPlay
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-gray-600">请扫描顾客的付款码</p>
                            </div>
                        )}
                    </div>
                </DialogBody>
                <DialogActions>
                    <Button plain onClick={() => {
                        setShowPaymentDialog(false);
                        setCameraActive(false);
                    }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isDialogOpen} onClose={closeDialog} size="5xl">
                <DialogTitle>创建订单</DialogTitle>
                <DialogDescription>
                    请填写订单信息
                </DialogDescription>
                <DialogBody>
                    <div className="space-y-6">
                        <Field>
                            <Label>选择用户</Label>
                            <InputGroup>
                                <MagnifyingGlassIcon />
                                <Input
                                    name="user_search"
                                    placeholder="搜索用户（姓名、邮箱或电话）..."
                                    value={searchTerm}
                                    onChange={handleUserSearch}
                                />
                            </InputGroup>
                            {searchTerm && filteredUsers.length > 0 && (
                                <div className="mt-2 border rounded-md shadow-sm max-h-60 overflow-y-auto">
                                    {filteredUsers.map(user => (
                                        <div
                                            key={user.id}
                                            className="p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setSearchTerm(user.name);
                                            }}
                                        >
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                            <div className="text-sm text-gray-500">{user.phone}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Field>

                        <Field>
                            <Label>选择商品</Label>
                            <Select
                                name="product"
                                value={selectedProduct}
                                onChange={handleProductSelect}
                            >
                                <option value="">请选择商品</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.title} - ¥{product.price}
                                    </option>
                                ))}
                            </Select>
                            {selectedProductPrice > 0 && (
                                <div className="mt-2 text-sm text-gray-500">
                                    订单金额: ¥{selectedProductPrice}
                                </div>
                            )}
                        </Field>

                        <Field>
                            <Label>Distribution Method</Label>
                            <Select name="distribution">
                                <option value="p">Self Pick-up</option>
                                <option value="e">Manual Distribution</option>
                                <option value="b">Auto Distribution for New Users</option>
                            </Select>
                        </Field>
                    </div>
                </DialogBody>
                <DialogActions>
                    <Button plain onClick={closeDialog}>取消</Button>
                    <Button onClick={handleOrderFormSubmit}>下一步</Button>
                </DialogActions>
            </Dialog>

        </main>

    );
}