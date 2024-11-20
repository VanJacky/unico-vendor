'use server'

import { page22 as getTypePage } from '@/services/shangpinleixing';

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
        console.log('顶级分类列表：', typeList);
        return typeList;
    } catch (error) {
        console.log('获取分类列表时出错:', error);
        throw new Error(error.message || '获取分类列表失败');
    }
} 