// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/task/info/add */
export async function add4(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/task/info/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/task/info/delete */
export async function delete4(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/task/info/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/task/info/info */
export async function info9(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info9Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/task/info/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 任务日志 GET /admin/task/info/log */
export async function log(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/task/info/log`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 执行一次 POST /admin/task/info/once */
export async function once(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/task/info/once`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/task/info/page */
export async function page12(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/task/info/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 开始任务 POST /admin/task/info/start */
export async function start(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/task/info/start`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 停止任务 POST /admin/task/info/stop */
export async function stop(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/task/info/stop`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/task/info/update */
export async function update5(body: API.TaskInfoEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/task/info/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
