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
import YdIcon from "@/utils/yd-icon";
import YDIcon from "@/utils/yd-icon";

const navItems = [
    { label: 'Dashboard', key: 'dashboard' , url: '/dashboard',icon: '/icons/dash.svg'},
    { label: 'Marketing', key: 'marketing', url: '/marketing/coupon' ,icon: '/icons/market.svg'},
    { label: 'E-commerce', key: 'commerce', url: '/commerce/orders',icon: '/icons/myshop.svg' },
    { label: 'Booking', key: 'booking', url: '/booking/calender' ,icon: '/icons/book.svg'},
    { label: 'Pop App', key: 'popApp', url: '' ,icon: '/icons/app.svg'},
    { label: 'Financial', key: 'financial', url: '/financial/payment',icon: '/icons/finance.svg' },

]

export function ApplicationLayout({events, children}) {
    let pathname = usePathname()
    const [activeNav, setActiveNav] = useState('dashboard'); // 控制当前激活的 Navbar 项目
    // 当点击 Navbar 项目时切换 `Sidebar` 内容
    const handleNavClick = (key) => {
        if (key === 'popApp') {
            // Open "Pop App" in a new tab
            window.open('https://unico-dnd.vercel.app/#/', '_blank');
        } else {
            setActiveNav(key); // Set active item for other cases
        }
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
        }else if (activeNav === 'marketing') {
            return (
                <>
                    <SidebarItem href="/marketing/coupon">
                        <YDIcon src="/icons/coupon.svg" alt="coupon Icon" />

                        <SidebarLabel>Coupons</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/marketing/paidCoupon">
                        <YDIcon src="/icons/tuangou.svg" alt="tuangou Icon" />
                        <SidebarLabel>Paid Coupons</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/marketing/discount">
                        <YDIcon src="/icons/discount.svg" alt="discount Icon" />

                        <SidebarLabel>Discount</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/marketing/message">
                        <YDIcon src="/icons/messaging.svg" alt="Messaging Icon" />
                        <SidebarLabel>Campaigns</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/marketing/balance">
                        <YDIcon src="/icons/wallet.svg" alt="Wallet Icon" />
                        <SidebarLabel>Wallet Balance</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/marketing/credit">
                        <YDIcon src="/icons/credit.svg" alt="Credit Icon" />

                        <SidebarLabel>Points</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/marketing/ads/edit">
                        <YDIcon src="/icons/unicoads.svg" alt="UNICO Icon" />

                        <SidebarLabel>UNICO Ads</SidebarLabel>
                    </SidebarItem>
                </>
            );
        }else if (activeNav === 'commerce') {
            return (
                <>
                    <SidebarItem href="/commerce/orders">
                        <YDIcon src="/icons/order.svg" alt="orders Icon" />
                        <SidebarLabel>Orders</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/settings/security">
                        <YDIcon src="/icons/category.svg" alt="categorys Icon" />
                        <SidebarLabel>Category</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/commerce/products">
                        <YDIcon src="/icons/product.svg" alt="product Icon" />
                        <SidebarLabel>Product</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/settings/security">
                        <YDIcon src="/icons/stock.svg" alt="stock Icon" />

                        <SidebarLabel>Stock</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/commerce/shop">
                        <YDIcon src="/icons/shop.svg" alt="Store Icon" />
                        <SidebarLabel>Store</SidebarLabel>
                    </SidebarItem>
                </>
            );
        }else if (activeNav === 'booking') {
            return (
                <>
                    <SidebarItem href="/booking/calender">
                        <YDIcon src="/icons/calenders.svg" alt="calenders Icon" />

                        <SidebarLabel>Calender</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/settings/security">
                        <YDIcon src="/icons/category.svg" alt="Service categorys Icon" />

                        <SidebarLabel>Category</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/settings/security">
                        <YDIcon src="/icons/services.svg" alt="Service  Icon" />

                        <SidebarLabel>Service</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/settings/security">
                        <YDIcon src="/icons/shop.svg" alt="Store Icon" />

                        <SidebarLabel>Store</SidebarLabel>
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
                            {navItems.map(({ label, key, url,icon }) => (

                                <NavbarItem
                                    href={url}
                                    key={key}
                                    onClick={() => handleNavClick(key)} // 只切换 `Sidebar`，不跳转
                                    className="whitespace-nowrap overflow-hidden text-ellipsis"
                                    style={{ maxWidth: '200px' }} // 可以根据需要调整最大宽度
                                >
                                    <YDIcon src={icon} alt={key} />

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
                                <SidebarLabel>Unico</SidebarLabel>
                                {/*<ChevronDownIcon />*/}
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
