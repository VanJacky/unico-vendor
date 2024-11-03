import { Button } from '@/components/button';
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { useEffect, useState, useRef } from 'react';
import { Input, InputGroup } from '@/components/input';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Select } from '@/components/select';

export function ShowUser({ users, isOpen, onClose }) {
    const [localIsOpen, setLocalIsOpen] = useState(isOpen);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("name"); // 新增状态
    const checkbox = useRef();

    const usersList = [
        { name: 'Leslie Alexander', email: 'leslie.alexander@example.com', access: 'Admin' },
        { name: 'Michael Foster', email: 'michael.foster@example.com', access: 'Owner' },
        { name: 'Dries Vincent', email: 'dries.vincent@example.com', access: 'Member' },
        { name: 'Lindsay Walton', email: 'lindsay.walton@example.com', access: 'Member' },
        { name: 'Courtney Henry', email: 'courtney.henry@example.com', access: 'Admin' }
    ];

    useEffect(() => {
        setLocalIsOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const isIndeterminate = selectedUsers.length > 0 && selectedUsers.length < usersList.length;
        setChecked(selectedUsers.length === usersList.length);
        setIndeterminate(isIndeterminate);
        if (checkbox.current) {
            checkbox.current.indeterminate = isIndeterminate;
        }
    }, [selectedUsers, usersList]);

    const closeDialog = () => {
        setLocalIsOpen(false);
        onClose(false);
    };

    const toggleAll = () => {
        if (checked || indeterminate) {
            setSelectedUsers([]); // 清空选中状态
        } else {
            setSelectedUsers(usersList.map((user) => user.email)); // 选中所有用户的 email
        }
        setChecked(!checked && !indeterminate);
        setIndeterminate(false);
    };

    const toggleUser = (user) => {
        setSelectedUsers((prevSelected) => {
            const newSelected = prevSelected.includes(user.email)
                ? prevSelected.filter((email) => email !== user.email) // 取消选中
                : [...prevSelected, user.email]; // 添加选中
            setChecked(newSelected.length === usersList.length);
            setIndeterminate(newSelected.length > 0 && newSelected.length < usersList.length);
            return newSelected;
        });
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    return (
        <>
            <Dialog open={localIsOpen} onClose={closeDialog} size="3xl">
                <DialogTitle>Users</DialogTitle>
                <DialogDescription>The following users have access to your account.</DialogDescription>
                <div className="mt-4 flex max-w-xl gap-4">
                    <div>
                        <Select name="sort_by" value={selectedFilter} onChange={handleFilterChange}>
                            <option value="name">All Users</option>
                            <option value="date">Specified Users</option>
                        </Select>
                    </div>
                    <div className="flex-1">
                        <InputGroup>
                            <MagnifyingGlassIcon />
                            <Input name="search" placeholder="Please enter name/phone number…" />
                        </InputGroup>
                    </div>
                </div>

                <DialogBody>
                    {selectedFilter === "date" && ( // 只有在选择 "Specified Users" 时显示表格
                        <Table bleed compact>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>
                                        <input
                                            type="checkbox"
                                            ref={checkbox}
                                            checked={checked}
                                            onChange={toggleAll}
                                            className={`h-4 w-4 rounded border-gray-300 ${checked ? 'text-indigo-600' : ''} focus:ring-indigo-600`}
                                        />
                                    </TableHeader>
                                    <TableHeader>Name</TableHeader>
                                    <TableHeader>Email</TableHeader>
                                    <TableHeader>Role</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usersList.map((user) => (
                                    <TableRow key={user.email}>
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                className={`h-4 w-4 rounded border-gray-300 ${selectedUsers.includes(user.email) ? 'text-indigo-600' : ''} focus:ring-indigo-500`}
                                                checked={selectedUsers.includes(user.email)}
                                                onChange={() => toggleUser(user)}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="text-zinc-500">{user.access}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </DialogBody>
                <DialogActions>
                    <Button plain onClick={closeDialog}>Cancel</Button>
                    <Button onClick={closeDialog}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}