// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/app/feedback/add */
export async function add29(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/feedback/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/app/feedback/delete */
export async function delete29(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/feedback/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/app/feedback/info */
export async function info34(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info34Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/feedback/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/app/feedback/list */
export async function list31(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/feedback/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/app/feedback/page */
export async function page39(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/feedback/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/app/feedback/update */
export async function update31(body: API.AppFeedbackEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/app/feedback/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /app/app/feedback/info */
export async function info5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info5Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/app/app/feedback/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /app/app/feedback/page */
export async function page8(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/app/feedback/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 提交意见反馈 提交意见反馈 POST /app/app/feedback/submit */
export async function submit1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/app/feedback/submit`, {
    method: 'POST',
    ...(options || {}),
  });
}
