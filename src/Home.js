import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';

function Home() {
    return (
        <Container className="text-center" style={{ marginTop: '100px' }}>
            <h1 className="mb-4">환영합니다!</h1>
            <p>회원가입 또는 로그인을 진행해주세요.</p>
            <Row className="justify-content-center mt-4">
                <Col xs="auto">
                    <Link to="/register">
                        <Button variant="primary" className="me-2">회원가입</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="secondary">로그인</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;