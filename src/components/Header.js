import { Navbar, Container, Nav} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Header(){
    let navigate = useNavigate();
    const moveToMain = () => {
        return navigate("/");
    }

    return (
        <Navbar className="nav" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home" className="logo">mmm</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={moveToMain}>전체</Nav.Link>
                    <Nav.Link onClick={()=>{navigate("detail/1")}}>베스트</Nav.Link>
                    <Nav.Link onClick={()=>{navigate("event")}}>이벤트</Nav.Link>
                    <Nav.Link onClick={()=>{navigate("cart")}}>장바구니</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}