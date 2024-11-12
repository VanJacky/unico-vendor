   import {Heading} from "@/components/heading";
import {Button} from "@/components/button";
import {Input, InputGroup} from "@/components/input";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {Select} from "@/components/select";
 import {Link} from "@/components/link";
 import BalanceRule from "@/app/marketing/balance/component/balance-rule";
import React from "react";
import { getStoredValueOrders } from "@/data";
import BalanceTable from "./component/balance-table";

export const metadata = {
  title: 'balance',
}

export default async function BalancePage() {
    const products = await getStoredValueOrders()

  return (
      <div className="mx-auto">

          <div className=" flex flex-wrap items-end justify-between gap-4">
              <div className="max-sm:w-full sm:flex-1">
                  <Heading>Wallet Balance</Heading>
                  <div className="mt-6 flex max-w-xl  ">
                      <div className="flex-1">
                          <BalanceRule/>
                      </div>

                  </div>
                  <div className="mt-6 text-sm leading-6">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                          Add More Rules
                          <span aria-hidden="true"> &rarr;</span>
                      </a>
                  </div>
                  <div className="mt-20 flex max-w-xl gap-4">
                      <h3 className="text-base font-semibold leading-6 text-gray-900">Recharge Records</h3>

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
                  <Link href='/marketing/balance/edit'>
                      Create A Recharge
                  </Link>
              </Button>
          </div>
          <BalanceTable products={products}/>
      </div>

  )
}