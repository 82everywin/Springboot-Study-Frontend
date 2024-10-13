import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyPage() {
    const [articles, setArticles] = useState([]);

    useEffect((id) => {
        axios.get(`http://localhost:8080/api/members/${id}`).then((response) => setArticles(response.data));
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/members/${id}`);
        setArticles(articles.filter((article) => article.id !== id));
    };

    return (
        <div>
            <h1>내 글 목록</h1>
            {articles.map((article) => (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                    <button onClick={() => handleDelete(article.id)}>삭제</button>
                </div>
            ))}
        </div>
    );
}

export default MyPage;