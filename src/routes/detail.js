
import { Outlet, useParams } from "react-router-dom";
// import styled from "styled-components"; // styled-component 컴포넌트를 만들 때 스타일을 미리 주입해서 만들 수 있다.
import { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';


export default function Detail(props) {
	let { id } = useParams(); // 유저가 url 에 입력한 파라미터 값
	console.log(id);
	// id 는 0,1,2,3 인 경우에만 아닌 경우는 없는 ui 보여주기

	let 찾은상품 = props.book.find(function (x) {
		return x.id == id
	})

	let [alertEvent, setAlertEvent] = useState(true);
	let [count, setCount] = useState(0);
	let [num, setNum] = useState('');

	let [탭번호, 탭번호변경] = useState(0);


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
			<>
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
					<button className="btn btn-outline-danger">주문하기</button>
				</div>
				<div className="mb-5">
					<Nav className="mt-5 nav-pills nav-justified" variant="tabs" defaultActiveKey="link-0">
						<Nav.Item>
							<Nav.Link eventKey="link-0" onClick={() => { 탭번호변경(0) }}>도서정보</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="link-1" onClick={() => { 탭번호변경(1) }}>리뷰/한줄평</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="disabled" onClick={() => { 탭번호변경(2) }}>
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

						탭번호 == 0 ?
							<div>
								<h4>책소개</h4>
								<p>
									<b>
										★★ 문해력 전문가 ‘콩나물쌤’의 신작 ★★
										세상의 지식을 씹어먹을 무기, 지식책 문해력
										‘어휘 + 배경지식’ 다지기 위해
										반드시 초4 전에 지식책 읽기 시작하라!
									</b>


									어휘와 배경지식이 풍부해 어떤 과목, 어떤 문제를 만나도 쉽게 이해하고 자신감 있게 해결하는 아이 vs 어휘와 배경지식이 빈약해 학년이 오르고 교과 난이도가 어려워질수록 문제에 접근조차 하지 못하고 겉도는 아이. 이 차이는 어디에서 오는 걸까?

									초등 교육 전문가이자 문해력 전문가인 ‘콩나물쌤’ 전병규 저자는 이 차이가 단연 ‘지식책 문해력’의 차이라고 말한다. 저자는 이제 제법 많은 부모들이 문해력의 중요성에 대해 인식하고 있지만, 정작 성적과 직접적으로 연결되는 것은 ‘지식책 문해력’이라고 강조한다. 지식을 담은 모든 글을 통칭하는 ‘지식책’ 읽기를 통해 ‘이야기책’에서는 절대 얻을 수 없는 학문 어휘를 늘리고, 해당 분야의 배경지식을 쌓아가며 문해력을 높이면, 교과 공부는 저절로 재밌고 쉬운 것이 된다. 공부를 잘한다는 것은 다름 아닌 학문 어휘를 많이 안다는 것이며, 탄탄한 배경지식은 새로운 지식을 이해하고 흡수할 수 있는 양을 확보해 준다.
								</p>
							</div>
							: null
					}
					{
						탭번호 == 1 ? <div>내용1</div> : null
					}
					{
						탭번호 == 2 ? <div>내용2</div> : null
					}

				</div>
			</>

		)
	}

	return (
		<div className="container">
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