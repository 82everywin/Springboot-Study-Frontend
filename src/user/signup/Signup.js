import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Signup.css';
import { signup } from '../../util/APIUtils';
import Alert from 'react-s-alert';
import { NAVER_AUTH_URL, KAKAO_AUTH_URL, GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../../constants';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import kakaoLogo from '../../img/kakao-logo.png';
import naverLogo from '../../img/naver-logo.png';

const Signup = ({ authenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (authenticated) {
        navigate("/", { state: { from: location } });
    }

    return (
        <div className="signup-container">
            <div className="signup-content">
                <h1 className="signup-title">Sign Up</h1>
                <SocialSignup />
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <SignupForm />
                <span className="login-link">
                    Already have an account? <Link to="/login">Login!</Link>
                </span>
            </div>
        </div>
    );
};

const SocialSignup = () => {
    const socialLogins = [
        { url: GOOGLE_AUTH_URL, img: googleLogo, alt: "Google", text: "Sign up with Google" },
        { url: FACEBOOK_AUTH_URL, img: fbLogo, alt: "Facebook", text: "Sign up with Facebook" },
        { url: GITHUB_AUTH_URL, img: githubLogo, alt: "Github", text: "Sign up with Github" },
        { url: KAKAO_AUTH_URL, img: kakaoLogo, alt: "Kakao", text: "Sign up with Kakao" },
        { url: NAVER_AUTH_URL, img: naverLogo, alt: "Naver", text: "Sign up with Naver" },
    ];

    return (
        <div className="social-signup">
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

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        checkPassword: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        signup(formData)
            .then(() => {
                Alert.success("회원가입에 성공하셨습니다.");
                navigate("/login");
            })
            .catch((error) => {
                Alert.error((error && error.message) || '예기치 않은 문제가 발생하였습니다.');
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
                <input
                    type="password"
                    name="checkPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={formData.checkPassword}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-item">
                <button type="submit" className="btn btn-block btn-primary">
                    Sign Up
                </button>
            </div>
        </form>
    );
};

export default Signup;