'use client';

import React, { useState, useEffect } from 'react';
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
import { updateCategory, addCategory, deleteCategories, getCategoryWithTypes } from '../api/actions';
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

export default function CategoryTable() {
    const [categories, setCategories] = useState([]);
    const [expandedRows, setExpandedRows] = useState(() => {
        // Initialize with all rows expanded
        const initialState = {};
        categories.forEach(cat => {
            initialState[cat.id] = true;
        });
        return initialState;
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newCategory, setNewCategory] = useState({
        id: null,
        name: '',
        sortNum: 0,
        status: 1
    });

    // 添加数据加载状态
    const [loading, setLoading] = useState(false);

    // 添加数据获取逻辑
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await getCategoryWithTypes();
                // 转换数据结构以匹配表格需求
                const formattedData = data.map(category => ({
                    id: category.id,
                    name: category.name,
                    sortNum: category.sortNum,
                    createTime: category.createTime.split(' ')[0], // 只显示日期部分
                    status: category.status,
                    products: category.goodsList.map(product => ({
                        id: product.id,
                        name: product.title,
                        price: product.price,
                        sales: product.sold,
                        stock: 0, // 数据中没有库存信息，用0占位
                        status: product.status === 1 ? "Active" : "Inactive",
                        sortNum: product.sortNum
                    }))
                }));
                setCategories(formattedData);
            } catch (error) {
                console.error('获取分类失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // 如果需要显示加载状态
    if (loading) {
        return <LoadingOverlay />;
    }

    const toggleExpand = (categoryId) => {
        setExpandedRows(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const handleProductAction = (action, product) => {
        console.log(`${action} product:`, product);
        // Add your action handling logic here
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

    const closeDialog = () => {
        setIsDialogOpen(false);
        setNewCategory({
            id: null,
            name: '',
            sortNum: 0,
            status: 1
        });
    };

    const handleSaveCategory = async () => {
        if (!newCategory.name) {
            // Add validation handling if needed
            return;
        }

        try {
            if (isEditing) {
                // Handle edit logic
                console.log('Editing category:', newCategory);
            } else {
                // Handle create logic
                console.log('Creating new category:', newCategory);
            }
            closeDialog();
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    // Add new handler for product sorting
    const handleProductSort = (categoryId, productIndex, direction) => {
        const category = categories.find(c => c.id === categoryId);
        if (!category ||
            (direction === 'up' && productIndex === 0) ||
            (direction === 'down' && productIndex === category.products.length - 1)) {
            return;
        }

        setCategories(prevCategories => {
            const newCategories = [...prevCategories];
            const categoryIndex = newCategories.findIndex(c => c.id === categoryId);
            const products = [...newCategories[categoryIndex].products];
            
            // 交换位置
            const newIndex = direction === 'up' ? productIndex - 1 : productIndex + 1;
            [products[productIndex], products[newIndex]] = [products[newIndex], products[productIndex]];
            
            newCategories[categoryIndex] = {
                ...newCategories[categoryIndex],
                products: products
            };
            
            return newCategories;
        });
    };

    return (
        <main>
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
                        <TableHeader className="w-10">
                            <span className="sr-only">Add Product</span>
                        </TableHeader>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Sort</TableHeader>
                        <TableHeader>Product Count</TableHeader>
                        <TableHeader>Create Date</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Actions</TableHeader>
                        <TableHeader></TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <React.Fragment key={category.id}>
                            <TableRow className="cursor-pointer" onClick={() => toggleExpand(category.id)}>
                                <TableCell className="w-10">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Add product to category:', category.id);
                                        }}
                                        className="p-1 text-[#0F53FF] hover:text-[#0F53FF]/80 rounded-full hover:bg-[#0F53FF]/10"
                                    >
                                        <PlusCircleIcon className="w-5 h-5" />
                                    </button>
                                </TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.sortNum}</TableCell>
                                <TableCell>{category.products.length}</TableCell>
                                <TableCell>{category.createTime}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={category.status === 1}
                                        onChange={(e) => e.stopPropagation()}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                        <Dropdown>
                                            <DropdownButton plain aria-label="More options">
                                                <EllipsisHorizontalIcon />
                                            </DropdownButton>
                                            <DropdownMenu anchor="bottom end">
                                                <DropdownItem>View</DropdownItem>
                                                <DropdownItem>Edit</DropdownItem>
                                                <DropdownItem>Delete</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {expandedRows[category.id] ? (
                                        <YDIcon src="/icons/up.svg" alt="Expanded" className='w-3 h-3' />
                                    ) : (
                                        <YDIcon src="/icons/down.svg" alt="Collapsed" className='w-3 h-3' />
                                    )}
                                </TableCell>
                            </TableRow>

                            {expandedRows[category.id] && (
                                <TableRow className="bg-gray-50">
                                    <TableCell colSpan="8" className="p-0">
                                        <Table className="w-full">
                                            <TableHead>
                                                <TableRow>
                                                    <TableHeader className="w-[10%]">Sort</TableHeader>
                                                    <TableHeader className="w-[30%]">Product Name</TableHeader>
                                                    <TableHeader className="w-[15%]">Price</TableHeader>
                                                    <TableHeader className="w-[15%]">Status</TableHeader>
                                                    <TableHeader className="w-[30%] text-right">Actions</TableHeader>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {category.products.map((product, index) => (
                                                    <TableRow key={product.id}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{product.name}</TableCell>
                                                        <TableCell>${product.price}</TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                color={product.status === "Active" ? "lime" : "zinc"}
                                                            >
                                                                {product.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex items-center justify-end gap-4">
                                                                {/* Action Links */}
                                                                <div className="flex gap-4">
                                                                    <Link
                                                                        href="#"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleProductAction('view', product);
                                                                        }}
                                                                        className="font-medium text-blue-600 hover:text-blue-700"
                                                                    >
                                                                        Details
                                                                    </Link>
                                                                    <Link
                                                                        href="#"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleProductAction('toggle', product);
                                                                        }}
                                                                        className="font-medium text-blue-600 hover:text-blue-700"
                                                                    >
                                                                        {product.status === "Active" ? "Deactivate" : "Activate"}
                                                                    </Link>
                                                                </div>
                                                                {/* Sort Buttons */}
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleProductSort(category.id, index, 'up');
                                                                        }}
                                                                        disabled={index === 0}
                                                                        className={`p-1 text-gray-600 hover:text-gray-800 ${
                                                                            index === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                                                        }`}
                                                                    >
                                                                        <ArrowUpIcon className="w-4 h-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleProductSort(category.id, index, 'down');
                                                                        }}
                                                                        disabled={index === category.products.length - 1}
                                                                        className={`p-1 text-gray-600 hover:text-gray-800 ${
                                                                            index === category.products.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                                                        }`}
                                                                    >
                                                                        <ArrowDownIcon className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>

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
                    <Button plain onClick={closeDialog}>Cancel</Button>
                    <Button onClick={handleSaveCategory}>Save</Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}