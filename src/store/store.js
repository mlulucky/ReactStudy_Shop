import { createSlice, configureStore } from "@reduxjs/toolkit";
import cart from './cartSlice'; // createSlice 파일로 분리해서 import 로 불러오기

// Redux 란 ? state 들을 보관해놓는 통

// state 를 만들어주는 함수
let firstState = createSlice({ // useState 와 비슷한 기능
    name: "myName",
    initialState: { name: "moon", age: 20 },
    reducers: {
        // state 변경해주는 함수
        changeName(state, actions) { // state == 기존 state
            state.name = "lucky";
            state.age++;
            // state.age += actions.payload;
        }
    }

})

// slice이름.actions == state 변경함수
export let { changeName } = firstState.actions; // 자료형을 변수로 빼는 문법 // state 변경함수를 변수에 저장하기


let secondState = createSlice({
    name: "arr",
    initialState: [0, 1, 2]
})



// state 를 등록하는 함수
export default configureStore({
    reducer: {
        작명: firstState.reducer,
        작명2: secondState.reducer,
        cart: cart.reducer
    }
})