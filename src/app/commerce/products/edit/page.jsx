import EditProduct from "@/app/commerce/products/component/edit-product";
 
export const metadata = {
    title: 'Edit Product',
}

export default async function EditProductPage({ searchParams }) {
    const categoryId = searchParams?.categoryId;

    return (
        <EditProduct categoryId={categoryId} />
    )
}