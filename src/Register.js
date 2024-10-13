import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs'; // 화살표 아이콘

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(''); // 에러 메시지 상태

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/members', formData);
            alert('회원가입 성공!');
            navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
        } catch (error) {
            setError('회원가입에 실패했습니다. 다시 시도해주세요.');
            console.error(error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '25rem' }} className="p-4 position-relative">
                <Link to="/" className="position-absolute top-0 start-0 m-3">
                    <BsArrowLeft size={24} /> {/* 뒤로가기 화살표 */}
                </Link>
                <h2 className="text-center mb-4">회원가입</h2>

                {error && <Alert variant="danger">{error}</Alert>} {/* 에러 메시지 표시 */}

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="이메일을 입력하세요"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mb-2">
                        회원가입
                    </Button>

                    <div className="text-center mt-3">
                        <span>이미 계정이 있으신가요? </span>
                        <Link to="/login">로그인</Link>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default Register;