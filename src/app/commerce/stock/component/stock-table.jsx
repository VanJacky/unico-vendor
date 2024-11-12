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

export default function StockTable({ stocks }) {
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
                        {['All', 'Stock Alert'].map((tab) => (
                            <option key={tab} value={tab}>
                                {tab}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="mt-2 -mb-px flex space-x-12 overflow-x-auto">
                        {['All', 'Stock Alert' ].map((tab) => (
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
 
                <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>Id</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Image</TableHeader>
                            <TableHeader>Specs</TableHeader>
                            <TableHeader>remainingStock</TableHeader>
                            <TableHeader>totalOutbound</TableHeader>
                            <TableHeader>Create date</TableHeader>
                            <TableHeader>stockAlert</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stocks.map((stock) => (
                            <React.Fragment key={stock.id}>
                                <TableRow>
                                    <TableCell>{stock.id}</TableCell>
                                    <TableCell>{stock.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <img
                                                className="h-15 w-15 bg-gray-800"
                                                src={stock.image}
                                                alt={stock.name}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>{stock.specs}</TableCell>
                                    <TableCell>{stock.remainingStock}</TableCell>
                                    <TableCell>{stock.totalOutbound}</TableCell>
                                    <TableCell className="text-zinc-500">{stock.createTime}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className="max-sm:hidden"
                                            color={stock.stockAlert ? 'red' : 'lime'}
                                        >
                                            {stock.stockAlert ? 'Alert' : 'Normal'}
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
                                                        <a href={`/commerce/stock/${stock.id}`} title={`Stock #${stock.id}`} className="block w-full h-full">
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
        </main>
    );
}