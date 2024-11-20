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
import {Heading} from "@/components/heading";
import {Input, InputGroup} from "@/components/input";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {Select} from "@/components/select";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/dialog";
import { Field, Fieldset, Label, Legend } from "@/components/fieldset";

// Add mock data
const mockUsers = [
    { id: 1, name: "John Smith", email: "john@example.com", phone: "+1 234-567-8900" },
    { id: 2, name: "Emma Wilson", email: "emma@example.com", phone: "+1 234-567-8901" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", phone: "+1 234-567-8902" },
    { id: 4, name: "Sarah Davis", email: "sarah@example.com", phone: "+1 234-567-8903" }
];

const mockProducts = [
    { id: 1, name: "Premium Membership", price: 99.99 },
    { id: 2, name: "Basic Package", price: 49.99 },
    { id: 3, name: "Gold Subscription", price: 199.99 },
    { id: 4, name: "VIP Access Pass", price: 299.99 }
];

export default function OrderTable({ orders }) {
    const [expandedRows, setExpandedRows] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [cameraActive, setCameraActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

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

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const handleOrderCreate = () => {
        closeDialog();
        setShowPaymentDialog(true);
    };

    const handleImmediatePayment = () => {
        setCameraActive(true);
    };

    // Add search handler
    const handleUserSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        
        const filtered = mockUsers.filter(user => 
            user.name.toLowerCase().includes(term.toLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase()) ||
            user.phone.includes(term)
        );
        setFilteredUsers(filtered);
    };

    return (
        <main>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-sm:w-full sm:flex-1">
                    <Heading>Orders</Heading>
                    <div className="mt-4 flex max-w-xl gap-4">
                        <div className="flex-1">
                            <InputGroup>
                                <MagnifyingGlassIcon/>
                                <Input name="search" placeholder="Search orders&hellip;"/>
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
                <Button onClick={openDialog}>Create Order</Button>
            </div>
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

            <Dialog open={showPaymentDialog} onClose={() => {
                setShowPaymentDialog(false);
                setCameraActive(false);
            }} size="md">
                <DialogTitle>Complete Order Creation</DialogTitle>
                <DialogBody>
                    <div className="space-y-6">
                        {!cameraActive ? (
                            <div className="space-y-4">
                                <Button 
                                    className="w-full" 
                                    onClick={handleImmediatePayment}
                                >
                                    Immediate Payment
                                </Button>
                                <Button 
                                    className="w-full" 
                                    onClick={() => setShowPaymentDialog(false)}
                                >
                                    Create Only
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-64 h-64 bg-gray-100 flex items-center justify-center">
                                    <video 
                                        id="camera-feed"
                                        autoPlay 
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-gray-600">请扫描顾客的付款码</p>
                            </div>
                        )}
                    </div>
                </DialogBody>
                <DialogActions>
                    <Button plain onClick={() => {
                        setShowPaymentDialog(false);
                        setCameraActive(false);
                    }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isDialogOpen} onClose={closeDialog} size="5xl">
                <DialogTitle>Create Order</DialogTitle>
                <DialogDescription>
                    Please fill in the order information
                </DialogDescription>
                <DialogBody>
                    <div className="space-y-6">
                        <Field>
                            <Label>Select User</Label>
                            <InputGroup>
                                <MagnifyingGlassIcon/>
                                <Input 
                                    name="user_search" 
                                    placeholder="Search users by name, email, or phone..."
                                    value={searchTerm}
                                    onChange={handleUserSearch}
                                />
                            </InputGroup>
                            {searchTerm && filteredUsers.length > 0 && (
                                <div className="mt-2 border rounded-md shadow-sm">
                                    {filteredUsers.map(user => (
                                        <div 
                                            key={user.id}
                                            className="p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setSearchTerm(user.name);
                                            }}
                                        >
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                            <div className="text-sm text-gray-500">{user.phone}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Field>

                        <Field>
                            <Label>Select Product</Label>
                            <Select 
                                name="product"
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                                <option value="">Please select a product</option>
                                {mockProducts.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} - ${product.price}
                                    </option>
                                ))}
                            </Select>
                        </Field>

                        <Field>
                            <Label>Distribution Method</Label>
                            <Select name="distribution">
                                <option value="p">Self Pick-up</option>
                                <option value="e">Manual Distribution</option>
                                <option value="b">Auto Distribution for New Users</option>
                            </Select>
                        </Field>
                    </div>
                </DialogBody>
                <DialogActions>
                    <Button plain onClick={closeDialog}>Cancel</Button>
                    <Button onClick={handleOrderCreate}>Save</Button>
                </DialogActions>
            </Dialog>

        </main>

    );
}