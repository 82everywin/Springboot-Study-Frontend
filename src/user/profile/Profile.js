import React, { useState, useEffect } from 'react';
import './Profile.css';
import {
    getCurrentUser,
    getLinkedSocialAccounts,
    unlinkOAuth
} from '../../util/APIUtils';
import Alert from 'react-s-alert';

// 아이콘 이미지 경로
import GoogleIcon from '../../img/google-logo.png';
import KakaoIcon from '../../img/kakao-logo.png';
import NaverIcon from '../../img/naver-logo.png';

// 소셜 로그인 플랫폼 정보 (연동 해제 함수 제거)
const SOCIAL_PROVIDERS = [
    { id: 'google', name: 'Google 연동', icon: GoogleIcon },
    { id: 'kakao', name: 'Kakao 연동', icon: KakaoIcon },
    { id: 'naver', name: 'Naver 연동', icon: NaverIcon },
];

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [linkedAccounts, setLinkedAccounts] = useState({
        google: false,
        kakao: false,
        naver: false
    });
    const [loading, setLoading] = useState(true);

    // 🚀 사용자 정보 & 연동된 소셜 로그인 목록 가져오기
    useEffect(() => {
        setLoading(true);
        Promise.all([getCurrentUser(), getLinkedSocialAccounts()])
            .then(([userResponse, linkedResponse]) => {
                setCurrentUser(userResponse.response);
                const updatedLinks = { google: false, kakao: false, naver: false };
                linkedResponse.response.forEach(provider => {
                    updatedLinks[provider] = true;
                });
                setLinkedAccounts(updatedLinks);
            })
            .catch(error => {
                console.error('⚠️ 데이터 로드 실패:', error);
                Alert.error('사용자 정보를 불러오지 못했습니다.');
            })
            .finally(() => setLoading(false));
    }, []);

    // 🚀 연동 해제 처리
    const handleToggle = async (provider) => {
        if (!linkedAccounts[provider]) {
            Alert.warning(`${provider} 연동이 이미 해제되어 있습니다.`);
            return;
        }

        if (!window.confirm(`${provider} 연동을 해제하시겠습니까?`)) {
            return;
        }

        try {
            await unlinkOAuth(provider);  // 🔥 여기서 unlinkOAuth 함수 호출
            setLinkedAccounts(prev => ({ ...prev, [provider]: false }));
            Alert.success(`${provider} 연동이 해제되었습니다.`);
        } catch (error) {
            console.error(`⚠️ ${provider} 연동 해제 실패:`, error);
            Alert.error(`${provider} 연동 해제 실패: ${error.message || '서버 오류'}`);
        }
    };

    if (loading) return <p>⏳ 연동 정보를 불러오는 중...</p>;
    if (!currentUser) return <p>⚠️ 사용자 정보를 불러올 수 없습니다.</p>;

    return (
        <div className="profile-container">
            <div className="container">
                <div className="profile-info">
                    <div className="profile-avatar">
                        {currentUser.image ? (
                            <img src={currentUser.image} alt={currentUser.nickName} />
                        ) : (
                            <div className="text-avatar">
                                <span>{currentUser.nickName[0]}</span>
                            </div>
                        )}
                    </div>
                    <div className="profile-name">
                        <h2>{currentUser.nickName}</h2>
                        <p className="profile-email">{currentUser.email}</p>
                    </div>
                </div>

                {/* 🔹 소셜 로그인 연동 관리 */}
                <div className="social-unlink-container">
                    <h3>소셜 로그인 연동 관리</h3>
                    {SOCIAL_PROVIDERS.map(({ id, name, icon }) => (
                        <div key={id} className="social-unlink-item">
                            <div className="social-icon">
                                <img src={icon} alt={id} />
                                <span>{name}</span>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={linkedAccounts[id]}
                                    onChange={() => handleToggle(id)} // 🔥 여기서 provider 전달
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;