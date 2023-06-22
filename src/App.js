import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 메인이미지 from './bigImg.jpeg';

function App() {
  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className="logo">mmm</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">전체</Nav.Link>
            <Nav.Link href="#features">베스트</Nav.Link>
            <Nav.Link href="#pricing">신상품</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <article>
        <div>
          <img className="mainImg" src={메인이미지}/>
        </div>

        <div className="row" style={{ margin: "auto", padding: "20px" }}>
          <p><b>지금, 이책</b><span>{" >"}</span></p>

          <div className="col">
            <div className="book">
              <img className="bookImg" src="/img/book1.jpeg" />
              <div>
                <p className="bookTitle">초4, 지식책 읽기를 시작해야합니다.</p>
                <b>19,800원</b>
              </div>
            </div>
          </div>

          <div className="col">
            <div className='book'>
              <img src="/img/book2.jpeg" />
              <div>
                <p className="bookTitle">1분 요리 뚝딱이형</p>
                <b>19,800원</b>
              </div>
            </div>
          </div>

          <div className="col">

            <div className='book'>
              <img src="/img/book3.jpeg" />
              <div>
                <p className="bookTitle">난처한 동양미술 이야기 3</p>
                <b>19,800원</b>
              </div>
            </div>
          </div>

          <div className="col">
            <div className='book'>
              <img src="/img/book4.jpeg" />
              <div>
                <p className="bookTitle">역사 문해력 수업</p>
                <b>19,800원</b>
              </div>
            </div>
          </div>


        </div>
      </article>


    </div>
  );
}

export default App;
