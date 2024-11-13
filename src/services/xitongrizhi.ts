// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 清理日志 POST /admin/base/sys/log/clear */
export async function clear(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/log/clear`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获得日志报错时间 POST /admin/base/sys/log/getKeep */
export async function getKeep(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/log/getKeep`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/base/sys/log/page */
export async function page36(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/log/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 设置日志保存时间 POST /admin/base/sys/log/setKeep */
export async function setKeep(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/base/sys/log/setKeep`, {
    method: 'POST',
    ...(options || {}),
  });
}
