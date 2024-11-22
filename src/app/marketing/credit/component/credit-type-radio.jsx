'use client';

import React, { useState } from 'react';
import {Field, Label} from "@/components/fieldset";
import {Select} from "@/components/select";
import SelectMultiGoods from "@/app/marketing/coupon/component/select_goods";
import {Input} from "@/components/input";

const notificationMethods = [
    { id: 'All', title: 'All Products' },
    { id: 'Category', title: 'Specified Category' },
    { id: 'Products', title: 'Specified Products' },


];

export default function CreditRadio({ selectedCouponType ,title, section}) {
    const [selectedCoupon, setSelectedCoupon] = useState('All');
    const [discountType, setDiscountType] = useState(null);

    const handleCouponSelect = (couponType) => {
        setSelectedCoupon(selectedCoupon === couponType ? null : couponType);
    };

    const handleDiscountTypeToggle = (type) => {
        setDiscountType(discountType === type ? null : type);
    };


    const filteredMethods = selectedCouponType === 'no'
        ? notificationMethods.filter(method => method.id === 'Products')
        : notificationMethods;


    return (
        <div>

            {section === "reward" ? (
                <div>
                    <Field className={'mt-8'}>
                        <Label>How many points to redeem an item?</Label>
                        <Input
                            name="Required"
                            placeholder="10"
                            autoFocus
                        />
                    </Field>

                </div>
            ) : (


                <label htmlFor="coupon-type" className="block text-sm font-medium leading-6 text-gray-900">
                    {title}
                </label>
    )
}

    <fieldset className="mt-3">
        <legend className="sr-only">Coupon Type</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {filteredMethods.map((method) => (
                        <div key={method.id} className="flex items-center">
                            <input
                                id={method.id}
                                name="coupon-type"
                                type="radio"
                                checked={selectedCoupon === method.id}
                                onChange={() => handleCouponSelect(method.id)}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor={method.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                {method.title}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>

            {/* Conditional Rendering Based on Selected Coupon Type */}
            {selectedCoupon === 'Products'  && (
                <div className="mt-10 sm:col-span-4">
                    <Field>
                        {/*<label className="block text-sm font-medium leading-6 text-gray-900">*/}
                        {/*    Valid Period*/}
                        {/*</label>*/}
                        <div className="mt-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                                <SelectMultiGoods/>
                                {/*{errors.has('status') && <ErrorMessage>{errors.get('status')}</ErrorMessage>}*/}


                                {/* "到" Text for Separation */}
                                <span className="text-center text-sm text-gray-600 my-1  ">  </span>

                                <SelectMultiGoods/>

                            </div>
                            <div className="mt-6 text-sm leading-6">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Add Products
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </div>
                        </div>

                    </Field>
                </div>
            )}



            {selectedCoupon === 'Category' && (
                <div className="mt-10 sm:col-span-4">
                    <SelectMultiGoods/>
                </div>
            )}
        </div>
    );
}