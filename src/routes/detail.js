
import { Outlet, useParams } from "react-router-dom";
// import styled from "styled-components"; // styled-component 컴포넌트를 만들 때 스타일을 미리 주입해서 만들 수 있다.
import { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { orderProduct } from "../store/cartSlice";


export default function Detail(props) {
	let 리덕스State=useSelector((state)=>{return state});
	let dispatch = useDispatch();

	let { id } = useParams(); // 유저가 url 에 입력한 파라미터 값
	const numId = parseInt(id);
	console.log(id);
	// id 는 0,1,2,3 인 경우에만 아닌 경우는 없는 ui 보여주기

	let 찾은상품 = props.book.find(function (x) {
		return x.id === id
	})

	let [alertEvent, setAlertEvent] = useState(true);
	let [count, setCount] = useState(0);
	let [num, setNum] = useState('');

	let [탭번호, 탭번호변경] = useState(0);
	let [애니메이션, 애니메이션변경] = useState('');
	let [화면애니메이션, 화면애니메이션변경] = useState('');
	
	useEffect(()=>{
		// 가까이 있는 state 변경함수 애니메이션 변경의 경우 시간차를 두고 실행해야 상태변경시 재렌더링됨
		let timer = setTimeout(()=>{
			애니메이션변경('aniEnd');
		},100);
		return ()=>{
			애니메이션변경('');
			clearTimeout(timer);
		}
	},[탭번호]); // 탭번호의 상태 변경시마다 실행

	useEffect(()=>{ // Detail 컴포넌트 로드시, 애니메이션 적용
		let timer = setTimeout(()=>{
			화면애니메이션변경('aniEnd');
		},100);
		return ()=>{
			화면애니메이션변경('');
			clearTimeout(timer);
		}
	},[]); // 처음 컴포넌트 로드(마운트) 시 실행

	useEffect(() => {
		// 🍒html 이 모두 렌더링 된 이후에 실행
		// 🍒detail 컴포넌트가 로드될때, 업데이트될때 실행
		console.log("테스트");
		console.log(props.book);
		// 리액트 방식 - state 상태 바꾸기
		let a = setTimeout(() => {
			setAlertEvent(false);

		}, 3000);

		if (isNaN(num)) { // true 이면 num 은 문자
			alert("숫자만 입력하세요");

		}

		// cleanup function : mount(컴포넌트 로드)시 실행안됨, unmount(컴포넌트 삭제 / 다른페이지 넘어갔을때)시 실행됨
		return () => { // 클린업 함수
			// 🌟 useEffect 동작전에 먼저 실행됨
			// 기존 코드, 데이터를 치우는, 제거하는 것을 이곳에 많이 작성
			// useEffect 에 코드가 실행시, 컴포넌트가 재렌더링 되는 경우 코드가 중복으로 계속 실행되면 .... 버그 발생위험 큼 => useEffect 의 기존코드 제거 return 이용해서
			// 기존 타이머 제거하는 코드
			clearTimeout(a); // 타이머 제거하는 함수
		}

	}, [num, id]); // [ ] =>  🍒 useEffect() 의 실행조건을 넣는 곳
	// [ ] 빈 배열인 경우에는 업데이트될때, 실행안되고, 로드 될때만 실행
	// => 컴포넌트 로드시 1회만 실행시키고 싶으로 때 !

	const 상품디테일 = () => {
		const 상품아이디동일 = props.book.find((a) => a.id == id); // 조건을 만족하는 요소를 반환
		if (!상품아이디동일) {   // 일치하는 상품이 없을때  ) 
			return <h2 className="mt-5">없는 페이지입니다.</h2>
		}
		return (
			<div className={'row aniStart ' + 화면애니메이션}>
				{
					alertEvent == true ?
						<div className="alert alert-warning mb-5">
							3초이내 구매시 할인
						</div> : <div className="mb-5"></div>
				}

				<div className="col-md-6" style={{ textAlign: 'center' }}>
					<img src={`/img/book${Number(id) + 1}.jpeg`} width="50%" />
				</div>
				<div className="col-md-6">

					<input onChange={(e) => {
						setNum(e.target.value);
						if (isNaN(num)) {
							e.target.value = "";
						}
					}
					} type="text" placeholder="숫자만 입력, 아니면 경고창 띄우기" />

					<div>
						<h4 className="pt-5 bookTitle">{props.book[id].title}</h4>
						<p>{props.book[id].content}</p>
						<p>{props.book[id].price}원</p>
					</div>
					<button className="btn btn-outline-danger" onClick={()=>{ dispatch(orderProduct(props.book[id]))}}>주문하기</button>
				</div>
				<div className="mb-5">
					<Nav className="mt-5 mb-3 nav-pills nav-justified" variant="tabs" defaultActiveKey="link-0">
						<Nav.Item>
							<Nav.Link eventKey="link-0"
								onClick={() => { 탭번호변경(0) }}> 도서정보
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="link-1" onClick={() => { 탭번호변경(1) }}>리뷰/한줄평</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="link-2" onClick={() => { 탭번호변경(2) }}>
								배송/반품/교환
							</Nav.Link>
						</Nav.Item>
					</Nav>
					{/* {

						function 탭내용({탭번호}){
							return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭번호]
						}

					} */}

					{
						// 함수는 실행을 해야하고, 컴포넌트로 쓰는 방법도 있고, JSX 를 반환하는 return 문 쓰기 
						// 탭내용()
						<탭내용 탭번호={탭번호} 애니메이션={애니메이션} numId={numId} id={id} props={props}/>
					}

				</div>
			</div>

		)
	}



	return (
		<div className="container">
			{/* Outlet 은 index.js 에서 정의한 Detail 컴포넌트의 네스티트 라우터 /detail/id/member 경로 접속시 보여지는 컴포넌트 <div>react</div> 가 위치할 곳 */}
			<Outlet></Outlet> 
			{/* <button onClick={()=>{ setCount(count+1) }}>클릭</button> */}

			<div className="row">
				{
					상품디테일()
				}

			</div>
			<Outlet />
		</div >
	)
}

function 탭내용({탭번호, 애니메이션, numId, id, props}){
	if(탭번호 === 0) {
		return (
			<div className={'aniStart ' + 애니메이션}>
				<h5>책소개</h5>
				<p>{props.book[id].info}</p>
			</div>
		)
	}
	if(탭번호 === 1) {
		return (
			<div className={'aniStart ' + 애니메이션}>
				{	// 🍒 url 파라미터의 값은 문자열이므로 parseInt 로 정수로 형변환 후에 비교값으로 연산
					numId >= 0 && numId <= 3 ?
						(
							props.book[numId].review.map((a, i) => {
								return <p key={i}>{a}</p>
							})
						)
						: <div>리뷰1</div>
				}
			</div>
		)
	}
	if(탭번호 === 2) {
		return (
			<div className={'aniStart ' + 애니메이션}>
				<h5>배송/반품/교환 안내</h5>
				<table className="table table-bordered">
					<tbody>
						<tr>
							<td scope="row" className="col-2 division">배송구분</td>
							<td className="col">
								mmm 배송
								<ul style={{ paddingLeft: "0", marginBottom: "0" }}>
									<li>·  <em>&nbsp;</em>배송비 : 무료배송</li>
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
	return null
}