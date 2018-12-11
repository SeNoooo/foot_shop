// 直接更新state的多个方法的对象

import {
    RECEIVE_ADDRESS,
    RECEIVE_Shops,
    RECEIVE_Categorys,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO
} from './mutation-types'
export default {
    [RECEIVE_ADDRESS] (state,{address}){
        state.address=address
    },
    [RECEIVE_Categorys] (state,{categorys}){
        state.categorys=categorys
    },
    [RECEIVE_Shops] (state,{shops}){
        state.shops=shops
    },
    [RECEIVE_USER_INFO] (state,{userInfo}){
        state.userInfo=userInfo
    },
    [RESET_USER_INFO] (state){
        state.userInfo={}
    },
    [RECEIVE_INFO](state, {info}) {
        state.info = info
    },
    [RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
    },
    [RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },
}