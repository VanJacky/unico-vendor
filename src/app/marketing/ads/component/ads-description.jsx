'use client';

import React, {useState} from "react";
import PromotionDialogThree from "@/app/marketing/ads/component/promotion_dialog_three";
import PromotionDialog from "@/app/marketing/ads/component/promotion_dialog";

export default function AdsDescription() {
  const [showPromotionDialog, setShowPromotionDialog] = useState(false); // 控制弹窗显示的状态

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Unico Promotion Display</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Change the description of your Pop App you want show with your customer.</p>
        </div>
        <div className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="email" className="sr-only">
              Description
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=" Enter Description "
            />
          </div>
          <button onClick={() => setShowPromotionDialog(true)}

            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
      <PromotionDialog open={showPromotionDialog} setOpen={setShowPromotionDialog}/>

    </div>
  )
}
