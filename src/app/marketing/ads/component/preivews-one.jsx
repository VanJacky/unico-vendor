'use client';


import React, {useState} from "react";
import PromotionDialogOne from "@/app/marketing/ads/component/promotion_dialog_one";

export default function PreivewsOne() {
  const [showPromotionDialog1, setShowPromotionDialog1] = useState(false); // 控制弹窗显示的状态

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">On Home Page</h3>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          <div className="max-w-xl text-sm text-gray-500">
            <p>
              Design and display settings for the membership card on Home page in the Unico app.
            </p>
          </div>
          <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
            <button onClick={() => setShowPromotionDialog1(true)}
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <PromotionDialogOne open={showPromotionDialog1} setOpen={setShowPromotionDialog1}/>

    </div>
  )
}
