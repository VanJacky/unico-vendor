// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/cs/session/add */
export async function add21(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/cs/session/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/cs/session/delete */
export async function delete21(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/cs/session/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/cs/session/info */
export async function info27(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info27Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/cs/session/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/cs/session/list */
export async function list25(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/cs/session/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/cs/session/page */
export async function page30(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/cs/session/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/cs/session/update */
export async function update23(body: API.CsSessionEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/cs/session/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建会话 创建会话 POST /app/cs/session/create */
export async function create1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/cs/session/create`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 会话详情 会话详情 GET /app/cs/session/detail */
export async function detail(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/cs/session/detail`, {
    method: 'GET',
    ...(options || {}),
  });
}
