import React, { Component, useState } from 'react';
import './Profile.css';
import { changePassword } from '../../util/APIUtils';
import Alert from 'react-s-alert';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { response } = this.props.currentUser || {};
        const image = response?.image || null;
        const nickName = response?.nickName || "No Name";
        const email = response?.email || "No Email";

        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            {image ? (
                                <img src={image} alt={nickName} />
                            ) : (
                                <div className="text-avatar">
                                    <span>{nickName[0]}</span>
                                </div>
                            )}
                        </div>
                        <div className="profile-name">
                            <h2>{nickName}</h2>
                            <p className="profile-email">{email}</p>
                        </div>
                    </div>
                    <PasswordChangeForm />
                </div>
            </div>
        );
    }
}

const PasswordChangeForm = () => {
    const [formData, setFormData] = useState({
        originPassword: '',
        newPassword: '',
        checkPassword: '',
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

        changePassword(formData)
            .then(() => {
                Alert.success('비밀번호가 성공적으로 변경되었습니다.');
            })
            .catch((error) => {
                Alert.error((error && error.message) || '비밀번호 변경에 실패하였습니다.');
            });
    };

    return (
        <form onSubmit={handleSubmit} className="password-change-form">
            <div className="form-item">
                <input
                    type="password"
                    name="originPassword"
                    className="form-control"
                    placeholder="기존 비밀번호"
                    value={formData.originPassword}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-item">
                <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="새 비밀번호"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-item">
                <input
                    type="password"
                    name="checkPassword"
                    className="form-control"
                    placeholder="새 비밀번호 확인"
                    value={formData.checkPassword}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-item">
                <button type="submit" className="btn btn-primary">
                    비밀번호 변경
                </button>
            </div>
        </form>
    );
};

export default Profile;