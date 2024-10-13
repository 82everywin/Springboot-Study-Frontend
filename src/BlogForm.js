import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BlogForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/api/articles', { title, content });
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>새 글 작성</h1>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit">작성</button>
        </form>
    );
}

export default BlogForm;