import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Career.css";
import { HomeLayout } from 'pages/home/style';
import { FaHeart, FaCommentDots } from "react-icons/fa";

function Best() {
    const [bestPosts, setBestPosts] = useState([]);
    const [commentCounts, setCommentCounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/communityList');
                const allPosts = response.data;

                const sortedBestPosts = allPosts.sort((a, b) => b.likes - a.likes);

                setBestPosts(sortedBestPosts);

                const commentResponse = await axios.get('http://localhost:8080/api/commentList');
                const comments = commentResponse.data;

                const counts = {};
                comments.forEach(comment => {
                    counts[comment.articleId] = (counts[comment.articleId] || 0) + 1;
                });

                setCommentCounts(counts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const Writing = () => {
        window.location.href = './Write';
    }

    return (
        <>
            <HomeLayout>
                <div className='CareerTitleBox'>
                    <div className='CareerBigTitle'>베스트</div>
                    <button className='CareerWriteButton' onClick={Writing}>글쓰기</button>
                </div>
                <div className='CommunityUnderline'></div>
                <div className='CareerPostContainer'>
                    {bestPosts.map(post => (
                        <Link to={`/post?id=${post.id}`} key={post.id}> {/* Use Link here */}
                            <div className='CareerPost'>
                                <div className='CareerPostTitle'>{post.title}</div>
                                <div className='CareerPostContent'>{post.desc}</div>

                                <div style={{ float: "right", width: "120px" }}>
                                    <FaHeart /> {post.likes} &nbsp;&nbsp;&nbsp;
                                    <FaCommentDots /> {commentCounts[post.id] || 0}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </HomeLayout>
        </>
    )
}

export default Best;
