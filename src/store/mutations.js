// 直接更新state的多个方法的对象
import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_Shops,
    RECEIVE_Categorys,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
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
    [INCREMENT_FOOD_COUNT](state,{food}){
        if(!food.count){  //第一次增加
            //food.count=1     //count是food中的新增属性(没有数据绑定)
            Vue.set(food,'count',1)
            // 将food添加到cartFoods中
            state.cartFoods.push(food)
        }else{
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT](state,{food}){
        if(food.count){  //只能有值才去减
            food.count--
            if(food.count==0){
                // 将food从cartFoods中移除
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
        }       
    },
    [CLEAR_CART](state){
        // 清除food中的count
        state.cartFoods.forEach(food=>food.count = 0)
        //移除购物车中所有购物项
        state.cartFoods=[]
    },
}