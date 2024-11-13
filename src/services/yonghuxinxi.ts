// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/user/info/add */
export async function add2(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/info/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/user/info/delete */
export async function delete2(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/info/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/user/info/info */
export async function info7(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info7Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/info/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/user/info/list */
export async function list7(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/info/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/user/info/page */
export async function page10(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/info/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/user/info/update */
export async function update3(body: API.UserInfoEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/user/info/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 绑定手机号 POST /app/user/info/bindPhone */
export async function bindPhone(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/info/bindPhone`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 注销 POST /app/user/info/logoff */
export async function logoff(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/info/logoff`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 绑定小程序手机号 POST /app/user/info/miniPhone */
export async function miniPhone1(body: API.LoginParam, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/info/miniPhone`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户个人信息 获得App、小程序或者其他应用的用户个人信息 GET /app/user/info/person */
export async function person(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/info/person`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新用户密码 POST /app/user/info/updatePassword */
export async function updatePassword(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/info/updatePassword`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 更新用户信息 POST /app/user/info/updatePerson */
export async function updatePerson(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/info/updatePerson`, {
    method: 'POST',
    ...(options || {}),
  });
}
