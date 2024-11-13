// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/goods/info/add */
export async function add16(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/info/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/goods/info/delete */
export async function delete16(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/info/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/goods/info/info */
export async function info22(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info22Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/info/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/goods/info/list */
export async function list20(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/info/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/goods/info/page */
export async function page25(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/info/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/goods/info/update */
export async function update18(body: API.GoodsInfoEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/info/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /app/goods/info/info */
export async function info4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info4Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/info/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /app/goods/info/page */
export async function page5(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/info/page`, {
    method: 'POST',
    ...(options || {}),
  });
}
