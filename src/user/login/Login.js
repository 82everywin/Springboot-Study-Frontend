import React, { useState, useEffect } from 'react';
import './Login.css';
import {
    NAVER_AUTH_URL,
    KAKAO_AUTH_URL,
    GOOGLE_AUTH_URL,
    FACEBOOK_AUTH_URL,
    GITHUB_AUTH_URL,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
} from '../../constants';
import { login } from '../../util/APIUtils';
import { Link, Navigate } from 'react-router-dom';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import kakaoLogo from '../../img/kakao-logo.png';
import naverLogo from '../../img/naver-logo.png';
import Alert from 'react-s-alert';

const Login = ({ authenticated, location }) => {
    const [error, setError] = useState(location?.state?.error || null);

    useEffect(() => {
        if (error) {
            Alert.error(error, { timeout: 5000 });
            setError(null); // 에러 메시지 한 번만 표시
        }
    }, [error]);

    if (authenticated) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Sign In</h1>
                <SocialLogin />
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <LoginForm />
                <span className="signup-link">
                    New user? <Link to="/signup">Sign up!</Link>
                </span>
            </div>
        </div>
    );
};

const SocialLogin = () => {
    const socialLogins = [
        { url: GOOGLE_AUTH_URL, img: googleLogo, alt: 'Google', text: 'Sign in with Google' },
        { url: FACEBOOK_AUTH_URL, img: fbLogo, alt: 'Facebook', text: 'Sign in with Facebook' },
        { url: GITHUB_AUTH_URL, img: githubLogo, alt: 'Github', text: 'Sign in with Github' },
        { url: KAKAO_AUTH_URL, img: kakaoLogo, alt: 'Kakao', text: 'Sign in with Kakao' },
        { url: NAVER_AUTH_URL, img: naverLogo, alt: 'Naver', text: 'Sign in with Naver' },
    ];

    return (
        <div className="social-login">
            {socialLogins.map((login, index) => (
                <a
                    key={index}
                    className="btn btn-block social-btn"
                    href={login.url}
                >
                    <img src={login.img} alt={login.alt} /> {login.text}
                </a>
            ))}
        </div>
    );
};

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        login(formData)
            .then((response) => {
                // 중첩된 구조에서 토큰 추출
                const { accessToken, refreshToken } = response.response;

                // 로컬 스토리지에 토큰 저장
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);

                Alert.success('로그인에 성공하였습니다.');
                window.location.href = '/'; // 리다이렉트
            })
            .catch((error) => {
                Alert.error((error && error.message) || '로그인에 실패하였습니다.');
            });
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-item">
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-item">
                <button type="submit" className="btn btn-block btn-primary">
                    Login
                </button>
            </div>
        </form>
    );
};

export default Login;