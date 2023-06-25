import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 메인이미지 from './bigImg.jpeg';
import data from './data.js';
import { useState } from 'react';

function App() {
  let [book] = useState(data);
  return (
    <div className="App">  
      <Main book={book}/>
    </div>
  );
}

function Main(props){
  return (
    <div className="cont">
        <div>
          <img className="mainImg" src={메인이미지} />
        </div>
        <div style={{ margin: "auto", padding: "20px" }}>
          <p className="text-start"><b>지금, 이책</b><span>{" >"}</span></p>
          <ul className="row">
            {
              props.book.map(function(a, i){
                return (
                  <Book key={props.book[i].id} 책데이터={props.book[i]} 인덱스={i}/>
                )
              })
            }
          </ul>
        </div>
      </div>
  )
}

// 컴포넌트
function Book(props){
  return (
    <li className="book col-md">
      <div className="bookImg mb-1">
        <img src={`/img/book${props.인덱스+1}.jpeg`} />
      </div>
      <div className="bookInfo">
        <p className="mb-0">{props.책데이터.title}</p>
        <span>{props.책데이터.price}</span>
      </div>
    </li>

  )
}


export default App;
