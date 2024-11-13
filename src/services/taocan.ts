// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/app/goods/add */
export async function add28(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/goods/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/app/goods/delete */
export async function delete28(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/goods/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/app/goods/info */
export async function info33(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info33Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/goods/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/app/goods/list */
export async function list30(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/goods/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/app/goods/page */
export async function page38(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/goods/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/app/goods/update */
export async function update30(body: API.AppGoodsEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/goods/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /app/app/goods/list */
export async function list6(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/app/goods/list`, {
    method: 'POST',
    ...(options || {}),
  });
}
