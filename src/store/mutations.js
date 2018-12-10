// 直接更新state的多个方法的对象

import {
    RECEIVE_ADDRESS,
    RECEIVE_Shops,
    RECEIVE_Categorys
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
    }
}