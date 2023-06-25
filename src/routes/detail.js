import { Outlet, useParams } from "react-router-dom";
// import styled from "styled-components"; // styled-component 컴포넌트를 만들 때 스타일을 미리 주입해서 만들 수 있다.
import { useEffect, useState } from "react";

export default function Detail(props) {
	let { id } = useParams(); // 유저가 url 에 입력한 파라미터 값
	console.log(id);
	// id 는 0,1,2,3 인 경우에만 아닌 경우는 없는 ui 보여주기

	let 찾은상품 = props.book.find(function(x){
		return x.id == id
	})

	let [alert , setAlert] = useState(true);
	useEffect(() => { 
		// 🍒html 이 모두 렌더링 된 이후에 실행
		// 🍒detail 컴포넌트가 로드될때, 업데이트될때 실행
		console.log("테스트");
		// 리액트 방식 - state 상태 바꾸기
		let a = setTimeout(()=>{
			setAlert(false);
		},3000);

		// 🍒 useEffect 동작전에 먼저 실행됨
		// cleanup function : mount(컴포넌트 로드)시 실행안됨, unmount(컴포넌트 삭제 / 다른페이지 넘어갔을때)시 실행됨
		return ()=>{ // 클린업 함수
			// 기존 코드, 데이터를 치우는, 제거하는 것을 이곳에 많이 작성
			// useEffect 에 코드가 실행시, 컴포넌트가 재렌더링 되는 경우 코드가 중복으로 계속 실행되면 .... 버그 발생위험 큼 => 기존코드 제거 return 이용해서
			// 기존 타이머 제거하는 코드
			clearTimeout(a); // 타이머 제거하는 함수
		}

	},[]); // [ ] =>  🍒 useEffect() 의 실행조건을 넣는 곳
	// [ ] 빈 배열인 경우에는 업데이트될때, 실행안되고, 로드 될때만 실행
	// => 컴포넌트 로드시 1회만 실행시키고 싶으로 때 !


	let [count, setCount] = useState(0);

	return (
		<div className="container">
			<Outlet></Outlet>
			{/* <button onClick={()=>{ setCount(count+1) }}>클릭</button> */}
			
			{
				alert == true ? 
				<div className="alert alert-warning mb-5">
				3초이내 구매시 할인
				</div> : null
			}
			
			
			<div className="row mt-5">
				{
					id === "0" || id === "1" || id === "2" || id === "3" ?
						(
							<>
								<div className="col-md-6" style={{ textAlign: 'center' }}>
									<img src={`/img/book${Number(id)+1}.jpeg`} width="50%" />
								</div>
								<div className="col-md-6">
									<div>
										<h4 className="pt-5 bookTitle">{props.book[id].title}</h4>
										<p>{props.book[id].content}</p>
										<p>{props.book[id].price}원</p>
									</div>
									<button className="btn btn-outline-danger">주문하기</button>
								</div>
							</>
						) :
						(
							<h2>없는 페이지입니다.</h2>
						)
				}

			</div>
			<Outlet />
		</div >
	)
}