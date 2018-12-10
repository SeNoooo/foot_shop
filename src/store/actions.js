// 通过mutations间接更新state的多个方法的对象
import {
    RECEIVE_ADDRESS,
    RECEIVE_Shops,
    RECEIVE_Categorys,
    RECEIVE_USER_INFO
} from './mutation-types'
import {
    reqAddress,
    reqFoodCategorys,
    reqShops
} from "../api"
export default {
    // 异步获取地址
    async getAddress({commit,state}){
        // 发送异步ajax请求
        const geohash=state.latitude+','+state.longtitude
        const result=await reqAddress(geohash)
        // 根据结果提交一个mutation
        if(result.code==0){
            const address=result.data
            commit(RECEIVE_ADDRESS,{address})
        }

    },
    // 异步获取食品分类数组
    async getCategorys({commit}){
        // 发送异步ajax请求
        const result=await reqFoodCategorys()
        // 根据结果提交一个mutation
        if(result.code==0){
            const categorys=result.data
            commit(RECEIVE_Categorys,{categorys})
        }

    },
    // 异步获取商家列表
    async getShops({commit,state}){
        // 发送异步ajax请求
        const {longtitude,latitude}=state
        const result=await reqShops(longtitude,latitude)
        // 根据结果提交一个mutation
        if(result.code==0){
            const shops=result.data
            commit(RECEIVE_Shops,{shops})
        }
    },
    // 同步记录用户信息
    recordUser ({commit},userInfo){
        commit(RECEIVE_USER_INFO,{userInfo})
    }
}