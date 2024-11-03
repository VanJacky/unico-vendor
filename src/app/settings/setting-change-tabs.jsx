"use client";

import React, {useState, useEffect} from 'react';
import {PhotoIcon} from "@heroicons/react/24/solid";
import {UserCircleIcon} from "@heroicons/react/20/solid";
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import AccountSettings from "@/app/settings/tabs/account-setting";
import SecuritySettings from "@/app/settings/tabs/security-setting";
import PlanSetting from "@/app/settings/tabs/plan-setting";
import ReportSetting from "@/app/settings/tabs/report-setting";
const secondaryNavigation = [
    {name: 'Account', href: '#', current: true, id: 'account'},
    {name: 'Security', href: '#', current: false, id: 'security'},
    {name: 'Plans', href: '#', current: false, id: 'plans'},
    {name: 'Report', href: '#', current: false, id: 'report'},
]

export default function SettingChangeTabs({events}) {

    const [selectedTab, setSelectedTab] = useState('account');

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <main>
            <h1 className="sr-only">Account Settings</h1>

            <header className="border-b border-gray-900/10">
                {/* Secondary navigation */}
                <nav className="flex overflow-x-auto py-4">
                    <ul
                        role="list"
                        className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                    >
                        {secondaryNavigation.map((item) => (
                            <li key={item.name} onClick={() => handleTabChange(item.id)}>
                                <a href={item.href} className={classNames(
                                    selectedTab === item.id ? 'text-indigo-600' : 'text-gray-600',
                                    'px-4 py-2 hover:text-indigo-400'
                                )}>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>


            {selectedTab === 'account' && (
                <AccountSettings/>
            )}

            {selectedTab === 'security' && (
                <SecuritySettings/>
            )}

            {selectedTab === 'plans' && (
                <PlanSetting/>
            )}
            {selectedTab === 'report' && (
                <ReportSetting/>
            )}

        </main>
    );
}