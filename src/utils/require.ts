import axios from 'axios';

// 创建axios实例
const request = axios.create({
  baseURL: 'https://mini.ak-team.cn/mall',
  timeout: 60000, // 60秒超时
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加请求头等配置
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE4MDAxNzMxNDgzODk2LCJjcmVhdGVkIjoxNzMxNDgzODk3LCJ1c2VyVHlwZSI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbiIsInVzZXJJZCI6MSwicGFzc3dvcmRWZXJzaW9uIjo3LCJpc1JlZnJlc2giOmZhbHNlfQ.ldswcdVauWK6HL9IS75LBrglr_4CdJ1hSlTcWLawKOg'
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 如果响应成功且状态码为200，直接返回数据
    if (response && response.status === 200) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // 处理错误响应
    const errorMessage = error.response?.data?.message || '服务器繁忙，请稍后再试';
    console.error(errorMessage); // 这里可以替换成你想使用的提示组件
    return Promise.reject(error);
  }
);

export default request; 