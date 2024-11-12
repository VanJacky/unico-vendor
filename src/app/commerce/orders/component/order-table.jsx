'use client';

import React, { useState } from 'react';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import YDIcon from "@/utils/yd-icon";
import {Badge} from "@/components/badge";
import {Dropdown, DropdownButton, DropdownItem, DropdownMenu} from "@/components/dropdown";
import {EllipsisHorizontalIcon} from "@heroicons/react/16/solid";
import {Link} from "@/components/link";

export default function CategoryTable({ orders }) {
    const [expandedRows, setExpandedRows] = useState({});

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
                                            <YDIcon src="/icons/up.svg" alt="Expanded Order Icon" className='w-3 h-3'/>
                                        ) : (
                                            <YDIcon src="/icons/down.svg" alt="Collapsed Order Icon" className='w-3 h-3'/>
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
                                                        <TableCell  className="whitespace-normal break-words text-zinc-500">
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

        </main>

    );
}