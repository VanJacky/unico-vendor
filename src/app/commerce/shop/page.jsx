"use client"

import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Divider } from '@/components/divider'
import { Label } from '@/components/fieldset'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Text } from '@/components/text'
import { Textarea } from '@/components/textarea'
import { useState } from 'react';
// export const metadata = {
//     title: 'Store-Settings',
// }

export default function StoreSettings() {
    const [refundPolicy, setRefundPolicy] = useState('');
    const [refundDays, setRefundDays] = useState('');
    return (
        <form method="post" className="mx-auto max-w-4xl">
            <Heading>Store Settings</Heading>
            <Divider className="my-10 mt-6"/>

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="space-y-1">
                    <Subheading>Order Information Collection</Subheading>
                    <Text>Select how you will collect information for processing orders.</Text>
                </div>
                <div>
                    <Select aria-label="Currency" name="currency" defaultValue="p">
                        <option value="p">Phone Number</option>
                        <option value="e">Email</option>
                        <option value="b">Both</option>

                    </Select>
                </div>
            </section>

            <Divider className="my-10" soft/>

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="space-y-1">
                    <Subheading>Shipping Cost Settings</Subheading>
                    <Text>
                        Enable “Logistics” if you provide delivery services for customer orders.</Text>
                </div>
                <div className="space-y-4">
                    <CheckboxField>
                        <Checkbox name="email_is_public" defaultChecked/>
                        <Label>Logistics</Label>
                    </CheckboxField>
                    <Input type="money" aria-label="Fixed Shipping Fee" placeholder="$/ Fixed Shipping Fee"
                           name="Fixed Shipping Fee"/>
                    <Input type="money" aria-label="Free Shipping Over a Certain Amount"
                           placeholder="$/ Free Shipping Over a Certain Amount"
                           name="Free Shipping Over a Certain Amount"/>

                </div>

            </section>


            <Divider className="my-10" soft/>
            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="space-y-1">
                    <Subheading>Store Address</Subheading>
                    <Text>
                        Enable “Store Pickup” if you offer an in-store pickup option for customers.</Text>
                </div>

                <div className="space-y-4">
                    <CheckboxField>
                        <Checkbox name="email_is_public" defaultChecked/>
                        <Label>Store Pickup</Label>
                    </CheckboxField>
                    <Input placeholder="Store Address" aria-label="Store Address" name="name" defaultValue=""/>
                </div>
            </section>
            <Divider className="my-10" soft/>

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="space-y-1">
                    <Subheading>Cancellation Policy</Subheading>
                    <Text>Choose the currency in which your store will process cancellations.</Text>
                </div>
                <div>
                    <Select aria-label="Cancellation" name="Cancellation" defaultValue="bs">
                        <option value="bs">Cancellable Before Shipping</option>
                        <option value="nc">Non-Cancellable</option>
                    </Select>
                </div>
            </section>

            <Divider className="my-10" soft/>

            <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="space-y-1">
                    <Subheading>Refund Policy</Subheading>
                    <Text>Please select your refund policy options.</Text>
                </div>
                <div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-3">
                            <input
                                id="refund-none"
                                name="refund-policy"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                value="none"
                                onChange={(e) => setRefundPolicy(e.target.value)}
                            />
                            <label htmlFor="refund-none" className="text-sm font-medium text-gray-900">
                                Not accepting refunds
                            </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input
                                id="refund-conditions"
                                name="refund-policy"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                value="conditional"
                                onChange={(e) => setRefundPolicy(e.target.value)}
                            />
                            <label htmlFor="refund-conditions" className="text-sm font-medium text-gray-900">
                                Returns with conditions
                            </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <input
                                id="refund-unconditional"
                                name="refund-policy"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                value="unconditional"
                                onChange={(e) => setRefundPolicy(e.target.value)}
                            />
                            <label htmlFor="refund-unconditional" className="text-sm font-medium text-gray-900">
                                Unconditional refunds within a certain number of days
                            </label>
                        </div>
                        {refundPolicy === 'unconditional' && (
                            <div className="mt-4 ml-7 space-y-1.5">
                                <label htmlFor="refund-days" className="block text-sm font-medium text-gray-700">

                                </label>
                                <Input
                                    id="refund-days"
                                    aria-label="Refund Days"
                                    placeholder="Enter the specific number of days"
                                    name="refund-days"
                                    value={refundDays}
                                    onChange={(e) => setRefundDays(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Divider className="my-10" soft/>

            <div className="flex justify-end gap-4">
                <Button type="reset" plain>
                    Reset
                </Button>
                <Button type="submit">Save changes</Button>
            </div>
        </form>
    )
}
