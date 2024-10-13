import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import MyPage from './MyPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    const handleLogin = () => {
        setIsLoggedIn(true); // 로그인 성공 시 상태 업데이트
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // 로그아웃 시 상태 초기화
    };

    return (
        <Router>
            <nav>
                {isLoggedIn ? (
                    <>
                        <button onClick={handleLogout}>로그아웃</button> |
                        <Link to="/">전체 글</Link> |
                        <Link to="/my">내 글 보기</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link> |
                        <Link to="/register">회원가입</Link>
                    </>
                )}
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/my"
                    element={
                        isLoggedIn ? <MyPage /> : <Navigate to="/login" replace /> // 로그인한 사용자만 접근
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;