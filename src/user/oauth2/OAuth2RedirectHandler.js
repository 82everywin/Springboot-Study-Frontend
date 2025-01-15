import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import Alert from 'react-s-alert';

const OAuth2RedirectHandler = ({ loadCurrentlyLoggedInUser }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // URL에서 쿼리 파라미터 값을 추출하는 함수
    const getUrlParameter = (name) => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get(name);
    };

    const accessToken = getUrlParameter('accessToken');
    const refreshToken = getUrlParameter('refreshToken');
    const error = getUrlParameter('error');

    React.useEffect(() => {
        if (accessToken && refreshToken) {
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            Alert.success('OAuth2 로그인에 성공하였습니다.');

            // 로그인된 사용자 정보를 다시 로드하여 상태 업데이트
            loadCurrentlyLoggedInUser();

            // 로그인 후 프로필 페이지로 이동
            navigate('/profile', { state: { from: location } });
        } else if (error) {
            // 에러 처리 및 로그인 페이지로 리다이렉트
            Alert.error(`OAuth2 로그인 중 오류 발생: ${error}`);
            navigate('/login', { state: { from: location, error } });
        }
    }, [accessToken, refreshToken, error, location, navigate, loadCurrentlyLoggedInUser]);

    return null; // 화면에 아무것도 렌더링하지 않음
};

export default OAuth2RedirectHandler;