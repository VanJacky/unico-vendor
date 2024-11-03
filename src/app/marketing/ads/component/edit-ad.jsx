
'use client';

import AdsDescription from "@/app/marketing/ads/component/ads-description";
import PreivewsOne from "@/app/marketing/ads/component/preivews-one";
import PreivewsTwo from "@/app/marketing/ads/component/preivews-two";
import PreivewsThree from "@/app/marketing/ads/component/preivews-three";

import React, {useState} from "react";
import PromotionDialogOne from "@/app/marketing/ads/component/promotion_dialog_one";
import PromotionDialogTwo from "@/app/marketing/ads/component/promotion_dialog_two";
import PromotionDialogThree from "@/app/marketing/ads/component/promotion_dialog_three";

export default function EditAd() {


    return (
        <main>
            <div>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">UNICO Platform Promotion </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be publicly visible. Please ensure that you share accurate details.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4" >
                                <AdsDescription/>
                            </div>
                            <div className="sm:col-span-4">
                                <PreivewsOne />
                            </div>
                            <div className="sm:col-span-4">
                                <PreivewsTwo />
                            </div>
                            <div className="sm:col-span-4">
                                <PreivewsThree />
                            </div>

                        </div>

                    </div>


                </div>
            </div>
        </main>

    )
}
