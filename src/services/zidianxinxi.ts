// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/dict/info/add */
export async function add20(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/info/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获得字典数据 获得字典数据信息 POST /admin/dict/info/data */
export async function data1(body: API.Dict, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/info/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/dict/info/delete */
export async function delete20(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/info/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/dict/info/info */
export async function info26(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info26Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/info/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/dict/info/list */
export async function list24(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/info/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/dict/info/page */
export async function page29(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/info/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/dict/info/update */
export async function update22(body: API.DictInfoEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/dict/info/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获得字典数据 获得字典数据信息 POST /app/dict/info/data */
export async function data(body: API.Dict, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/dict/info/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
