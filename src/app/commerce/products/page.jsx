// `OrdersPage` is a server-side component (e.g., in a `page.tsx` file)
import { getOrders } from '@/data'
import OrdersTable from "@/app/commerce/orders/component/orderTable";
import {Heading} from "@/components/heading";
import {Button} from "@/components/button";
import {Input, InputGroup} from "@/components/input";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";
import {Select} from "@/components/select";
import ProductsTable from "@/app/commerce/products/component/productTable";
import {Link} from "@/components/link";

export const metadata = {
  title: 'Product',
}

export default async function ProductsPage() {
  const products = await getOrders()

  return (
      <div className="mx-auto">

          <div className=" flex flex-wrap items-end justify-between gap-4">
              <div className="max-sm:w-full sm:flex-1">
                  <Heading>Products</Heading>
                  <div className="mt-4 flex max-w-xl gap-4">
                      <div className="flex-1">
                          <InputGroup>
                              <MagnifyingGlassIcon/>
                              <Input name="search" placeholder="Search products&hellip;"/>
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
                  <Link href='/commerce/products/edit'>
                      Create product
                  </Link>
              </Button>
          </div>
          <ProductsTable products={products}/>
      </div>

  )
}