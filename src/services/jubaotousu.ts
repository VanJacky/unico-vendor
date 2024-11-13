// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/app/complain/add */
export async function add30(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/complain/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/app/complain/delete */
export async function delete30(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/complain/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/app/complain/info */
export async function info35(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info35Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/complain/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/app/complain/list */
export async function list32(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/complain/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/app/complain/page */
export async function page40(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/complain/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/app/complain/update */
export async function update32(body: API.AppComplainEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/complain/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /app/app/complain/info */
export async function info6(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info6Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/app/app/complain/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /app/app/complain/page */
export async function page9(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/app/complain/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 提交投诉举报 提交投诉举报 POST /app/app/complain/submit */
export async function submit2(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/app/complain/submit`, {
    method: 'POST',
    ...(options || {}),
  });
}
