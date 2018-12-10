// ajax 请求函数模块
// 返回promise对象（异步返回的数据是：resoponse.data）
// 下载引入axios
import axios from 'axios'

export default function ajax(url = '', data = {}, type = 'GET') {
    // 接收函数的函数---高阶函数
    return new Promise(function (resolve, reject) {
        // 执行ajax异步请求
        let promise
        if (type === 'GET') {
            // 准备 url query 参数数据
            let dataStr = '' //数据拼接字符串
            Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
            url = url + '?' + dataStr
            }
            // 发送 get 请求
            promise = axios.get(url)
        } else {
            // 发送 post 请求
            promise = axios.post(url,data)
        }
        // 成功的回调函数
        promise.then(response => {
            resolve(response.data)
        })
        // 失败的回调函数
        .catch(error => {
            reject(error)
        })
    })
}