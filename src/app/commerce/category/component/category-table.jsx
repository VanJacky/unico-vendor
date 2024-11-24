'use client';

import React, { useState, useEffect } from 'react';
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
import { updateCategory, updateProductsSort, addCategory, deleteCategories, getCategoryWithTypes } from '../api/actions';
import { toggleProductStatus } from '@/app/commerce/products/api/actions';

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

    // 添加 refresh 状态
    const [refresh, setRefresh] = useState(0);

    // 添加数据获取逻辑
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await getCategoryWithTypes();
                const formattedData = data.map(category => ({
                    id: category.id,
                    name: category.name,
                    sortNum: category.sortNum,
                    createTime: category.createTime.split(' ')[0],
                    status: category.status,
                    products: category.goodsList
                        .map(product => ({
                            id: product.id,
                            name: product.title,
                            price: product.price,
                            sales: product.sold,
                            stock: 0,
                            status: product.status === 1 ? "Active" : "Inactive",
                            sortNum: product.sortNum
                        }))
                        .sort((a, b) => a.sortNum - b.sortNum)
                }));
                setCategories(formattedData);
            } catch (error) {
                console.error('获取分类失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [refresh]);

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
        if (action === 'toggle') {
            // 立即更新UI状态
            setCategories(prevCategories => 
                prevCategories.map(category => ({
                    ...category,
                    products: category.products.map(p => 
                        p.id === product.id
                            ? {...p, status: p.status === "Active" ? "Inactive" : "Active"}
                            : p
                    )
                }))
            );

            // 异步调用API
            toggleProductStatus(
                product.id, 
                product.status === "Active" ? 0 : 1
            ).catch(error => {
                console.error('状态切换失败:', error);
                // 如果API调用失败，回滚状态
                setCategories(prevCategories => 
                    prevCategories.map(category => ({
                        ...category,
                        products: category.products.map(p => 
                            p.id === product.id
                                ? {...p, status: product.status}
                                : p
                        )
                    }))
                );
            });
        } else if (action === 'view') {
            // 处理查看详情逻辑
            console.log('View product:', product);
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
            return;
        }

        try {
            setLoading(true);
            if (isEditing) {
                await updateCategory({
                    id: newCategory.id,
                    name: newCategory.name,
                    sortNum: newCategory.sortNum,
                    status: newCategory.status
                });
            } else {
                await addCategory(newCategory);
            }
            closeDialog();
            // 触发刷新
            setRefresh(prev => prev + 1);
        } catch (error) {
            console.error('保存分类失败:', error);
        } finally {
            setLoading(false);
        }
    };

    // 修改 handleProductSort 函数
    const handleProductSort = (categoryId, productIndex, direction) => {
        const category = categories.find(c => c.id === categoryId);
        if (!category ||
            (direction === 'up' && productIndex === 0) ||
            (direction === 'down' && productIndex === category.products.length - 1)) {
            return;
        }

        const newIndex = direction === 'up' ? productIndex - 1 : productIndex + 1;
        
        // 立即更新UI
        setCategories(prevCategories => {
            const newCategories = [...prevCategories];
            const categoryIndex = newCategories.findIndex(c => c.id === categoryId);
            const products = [...newCategories[categoryIndex].products];
            
            // 交换位置
            [products[productIndex], products[newIndex]] = 
            [products[newIndex], products[productIndex]];
            
            newCategories[categoryIndex] = {
                ...newCategories[categoryIndex],
                products: products
            };
            
            // 获取交换后的新顺序，构建要更新的数据
            const productsToUpdate = products.map((product, index) => ({
                id: product.id,
                sortNum: index + 1
            }));
            
            // 异步调用，不等待结果
            updateProductsSort(productsToUpdate);
            
            return newCategories;
        });
    };

    // 在 CategoryTable 组件内添加 handleDeleteCategory 函数
    const handleDeleteCategory = async (categoryId) => {
        if (!window.confirm('确定要删除这个分类吗？')) {
            return;
        }

        try {
            setLoading(true);
            await deleteCategories(categoryId);
            // 触发刷新
            setRefresh(prev => prev + 1);
        } catch (error) {
            console.error('删除分类失败:', error);
        } finally {
            setLoading(false);
        }
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
                                        title="Add Product"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.location.href = `/commerce/products/edit?categoryId=${category.id}`;
                                        }}
                                        className="group relative p-1 text-[#0F53FF] hover:text-[#0F53FF]/80 rounded-full hover:bg-[#0F53FF]/10"
                                    >
                                        <span className="sr-only">New Product Here</span>
                                        <PlusCircleIcon className="w-5 h-5" />

                                        <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap transition-all duration-200">
                                            New Product Here
                                        </span>
                                    </button>
                                </TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.sortNum}</TableCell>
                                <TableCell>{category.products.length}</TableCell>
                                <TableCell>{category.createTime}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={category.status === 1}
                                        onChange={(checked) => {
                                            // 立即更新UI状态
                                            setCategories(prevCategories => 
                                                prevCategories.map(cat => 
                                                    cat.id === category.id 
                                                        ? {...cat, status: checked ? 1 : 0}
                                                        : cat
                                                )
                                            );
                                            // 异步调用API
                                            updateCategory({
                                                id: category.id,
                                                name: category.name,
                                                sortNum: category.sortNum,
                                                status: checked ? 1 : 0
                                            }).catch(error => {
                                                console.error('更新分类状态失败:', error);
                                                // 如果API调用失败，回滚状态
                                                setCategories(prevCategories => 
                                                    prevCategories.map(cat => 
                                                        cat.id === category.id 
                                                            ? {...cat, status: category.status}
                                                            : cat
                                                    )
                                                );
                                            });
                                        }}
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
                                                <DropdownItem onClick={() => {
                                                    setIsEditing(true);
                                                    setNewCategory({
                                                        id: category.id,
                                                        name: category.name,
                                                        sortNum: category.sortNum,
                                                        status: category.status
                                                    });
                                                    setIsDialogOpen(true);
                                                }}>Edit</DropdownItem>
                                                <DropdownItem onClick={() => handleDeleteCategory(category.id)}>Delete</DropdownItem>
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
                                                                        className={`p-1 text-gray-600 hover:text-gray-800 ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
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
                                                                        className={`p-1 text-gray-600 hover:text-gray-800 ${index === category.products.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
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