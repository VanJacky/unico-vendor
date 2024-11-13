// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 实体信息与路径 系统所有的实体信息与路径，供前端自动生成代码与服务 GET /app/base/comm/eps */
export async function eps(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/base/comm/eps`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 参数配置 GET /app/base/comm/param */
export async function param(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/base/comm/param`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 文件上传 POST /app/base/comm/upload */
export async function upload(body: {}, file?: File[], options?: { [key: string]: any }) {
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

  return request<API.R>(`${COMMON_BASE_URL}/app/base/comm/upload`, {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 文件上传模式 GET /app/base/comm/uploadMode */
export async function uploadMode(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/base/comm/uploadMode`, {
    method: 'GET',
    ...(options || {}),
  });
}
