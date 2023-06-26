import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 메인이미지 from './bigImg.jpeg';
import data from './data.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function App(props) {
  return (
    <div className="App">  
      <Main ajax통신={props.ajax통신} book={props.book} book변경={props.book변경}/>
    </div>
  );
}

function Main(props){
  const [오름차순정렬, 정렬바꾸기] = useState(true); // 오름차순 정렬여부
  const 정렬핸들러 = ()=>{
    let 정렬함수 = 오름차순정렬 ? (a, b) => a.title.localeCompare(b.title) : (a,b) => b.title.localeCompare(a.title)
    let newBook = [...props.book];
    newBook.sort(정렬함수);
    props.book변경(newBook);
    정렬바꾸기(!오름차순정렬);
  }

  return (
    <div className="cont">
        <div>
          <img className="mainImg" src={메인이미지} />
        </div>
        <div style={{ margin: "auto", padding: "20px" }}>
          <div className="title text-start mb-3 d-flex">
            <p className='mb-0'>
              <b>지금, 이책</b><span>{" >"}</span>
            </p>
            <button onClick={정렬핸들러} type="button" className="btn btn-outline-secondary">정렬바꾸기</button>
          </div>
          <ul className="row">
            {
              props.book.map(function(a, i){
                return ( // a == book[i]
                  <Book key={a.id} 책데이터={a} 인덱스={i}/>
                )
              })
            }
          </ul>
        </div>
        <div>
          {   
            // 더보기 버튼 클릭하면 안보여주기
            // 상태가 true 이면 보여주고, false 이면 감추기. (버튼을 클릭하면 false 로 바꾸기)
          }
          <button onClick={ props.ajax통신 } className="btn btn-outline-primary mb-5">더보기</button>
        </div>
      </div>
  )
}

// 컴포넌트
function Book(props){
  return (
    <li className="book col-md-3">
      <Link className="aLink" to={`/detail/${props.책데이터.id}`}>
        <div className="bookImg mb-1">
          <img src={`/img/book${props.책데이터.id + 1}.jpeg`} />
        </div>
        <div className="bookInfo">
          <p className="mb-0">{props.책데이터.title}</p>
          <span>{props.책데이터.price}원</span>
        </div>
      </Link>
    </li>

  )
}


export default App;
