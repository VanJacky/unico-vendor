// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/market/coupon/user/add */
export async function add10(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/user/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/market/coupon/user/delete */
export async function delete10(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/user/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/market/coupon/user/info */
export async function info16(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info16Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/user/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/market/coupon/user/list */
export async function list14(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/user/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/market/coupon/user/page */
export async function page19(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/user/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/market/coupon/user/update */
export async function update12(body: API.MarketCouponUserEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/market/coupon/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /app/market/coupon/user/info */
export async function info2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info2Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/app/market/coupon/user/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /app/market/coupon/user/list */
export async function list1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/market/coupon/user/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /app/market/coupon/user/page */
export async function page2(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/market/coupon/user/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** '领取优惠券' POST /app/market/coupon/user/receive */
export async function receive(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/market/coupon/user/receive`, {
    method: 'POST',
    ...(options || {}),
  });
}
