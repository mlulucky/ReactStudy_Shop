import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // 메인 App 컴포넌트
import Detail from './routes/Detail' // 상세 Detail 컴포넌트
import Header from './components/Header'
import Event from './routes/Event'
import Cart from './routes/Cart'
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import data from './data.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Provider} from 'react-redux';
import store from './store/store.js'


function Root() {
  let [book, book변경] = useState(data);
  let [버튼누른횟수, 버튼누른횟수변경] = useState(0);
  let [로딩중, 로딩중변경] = useState(true);
  let [newData, setNewData] = useState([]);

  useEffect(() => {
    ajax통신();
  }, []);

  async function ajax통신() {
    let url1 = "https://codingapple1.github.io/shop/data2.json";
    let url2 = "https://codingapple1.github.io/shop/data3.json";

    try {
      로딩중변경(true);
      console.log("로딩중 ui 보이기");
      const res1 = await axios.get(url1); // 서버에서 받아온 데이터
      const res2 = await axios.get(url2);

      newData = [...res1.data, ...res2.data]; // concat 과 동일한 효과(두 배열을 합친 새로운 배열)
      setNewData(newData); // 🍒값을 변경해주기 !
      newData.map((a, i) => {
        newData[i].id++; // 통신하여 가져온 데이터의 id 값이 3,4,5 로 기존 id 값과 중복되서, 1씩 늘림
      })
      console.log("ajax 통신 newData", newData);
      로딩중변경(false);
      console.log("로딩중 ui 숨기기");
    } catch (e) { // ajax 통신 에러일 때
      로딩중변경(false);
      console.log("로딩중 ui 숨기기");
      console.log("통신오류", e);
    }

  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App ajax통신={ajax통신} newData={newData} book={book} book변경={book변경} 버튼누른횟수={버튼누른횟수} 버튼누른횟수변경={버튼누른횟수변경} />
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
      path: "/cart",
      element: <Cart />
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
      {/* Provider store 로 컴포넌트를 감싸면 하위 모든 자식컴포넌트들에서 store.js 에 있던 state 를 마음껏 꺼내 쓸수있다.  */}
      <Provider store={store}>
        <BrowserRouter> {/* Router 컴포넌트로 감싸주기 */}
          <Header />
        { 로딩중 && <div>로딩중입니다.</div>}
        </BrowserRouter>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <Root />
);

reportWebVitals();
