import { ProductsTable } from '../products/component/productTable';

export const metadata = {
    title: 'Product',
};

export default function ProductsPage() {
    return (
        <div className="mx-auto">
            <ProductsTable />
        </div>
    );
}