'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import YDIcon from "@/utils/yd-icon";
import { Badge } from "@/components/badge";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/dropdown";
import { ArrowDownIcon, ArrowUpIcon, EllipsisHorizontalIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import { Link } from "@/components/link";
import { Switch, SwitchField } from "@/components/switch";
import { Heading } from '@/components/heading';
import { Input, InputGroup } from '@/components/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Select } from '@/components/select';
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/dialog";
import { Field, Fieldset, Label, Legend } from "@/components/fieldset";
import { getProductsStock, updateProductSpec } from '../api/actions';
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

// Add LoadingOverlay component
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

export default function StockTable() {
    const [stocks, setStocks] = useState([]);
    const [expandedRows, setExpandedRows] = useState(() => {
        const initialState = {};
        stocks.forEach(stock => {
            initialState[stock.id] = true;
        });
        return initialState;
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newStock, setNewStock] = useState({
        id: null,
        stock: 0,
        stockAlert: 0,
        status: 1,
        price: 0
    });

    // 添加数据加载状态
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);

    // 添加 selectedTab state
    const [selectedTab, setSelectedTab] = useState('All');

    // 添加 handleTabChange 函数
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    // 添加数据获取逻辑
    useEffect(() => {
        const fetchStocks = async () => {
            try {
                setLoading(true);
                const productsData = await getProductsStock();

                // 转换数据结构，按商品分组，specs作为子项
                const formattedData = productsData.map(product => ({
                    id: product.id,
                    name: product.title,
                    products: product.specs.map(spec => ({
                        id: spec.id,
                        name: spec.name,
                        price: spec.price,
                        stock: spec.stock || 0,
                        status: spec.status,
                        totalOutbound: product.sold || 2658545,
                        stockAlert: spec.stockAlert || 1000
                    }))
                }));

                // 如果是 Alert 标签，过滤低库存的规格
                const filteredData = selectedTab === 'Alert'
                    ? formattedData
                        .map(product => ({
                            ...product,
                            products: product.products.filter(spec => spec.stock < spec.stockAlert)
                        }))
                        .filter(product => product.products.length > 0)
                    : formattedData;

                setStocks(filteredData);
            } catch (error) {
                console.error('获取库存失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStocks();
    }, [selectedTab, refresh]);

    // 如果需要显示加载状态
    if (loading) {
        return <LoadingOverlay />;
    }

    const toggleExpand = (stockId) => {
        setExpandedRows(prev => ({
            ...prev,
            [stockId]: !prev[stockId]
        }));
    };

    const handleProductAction = (action, product) => {
        console.log(`${action} product:`, product);
        // Add your action handling logic here
    };

    const handleCreateStock = () => {
        setIsEditing(false);
        setNewStock({
            id: null,
            stock: 0,
            stockAlert: 0,
            status: 1,
            price: 0
        });
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setNewStock({
            id: null,
            stock: 0,
            stockAlert: 0,
            status: 1,
            price: 0
        });
    };

    const handleEditStock = (stock) => {
        setNewStock({
            id: stock.id,
            stock: stock.stock || 0,
            stockAlert: stock.stockAlert || 0,
            status: stock.status || 1,
            price: stock.price || 0
        });
        setIsDialogOpen(true);
    };

    const handleSaveStock = async () => {
        try {
            setLoading(true);
            const result = await updateProductSpec({
                id: newStock.id,
                stock: newStock.stock,
                stockAlert: newStock.stockAlert,
                status: newStock.status,
                price: newStock.price
            });

            if (result.success) {
                closeDialog();
                // 触发刷新
                setRefresh(prev => prev + 1);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('保存库存失败:', error);
        } finally {
            setLoading(false);
        }
    };

    // Add new handler for product sorting
    const handleProductSort = (stockId, productIndex, direction) => {
        const stock = stocks.find(s => s.id === stockId);
        if (!stock ||
            (direction === 'up' && productIndex === 0) ||
            (direction === 'down' && productIndex === stock.products.length - 1)) {
            return;
        }

        setStocks(prevStocks => {
            const newStocks = [...prevStocks];
            const stockIndex = newStocks.findIndex(s => s.id === stockId);
            const products = [...newStocks[stockIndex].products];

            // 交换位置
            const newIndex = direction === 'up' ? productIndex - 1 : productIndex + 1;
            [products[productIndex], products[newIndex]] = [products[newIndex], products[productIndex]];

            newStocks[stockIndex] = {
                ...newStocks[stockIndex],
                products: products
            };

            return newStocks;
        });
    };

    return (
        <main>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-sm:w-full sm:flex-1">
                    <Heading>Stock Management</Heading>
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
                {/* <Button onClick={handleCreateStock}>
                    Create Stock
                </Button> */}
            </div>

            {/* 添加 Tabs */}
            <div className="mt-7 py-2 sm:mt-7">
                <div className="sm:hidden">
                    <label htmlFor="current-tab" className="sr-only">
                        选择标签
                    </label>
                    <select
                        id="current-tab"
                        name="current-tab"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={selectedTab}
                        onChange={(e) => handleTabChange(e.target.value)}
                    >
                        {['All', 'Alert'].map((tab) => (
                            <option key={tab} value={tab}>
                                {tab}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="mt-2 -mb-px flex space-x-12 overflow-x-auto">
                        {['All', 'Alert'].map((tab) => (
                            <a
                                key={tab}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleTabChange(tab);
                                }}
                                className={classNames(
                                    selectedTab === tab
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                    'whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-sm'
                                )}
                                aria-current={selectedTab === tab ? 'page' : undefined}
                            >
                                {tab}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="mt-4 flow-root w-full overflow-x-auto">
                <div className="min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-white">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Price
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Remaining Stock
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Total Outbound
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Stock Alert
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {stocks.map((stock) => (
                                <Fragment key={stock.id}>
                                    <tr className="bg-gray-50">
                                        <th
                                            colSpan={7}
                                            scope="colgroup"
                                            className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                                        >
                                            {stock.name}
                                        </th>
                                    </tr>
                                    {stock.products.map((spec, specIdx) => (
                                        <tr key={spec.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-3">
                                                {spec.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                ${spec.price}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {spec.stock}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <Badge color={spec.status === 1 ? "lime" : "zinc"}>
                                                    {spec.status === 1 ? "Active" : "Inactive"}
                                                </Badge>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {spec.totalOutbound}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span className={spec.stock < spec.stockAlert ? "text-red-500" : "text-gray-500"}>
                                                    {spec.stockAlert}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-4">
                                                    <Link
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleEditStock(spec);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Create Stock Dialog */}
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Edit Stock</DialogTitle>
                <DialogBody>
                    <Field className="mb-4">
                        <Label>Stock Quantity</Label>
                        <Input
                            type="number"
                            value={newStock.stock}
                            onChange={(e) => setNewStock({ ...newStock, stock: parseInt(e.target.value) })}
                            placeholder="Enter stock quantity"
                        />
                    </Field>
                    <Field className="mb-4">
                        <Label>Stock Alert</Label>
                        <Input
                            type="number"
                            value={newStock.stockAlert}
                            onChange={(e) => setNewStock({ ...newStock, stockAlert: parseInt(e.target.value) })}
                            placeholder="Enter alert threshold"
                        />
                    </Field>
                    <Field className="mb-4">
                        <Label>Price</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={newStock.price}
                            onChange={(e) => setNewStock({ ...newStock, price: parseFloat(e.target.value) })}
                            placeholder="Enter price"
                        />
                    </Field>
                    <Field className="flex items-center gap-4">
                        <SwitchField>
                            <Label>Status</Label>
                            <Switch
                                checked={newStock.status === 1}
                                onChange={(checked) => setNewStock({ ...newStock, status: checked ? 1 : 0 })}
                            />
                        </SwitchField>
                    </Field>
                </DialogBody>
                <DialogActions>
                    <Button plain onClick={closeDialog}>Cancel</Button>
                    <Button onClick={handleSaveStock}>Save</Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}

// 添加 classNames 工具函数
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}