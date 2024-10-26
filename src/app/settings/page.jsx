


import SettingChangeTabs from "@/app/settings/setting-change-tabs";



export const metadata = {
    title: 'Settings',
}

export default function Settings() {
    return (
        <form method="post" className="mx-auto max-w-8xl">
            {/*<Heading>Settings</Heading>*/}
            <SettingChangeTabs/>
        </form>
    )
}
