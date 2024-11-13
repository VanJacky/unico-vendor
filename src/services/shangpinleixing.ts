// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/goods/type/add */
export async function add13(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/type/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/goods/type/delete */
export async function delete13(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/type/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/goods/type/info */
export async function info19(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info19Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/type/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/goods/type/list */
export async function list17(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/type/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/goods/type/page */
export async function page22(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/type/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/goods/type/update */
export async function update15(body: API.GoodsTypeEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/type/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /app/goods/type/list */
export async function list3(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/type/list`, {
    method: 'POST',
    ...(options || {}),
  });
}
