// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/goods/searchKeyword/add */
export async function add15(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/searchKeyword/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/goods/searchKeyword/delete */
export async function delete15(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/searchKeyword/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/goods/searchKeyword/info */
export async function info21(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info21Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/searchKeyword/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/goods/searchKeyword/list */
export async function list19(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/searchKeyword/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/goods/searchKeyword/page */
export async function page24(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/searchKeyword/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/goods/searchKeyword/update */
export async function update17(
  body: API.GoodsSearchKeywordEntity,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/searchKeyword/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增 新增信息，对应后端的实体类 POST /app/goods/search/keyword/add */
export async function add1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/search/keyword/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /app/goods/search/keyword/delete */
export async function delete1(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/search/keyword/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /app/goods/search/keyword/info */
export async function info3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info3Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/search/keyword/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /app/goods/search/keyword/list */
export async function list5(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/search/keyword/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /app/goods/search/keyword/page */
export async function page4(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/search/keyword/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /app/goods/search/keyword/update */
export async function update2(
  body: API.GoodsSearchKeywordEntity,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/search/keyword/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
