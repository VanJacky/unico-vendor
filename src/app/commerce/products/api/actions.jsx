'use server'

import { delete16 as deleteProduct } from '@/services/shangpinxinxi';
import { page25 as getProductsPage } from '@/services/shangpinxinxi';
import { list17 as getTypeList } from '@/services/shangpinleixing';
import { addGoodsWithSpecs } from '@/services/shangpinxinxi';
import { getGoodsDetail } from '@/services/shangpinxinxi';


export async function deleteProducts(productIds) {
    try {
        // 构造正确的请求格式 {ids: [...]}
        const payload = {
            ids: Array.isArray(productIds) ? productIds : [productIds]
        };

        await deleteProduct(payload);
        return await getProductsWithTypes();
    } catch (error) {
        console.log('删除商品时出错:', error);
        throw new Error(error.message || '删除失败');
    }
}

export async function createProduct(formData) {
    try {
        const submitData = {
            id: formData.id || '',
            title: formData.title,
            price: Number(formData.price),
            typeId: Number(formData.typeId),
            subTitle: formData.subTitle,
            content: formData.content,
            status: 1,
            sortNum: formData.sortNum,
            mainPic: formData.pics[0] || '',
            pics: formData.pics,
            specs: formData.specs.map(spec => ({
                name: spec.name,
                price: Number(spec.price),
                stock: Number(spec.stock),
                properties: spec.properties,
                sortNum: 0,
                images: spec.images
            }))
        };
        console.log(submitData); // 打印表单数据

        const result = await addGoodsWithSpecs(submitData);

        return result;
    } catch (error) {
        console.log('保存商品时出错:', error);
        throw new Error(error.message || '保存失败');
    }
}

export async function getProductsWithTypes(status) {
    const params = status !== undefined ? { data: { status } } : {};
    const response = await getProductsPage(params);
    const productList = response.data.list || [];
    // console.log("nihao", response.data);
    // 获取商品类型列表
    const typeResponse = await getTypeList();
    const typeList = typeResponse.data || [];

    // 将商品列表与类型信息关联
    const productsWithType = productList.map(product => {
        const matchingType = typeList.find(type => type.id === product.typeId);
        return {
            ...product,
            typeName: matchingType ? matchingType.name : '未知类型'
        };
    });

    return productsWithType;
}

export async function fetchTypeList() {
    try {
        const response = await getTypeList(); // 调用 getTypeList
        const filteredTypes = response.data.filter(type => type.parentId === null); // 过滤出parentId为null的类型
        // console.log('返回的类型列表:', filteredTypes); // 打印过滤后的类型列表
        return filteredTypes; // 返回过滤后的类型列表
    } catch (error) {
        console.log('获取类型列表时出错:', error);
        throw new Error(error.message || '获取类型列表失败');
    }
}

export async function getProductById(id) {
    try {
        const response = await getGoodsDetail({ goodsId: id });

        return response.data;
    } catch (error) {
        console.log('获取商品详情时出错:', error);
        throw new Error(error.message || '获取商品详情失败');
    }
} 