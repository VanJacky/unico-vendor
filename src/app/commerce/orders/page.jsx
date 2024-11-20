// `OrdersPage` is a server-side component (e.g., in a `page.tsx` file)
import { getOrders } from '@/data'
import OrdersTable from "@/app/commerce/orders/component/order-table";
import {Heading} from "@/components/heading";
import {Button} from "@/components/button";
import {Input, InputGroup} from "@/components/input";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {Select} from "@/components/select";

export const metadata = {
  title: 'Orders',
}

export default async function OrdersPage() {
  const orders = await getOrders()

  return (
    <div className="mx-auto">
      <OrdersTable orders={orders}/>
    </div>
  )
}