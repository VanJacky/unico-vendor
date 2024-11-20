'use server'

import { page10 as getUserPage } from '@/services/yonghuxinxi';

export async function getUserList(options) {
    try {
        const response = await getUserPage(options);
        // console.log('用户列表:', response.data.list);
        return {
            list: response.data.list,
            pagination: response.data.pagination
        };
    } catch (error) {
        console.log('获取用户列表时出错:', error);
        throw new Error(error.message || '获取用户列表失败');
    }
} 