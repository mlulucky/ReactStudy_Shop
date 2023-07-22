import {useState} from 'react'
import 메인이미지 from '../bigImg.jpeg'
// import 해서 불러오는 이미지는 정적리소스(public) 폴더안이 아니라 src 폴더안에 위치시키기
// 이미지를 지정하여 import 해오기 때문에 { } 중괄호를 사용하지 않고 바로 변수명 적기
import {Book} from '../components/Book'

export default function Main(props) {
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