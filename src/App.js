import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 메인이미지 from './bigImg.jpeg';
import data from './data.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function App(props) {
  return (
    <div className="App">
      <Main ajax통신={props.ajax통신} newData={props.newData} book={props.book} book변경={props.book변경} 버튼누른횟수={props.버튼누른횟수} 버튼누른횟수변경={props.버튼누른횟수변경} />
    </div>
  );
}

function Main(props) {
  const [오름차순정렬, 정렬바꾸기] = useState(true); // 오름차순 정렬여부
  const [현재상품인덱스, 현재상품인덱스변경] = useState(0);


  const 정렬핸들러 = () => {
    let 정렬함수 = 오름차순정렬 ? (a, b) => a.title.localeCompare(b.title) : (a, b) => b.title.localeCompare(a.title)
    let newBook = [...props.book];
    newBook.sort(정렬함수);
    props.book변경(newBook);
    정렬바꾸기(!오름차순정렬);
  }

  const 더보기핸들러 = async (e) => {
    console.log("newData", props.newData);
    if (props.newData.length < 현재상품인덱스) {
      alert("조회되는 상품이 없습니다.");

    }
    const 추가로보여줄상품 = props.newData.slice(현재상품인덱스, 현재상품인덱스 + 4);
    // slice(0,4) -> slice(4,8)  // -> slice(8,12) 조회상품없음
    현재상품인덱스변경(현재상품인덱스 + 4);

    props.book변경([...props.book, ...추가로보여줄상품]);
    // 더보기 버튼을 누를때 추가로보여줄 상품을 book 리스트에 추가하여, <Book key={a.id} 책데이터={a} 인덱스={i}/> 가 추가되는 것!

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
            props.book.map((a, i) => {
              return (
                <Book key={a.id} 책데이터={a} 인덱스={i} />
              )
            })
          }
        </ul>
      </div>
      <div>
        {
          현재상품인덱스 < props.newData.length ?
          // 처음 현재인덱스 0 < 6 (버튼 보임)
          // 버튼 1번 누르면 현재인덱스 4 < 6 (버튼 보임)
          // 버튼 2번 누르면 현재인덱스 8 < 6 (버튼 안보임)
            <button
              onClick={더보기핸들러}
              className="btn btn-outline-primary mb-5">
              더보기
            </button>            
            : null
            
        }

      </div>
    </div>
  )
}

// 컴포넌트
function Book(props) {
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
