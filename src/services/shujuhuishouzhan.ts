// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/recycle/data/add */
export async function add7(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/recycle/data/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/recycle/data/delete */
export async function delete7(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/recycle/data/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/recycle/data/info */
export async function info12(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info12Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/recycle/data/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/recycle/data/list */
export async function list11(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/recycle/data/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/recycle/data/page */
export async function page15(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/recycle/data/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 恢复数据 恢复数据 POST /admin/recycle/data/restore */
export async function restore(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/recycle/data/restore`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/recycle/data/update */
export async function update8(body: API.RecycleDataEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/recycle/data/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
