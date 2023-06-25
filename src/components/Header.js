import { Navbar, Container, Nav} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Header(){
    const navigate = useNavigate();

    return (
        <Navbar className="nav" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home" className="logo">mmm</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">전체</Nav.Link>
                    {/* <Nav.Link onClick={()=>{ navigate("/") }}>전체</Nav.Link> */}
                    <Nav.Link href="/detail">베스트</Nav.Link>
                    <Nav.Link href="/event">이벤트</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}