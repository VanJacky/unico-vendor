// `OrdersPage` is a server-side component (e.g., in a `page.tsx` file)
import { getOrders } from '@/data'
 import {Heading} from "@/components/heading";
import {Button} from "@/components/button";
import {Input, InputGroup} from "@/components/input";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {Select} from "@/components/select";
 import {Link} from "@/components/link";
import CouponsTable from "@/app/marketing/coupon/component/couponTable";
import BalanceRule from "@/app/marketing/balance/component/balance-rule";
import React from "react";
import CreditType from "@/app/marketing/credit/component/credit-type";

export const metadata = {
  title: 'Credit',
}

export default async function CreditPage() {
  const products = await getOrders()

  return (
      <div className="mx-auto">

          <div className=" flex flex-wrap items-end justify-between gap-4">
              <div className="max-sm:w-full sm:flex-1">
                  <Heading>Member Points</Heading>
                  <div className="mt-6 flex max-w-xl  ">
                      <div className="flex-1">
                          <CreditType/>
                      </div>

                  </div>

                  <div className="mt-20 flex max-w-xl gap-4">
                      <h3 className="text-base font-semibold leading-6 text-gray-900">Points Records</h3>

                  </div>
                  <div className="mt-4 flex max-w-xl gap-4">
                      <div className="flex-1">
                          <InputGroup>
                              <MagnifyingGlassIcon/>
                              <Input name="search" placeholder="Search coupons&hellip;"/>
                          </InputGroup>
                      </div>
                      <div>
                          <Select name="sort_by">
                              <option value="name">Sort by name</option>
                              <option value="date">Sort by date</option>
                              {/*<option value="status">Sort by status</option>*/}
                          </Select>
                      </div>
                  </div>
              </div>
              <Button>
                  <Link href='/marketing/message/edit'>
                      Create New Campaign
                  </Link>
              </Button>
          </div>
          <CouponsTable products={products}/>
      </div>

  )
}