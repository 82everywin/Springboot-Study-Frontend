import React, { Component } from 'react';
import {
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: true,
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);

        if (!accessToken) {
            this.setState({
                authenticated: false,
                currentUser: null,
                loading: false,
            });
            return; // 토큰이 없으면 API 요청 생략
        }

        getCurrentUser()
            .then((response) => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false,
                });
            });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null,
        });
        Alert.success('로그아웃 했습니다.');
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator />;
        }

        return (
            <div className="app">
                <div className="app-top-box">
                    <AppHeader
                        authenticated={this.state.authenticated}
                        onLogout={this.handleLogout}
                    />
                </div>
                <div className="app-body">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/profile"
                            element={
                                this.state.authenticated ? (
                                    <Profile currentUser={this.state.currentUser} />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <Login
                                    authenticated={this.state.authenticated}
                                />
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <Signup
                                    authenticated={this.state.authenticated}
                                />
                            }
                        />
                        {/* loadCurrentlyLoggedInUser를 OAuth2RedirectHandler에 props로 전달 */}
                        <Route
                            path="/oauth2/redirect"
                            element={
                                <OAuth2RedirectHandler
                                    loadCurrentlyLoggedInUser={this.loadCurrentlyLoggedInUser}
                                />
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Alert
                    stack={{ limit: 3 }}
                    timeout={3000}
                    position="top-right"
                    effect="slide"
                    offset={65}
                />
            </div>
        );
    }
}

export default App;