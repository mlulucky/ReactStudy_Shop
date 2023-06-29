import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // 메인 App 컴포넌트
import Detail from './routes/detail' // 상세 Detail 컴포넌트
import Header from './components/Header'
import Event from './routes/event'
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  // createRoutes,
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from 'react-router-dom';

import data from './data.js';
import { useState, useEffect } from 'react';
import axios from 'axios';


const ajax통신 = (book, book변경, 버튼누른횟수, 로딩중, 로딩중변경) => {
  let url = "";
  switch (버튼누른횟수) {
    case 1:
      url = "https://codingapple1.github.io/shop/data2.json";
      break;
    case 2:
      url = "https://codingapple1.github.io/shop/data3.json";
      break;
  }

  if(버튼누른횟수 >=3) {
    alert("조회되는 상품이 없습니다.");
    // 더보기 버튼 없애기
  }
  
  let 로딩중UI = () => {
    return <div>로딩중입니다.</div>
  }

  if (url) {
    // alert("로딩중입니다.")
    axios.get(url)
      .then((result) => { // result == 서버에서 받아온 데이터
        로딩중변경(false)
        // alert("로딩숨기기");
        const addBook = [...book];
        result.data.map((a, i) => {
          result.data[i].id++; // 통신하여 가져온 데이터의 id 값이 3,4,5 로 기존 id 값과 중복되서, 1씩 늘림
        })

        const moreArr = addBook.concat(result.data); // concat 배열을 합쳐서 새로운 배열을 반환
        book변경(moreArr); // moreArr = [...book, ...result.data] // concat 과 동일한 효과(두 배열을 합친 새로운 배열) // [{},{},{},  {},{},{}] <- ... 문법은 배열의 대괄호를 벗겨준다.
        console.log(moreArr);
      })
      .catch(() => { // ajax 통신 에러일 때
        console.log("통신오류")
      });

  }

}

function Root() {
  let [book, book변경] = useState(data);
  let [버튼누른횟수, 버튼누른횟수변경] = useState(0);
  let [로딩중, 로딩중변경] = useState(true);

  useEffect(()=>{
    ajax통신(book, book변경, 버튼누른횟수, 로딩중, 로딩중변경);
  },[버튼누른횟수]);
  


  const router = createBrowserRouter([

    {
      path: "/",
      element: <App ajax통신={ajax통신} book={book} book변경={book변경} 버튼누른횟수={버튼누른횟수} 버튼누른횟수변경={버튼누른횟수변경} />
    },
    {
      path: "/detail/:id", // :id  URL파라미터 // /detail/아무거나
      element: <Detail book={book} />,
      children: [ // nested router // /detail/member로 접속시 <Detail> & <div>react</div> 을 보여줌
        {
          path: "member", // 경로 "/detail/member" // 부모 경로인 "/detail"과 조합된 상대 경로로 변경 (잘못된예 "/member")
          element: <div>react</div>
        }
      ]
    },
    {
      path: "/event",
      element: <Event />,
      children: [{ // nested router => "react-router-dom" 의 Outlet 컴포넌트와 짝꿍
        path: "one",
        element: <h4>첫 주문시 양배추즙 서비스</h4>
      },
      {
        path: "two",
        element: <h4>생일기념 쿠폰받기</h4>
      }
      ]

    },
    {
      path: "*", // localhost:3000/dsfsfsdf 이상한 경로로 접속했을때 
      element: <h2>Oops! 없는 페이지 404 에러</h2>
    }
  ]
  )

  return (
    // BrowserRouter 컴포넌트로 Header 컴포넌트 감싸주어 Router 컴포넌트 제공 
    // useNavigate를 사용가능 
    <React.StrictMode>
      <BrowserRouter> {/* Router 컴포넌트로 감싸주기 */}
        <Header />
      </BrowserRouter>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Root />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
