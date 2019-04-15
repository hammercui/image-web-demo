/*
 * @Description: 本地测试静态服务器
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2018-11-15 16:01:15
 * @LastEditors: hammercui
 * @LastEditTime: 2018-11-15 18:23:58
 */
const express = require('express');

const app = express();
const proxy = require('http-proxy-middleware');
const path = require('path');
// 使用代理，解决cros问题
const proxyContext = '/api';
const proxyOptions = {
  target: 'http://localhost/imgdemo', // api服务器地址
  pathRewrite: { '^/api': '' }, // 路径重写
  changeOrigin: true, // 改变源
  secure: false, // 接受运行在 https 上的服务
};
app.use(proxyContext, proxy(proxyOptions));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
// console.log('准备启动测试服务器，端口'+localPort);
// export default app;
app.listen(8444, () => {
  console.log('启动服务成功', 'http://192.168.1.211:8444');
});
