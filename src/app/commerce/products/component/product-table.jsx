'use client';

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
 import { Button } from '@/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
 import { Badge } from "@/components/badge";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/dropdown";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { Link } from "@/components/link";
import { deleteProducts, getProductsWithTypes, toggleProductStatus } from '../api/actions';
import { Input, InputGroup } from "@/components/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Select } from "@/components/select";
import { Heading } from "@/components/heading";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

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

export function ProductsTable() {
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const [selectedTab, setSelectedTab] = useState('All');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const checkbox = useRef();
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        loadProducts();
    }, [selectedTab]);

    const loadProducts = async () => {
        try {
            setIsLoading(true);
            let status;
            if (selectedTab === 'Active') {
                status = 1;
            } else if (selectedTab === 'Inactive') {
                status = 0;
            }
            const productsData = await getProductsWithTypes(status);
            setProducts(productsData);
        } catch (error) {
            console.error('获取产品失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onProductsChange = async () => {
        try {
            setIsLoading(true);
            const updatedProducts = await getProductsWithTypes();
            setProducts(updatedProducts);
            return updatedProducts;
        } catch (error) {
            console.error('刷新产品失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleExpand = (orderId) => {
        setExpandedRows((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    useLayoutEffect(() => {
        const isIndeterminate = selectedProducts.length > 0 && selectedProducts.length < products.length;
        setChecked(selectedProducts.length === products.length);
        setIndeterminate(isIndeterminate);
        checkbox.current.indeterminate = isIndeterminate;
    }, [selectedProducts, products]);

    const toggleAll = () => {
        setSelectedProducts(checked || indeterminate ? [] : products);
        setChecked(!checked && !indeterminate);
        setIndeterminate(false);
    };

    const toggleProduct = (product) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(product)
                ? prevSelected.filter((p) => p.id !== product.id)
                : [...prevSelected, product]
        );
    };

    const handleDeleteClick = (productIds) => {
        setDeleteTarget(productIds);
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            setDeleteDialogOpen(false);

            await deleteProducts(deleteTarget);
            await onProductsChange();
            setSelectedProducts([]);
            setDeleteTarget(null);
        } catch (error) {
            console.error('删除失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusToggle = (productId, currentStatus) => {
        setProducts(prevProducts => 
            prevProducts.map(product => 
                product.id === productId 
                    ? {...product, status: currentStatus === 1 ? 0 : 1}
                    : product
            )
        );

        toggleProductStatus(productId, currentStatus === 1 ? 0 : 1)
            .catch(error => {
                console.error('状态切换失败:', error);
                setProducts(prevProducts => 
                    prevProducts.map(product => 
                        product.id === productId 
                            ? {...product, status: currentStatus}
                            : product
                    )
                );
            });
    };

    return (
        <main>
            {/* 添加全局 loading 蒙层 */}
            {isLoading && <LoadingOverlay />}

            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-sm:w-full sm:flex-1">
                    <Heading>Products</Heading>
                    <div className="mt-4 flex max-w-xl gap-4">
                        <div className="flex-1">
                            <InputGroup>
                                <MagnifyingGlassIcon />
                                <Input name="search" placeholder="Search products&hellip;" />
                            </InputGroup>
                        </div>
                        <div>
                            <Select name="sort_by">
                                <option value="name">Sort by name</option>
                                <option value="date">Sort by date</option>
                            </Select>
                        </div>
                    </div>
                </div>
                <Button>
                    <Link href='/commerce/products/edit'>
                        Create Product
                    </Link>
                </Button>
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
                        {['All', 'Active', 'Inactive'].map((tab) => (
                            <option key={tab} value={tab}>
                                {tab}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="mt-2 -mb-px flex space-x-12 overflow-x-auto">
                        {['All', 'Active', 'Inactive'].map((tab) => (
                            <a
                                key={tab}
                                href="#"
                                onClick={() => handleTabChange(tab)}
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
            <div>
                <div className="mt-2">
                    {selectedProducts.length > 0 && (
                        <div className="flex space-x-2">
                            <Button className="bg-white text-white px-4 py-2 rounded">
                                批量上架
                            </Button>
                            <Button className="bg-white text-white px-4 py-2 rounded">
                                批量下架
                            </Button>
                            <Button
                                className="bg-white text-white px-4 py-2 rounded"
                                onClick={() => handleDeleteClick(selectedProducts.map(p => p.id))}
                            >
                                批量删除
                            </Button>
                        </div>
                    )}
                </div>
                <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                            <div className="text-gray-500">加载中...</div>
                        </div>
                    )}
                    <TableHead>
                        <TableRow>
                            <TableHeader>
                                <input
                                    type="checkbox"
                                    ref={checkbox}
                                    checked={checked}
                                    onChange={toggleAll}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </TableHeader>
                            <TableHeader>Id</TableHeader>
                            <TableHeader className="text-center">Title</TableHeader>
                            <TableHeader>Picure</TableHeader>
                            <TableHeader>Specs</TableHeader>
                            <TableHeader>Price</TableHeader>
                            <TableHeader>Category</TableHeader>
                            <TableHeader>Sold</TableHeader>
                            <TableHeader>CreateTime</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <React.Fragment key={product.id}>
                                <TableRow
                                    className={classNames(
                                        'cursor-pointer',
                                        selectedProducts.includes(product) ? 'bg-gray-50' : ''
                                    )}
                                    onClick={() => toggleExpand(product.id)}
                                >
                                    <TableCell className="relative">
                                        {selectedProducts.includes(product) && (
                                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                        )}
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            checked={selectedProducts.includes(product)}
                                            onChange={() => toggleProduct(product)}
                                        />
                                    </TableCell>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell className="text-center">{product.title}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <div
                                                className="group relative cursor-pointer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <img
                                                    className="h-20 w-20 object-cover rounded hover:opacity-80 transition-opacity"
                                                    src={product.mainPic}
                                                    alt={product.title}
                                                />
                                                <div className="hidden group-hover:block absolute z-50 -right-[300px] top-0">
                                                    <img
                                                        className="max-w-[300px] max-h-[300px] object-contain bg-white shadow-lg rounded"
                                                        src={product.mainPic}
                                                        alt={product.title}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {product.specs ? (
                                            <div className="space-y-1">
                                                {product.specs.map((spec, index) => (
                                                    <div key={index} className="text-sm text-gray-600">
                                                        {spec.name}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : '暂无规格'}
                                    </TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.typeName}</TableCell>
                                    <TableCell>{product.sold}</TableCell>
                                    <TableCell className="text-zinc-500">{product.createTime}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className="max-sm:hidden"
                                            color={product.status === 1 ? 'lime' : 'zinc'}
                                        >
                                            {product.status === 1 ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                            <Dropdown>
                                                <DropdownButton plain aria-label="More options">
                                                    <EllipsisHorizontalIcon />
                                                </DropdownButton>
                                                <DropdownMenu anchor="bottom end">
                                                    <DropdownItem>
                                                        <Link href={`/commerce/products/${product.id}`}>
                                                            View
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link href={`/commerce/products/edit/${product.id}`}>
                                                            Edit
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => handleStatusToggle(product.id, product.status)}>
                                                        {product.status === 1 ? 'Deactivate' : 'Activate'}
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => handleDeleteClick(product.id)}>
                                                        Delete
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* 添加删除确认对话框 */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} className="relative z-10">
                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Delete Product
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this product? All data will be permanently removed.
                                                This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setDeleteDialogOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </main>
    );
}