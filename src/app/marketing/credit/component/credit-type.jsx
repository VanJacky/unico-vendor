'use client';

import { useState } from "react";
import { Radio, RadioField, RadioGroup } from "@/components/radio";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/dialog";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Field, Fieldset, Label, Legend } from "@/components/fieldset";
import CouponRadio from "@/app/marketing/coupon/component/coupon-type-radio";
import CreditRadio from "@/app/marketing/credit/component/credit-type-radio";

export default function CreditType() {
  let [selected, setSelected] = useState('discount');
  let [isOpen, setIsOpen] = useState(false);
  let [selectedEdit, setSelectedEdit] = useState(null); // To identify which edit dialog to open
  let [discountType, setDiscountType] = useState('discount'); // To track selected discount type

  const openEditDialog = (type) => {
    setSelectedEdit(type);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedEdit(null);
    setDiscountType('discount'); // Reset to default when dialog closes
  };

  return (
      <div className="bg-white   sm:rounded-lg">
        <div className="  py-5  ">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Points Type</h3>

          {/* RadioGroup with two RadioFields */}
          <RadioGroup value={selected} onChange={setSelected}>

            {/* Discount Coupon Radio */}
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:ml-4 sm:mt-0">
                    <RadioField>
                      <Radio value="discount" />
                      <Legend>Cashback Points</Legend>
                    </RadioField>
                    <div className="sm:ml-8 mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                      <div>Earn 1 point per ¥1 spent; 200 points redeem ¥1.</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
                  <button
                      type="button"
                      onClick={() => openEditDialog("discount")}
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Redemption Coupon Radio */}
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:ml-4 sm:mt-0">
                    <RadioField>
                      <Radio value="gift" />
                      <Legend>Redeemable Points</Legend>
                    </RadioField>
                    <div className="sm:ml-8 mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                      <div>Earn 1 point per specified item purchased; 10 points redeem 1 item.</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
                  <button
                      type="button"
                      onClick={() => openEditDialog("gift")}
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

          </RadioGroup>

          {/* Dialog for Editing Coupon */}
          <Dialog size={"4xl"} open={isOpen} onClose={closeDialog}>
            <DialogTitle>
               Edit Rule
            </DialogTitle>

            <DialogBody>
              {selectedEdit === "discount" ? (
                  <div>
                    <Field>
                      <Label>Points Earned per Dollar Spent</Label>
                      <Input
                          name="Spent"
                          placeholder="10"
                          autoFocus
                      />
                    </Field>

                    <Field className={'mt-5'}>
                      <Label>Points Required for $1</Label>
                      <Input
                          name="Required"
                          placeholder="200.00"
                          autoFocus
                      />
                    </Field>

                  </div>
              ) : (

                  <Field>

                  </Field>
              )}

              {selectedEdit === "discount" ? (
                  <div>


                  </div>
              ) : (

                <div>

                  <Field className={"mt-5"}>
                    {/*Earn 1 point for each of the following items purchased.*/}
                    <CreditRadio selectedCouponType={selectedEdit}
                                 title={"Earn 1 point for each of the following items purchased."} section={'rule'}/>
                  </Field>
                  <Field className={"mt-5"}>
                    {/*Earn 1 point for each of the following items purchased.*/}
                    <CreditRadio selectedCouponType={selectedEdit}
                                 title={"points can redeem one item."} section={'reward'}/>
                  </Field>
                </div>

                )}


              <div className="sm:col-span-4 mt-8">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Rule Description
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


            </DialogBody>
            <DialogActions>
              <Button plain onClick={closeDialog}>Cancel</Button>
              <Button onClick={closeDialog}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
  );
}