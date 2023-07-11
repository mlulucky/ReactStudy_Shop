import { createSlice, configureStore } from "@reduxjs/toolkit";

// Redux 란 ? state 들을 보관해놓는 통

// state 를 만들어주는 함수
let firstState = createSlice({ // useState 와 비슷한 기능
    name: "myName",

    initialState: "moon",
    reducers: {
        // changeName(state) { // state : 기존 state(initialState)
        //     if(state.includes("eunjeong")) {
        //         return state = "moon"
        //     }
        //     return (
        //         'eunjeong ' + state // state 변경
        //     )

        initialState: { name: "moon", age: 20 },
        reducers: {
            changeName(state) {
                state.name = "lucky";
                state.age++;
            }
        }
    }
})

// slice이름.actions 
export let { changeName } = firstState.actions; // 자료형을 변수로 빼는 문법 // state 변경함수를 변수에 저장하기


let secondState = createSlice({
    name: "arr",
    initialState: [0, 1, 2]
})

let cart = createSlice({
    name: "myFavorite",
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        changeCount(state) {
            state.map((a, i)=>{
                return state[i].count++;
            })
        }
    }
})

export let { changeCount } = cart.actions;

// state 를 등록하는 함수
export default configureStore({
    reducer: {
        작명: firstState.reducer,
        작명2: secondState.reducer,
        cart: cart.reducer
    }
})