import { Outlet } from "react-router-dom"
export default function Detail(props){
    return(
        <div className="container mt-5">
            <Outlet></Outlet>
        <div className="row">
            <div className="col-md-6" style={{textAlign : 'center'}}>
            <img src={"/img/book1.jpeg"} width="50%" />
            </div>
            <div className="col-md-6">
            <h4 className="pt-5 bookTitle">{props.book[0].title}</h4>
            <p>{props.book[0].content}</p>
            <p>{props.book[0].price}</p>
            <button className="btn btn-outline-danger">주문하기</button> 
            </div>
        </div>
        <Outlet/>
        </div> 
    )
}