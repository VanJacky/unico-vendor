'use client';

import { useState } from "react";
import { Radio, RadioField, RadioGroup } from "@/components/radio";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/dialog";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Field, Fieldset, Label, Legend } from "@/components/fieldset";
import CouponRadio from "@/app/marketing/coupon/component/coupon-type-radio";

export default function CouponType() {
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
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Coupon Type</h3>

          {/* RadioGroup with two RadioFields */}
          <RadioGroup value={selected} onChange={setSelected}>

            {/* Discount Coupon Radio */}
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:ml-4 sm:mt-0">
                    <RadioField>
                      <Radio value="discount" />
                      <Legend>Discount Coupon</Legend>
                    </RadioField>
                    <div className="sm:ml-8 mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                      <div>$20 Off on Orders Over $10</div>
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
                      <Legend>Redemption Coupon</Legend>
                    </RadioField>
                    <div className="sm:ml-8 mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                      <div>10% Off on Orders Over $20 (Up to $10 Discount)</div>
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
              {selectedEdit === "discount" ? "Edit Discount Coupon" : "Edit Redemption Coupon"}
            </DialogTitle>
            <DialogDescription>
              {selectedEdit === "discount" ? (
                  "Update the discount amount and conditions for the Discount Coupon."
              ) : (
                  "Set the minimum spend amount for the Redemption Coupon."
              )}
            </DialogDescription>
            <DialogBody>
              {selectedEdit === "discount" ? (
                  <div>
                    <Field>
                      <Label>Minimum Spend</Label>
                      <Input
                          name="minimumSpend"
                          placeholder="$10.00"
                          autoFocus
                      />
                    </Field>
                    <Fieldset>
                      <RadioGroup name="discountType" value={discountType} onChange={setDiscountType}>
                        <RadioField>
                          <Radio value="discount" />
                          <Label>Discount Amount</Label>
                        </RadioField>
                        <Input
                            name="discountAmount"
                            placeholder="$20.00"
                            autoFocus
                        />
                        <RadioField>
                          <Radio value="Percentage" />
                          <Label>Percentage Discount</Label>
                        </RadioField>
                        <Input
                            name="percentageOff"
                            placeholder="10%"
                            autoFocus
                        />
                      </RadioGroup>

                      {/* Conditionally render Maximum Discount input if Percentage is selected */}
                      {discountType === "Percentage" && (
                          <Field className="mt-5">
                            <Label>Maximum Discount</Label>
                            <Input
                                name="maxDiscount"
                                placeholder="$10.00"
                                autoFocus
                            />
                          </Field>
                      )}
                    </Fieldset>
                  </div>
              ) : (
                  /* Redemption Coupon: Only Minimum Spend Field */
                  <Field>
                    <Label>Minimum Spend</Label>
                    <Input
                        name="minimumSpend"
                        placeholder="$10.00"
                        autoFocus
                    />
                  </Field>
              )}

              <Field className={"mt-5"}>
                <CouponRadio selectedCouponType={selectedEdit}/>
              </Field>

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