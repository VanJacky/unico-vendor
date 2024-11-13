// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/base/sys/user/add */
export async function add22(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/user/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/base/sys/user/delete */
export async function delete22(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/user/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/base/sys/user/info */
export async function info28(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info28Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/user/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 移动部门 POST /admin/base/sys/user/move */
export async function move(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/user/move`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/base/sys/user/page */
export async function page32(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/user/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/base/sys/user/update */
export async function update24(body: API.BaseSysUserEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
