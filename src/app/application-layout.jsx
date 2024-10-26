'use client'

import { Avatar } from '@/components/avatar'
import {
    Dropdown,
    DropdownButton,
    DropdownDivider,
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
} from '@/components/dropdown'
import { Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
    Sidebar,
    SidebarBody, SidebarFooter,
    SidebarHeader, SidebarHeading,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
    SidebarSpacer
} from '@/components/sidebar'
import { StackedLayout } from '@/components/stacked-layout'
import {
     ChevronDownIcon, ChevronUpIcon, Cog6ToothIcon,
    Cog8ToothIcon, HomeIcon,
    LightBulbIcon,
    PlusIcon, QuestionMarkCircleIcon,
    ShieldCheckIcon, SparklesIcon, Square2StackIcon, TicketIcon,
    UserIcon,
} from '@heroicons/react/16/solid'
import {BellAlertIcon , MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import {usePathname} from "next/navigation";
import {useState} from "react";

const navItems = [
    { label: 'Dashboard', key: 'dashboard' , url: '/dashboard'},
    { label: 'Marketing', key: 'settings', url: '/settings/detail' },
    { label: 'E-commerce', key: 'settings', url: '/settings/detail' },
    { label: 'Booking', key: 'settings', url: '/settings/detail' },
    { label: 'Pop App', key: 'settings', url: '/settings/detail' },
    { label: 'Financial', key: 'financial', url: '/financial/payment' },

]

export function ApplicationLayout({events, children}) {
    let pathname = usePathname()
    const [activeNav, setActiveNav] = useState('dashboard'); // 控制当前激活的 Navbar 项目
    // 当点击 Navbar 项目时切换 `Sidebar` 内容
    const handleNavClick = (key) => {
        setActiveNav(key); // 只切换 Sidebar 的内容
    };

    // 根据当前激活的 Navbar 项目渲染不同的 Sidebar 子项
    const renderSidebarContent = () => {
        if (activeNav === 'dashboard') {
            return (
                <>
                    <SidebarItem href="/dashboard/tab1">
                        <SidebarLabel>Dashboard Tab 1</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/dashboard/tab2">
                        <SidebarLabel>Dashboard Tab 2</SidebarLabel>
                    </SidebarItem>
                </>
            );
        } else if (activeNav === 'financial') {
            return (
                <>
                    <SidebarItem href="/financial/payment">
                        <SidebarLabel>Payment</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/financial/settlement">
                        <SidebarLabel>Settlement</SidebarLabel>
                    </SidebarItem>

                    <SidebarItem href="/financial/statement">
                        <SidebarLabel>Statement</SidebarLabel>
                    </SidebarItem>
                </>
            );
        } else if (activeNav === 'settings') {
            return (
                <>
                    <SidebarItem href="/settings/profile">
                        <SidebarLabel>Profile Settings</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/settings/security">
                        <SidebarLabel>Security Settings</SidebarLabel>
                    </SidebarItem>
                </>
            );
        }
    };
    return (
        <StackedLayout
            navbar={{
                navItems:
                    <Navbar>
                    <Dropdown>
                        <DropdownButton as={NavbarItem} className="max-lg:hidden">
                            <Avatar src="/teams/catalyst.svg" />
                            <NavbarLabel>Unico</NavbarLabel>
                            {/*<ChevronDownIcon />*/}
                        </DropdownButton>
                        {/*<TeamDropdownMenu />*/}
                    </Dropdown>
                    <NavbarDivider className="max-lg:hidden" />
                        <NavbarSection>
                            {navItems.map(({ label, key,url }) => (
                                <NavbarItem href={url}
                                    key={key}
                                    onClick={() => handleNavClick(key)} // 只切换 `Sidebar`，不跳转
                                >
                                    {label}
                                </NavbarItem>
                            ))}
                        </NavbarSection>
                 </Navbar>,
                right: (
                    <>
                        <NavbarItem href="/inbox" aria-label="Inbox">
                            <BellAlertIcon />
                        </NavbarItem>
                        <NavbarItem href="/settings" aria-label="Settings">
                            <Cog8ToothIcon />
                        </NavbarItem>
                        <Dropdown>
                            <DropdownButton as={NavbarItem}>
                                <Avatar src="/users/erica.jpg" square />
                            </DropdownButton>
                            <DropdownMenu className="min-w-64" anchor="bottom end">
                                {/*<DropdownItem href="/my-profile">*/}
                                {/*    <UserIcon />*/}
                                {/*    <DropdownLabel>My profile</DropdownLabel>*/}
                                {/*</DropdownItem>*/}
                                {/*<DropdownItem href="/settings">*/}
                                {/*    <Cog8ToothIcon />*/}
                                {/*    <DropdownLabel>Settings</DropdownLabel>*/}
                                {/*</DropdownItem>*/}
                            </DropdownMenu>
                        </Dropdown>
                    </>
                ),
            }}
            sidebar={
                <Sidebar>
                    <SidebarHeader>
                        <Dropdown>
                            <DropdownButton as={SidebarItem}>
                                <Avatar src="/teams/catalyst.svg" />
                                <SidebarLabel>Catalyst</SidebarLabel>
                                <ChevronDownIcon />
                            </DropdownButton>

                        </Dropdown>
                    </SidebarHeader>

                    <SidebarBody>
                        <SidebarSection>
                            {renderSidebarContent()} {/* 根据当前激活的 Navbar 渲染 Sidebar 选项 */}
                        </SidebarSection>

                        <SidebarSpacer />

                        <SidebarSection>
                            <SidebarItem href="#">
                                <SparklesIcon />
                                <SidebarLabel>Upgrade</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="#">
                                <QuestionMarkCircleIcon />
                                <SidebarLabel>Support</SidebarLabel>
                            </SidebarItem>

                        </SidebarSection>
                    </SidebarBody>

                </Sidebar>
            }
        >
            {children}
        </StackedLayout>

    )
}
