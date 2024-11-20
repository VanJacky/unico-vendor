'use client';

import React, { useEffect, useState } from 'react';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import YDIcon from "@/utils/yd-icon";
import { Badge } from "@/components/badge";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/dropdown";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { Link } from "@/components/link";
import { Switch } from "@/components/switch";
import { Heading } from '@/components/heading';
import { Input, InputGroup } from '@/components/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Select } from '@/components/select';
import { getCategoryWithTypes } from '../api/actions';

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

export default function CategoryTable() {
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            setIsLoading(true);
            const response = await getCategoryWithTypes();
            if (response.success) {
                setCategory(response.data || []);
            }
        } catch (error) {
            console.error('获取分类失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            {/* Global loading overlay */}
            {isLoading && <LoadingOverlay />}
            
            <div className="mx-auto">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-sm:w-full sm:flex-1">
                        <Heading>Category</Heading>
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
                    <Button>
                        <Link href='/commerce/category/edit'>
                            Create Category
                        </Link>
                    </Button>
                </div>

                <Table className="mt-10 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
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
                                        <Switch aria-label="Allow show" name="status" value={ca.status === 1} />
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