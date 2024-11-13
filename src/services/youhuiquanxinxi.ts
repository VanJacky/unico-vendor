// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/market/coupon/info/add */
export async function add11(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/info/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/market/coupon/info/delete */
export async function delete11(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/info/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/market/coupon/info/info */
export async function info17(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info17Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/info/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/market/coupon/info/list */
export async function list15(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/info/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/market/coupon/info/page */
export async function page20(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/info/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/market/coupon/info/update */
export async function update13(body: API.MarketCouponInfoEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/info/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /app/market/coupon/info/page */
export async function page3(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/market/coupon/info/page`, {
    method: 'POST',
    ...(options || {}),
  });
}
