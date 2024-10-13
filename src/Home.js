import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>환영합니다!</h1>
            <p>회원가입 또는 로그인을 진행해주세요.</p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/register">
                    <button style={{ marginRight: '10px' }}>회원가입</button>
                </Link>
                <Link to="/login">
                    <button>로그인</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;