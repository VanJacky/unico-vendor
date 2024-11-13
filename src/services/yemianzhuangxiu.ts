// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/fixtures/mould/add */
export async function add18(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/fixtures/mould/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/fixtures/mould/delete */
export async function delete18(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/fixtures/mould/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 保存配置 POST /admin/fixtures/mould/getFixturesPreviewCode */
export async function getFixturesPreviewCode(
  body: API.JSONObject,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/fixtures/mould/getFixturesPreviewCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取平台页面 GET /admin/fixtures/mould/getPlatformPages */
export async function getPlatformPages(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/fixtures/mould/getPlatformPages`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/fixtures/mould/info */
export async function info24(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info24Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/fixtures/mould/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/fixtures/mould/list */
export async function list22(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/fixtures/mould/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/fixtures/mould/page */
export async function page27(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/fixtures/mould/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/fixtures/mould/update */
export async function update20(body: API.FixturesMouldEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/fixtures/mould/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
