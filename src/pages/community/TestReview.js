import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HomeLayout } from 'pages/home/style';
import { Link } from 'react-router-dom';
import { FaHeart, FaCommentDots } from "react-icons/fa";

function TestReview() {
    const [testReviewPosts, setTestReviewPosts] = useState([]);
    const [commentCounts, setCommentCounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/communityList');
                const allPosts = response.data;

                const testReviewPosts = allPosts.filter(post => post.category === '면접 후기');

                setTestReviewPosts(testReviewPosts);

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
                    <div className='CareerBigTitle'>면접 후기</div>
                    <button className='CareerWriteButton' onClick={Writing}>글쓰기</button>
                </div>
                <div className='CommunityUnderline'></div>
                <div className='CareerPostContainer'>
                    {testReviewPosts.map(post => (
                        <Link to={`/post?id=${post.id}`} key={post.careerPost_no}> {/* Use Link here */}
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

export default TestReview;
