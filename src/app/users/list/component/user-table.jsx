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
import { getUserList, addUser } from '../api/actions';
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/dialog";
import { Field, Fieldset, Label, Legend } from "@/components/fieldset";
import Image from 'next/image';


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

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newUser, setNewUser] = useState({
        nickName: '',
        phone: ''
    });
    const [shouldRefresh, setShouldRefresh] = useState(false);

    useEffect(() => {
        loadUsers();
    }, [shouldRefresh]);

    const loadUsers = async () => {
        try {
            setIsLoading(true);
            const data = await getUserList({
                pageNumber: 1,
                pageSize: 20
            });
            console.log('获取到的数据:', data);

            const userList = data?.list || [];
            console.log('要渲染的用户列表:', userList);

            setUsers(userList);
        } catch (error) {
            console.error('获取用户列表失败:', error);
        } finally {
            setIsLoading(false);
            setShouldRefresh(false);
        }
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            setIsDialogOpen(false);

            await addUser(newUser);
            setNewUser({ nickName: '', phone: '' });
            setShouldRefresh(true);
        } catch (error) {
            console.error('新增用户失败:', error);
        }
    };

    return (
        <main>
            {isLoading && <LoadingOverlay />}

            <div className="mx-auto">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="max-sm:w-full sm:flex-1">
                        <Heading>Users</Heading>
                        <div className="mt-4 flex max-w-xl gap-4">
                            <div className="flex-1">
                                <InputGroup>
                                    <MagnifyingGlassIcon />
                                    <Input name="search" placeholder="Search users..." />
                                </InputGroup>
                            </div>
                            <div>
                                <Select name="sort_by">
                                    <option value="name">Sort by name</option>
                                    <option value="email">Sort by email</option>
                                    <option value="role">Sort by role</option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        Add User
                    </Button>
                </div>

                <Table className="mt-10 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>Avatar</TableHeader>
                            {/* <TableHeader>ID</TableHeader> */}
                            <TableHeader>Nickname</TableHeader>
                            <TableHeader>Phone</TableHeader>
                            <TableHeader>Create Time</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader className="relative w-0">
                                <span className="sr-only">Actions</span>
                            </TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img
                                            src={user.avatarUrl || '/users/uu.png'}
                                            alt={user.nickName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </TableCell>
                                {/* <TableCell>{user.id}</TableCell> */}
                                <TableCell>{user.nickName}</TableCell>
                                <TableCell>{user.phone || 'N/A'}</TableCell>
                                <TableCell className="text-zinc-500">{user.createTime}</TableCell>
                                <TableCell>
                                    <Switch
                                        aria-label="User status"
                                        checked={user.status === 1}
                                        disabled
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                        <Dropdown>
                                            <DropdownButton plain aria-label="More options">
                                                <EllipsisHorizontalIcon />
                                            </DropdownButton>
                                            <DropdownMenu anchor="bottom end">
                                                <DropdownItem>
                                                    <Link href={`/users/view/${user.id}`}>
                                                        View
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem onClick={() => {
                                                    setNewUser(user);
                                                    setIsEditing(true);
                                                    setIsDialogOpen(true);
                                                }}>
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem>Delete</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* User Dialog */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>{isEditing ? '编辑用户' : '新增用户'}</DialogTitle>
                <DialogBody>
                    <Field className="mb-4">
                        <Label>昵称</Label>
                        <Input
                            value={newUser.nickName}
                            onChange={(e) => setNewUser({ ...newUser, nickName: e.target.value })}
                            placeholder="请输入用户昵称"
                        />
                    </Field>
                    <Field className="mb-4">
                        <Label>手机号</Label>
                        <Input
                            type="tel"
                            value={newUser.phone}
                            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                            placeholder="请输入手机号"
                        />
                    </Field>
                </DialogBody>
                <DialogActions>
                    <Button plain onClick={() => {
                        setIsDialogOpen(false);
                        setNewUser({ nickName: '', phone: '' });
                    }}>取消</Button>
                    <Button onClick={handleSave}>保存</Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}