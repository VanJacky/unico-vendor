// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/dict/type/add */
export async function add19(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/type/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/dict/type/delete */
export async function delete19(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/type/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/dict/type/info */
export async function info25(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info25Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/type/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/dict/type/list */
export async function list23(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/type/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/dict/type/page */
export async function page28(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/type/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/dict/type/update */
export async function update21(body: API.DictTypeEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/type/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
