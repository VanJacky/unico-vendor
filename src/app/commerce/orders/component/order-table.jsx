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
import { CameraIcon } from "@heroicons/react/24/outline";
import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

// 添加 LoadingOverlay 组件
const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center">
        <div className="text-white text-xl flex items-center space-x-3">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
        </div>
    </div>
);

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
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [query, setQuery] = useState('')

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

    const handleCreateOnly = async () => {
        try {
            setLoading(true);
            const orderData = {
                userId: selectedUser.id,
                productName: products.find(p => p.id === parseInt(selectedProduct))?.title,
                price: selectedProductPrice
            };

            await createOrderOnly(orderData);
            setShowPaymentDialog(false);
            // 触发刷新
            setRefresh(prev => prev + 1);
        } catch (error) {
            console.error('创建订单失败:', error);
        } finally {
            setLoading(false);
        }
    };

    const activateCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: {
                    facingMode: 'environment' // 优先使用后置摄像头
                }
            });
            const videoElement = document.getElementById('camera-feed');
            if (videoElement) {
                videoElement.srcObject = stream;
            }
        } catch (err) {
            console.error('摄像头访问失败:', err);
            alert('无法访问摄像头，请确保已授予相机权限');
        }
    };

    const handleImmediatePayment = () => {
        setCameraActive(true);
        activateCamera();
    };

    // Add search handler
    const handleUserSearch = (value) => {
        setQuery(value);
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
                setLoading(true);
                const options = {
                    data: {
                        current: 1,
                        pageSize: 10,
                        keyword: ''
                    }
                };
                const { list } = await getOrderList(options);
                
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

                setOrders(formattedList); // 直接设置而不是追加
            } catch (error) {
                console.error('获取订单列表失败:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [refresh]); // 添加 refresh 依赖

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

    // 如果正在加载,显示加载状态
    if (loading) {
        return <LoadingOverlay />;
    }

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
                        {cameraActive ? (
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-64 h-64 bg-gray-100 flex items-center justify-center relative">
                                    <video
                                        id="camera-feed"
                                        autoPlay
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                    <CameraIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-gray-400" />
                                </div>
                                <p className="text-gray-600">请扫描顾客的付款码</p>
                            </div>
                        ) : (
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
                            <Combobox as="div" value={selectedUser} onChange={setSelectedUser}>
                                <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                    选择用户
                                </Combobox.Label>
                                <div className="relative mt-2">
                                    <Combobox.Input
                                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(event) => handleUserSearch(event.target.value)}
                                        displayValue={(user) => user?.nickName}
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </Combobox.Button>

                                    {filteredUsers.length > 0 && (
                                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {filteredUsers.map((user) => (
                                                <Combobox.Option
                                                    key={user.id}
                                                    value={user}
                                                    className={({ active }) =>
                                                        classNames(
                                                            'relative cursor-default select-none py-2 pl-3 pr-9',
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                        )
                                                    }
                                                >
                                                    {({ active, selected }) => (
                                                        <>
                                                            <div className="flex">
                                                                <span className={classNames('truncate', selected && 'font-semibold')}>
                                                                    {user.nickName}
                                                                </span>
                                                                <span
                                                                    className={classNames(
                                                                        'ml-2 truncate text-gray-500',
                                                                        active ? 'text-indigo-200' : 'text-gray-500'
                                                                    )}
                                                                >
                                                                    {user.phone}
                                                                </span>
                                                            </div>

                                                            {selected && (
                                                                <span
                                                                    className={classNames(
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                                                        active ? 'text-white' : 'text-indigo-600'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </Combobox.Option>
                                            ))}
                                        </Combobox.Options>
                                    )}
                                </div>
                            </Combobox>
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