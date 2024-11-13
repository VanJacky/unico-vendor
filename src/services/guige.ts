// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/goods/spec/add */
export async function add14(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/spec/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/goods/spec/delete */
export async function delete14(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/spec/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/goods/spec/info */
export async function info20(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info20Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/spec/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/goods/spec/list */
export async function list18(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/spec/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/goods/spec/page */
export async function page23(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/spec/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/goods/spec/update */
export async function update16(body: API.GoodsSpecEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/spec/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /app/goods/spec/list */
export async function list4(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/spec/list`, {
    method: 'POST',
    ...(options || {}),
  });
}
