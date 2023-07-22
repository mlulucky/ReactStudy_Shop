import { Link } from 'react-router-dom';
// react-router-dom 안에는 많은 기능들이 있어서 그중에 하나를 import 해오려면 { } 중괄호를 사용하여 불러온다.
// -> 그냥 Link 라고만 하면 오류남.

// 컴포넌트
export function Book(props) {
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