// `OrdersPage` is a server-side component (e.g., in a `page.tsx` file)
import { getOrders } from '@/data'
import OrdersTable from "@/app/commerce/orders/component/order-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/button";
import { Input, InputGroup } from "@/components/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Select } from "@/components/select";
import ProductsTable from "@/app/commerce/products/component/productTable";
import { Link } from "@/components/link";
import { page25 as getProductsPage } from '@/services/shangpinxinxi';
import { list17 as getTypeList } from '@/services/shangpinleixing';

export const metadata = {
    title: 'Product',
}

export default async function ProductsPage() {
     

    const response = await getProductsPage();
    // console.log('API响应:', JSON.stringify(response, null, 2)) // 完整打印对象

    const productList = response.data.list || [];
    // console.log('商品列表数据:', productList);

    // 获取商品类型列表
    const typeResponse = await getTypeList();
    // console.log('API响应:', JSON.stringify(typeResponse, null, 2)) // 完整打印对象

    const typeList = typeResponse.data || [];
    // console.log('商品类型列表:', typeList);
    // 将商品列表与类型信息关联
    const productsWithType = productList.map(product => {
        const matchingType = typeList.find(type => type.id === product.typeId);
        return {
            ...product,
            typeName: matchingType ? matchingType.name : '未知类型'
        };
    });

    // console.log('带类型名称的商品列表:', productsWithType);

    return (
        <div className="mx-auto">

            <div className=" flex flex-wrap items-end justify-between gap-4">
                <div className="max-sm:w-full sm:flex-1">
                    <Heading>Products</Heading>
                    <div className="mt-4 flex max-w-xl gap-4">
                        <div className="flex-1">
                            <InputGroup>
                                <MagnifyingGlassIcon />
                                <Input name="search" placeholder="Search products&hellip;" />
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
                        Create Product
                    </Link>
                </Button>
            </div>
            <ProductsTable products={productsWithType} />
        </div>

    )
}