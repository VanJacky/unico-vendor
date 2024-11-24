import { ProductsTable } from './component/product-table';

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