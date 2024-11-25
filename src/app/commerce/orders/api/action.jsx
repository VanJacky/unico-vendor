'use server'

import { list20 as getGoodsList } from '@/services/shangpinxinxi';
import { page10 as getUserPage } from '@/services/yonghuxinxi';
import { uuid } from '@/utils';
import { add9 as createOrder } from '@/services/dingdanxinxi';
import { page17 as getOrderListAPI } from '@/services/dingdanxinxi';


export async function getUserList(options) {
    try {
        const response = await getUserPage(options);
        console.log('用户列表:', response.data.list);
        return {
            list: response.data.list,
            pagination: response.data.pagination
        };
    } catch (error) {
        console.log('获取用户列表时出错:', error);
        throw new Error(error.message || '获取用户列表失败');
    }
}


export async function fetchGoodsList(params = {}) {
    try {
        const defaultParams = {
            data: {
                pageSize: 1000,
                current: 1,
                status: 1,
                keyword: ''
            }
        };

        // 合并默认参数和传入的参数
        const requestParams = {
            ...defaultParams,
            data: {
                ...defaultParams.data,
                ...params
            }
        };

         const response = await getGoodsList(requestParams);
 

        if (response.code === 1000) {
            return response.data;
        } else {
            throw new Error(response.msg || '获取商品列表失败');
        }
    } catch (error) {
        console.log('获取商品列表时出错:', error);
        throw new Error(error.message || '获取商品列表失败');
    }
}

export async function createOrderOnly(orderData) {
    try {
         // 构建订单数据
        const orderParams = {
            userId: orderData.userId,
            orderNum: uuid(), // 使用 uuid 生成订单号
            status: 0,  // 默认待付款
            price: orderData.price,
            title: orderData.productName, // 使用商品名称作为订单标题
            payType: 0, // 默认待支付
            remark: orderData.remark
        };

 

        const response = await createOrder({
            data: orderParams
        });

 
        if (response.code === 1000) {
            return response.data;
        } else {
            throw new Error(response.msg || '创建订单失败');
        }
    } catch (error) {
        console.error('创建订单时出错:', error);
        throw error;
    }
}

export async function getOrderList(params = {}) {
    try {
        const defaultParams = {
            data: {
                pageSize: 10,
                current: 1,
                keyword: ''
            }
        };

        // 合并默认参数和传入的参数
        const requestParams = {
            ...defaultParams,
            data: {
                ...defaultParams.data,
                ...params
            }
        };

        const response = await getOrderListAPI(requestParams);

        if (response.code === 1000) {
            return {
                list: response.data.list,
                pagination: response.data.pagination
            };
        } else {
            throw new Error(response.msg || '获取订单列表失败');
        }
    } catch (error) {
        console.log('获取订单列表时出错:', error);
        throw new Error(error.message || '获取订单列表失败');
    }
} 
