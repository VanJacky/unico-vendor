import { getEvents } from '@/data';
import PaymentsChangeTabs from './payments-change-tabs';

export default async function Payments() {
    const events = await getEvents(); // 服务端获取数据

    return <PaymentsChangeTabs events={events} />;
}