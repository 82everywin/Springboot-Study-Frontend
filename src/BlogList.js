import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BlogList() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/articles').then((response) => setArticles(response.data));
    }, []);

    return (
        <div>
            <h1>전체 글 목록</h1>
            {articles.map((article) => (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                </div>
            ))}
        </div>
    );
}

export default BlogList;