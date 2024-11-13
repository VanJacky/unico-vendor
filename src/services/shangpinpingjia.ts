// @ts-ignore
/* eslint-disable */
 
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';

/** 新增 新增信息，对应后端的实体类 POST /admin/goods/comment/add */
export async function add17(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/comment/add`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除 支持批量删除 请求参数 ids 数组 或者按","隔开 POST /admin/goods/comment/delete */
export async function delete17(body: Record<string, any>, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/comment/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/goods/comment/info */
export async function info23(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info23Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/comment/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询 查询多个信息 POST /admin/goods/comment/list */
export async function list21(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/comment/list`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /admin/goods/comment/page */
export async function page26(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/comment/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/goods/comment/update */
export async function update19(body: API.GoodsCommentEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/goods/comment/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /app/goods/comment/page */
export async function page6(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/comment/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 提交评论 提交评论 POST /app/goods/comment/submit */
export async function submit(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/goods/comment/submit`, {
    method: 'POST',
    ...(options || {}),
  });
}
