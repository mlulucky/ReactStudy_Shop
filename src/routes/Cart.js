import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { changeName} from '../store';
import { changeCount } from '../store/cartSlice';

export default function Cart() {
  // Redux 에 있는 state 를 가져오는 함수
  let commonState = useSelector((state) => { return state });
  console.log(commonState);
  console.log("작명2", commonState.작명2);
  let dispatch = useDispatch(); // useDispatch() : 리덕스 store.js 로 요청을 보내주는 함수

  return (

    <div className='cont text-center'>
      <div className='d-flex justify-content-between m-2'>
        <h2>{commonState.작명.name}{commonState.작명.age}</h2>
        <button onClick={()=>{ dispatch(changeName()) }}>이름변경</button>
        {/* <button onClick={()=>{ dispatch(changeName(100)) }}>이름변경</button> */}
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>상품 id</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            commonState.cart.map((a, i) =>
              // { return   }  -> 중괄호 return 생략 가능
              <Content key={i} 카트={commonState} 인덱스={i}/>

            )
          }
        </tbody>
      </Table>
    </div>

  )
}

function Content({ 카트, 인덱스}) {
  let dispatch = useDispatch(); // useDispatch() : 리덕스 store.js 로 요청을 보내주는 함수

  return (
    <tr>
      <td>{카트.cart[인덱스].id}</td>
      <td>{카트.cart[인덱스].name}</td>
      <td>{카트.cart[인덱스].count}</td>
      <td><button onClick={()=>{ dispatch(changeCount(카트.cart[인덱스].id)) }}>버튼 + </button></td> 
    </tr>
  )
  // dispatch(state변경함수()) 
}