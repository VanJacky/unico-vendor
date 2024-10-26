"use client";

import { Heading } from '@/components/heading';
import React, { useState, useEffect } from 'react';
import PayOnline from "@/app/financial/payment/tabs/pay-online";
import PayOffline from "@/app/financial/payment/tabs/pay-offline";

export default function PaymentsChangeTabs({ events }) {
    const [selectedTab, setSelectedTab] = useState('Online');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="pb-5 sm:pb-0">
            <Heading>Payment Options</Heading>
            <div className="mt-3 sm:mt-4">
                <div className="sm:hidden">
                    <label htmlFor="current-tab" className="sr-only">
                        Select a tab
                    </label>
                    <select
                        id="current-tab"
                        name="current-tab"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={selectedTab}
                        onChange={(e) => handleTabChange(e.target.value)}
                    >
                        {['Online', 'Offline'].map((tab) => (
                            <option key={tab} value={tab}>
                                {tab}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav className="-mb-px flex space-x-8 border-b border-gray-200">
                        {['Online', 'Offline'].map((tab) => (
                            <a
                                key={tab}
                                href="#"
                                onClick={() => handleTabChange(tab)}
                                className={classNames(
                                    selectedTab === tab
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                    'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                                )}
                                aria-current={selectedTab === tab ? 'page' : undefined}
                            >
                                {tab}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="mt-6">
                {selectedTab === 'Online' && (
                   <PayOnline/>
                )}

                {selectedTab === 'Offline' && (
                    <PayOffline events={events}/>
                )}
            </div>
        </div>
    );
}