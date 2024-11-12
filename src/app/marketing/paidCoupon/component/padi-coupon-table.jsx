'use client';
import PromotionDialog from './promotion_dialog'; // 引入弹窗组件

import React, { useState, useRef, useLayoutEffect } from 'react';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import YDIcon from "@/utils/yd-icon";
import { Badge } from "@/components/badge";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/dropdown";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { Link } from "@/components/link";
import {ShowUser} from "@/app/marketing/coupon/component/district-coupon";

export default function PaidCouponsTable({ coupons }) {
    const [expandedRows, setExpandedRows] = useState({});
    const [selectedTab, setSelectedTab] = useState('All');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const checkbox = useRef();
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [showPromotionDialog, setShowPromotionDialog] = useState(false); // 控制弹窗显示的状态
    const [showUser, setShowUser] = useState(false); // 控制弹窗显示的状态

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
        const isIndeterminate = selectedProducts.length > 0 && selectedProducts.length < coupons.length;
        setChecked(selectedProducts.length === coupons.length);
        setIndeterminate(isIndeterminate);
        checkbox.current.indeterminate = isIndeterminate;
    }, [selectedProducts, coupons]);

    const toggleAll = () => {
        setSelectedProducts(checked || indeterminate ? [] : coupons);
        setChecked(!checked && !indeterminate);
        setIndeterminate(false);
    };

    const toggleProduct = (order) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(order)
                ? prevSelected.filter((p) => p.id !== order.id)
                : [...prevSelected, order]
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
                                Bulk Publish
                            </Button>
                            <Button className="bg-white text-white px-4 py-2 rounded">
                                Bulk Unpublish
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
                            <TableHeader>Coupon Name</TableHeader>
                            <TableHeader>Type</TableHeader>
                            <TableHeader>Usable Products</TableHeader>
                            <TableHeader>Quantity</TableHeader>
                            <TableHeader>Face Value</TableHeader>
                            <TableHeader>Purchase Count</TableHeader>
                            <TableHeader>Usage Count</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coupons.map((coupon) => (
                            <React.Fragment key={coupon.couponName}>
                                <TableRow
                                    className={classNames(
                                        'cursor-pointer',
                                        selectedProducts.includes(coupon) ? 'bg-gray-50' : ''
                                    )}
                                    onClick={() => toggleExpand(coupon.couponName)}
                                >
                                    <TableCell className="relative">
                                        {selectedProducts.includes(coupon) && (
                                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                        )}
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            checked={selectedProducts.includes(coupon)}
                                            onChange={() => toggleProduct(coupon)}
                                        />
                                    </TableCell>
                                    <TableCell>{coupon.couponName}</TableCell>
                                    <TableCell>{coupon.type}</TableCell>
                                    <TableCell>{coupon.usableProducts}</TableCell>
                                    <TableCell>{coupon.quantity}</TableCell>
                                    <TableCell>{coupon.faceValue}</TableCell>
                                    <TableCell>{coupon.purchaseCount}</TableCell>
                                    <TableCell>{coupon.usageCount}</TableCell>
                                    <TableCell>
                                        <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                            <Dropdown>
                                                <DropdownButton plain aria-label="More options">
                                                    <EllipsisHorizontalIcon />
                                                </DropdownButton>
                                                <DropdownMenu anchor="bottom end">
                                                    <DropdownItem
                                                        onClick={() => setShowPromotionDialog(true)} // 点击显示 PromotionDialog
                                                    >
                                                        Market
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => setShowUser(true)}>Distribute</DropdownItem>
                                                    <DropdownItem>
                                                        <a href={`/commerce${coupon.url}`} title={`Order #${coupon.id}`} className="block w-full h-full">
                                                            View
                                                        </a>
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
            <PromotionDialog open={showPromotionDialog} setOpen={setShowPromotionDialog} />
            <ShowUser isOpen={showUser} onClose={setShowUser}/>
        </main>
    );
}