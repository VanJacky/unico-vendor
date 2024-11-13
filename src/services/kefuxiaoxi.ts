// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 分页 分页查询多个信息 POST /admin/cs/msg/page */
export async function page31(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/cs/msg/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 未读消息数 标记已读 POST /admin/cs/msg/read */
export async function read1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/cs/msg/read`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 未读消息数 未读消息数 GET /admin/cs/msg/unreadCount */
export async function unreadCount1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/cs/msg/unreadCount`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /app/cs/msg/page */
export async function page7(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/cs/msg/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 未读消息数 标记已读 POST /app/cs/msg/read */
export async function read(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/cs/msg/read`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 未读消息数 未读消息数 GET /app/cs/msg/unreadCount */
export async function unreadCount(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/cs/msg/unreadCount`, {
    method: 'GET',
    ...(options || {}),
  });
}
