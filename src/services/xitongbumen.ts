// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/base/sys/department/add */
export async function add26(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/department/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/base/sys/department/delete */
export async function delete26(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/department/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/base/sys/department/list */
export async function list28(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/department/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 排序 POST /admin/base/sys/department/order */
export async function order(body: API.BaseSysDepartmentEntity[], options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/department/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/base/sys/department/update */
export async function update28(
  body: API.BaseSysDepartmentEntity,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/department/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
