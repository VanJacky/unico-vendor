// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/space/info/add */
export async function add6(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/info/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/space/info/delete */
export async function delete6(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/info/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/space/info/info */
export async function info11(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info11Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/info/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/space/info/list */
export async function list10(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/info/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/space/info/page */
export async function page14(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/info/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/space/info/update */
export async function update7(body: API.SpaceInfoEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/info/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增 新增信息，对应后端的实体类 POST /admin/space/type/add */
export async function add5(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/type/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/space/type/delete */
export async function delete5(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/type/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/space/type/info */
export async function info10(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info10Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/type/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/space/type/list */
export async function list9(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/type/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/space/type/page */
export async function page13(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/type/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/space/type/update */
export async function update6(body: API.SpaceTypeEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/space/type/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
