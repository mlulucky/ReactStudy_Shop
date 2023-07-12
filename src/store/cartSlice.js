import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
    name: "myFavorite",
    initialState: [
        { id: 10, name: 'White and Black', count: 2 },
        { id: 11, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        // 화면에 출력된 카트 상품의 id 와 createSlice state 상품의 id 가 동일한 경우 버튼 클릭시 상품의 개수 1씩 증가
        // "버튼을 누르면 옆에 있는 상품id와 동일한 상품id 가진걸 state에서 찾은 다음에 그걸 +1" 
        changeCount(state, actions) { // actions 파라미터
            // 방법1
            // state.map((a, i) => {
            //     if (actions.payload === state[i].id) // actions.payload : state변경함수의 파라미터를 불러온다. 
            //         state[i].count++; // { return   } -> 중괄호 return 생략 가능
            // })

            // 방법2
            let index = state.findIndex(item => actions.payload === item.id);
            state[index].count++;
            
        },
        // 주문을 담는 함수 -> 배열에 push (id, name, count 를 불러오기)
        // 두번 클릭했을때는(객체가 있는 경우) count 만 1 증가하도록
        orderProduct(state, actions) {
            // actions.payload 를 이용해 객체(상품)를 생성
            // 현재 이 함수에서 actions.payload 는 내가 주문한 상품 // orderProduct 함수의 객체파라미터 payload -> 객체의 정보가 넘어옴            
            let obj = { id: actions.payload.id, name: actions.payload.title, count: 1 };
           
            // find 는 조건에 맞는 해당 요소를 새롭게 반환. 없으면 undefined 반환
            // checkObj 는 state 배열에서 찾은 객체를 참조. obj 는 새로 생성한 객체를 참조
            let checkObj = state.find(item => item.id === obj.id);
            if(checkObj) {
                // state 배열에 추가된(마지막 인덱스) obj 의 카운트 개수 늘리기
                state[state.length-1].count++; // checkObj.count++;
            } else {
                state.push(obj);
            }

            
            // // ** obj 는 객체라서, 추가할때마다 서로 다른 obj 가된다.
            // if (!state.includes(obj)) { // obj 를 포함하지 않으면
            //     state.push(obj); // obj 를 추가
            // } else {
            //     obj.count += 1;
            // }
        }
    }
})

export let { changeCount, orderProduct } = cart.actions;

export default cart;