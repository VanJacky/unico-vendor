// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 实体信息与路径 系统所有的实体信息与路径，供前端自动生成代码与服务 GET /admin/base/comm/eps */
export async function eps2(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/comm/eps`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出 POST /admin/base/comm/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/comm/logout`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 权限与菜单 GET /admin/base/comm/permmenu */
export async function permmenu(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/comm/permmenu`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 个人信息 GET /admin/base/comm/person */
export async function person1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/comm/person`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改个人信息 POST /admin/base/comm/personUpdate */
export async function personUpdate(body: API.Dict, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/comm/personUpdate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编程 GET /admin/base/comm/program */
export async function program(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/comm/program`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 文件上传 POST /admin/base/comm/upload */
export async function upload1(body: {}, file?: File[], options?: { [key: string]: any }) {
  const formData = new FormData();

  if (file) {
    file.forEach((f) => formData.append('file', f || ''));
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.R>(`${COMMON_BASE_URL}/admin/base/comm/upload`, {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 文件上传模式 GET /admin/base/comm/uploadMode */
export async function uploadMode1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/comm/uploadMode`, {
    method: 'GET',
    ...(options || {}),
  });
}
