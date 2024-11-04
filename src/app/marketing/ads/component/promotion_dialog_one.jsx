'use client';
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox';
import { Description, Fieldset, Label, Legend } from '@/components/fieldset';
import { Text } from '@/components/text';

const product = {
  name: "Women's Basic Tee",
  price: '$32',
  rating: 3.9,
  reviewCount: 512,
  href: '#',
  imageSrc: 'https://picsum.photos/400/600',
  imageAlt: "Back of women's Basic Tee in black.",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PromotionDialogOne({ open, setOpen }) {
  const [selectedOptions, setSelectedOptions] = useState({
    noRefunds: false,
    conditionalReturns: false,
    unconditionalReturns: false,
  });

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <span className="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true">
              &#8203;
            </span>
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                        type="button"
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                        onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img src={product.imageSrc} alt={product.imageAlt} className="object-cover object-center" />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        {/*<h2 className="text-xl font-medium text-gray-900 sm:pr-12">{product.name}</h2>*/}
                        <section aria-labelledby="options-heading" className="mt-8">

                          <Fieldset>
                            <Legend>On Home Page Options</Legend>
                            <Text>Select applicable  options:</Text>
                            <CheckboxGroup>
                              <CheckboxField>
                                <Checkbox
                                    name="refund-policy"
                                    value="noRefunds"
                                    checked={selectedOptions.noRefunds}
                                    onChange={() => handleCheckboxChange('noRefunds')}
                                />
                                <Label>Member’s Coupon Information</Label>
                                <Description>Pending Use / Pending Coupon Collection / Paid Coupon Reminder</Description>
                              </CheckboxField>

                            </CheckboxGroup>
                          </Fieldset>

                          <div className="mt-4 col-span-full">
                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                              Promotion Image
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                              <PhotoIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                              <button
                                  type="button"
                                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                Change
                              </button>
                            </div>
                          </div>
                          <button
                              type="submit"
                              className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Save Changes
                          </button>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  );
}