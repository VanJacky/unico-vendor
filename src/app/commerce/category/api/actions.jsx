'use server'

import { page22 as getTypePage, update15, delete13, add13 } from '@/services/shangpinleixing';
import { updateSort } from '@/services/shangpinxinxi';

export async function getCategoryWithTypes() {
    try {
        const response = await getTypePage();
        // 过滤出顶级分类（parentId 为 null 的项目）
        // 使用 filter 方法筛选出顶级分类
        const typeList = (response.data.list || []).filter(item => {
            // 条件：parentId 为 null
            return item.parentId === null;
        });
        // 打印
        // typeList.forEach(item => {
        //     if (item.goodsList !== null) {
        //         console.log('顶级分类商品列表：', item);
        //     }
        // });
        return typeList;
    } catch (error) {
        console.log('获取分类列表时出错:', error);
        throw new Error(error.message || '获取分类列表失败');
    }
}

export async function updateCategory(categoryData) {
    try {
        const response = await update15(categoryData);
        if (response.code !== 1000) {
            throw new Error(response.msg || '更新分类失败');
        }
        return response.data;
    } catch (error) {
        console.log('更新分类时出错:', error);
        throw new Error(error.message || '更新分类失败');
    }
}

export async function deleteCategories(categoryIds) {
    try {
        // 如果传入的是数组，将其转换为逗号分隔的字符串
        const ids = Array.isArray(categoryIds) ? categoryIds.join(',') : categoryIds;
        const response = await delete13({ ids });
        if (response.code !== 1000) {
            throw new Error(response.msg || '删除分类失败');
        }
        return response.data;
    } catch (error) {
        console.log('删除分类时出错:', error);
        throw new Error(error.message || '删除分类失败');
    }
}

export async function addCategory(categoryData) {
    try {
        const response = await add13({
            headers: {
                'Content-Type': 'application/json',
            },
            data: categoryData
        });
        console.log('添加分类响应:', response);

        if (response.code !== 1000) {
            throw new Error(response.message || '新增分类失败');
        }
        return response;
    } catch (error) {
        console.log('新增分类时出错:', error);
        throw new Error(error.message || '新增分类失败');
    }
}

export async function updateProductsSort(productsData) {
    try {
        const response = await updateSort(productsData);
        if (!response.success) {
            throw new Error(response.message || '更新商品排序失败');
        }
        return response;
    } catch (error) {
        console.log('更新商品排序时出错:', error);
        throw new Error(error.message || '更新商品排序失败');
    }
} 