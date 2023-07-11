import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
    name: "myFavorite",
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        changeCount(state, actions) { // actions 파라미터
            state.map((a, i)=>{
                if(actions.payload === state[i].id) // actions.payload : state변경함수의 파라미터를 불러온다. 
                    state[i].count++; // { return   } -> 중괄호 return 생략 가능
            })
        },
        // 주문을 담는 함수 -> 배열에 push (id, name, count 를 불러오기)
        // 두번 클릭했을때는(객체가 있는 경우) count 만 1 증가하도록
        orderProduct(state, actions) {
            // if(){  

            // }
            // console.log(actions.payload); // 객체파라미터 payload -> 객체의 정보가 넘어옴
            
            let obj = { id : actions.payload.id, name: actions.payload.title, count: 1 };
            state.push(obj);
            console.log("주문하기", state);
        }
    }
})

export let { changeCount, orderProduct } = cart.actions;

export default cart;