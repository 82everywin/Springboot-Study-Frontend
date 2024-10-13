import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/users/login', formData);
            alert('로그인 성공!');
        } catch (error) {
            alert('로그인 실패!');
            console.error(error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '25rem' }} className="p-4">
                <h2 className="text-center mb-4">로그인</h2>
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
                        로그인
                    </Button>

                    <div className="text-center">
                        <h5>소셜 로그인</h5>
                        <a href="http://localhost:8080/oauth2/authorization/google" className="btn btn-danger w-100 mb-2">
                            구글 로그인
                        </a>
                        <a href="http://localhost:8080/oauth2/authorization/kakao" className="btn btn-warning w-100">
                            카카오 로그인
                        </a>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default Login;