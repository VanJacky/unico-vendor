// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/info/banner/add */
export async function add12(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/info/banner/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/info/banner/delete */
export async function delete12(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/info/banner/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/info/banner/info */
export async function info18(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info18Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/info/banner/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/info/banner/list */
export async function list16(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/info/banner/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/info/banner/page */
export async function page21(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/info/banner/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/info/banner/update */
export async function update14(body: API.InfoBannerEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/info/banner/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /app/info/banner/list */
export async function list2(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/info/banner/list`, {
    method: 'POST',
    ...(options || {}),
  });
}
