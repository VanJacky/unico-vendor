'use client';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
 import SelectProductCategory from "@/app/commerce/products/component/select-product-category";
import {ErrorMessage, Field, Label} from "@/components/fieldset";
import {Select} from "@/components/select";
import CouponRadio from "@/app/marketing/coupon/component/coupon-type-radio";
import CouponType from "@/app/marketing/coupon/component/coupon-type";
import React, {useEffect, useRef, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/table";
import {Input, InputGroup} from "@/components/input";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {Button} from "@/components/button";

export default function EditRecharge() {

    const usersList = [
        { name: 'Leslie Alexander', email: 'leslie.alexander@example.com', access: 'Admin' },
        { name: 'Michael Foster', email: 'michael.foster@example.com', access: 'Owner' },
        { name: 'Dries Vincent', email: 'dries.vincent@example.com', access: 'Member' },
        { name: 'Lindsay Walton', email: 'lindsay.walton@example.com', access: 'Member' },
        { name: 'Courtney Henry', email: 'courtney.henry@example.com', access: 'Admin' }
    ];

     const [selectedUsers, setSelectedUsers] = useState([]);
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("name"); // 新增状态
    const checkbox = useRef();


    useEffect(() => {
        const isIndeterminate = selectedUsers.length > 0 && selectedUsers.length < usersList.length;
        setChecked(selectedUsers.length === usersList.length);
        setIndeterminate(isIndeterminate);
        if (checkbox.current) {
            checkbox.current.indeterminate = isIndeterminate;
        }
    }, [selectedUsers, usersList]);



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

    return (
        <form>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Campaign</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be publicly visible. Please ensure that you share accurate details.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <div className="mt-4 flex max-w-xl gap-4">

                                <div className="flex-1">
                                    <InputGroup>
                                        <MagnifyingGlassIcon/>
                                        <Input name="search" placeholder="Please enter name/phone number…"/>
                                    </InputGroup>
                                </div>
                                <div className="flex-1">
                                    <Button>Create a user</Button>
                                </div>

                            </div>
                            <Table className={'mt-5'}>
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
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Recharge Amount
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/*<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>*/}
                                    <input
                                        type="text"
                                        name="Rule"
                                        id="Rule"
                                        autoComplete="Rule"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Rule Description"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Bonus: $10 (based on previous settings)
                            </p>
                        </div>

                        <div className="sm:col-span-4">
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Total: $100
                            </p>
                        </div>


                    </div>
                </div>


            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Create Order
                </button>
            </div>
        </form>
    )
}
