
import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import {Description, Fieldset, Label, Legend} from "@/components/fieldset";
import {Text} from "@/components/text";
import {Checkbox, CheckboxField, CheckboxGroup} from "@/components/checkbox";
import {Divider} from "@/components/divider";
import {BankOptions} from "@/app/financial/payment/tabs/bank-info/bank-options";
import {Heading} from "@/components/heading";
import {Input, InputGroup} from "@/components/input";
import {EllipsisVerticalIcon, MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {Select} from "@/components/select";
import {Link} from "@/components/link";
import {Button} from "@/components/button";
import {Badge} from "@/components/badge";
import {Dropdown, DropdownButton, DropdownItem, DropdownMenu} from "@/components/dropdown";

export default function PayOffline({ events }) {
    return (
        <div>
            <Fieldset>
                <Legend>Enable Offline Payment</Legend>
                <Text>线下POS机支付</Text>
                <CheckboxGroup>
                    <CheckboxField>
                        <Checkbox name="discoverability" value="show_on_events_page" defaultChecked/>
                        <Label>Finix</Label>
                        <Description> </Description>
                    </CheckboxField>
                    <CheckboxField>
                        <Checkbox name="discoverability" value="allow_embedding"/>
                        <Label>Stripe</Label>
                        <Description> </Description>
                    </CheckboxField>
                    <CheckboxField>
                        {/*<Checkbox name="discoverability" value="allow_embedding" />*/}
                        <Label> </Label>
                        <Description> </Description>
                    </CheckboxField>
                </CheckboxGroup>

            </Fieldset>

            <Divider className="mb-12" soft/>

            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-sm:w-full sm:flex-1">
                    <Heading>Devices</Heading>
                    <div className="mt-4 flex max-w-xl gap-4">
                        <div className="flex-1">
                            <InputGroup>
                                <MagnifyingGlassIcon/>
                                <Input name="search" placeholder="Search devices&hellip;"/>
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
                <Link href="../financial/new-device-order">
                    <Button>Order New Device</Button>
                </Link>


            </div>
            <ul className="mt-10">
                {events.map((event, index) => (
                    <li key={event.id}>
                        <Divider soft={index > 0}/>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-6 py-6">
                                <div className="w-32 shrink-0">
                                    <Link href={event.url} aria-hidden="true">
                                        <img className="aspect-[3/2] rounded-lg shadow" src={event.imgUrl}
                                             alt=""/>
                                    </Link>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="text-base/6 font-semibold">
                                        <Link href={event.url}>{event.name}</Link>
                                    </div>
                                    <div className="text-xs/6 text-zinc-500">
                                        {event.date} at {event.time} <span
                                        aria-hidden="true">·</span> {event.location}
                                    </div>
                                    <div className="text-xs/6 text-zinc-600">
                                        serial number {event.ticketsSold}{event.ticketsAvailable}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge className="max-sm:hidden"
                                       color={event.status === 'Active' ? 'lime' : 'zinc'}>
                                    {event.status}
                                </Badge>
                                <Dropdown>
                                    <DropdownButton plain aria-label="More options">
                                        <EllipsisVerticalIcon/>
                                    </DropdownButton>
                                    <DropdownMenu anchor="bottom end">
                                        <DropdownItem href={event.url}>View</DropdownItem>
                                        <DropdownItem>Edit</DropdownItem>
                                        <DropdownItem>Delete</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}