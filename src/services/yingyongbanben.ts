// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/app/version/add */
export async function add27(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/version/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/app/version/delete */
export async function delete27(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/version/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/app/version/info */
export async function info32(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info32Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/version/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/app/version/list */
export async function list29(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/version/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/app/version/page */
export async function page37(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/version/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/app/version/update */
export async function update29(body: API.AppVersionEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/version/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 检查版本 检查版本 GET /app/app/version/check */
export async function check(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/app/version/check`, {
    method: 'GET',
    ...(options || {}),
  });
}
