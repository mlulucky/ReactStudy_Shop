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
import {useState} from 'react';

function Root(){
  let [book] = useState(data); 
  const router = createBrowserRouter([
  
    {
      path: "/",
      element: <App />
    },
    {
      path: "/detail",
      element : <Detail book={book}/>,
      children : [ // nested router // /detail/member로 접속시 <Detail> & <div>react</div> 을 보여줌
        {
          path: "member", // 경로 "/detail/member" // 부모 경로인 "/detail"과 조합된 상대 경로로 변경 (잘못된예 "/member")
          element : <div>react</div>
        }
      ]
    },
    {
      path: "/event",
      element : <Event />,
      children : [{ // nested router => "react-router-dom" 의 Outlet 컴포넌트와 짝꿍
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
      element : <h2>Oops! 없는 페이지 404 에러</h2>
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
        <RouterProvider router={router}/>
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
