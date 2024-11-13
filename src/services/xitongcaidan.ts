// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/base/sys/menu/add */
export async function add25(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/menu/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 创建代码 创建代码 POST /admin/base/sys/menu/create */
export async function create2(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/menu/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/base/sys/menu/delete */
export async function delete25(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/menu/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出 导出 POST /admin/base/sys/menu/export */
export async function exportUsingPost(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/menu/export`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导入 导入 POST /admin/base/sys/menu/import */
export async function importMenu(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/menu/import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/base/sys/menu/info */
export async function info31(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info31Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/menu/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/base/sys/menu/list */
export async function list27(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/menu/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/base/sys/menu/page */
export async function page35(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/menu/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/base/sys/menu/update */
export async function update27(body: API.BaseSysMenuEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/menu/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
