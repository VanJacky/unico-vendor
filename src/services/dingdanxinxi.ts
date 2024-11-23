// @ts-ignore
/* eslint-disable */
import request from '@/utils/require';
import { COMMON_BASE_URL } from '../../constant/constant';




/** 新增 新增信息，对应后端的实体类 POST /admin/order/info/add */
export async function add9(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/info/add`, {
    method: 'POST',
    ...(options || {}),
  });
}


/** 发货 POST /admin/order/info/deliver */
export async function deliver(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/info/deliver`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /admin/order/info/info */
export async function info14(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info14Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/info/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 物流信息 GET /admin/order/info/logistics */
export async function logistics1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/info/logistics`, {
    method: 'GET',
    ...(options || {}),
  });
}

// /** 分页查询订单和用户信息 分页查询订单并关联用户信息 POST /admin/order/info/pageWithUser */
// export async function pageWithUser(options?: { [key: string]: any }) {
//   return request<API.R>(`${COMMON_BASE_URL}/admin/order/info/getList`, {
//     method: 'POST',
//     ...(options || {}),
//   });
// }



/** 分页 分页查询多个信息 POST /admin/order/info/page */
export async function page17(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/info/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 退款处理 GET /admin/order/info/refundHandle */
export async function refundHandle(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/info/refundHandle`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /admin/order/info/update */
export async function update10(body: API.OrderInfoEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/admin/order/info/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 取消订单 取消订单 POST /app/order/info/cancel */
export async function cancel(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/info/cancel`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 确认收货 确认收货 GET /app/order/info/confirm */
export async function confirm(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/info/confirm`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 创建订单 创建订单 POST /app/order/info/create */
export async function create(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/info/create`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 信息 根据ID查询单个信息 GET /app/order/info/info */
export async function info1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.info1Params,
  options?: { [key: string]: any },
) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/info/info`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 物流信息 物流信息 GET /app/order/info/logistics */
export async function logistics(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/info/logistics`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页 分页查询多个信息 POST /app/order/info/page */
export async function page1(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/info/page`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 退款 退款 POST /app/order/info/refund */
export async function refund(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/info/refund`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改 根据ID修改 POST /app/order/info/update */
export async function update1(body: API.OrderInfoEntity, options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/info/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户订单统计 用户订单统计 GET /app/order/info/userCount */
export async function userCount(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/info/userCount`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 微信APP支付 POST /app/order/pay/wxAppPay */
export async function wxAppPay(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/pay/wxAppPay`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 微信小程序支付 POST /app/order/pay/wxMiniPay */
export async function wxMiniPay(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/pay/wxMiniPay`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 微信小程序支付 POST /app/order/pay/wxMpPay */
export async function wxMpPay(options?: { [key: string]: any }) {
  return request<API.R>(`${COMMON_BASE_URL}/app/order/pay/wxMpPay`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 支付回调通知处理 POST /app/order/pay/wxNotify */
export async function wxNotify(body: string, options?: { [key: string]: any }) {
  return request<string>(`${COMMON_BASE_URL}/app/order/pay/wxNotify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
