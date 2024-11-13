// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 商品分类 商品分类 POST /admin/count/home/goodsCategory */
export async function goodsCategory(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/count/home/goodsCategory`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 商品排行 POST /admin/count/home/goodsRank */
export async function goodsRank(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/count/home/goodsRank`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 订单图表 订单图表 POST /admin/count/home/orderChart */
export async function orderChart(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/count/home/orderChart`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 订单概况 订单概况 POST /admin/count/home/orderSummary */
export async function orderSummary(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/count/home/orderSummary`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 用户图表 用户图表 POST /admin/count/home/userChart */
export async function userChart(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/count/home/userChart`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 用户概况 用户概况 POST /admin/count/home/userSummary */
export async function userSummary(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/count/home/userSummary`, {
    method: 'POST',
    ...(options || {}),
  });
}
