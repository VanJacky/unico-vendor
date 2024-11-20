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
import { Switch, SwitchField } from "@/components/switch";
import { Heading } from '@/components/heading';
import { Input, InputGroup } from '@/components/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Select } from '@/components/select';
import { getCategoryWithTypes } from '../api/actions';
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/dialog";
import { Field, Fieldset, Label, Legend } from "@/components/fieldset";
import { updateCategory, addCategory, deleteCategories } from '../api/actions';

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newCategory, setNewCategory] = useState({
        id: null,
        name: '',
        sortNum: 0,
        status: 1
    });
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        loadCategories();
    }, [refresh]);

    const loadCategories = async () => {
        try {
            setIsLoading(true);
            const response = await getCategoryWithTypes();
            console.log('Response received:', response);
            setCategory(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error('获取分类失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateCategory = () => {
        setIsEditing(false);
        setNewCategory({
            id: null,
            name: '',
            sortNum: 0,
            status: 1
        });
        setIsDialogOpen(true);
    };

    const handleEditCategory = (category) => {
        setIsEditing(true);
        setNewCategory({
            id: category.id,
            name: category.name,
            sortNum: category.sortNum,
            status: category.status
        });
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setIsEditing(false);
        setNewCategory({ id: null, name: '', sortNum: 0, status: 1 });
    };

    const handleSaveCategory = async () => {
        try {
            closeDialog();
            setIsLoading(true);
            
            if (isEditing) {
                await updateCategory(newCategory);
            } else {
                const response = await addCategory(newCategory);
                console.log('新增分类响应:', response);
            }
            
            setRefresh(prev => prev + 1);
        } catch (error) {
            console.error('保存分类失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            setIsLoading(true);
            await deleteCategories(categoryId);
            // 删除后刷新列表
            await loadCategories();
        } catch (error) {
            console.error('删除分类失败:', error);
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
                    <Button onClick={handleCreateCategory}>
                        Create Category
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
                                                    <DropdownItem onClick={() => handleEditCategory(ca)}>
                                                        Edit
                                                    </DropdownItem>
                                                    <DropdownItem onClick={() => handleDeleteCategory(ca.id)}>
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

            {/* Add Create Category Dialog */}
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>{isEditing ? 'Edit Category' : 'Create Category'}</DialogTitle>
                <DialogDescription>
                    Please fill in the category information
                </DialogDescription>
                <DialogBody>
                    <Field className="mb-4">
                        <Label>Category Name</Label>
                        <Input
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            placeholder="Please enter the category name"
                        />
                    </Field>
                    <Field className="mb-4">
                        <Label>Sort</Label>
                        <Input
                            type="number"
                            value={newCategory.sortNum}
                            onChange={(e) => setNewCategory({ ...newCategory, sortNum: parseInt(e.target.value) })}
                            placeholder="Please enter the sort number"
                        />
                    </Field>
                    <Field className="flex items-center gap-4">
                        <SwitchField>
                            <Label>Status</Label>
                            <Switch
                                checked={newCategory.status === 1}
                                onChange={(checked) => setNewCategory({ ...newCategory, status: checked ? 1 : 0 })}
                            />
                        </SwitchField>
                    </Field>
                </DialogBody>
                <DialogActions>
                    <Button plain onClick={closeDialog}>取消</Button>
                    <Button onClick={handleSaveCategory}>保存</Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}