'use client';

import { useState } from "react";
import { Radio, RadioField, RadioGroup } from "@/components/radio";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/dialog";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Field, Fieldset, Label, Legend } from "@/components/fieldset";
import CouponRadio from "@/app/marketing/coupon/component/coupon-type-radio";

export default function BalanceRule() {
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
      <div className="bg-white  sm:rounded-lg">
        <div className="py-5  ">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Recharge Cashback Settings</h3>

          {/* RadioGroup with two RadioFields */}
          <RadioGroup value={selected} onChange={setSelected}>

            {/* Discount Coupon Radio */}
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:ml-4 sm:mt-0">
                    <RadioField>
                      <Radio value="discount" />
                      <Legend>Cashback Rule A</Legend>
                    </RadioField>
                    <div className="sm:ml-8 mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                      <div>Recharge $20+ in one transaction to get a $35 bonus.</div>
                      <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">&middot;</span>
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
                      <Legend>Cashback Rule B</Legend>
                    </RadioField>
                    <div className="sm:ml-8 mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                      <div>Recharge $10+ in one transaction to get a $15 bonus.</div>
                      <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">&middot;</span>
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
               Edit Rules
            </DialogTitle>

            <DialogBody>

                  <div>
                    <Field>
                      <Label>Minimum Single Recharge Amount</Label>
                      <Input
                          name="Recharge"
                          placeholder="$10.00"
                          autoFocus
                      />
                    </Field>
                    <Field className={"mt-5"}>
                      <Label>Recharge Bonus</Label>
                      <Input
                          name="Bonus"
                          placeholder="$10.00"
                          autoFocus
                      />
                    </Field>
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