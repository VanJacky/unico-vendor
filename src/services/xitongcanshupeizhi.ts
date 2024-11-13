// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/base/sys/param/add */
export async function add24(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/param/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/base/sys/param/delete */
export async function delete24(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/param/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据键返回网页的参数值 GET /admin/base/sys/param/html */
export async function html(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.htmlParams,
  options?: { [key: string]: any },
) {
  return request<string>(`${COMMON_BASE_URL}/admin/base/sys/param/html`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/base/sys/param/info */
export async function info30(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info30Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/param/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/base/sys/param/page */
export async function page34(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/param/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/base/sys/param/update */
export async function update26(body: API.BaseSysParamEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/param/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
