// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 获取首页 GET /app/fixtures/mould/getHomePage */
export async function getHomePage(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`${COMMON_BASE_URL}/app/fixtures/mould/getHomePage`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取指定页面 GET /app/fixtures/mould/getPage */
export async function getPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageParams,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/app/fixtures/mould/getPage`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
