import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HomeLayout } from 'pages/home/style';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart, FaTrashAlt } from 'react-icons/fa';
import './CareerPost.css';

function CareerPost() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [hasViewed, setHasViewed] = useState(false);
    const location = useLocation();
    const postId = new URLSearchParams(location.search).get('id');
    const storedName = localStorage.getItem('name');
    const storedId = localStorage.getItem('id');
    const navigate = useNavigate();

    useEffect(() => {
        if (!postId) {
            return;
        }

        axios.get(`http://localhost:8080/api/communityList`)
            .then(response => {
                const selectedPost = response.data.find(item => item.id === parseInt(postId));
                setPost(selectedPost);
            })
            .catch(error => {
                console.error('Error fetching post data:', error);
            });

        axios.get(`http://localhost:8080/api/commentList?id=${postId}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error fetching comment data:', error);
            });
    }, [postId]);

    useEffect(() => {
        if (post && !hasViewed) {
            axios.put(`http://localhost:8080/api/community/edit/${postId}`, {
                title: post.title,
                desc: post.desc,
                likes: post.likes,
                views: post.views + 1,
                updated_at: new Date().toISOString()
            })
                .then(response => {
                    setPost(prevPost => ({
                        ...prevPost,
                        views: prevPost.views + 1,
                        updated_at: response.data.updated_at
                    }));
                    localStorage.setItem(`viewed_${postId}`, 'true');
                    setHasViewed(true);
                })
                .catch(error => {
                    console.error('Error updating post views:', error);
                });
        }
    }, [postId, post, hasViewed]);

    useEffect(() => {
        const likedStatus = localStorage.getItem(`liked_${postId}`);
        setIsLiked(likedStatus === 'true');
    }, [postId]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleDeleteComment = (commentId) => {
        axios.delete(`http://localhost:8080/api/comment/delete/${commentId}`)
            .then(response => {
                console.log('Comment deleted successfully:', response.data);
                axios.get(`http://localhost:8080/api/commentList?id=${postId}`)
                    .then(response => {
                        setComments(response.data);
                    })
                    .catch(error => {
                        console.error('Error refreshing comment data:', error);
                    });
            })
            .catch(error => {
                console.error('Error deleting comment:', error);
            });
    };

    const handleCommentSubmit = () => {
        const data = {
            articleId: postId,
            name: storedName,
            desc: comment,
            member: storedId,
            likes: 0
        };

        axios.post('http://localhost:8080/api/comment/1', data)
            .then(response => {
                console.log('Comment submitted successfully:', response.data);
                setComment('');
                axios.get(`http://localhost:8080/api/commentList?id=${postId}`)
                    .then(response => {
                        setComments(response.data);
                    })
                    .catch(error => {
                        console.error('Error refreshing comment data:', error);
                    });
            })
            .catch(error => {
                console.error('Error submitting comment:', error);
            });
    };

    const handleLikeClick = () => {
        if (!isLiked) {
            const updatedLikes = post.likes + 1;

            axios.put(`http://localhost:8080/api/community/edit/${postId}`, {
                title: post.title,
                desc: post.desc,
                likes: updatedLikes,
                views: post.views,
                updated_at: new Date().toISOString()
            })
                .then(response => {
                    setPost(prevPost => ({
                        ...prevPost,
                        likes: updatedLikes,
                        updated_at: response.data.updated_at
                    }));
                    localStorage.setItem(`liked_${postId}`, 'true');
                    setIsLiked(true);
                })
                .catch(error => {
                    console.error('Error updating post likes:', error);
                });
        }
    };

    const handleEdit = () => {
        navigate(`/write?id=${postId}`);
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8080/api/community/delete/${postId}`)
            .then(response => {
                console.log('Post deleted successfully:', response.data);
                navigate('/community');
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    };

    if (!post) {
        return null;
    }

    const { category, title, name, desc, views, likes, updated_at } = post;
    const filteredComments = comments.filter(comment => comment.articleId === parseInt(postId));

    const isCurrentUser = storedId && post.member === parseInt(storedId);

    return (
        <HomeLayout>
            <div className="post-category">{category}</div>
            <div className="post-content">
                <div className='post-title'>{title}</div>
                <div className="post-meta">
                    <div className="author">{name}</div>
                    <div className="views">조회수: {views}&nbsp;&nbsp;댓글 수: {filteredComments.length}</div>
                </div>
                <div className="post-description">{desc}</div>
                <div className="post-actions">
                    <div className="likes">
                        {isLiked ? (
                            <FaHeart onClick={handleLikeClick} />
                        ) : (
                            <FaRegHeart onClick={handleLikeClick} />
                        )}
                        <span>{likes}</span>
                    </div>
                    {isCurrentUser && (
                        <div className="edit-delete-buttons">
                            <button onClick={handleEdit}>수정</button>
                            <button onClick={handleDelete}>삭제</button>
                        </div>
                    )}
                </div>
                <div className="comment-section">
                    <input
                        className="comment-input"
                        placeholder="댓글을 남겨주세요"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <button className="comment-submit" onClick={handleCommentSubmit}>올리기</button>
                </div>
                <div className="comments-list">
                    {filteredComments.map(comment => (
                        <div key={comment.id} className="comment-item">
                            <div style={{ float: 'right' }} onClick={() => handleDeleteComment(comment.id)}>
                                <FaTrashAlt />
                            </div>
                            <div className="comment-author">{comment.name}</div>
                            <div className="comment-text">{comment.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CareerPost;