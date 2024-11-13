// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/user/address/add */
export async function add3(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/address/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/user/address/delete */
export async function delete3(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/address/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/user/address/info */
export async function info8(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info8Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/address/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/user/address/list */
export async function list8(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/address/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/user/address/page */
export async function page11(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/address/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/user/address/update */
export async function update4(body: API.UserAddressEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/address/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增 新增信息，对应后端的实体类 POST /app/user/address/add */
export async function add(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/address/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 默认地址 默认地址 GET /app/user/address/default */
export async function getDefault(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/address/default`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /app/user/address/delete */
export async function deleteUsingPost(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/address/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /app/user/address/info */
export async function info(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.infoParams,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/address/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /app/user/address/list */
export async function list(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/address/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /app/user/address/page */
export async function page(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/address/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /app/user/address/update */
export async function update(body: API.UserAddressEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/address/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
