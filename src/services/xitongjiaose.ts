// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/base/sys/role/add */
export async function add23(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/role/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/base/sys/role/delete */
export async function delete23(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/role/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/base/sys/role/info */
export async function info29(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info29Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/role/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/base/sys/role/list */
export async function list26(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/role/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/base/sys/role/page */
export async function page33(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/role/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/base/sys/role/update */
export async function update25(body: API.BaseSysRoleEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/role/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
