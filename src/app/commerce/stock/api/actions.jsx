'use server'

import { page25 as getProductsPage } from '@/services/shangpinxinxi';
import { update16 as updateSpec } from '@/services/guige';




export async function getProductsStock(status) {
    const params = status !== undefined ? { data: { status } } : {};
    const response = await getProductsPage(params);
    const productList = response.data.list || [];

    // console.log("ceshi",productList[0])

    return productList;
}

export async function updateProductSpec(specData) {
    try {
        const response = await updateSpec({
            id: specData.id,
            stock: specData.stock,
            stockAlert: specData.stockAlert,
            status: specData.status,
            price: specData.price
        });
        if (response.code === 1000) {
            return { success: true };
        }
        return { success: false, message: response.msg };
    } catch (error) {
        return { success: false, message: '更新规格失败' };
    }
}

