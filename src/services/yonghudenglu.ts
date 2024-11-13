// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 图片验证码 GET /app/user/login/captcha */
export async function captcha(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.captchaParams,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/login/captcha`, {
    method: 'GET',
    params: {
      ...params,
      param: undefined,
      ...params['param'],
    },
    ...(options || {}),
  });
}

/** 小程序登录 POST /app/user/login/mini */
export async function mini(body: API.LoginParam, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/login/mini`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 绑定小程序手机号 POST /app/user/login/miniPhone */
export async function miniPhone(body: API.LoginParam, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/login/miniPhone`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 公众号登录 POST /app/user/login/mp */
export async function mp(body: API.LoginParam, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/login/mp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 密码登录 POST /app/user/login/password */
export async function password(body: API.LoginParam, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/login/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 手机号登录 POST /app/user/login/phone */
export async function phone(body: API.LoginParam, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/login/phone`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 刷新token POST /app/user/login/refreshToken */
export async function refreshToken(body: API.RefreshTokenParam, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/login/refreshToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 验证码 POST /app/user/login/smsCode */
export async function smsCode(body: API.SmsCodeParam, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/login/smsCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 一键手机号登录 POST /app/user/login/uniPhone */
export async function uniPhone(body: API.LoginParam, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/login/uniPhone`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 微信APP授权登录 POST /app/user/login/wxApp */
export async function wxApp(body: API.LoginParam, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/user/login/wxApp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
