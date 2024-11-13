// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/plugin/info/add */
export async function add8(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/plugin/info/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 卸载插件 POST /admin/plugin/info/delete */
export async function delete8(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/plugin/info/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/plugin/info/info */
export async function info13(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info13Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/plugin/info/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 安装插件 POST /admin/plugin/info/install */
export async function install(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.installParams,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/plugin/info/install`, {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/plugin/info/list */
export async function list12(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/plugin/info/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/plugin/info/page */
export async function page16(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/plugin/info/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/plugin/info/update */
export async function update9(body: API.PluginInfoEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/plugin/info/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
