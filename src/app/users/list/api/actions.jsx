'use server'

import { page10 as getUserPage, add2 } from '@/services/yonghuxinxi';

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

export async function addUser(userData) {
    try {
        const response = await add2({ data: userData });
        // console.log(response)
        if (response.code !== 1000) {
            throw new Error(response.message || '新增用户失败');
        }
        return response.data;
    } catch (error) {
        console.log('新增用户时出错:', error);
        throw new Error(error.message || '新增用户失败');
    }
} 