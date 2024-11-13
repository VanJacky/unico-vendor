// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 验证码 GET /admin/base/open/captcha */
export async function captcha1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.captcha1Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/open/captcha`, {
    method: 'GET',
    params: {
      // type has a default value: base64
      type: 'base64',
      // width has a default value: 150
      width: '150',
      // height has a default value: 50
      height: '50',
      ...params,
    },
    ...(options || {}),
  });
}

/** 实体信息与路径 系统所有的实体信息与路径，供前端自动生成代码与服务 GET /admin/base/open/eps */
export async function eps1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/open/eps`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获得网页内容的参数值 GET /admin/base/open/html */
export async function html1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/open/html`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录 POST /admin/base/open/login */
export async function login(body: API.BaseSysLoginDto, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/open/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 刷新token GET /admin/base/open/refreshToken */
export async function refreshToken1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.refreshToken1Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/open/refreshToken`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
