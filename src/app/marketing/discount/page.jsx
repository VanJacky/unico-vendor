 import { getOrders } from '@/data'
 import {Heading} from "@/components/heading";
import {Button} from "@/components/button";
import {Input, InputGroup} from "@/components/input";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {Select} from "@/components/select";
 import {Link} from "@/components/link";
 import PaidCouponsTable from "@/app/marketing/paidCoupon/component/couponTable";

export const metadata = {
  title: 'Edit Discount',
}

export default async function CouponsPage() {
  const products = await getOrders()

  return (
      <div className="mx-auto">

          <div className=" flex flex-wrap items-end justify-between gap-4">
              <div className="max-sm:w-full sm:flex-1">
                  <Heading>Discount Events</Heading>
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
                  <Link href='/marketing/discount/edit'>
                      Create Discount Event
                  </Link>
              </Button>
          </div>
          <PaidCouponsTable products={products}/>
      </div>

  )
}