import { API_BASE_URL, ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

const request = async (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (!options.noAuth && localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    try {
        const response = await fetch(options.url, options);

        if (!response.ok) {
            const errorData = await response.json();

            // JWT 만료 시 처리
            if (response.status === 401 && errorData.message === 'JWT expired') {
                const newTokens = await refreshTokens(); // 리프레시 토큰 호출
                localStorage.setItem(ACCESS_TOKEN, newTokens.accessToken);
                localStorage.setItem(REFRESH_TOKEN, newTokens.refreshToken);

                // 갱신된 토큰으로 다시 요청
                headers.set('Authorization', 'Bearer ' + newTokens.accessToken);
                const retryOptions = Object.assign({}, options, { headers });
                const retryResponse = await fetch(retryOptions.url, retryOptions);

                if (!retryResponse.ok) {
                    const retryErrorData = await retryResponse.json();
                    return Promise.reject(retryErrorData);
                }

                return retryResponse.json();
            }

            return Promise.reject(errorData);
        }

        return response.json();
    } catch (error) {
        return Promise.reject(error);
    }
};

// Refresh tokens using /reissue endpoint
async function refreshTokens() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    console.log('리프레시토큰', refreshToken);

    if (!refreshToken) {
        return Promise.reject('No refresh token available.');
    }

    const response = await fetch(API_BASE_URL + '/api/v1/users/reissue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + refreshToken,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to refresh tokens.');
    }

    const data = await response.json();
    console.log(data);

    return {
        accessToken: data.result.accessToken,
        refreshToken: data.result.refreshToken,
    };
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('No access token set.');
    }

    return request({
        url: API_BASE_URL + '/api/v1/users',
        method: 'GET',
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + '/api/v1/users/sign-in',
        method: 'POST',
        body: JSON.stringify(loginRequest),
        noAuth: true,
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + '/api/v1/users/sign-up',
        method: 'POST',
        body: JSON.stringify(signupRequest),
        noAuth: true,
    });
}

export function changePassword(passwordRequest) {
    return request({
        url: API_BASE_URL + '/api/v1/users/password',
        method: 'PUT',
        body: JSON.stringify(passwordRequest),
    });
}

// Test sign-in logic
export function testSignIn(testLoginRequest) {
    return request({
        url: API_BASE_URL + '/api/v1/users/test/sign-in', // 테스트용 로그인 엔드포인트
        method: 'POST',
        body: JSON.stringify(testLoginRequest),
        noAuth: true,
    });
}