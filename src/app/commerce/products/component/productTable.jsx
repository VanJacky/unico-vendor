'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import YDIcon from "@/utils/yd-icon";
import { Badge } from "@/components/badge";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/dropdown";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { Link } from "@/components/link";

export default function ProductsTable({ products }) {
    const [expandedRows, setExpandedRows] = useState({});
    const [selectedTab, setSelectedTab] = useState('All');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const checkbox = useRef();
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);

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

    return (
        <main>
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
                        </div>
                    )}
                </div>
                <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
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
                                    <TableCell  >{product.title}</TableCell>
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
                                    <TableCell>{product.specs || '暂无规格'}</TableCell>
                                    <TableCell>¥{product.price}</TableCell>
                                    <TableCell>{product.typeName}</TableCell>
                                    <TableCell>{product.sold}</TableCell>
                                    <TableCell className="text-zinc-500">{product.createTime}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className="max-sm:hidden"
                                            color={product.status === 1 ? 'lime' : 'zinc'}
                                        >
                                            {product.status === 1 ? '上架' : '下架'}
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
                                                    <DropdownItem>Edit</DropdownItem>
                                                    <DropdownItem>Delete</DropdownItem>
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
        </main>
    );
}