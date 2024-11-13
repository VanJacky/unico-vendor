// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/order/goods/add */
export async function add9(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/goods/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/order/goods/delete */
export async function delete9(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/goods/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/order/goods/info */
export async function info15(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info15Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/goods/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/order/goods/list */
export async function list13(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/goods/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/order/goods/page */
export async function page18(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/goods/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/order/goods/update */
export async function update11(body: API.OrderGoodsEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/goods/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
