// `OrdersPage` is a server-side component (e.g., in a `page.tsx` file)
import { getCategory, getOrders } from '@/data'
import { Heading } from "@/components/heading";
import { Button } from "@/components/button";
import { Input, InputGroup } from "@/components/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Select } from "@/components/select";
import { Link } from "@/components/link";
import CategoryTable from "@/app/commerce/category/component/category-table";
import { page22 as getTypePage } from '@/services/shangpinleixing';

export const metadata = {
    title: 'Category',
}

export default async function CategoryPage() {
    const category = await getCategory()

    const response = await getTypePage();

    const typeList = (response.data.list || []).filter(item => item.parentId === null);
    console.log(typeList) // 完整打印对象


    return (
        <div className="mx-auto">

            <div className=" flex flex-wrap items-end justify-between gap-4">
                <div className="max-sm:w-full sm:flex-1">
                    <Heading>Category</Heading>
                    <div className="mt-4 flex max-w-xl gap-4">
                        <div className="flex-1">
                            <InputGroup>
                                <MagnifyingGlassIcon />
                                <Input name="search" placeholder="Search orders&hellip;" />
                            </InputGroup>
                        </div>
                        <div>
                            <Select name="sort_by">
                                <option value="name">Sort by name</option>
                                <option value="date">Sort by date</option>
                                <option value="status">Sort by status</option>
                            </Select>
                        </div>
                    </div>
                </div>
                <Button>
                    <Link href='/commerce/category/edit'>
                        Create Category
                    </Link>
                </Button>
            </div>
            <CategoryTable category={typeList} />
        </div>

    )
}