
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
 import SelectProductCategory from "@/app/commerce/products/component/select-product-category";
import {ErrorMessage, Field, Label} from "@/components/fieldset";
import {Select} from "@/components/select";
import CouponRadio from "@/app/marketing/coupon/component/coupon-type-radio";
import CouponType from "@/app/marketing/coupon/component/coupon-type";

export default function EditCoupon() {
    return (
        <form>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Coupon</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be publicly visible. Please ensure that you share accurate details.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Coupon Name
                            </label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/*<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>*/}
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="cupcake"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="sm:col-span-4">
                            <Field>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Valid Period
                                </label>
                                <div className="mt-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                                        <Select name="bt" defaultValue="" className="sm:flex-1">
                                            <option value="" disabled>
                                                Begin time&hellip;
                                            </option>
                                        </Select>
                                        {/*{errors.has('status') && <ErrorMessage>{errors.get('status')}</ErrorMessage>}*/}


                                        {/* "到" Text for Separation */}
                                        <span className="text-center text-sm text-gray-600 my-1  ">To</span>

                                        <Select name="et" defaultValue="" className="sm:flex-1">
                                            <option value="" disabled>
                                                End time&hellip;
                                            </option>
                                        </Select>


                                    </div>
                                </div>

                            </Field>
                        </div>

                        <div className="sm:col-span-4">
                            <CouponType/>
                        </div>

                        {/*<div className="sm:col-span-4">*/}
                        {/*    <CouponRadio/>*/}
                        {/*</div>*/}
                        <div className="mt-6 sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Distribution Method
                            </label>
                            <div className="mt-2">
                                <div>
                                    <Select aria-label="Distribution" name="Distribution" defaultValue="p">
                                        <option value="p">User Self-Collection</option>
                                        <option value="e">Manual Distribution</option>
                                        <option value="b">Automatic Distribution for New Users</option>

                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4">
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
                    Save
                </button>
            </div>
        </form>
    )
}
