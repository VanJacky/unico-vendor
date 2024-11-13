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
import {Switch} from "@/components/switch";

export default function CategoryTable({ category }) {
    const [expandedRows, setExpandedRows] = useState({});




    return (
        <main>
            <div className="mt-2 py-2 sm:mt-7">


            </div>
            <div>
                <Table className=" mt-10 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>ID</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Sort</TableHeader>
                            <TableHeader>Product Quantity</TableHeader>
                            <TableHeader>Create Date</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader className="relative w-0">
                                <span className="sr-only">Actions</span>
                            </TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {category.map((ca) => (
                            <React.Fragment key={ca.id}>
                                <TableRow className="cursor-pointer">
                                    <TableCell>{ca.id}</TableCell>
                                    <TableCell>{ca.name}</TableCell>
                                    <TableCell>{ca.sortNum}</TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell className="text-zinc-500">{ca.createTime}</TableCell>
                                    <TableCell>
                                        <Switch aria-label="Allow show" name="status" value={ca.status === 1}/>
                                    </TableCell>
                                    <TableCell>
                                        <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                            <Dropdown>
                                                <DropdownButton plain aria-label="More options">
                                                    <EllipsisHorizontalIcon />
                                                </DropdownButton>
                                                <DropdownMenu anchor="bottom end">
                                                    <DropdownItem>
                                                        <Link href={`/commerce/category/view/${ca.id}`}>
                                                            View
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem>
                                                        <Link href={`/commerce/category/edit/${ca.id}`}>
                                                            Edit
                                                        </Link>
                                                    </DropdownItem>
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