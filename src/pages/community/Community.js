import "./Community.css";
import { HomeLayout } from 'pages/home/style';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaArrowLeft, FaCommentDots } from "react-icons/fa";
import axios from 'axios';

function Community() {
  const [bestPosts, setBestPosts] = useState([]);
  const [careerPosts, setCareerPosts] = useState([]);
  const [interviewPosts, setInterviewPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/communityList');
        const allPosts = response.data;

        const bestPosts = allPosts.sort((a, b) => b.likes - a.likes).slice(0, 4);
        const careerPosts = allPosts.filter(post => post.category === '이직, 커리어').slice(0, 4);
        const interviewPosts = allPosts.filter(post => post.category === '면접 후기').slice(0, 4);

        setBestPosts(bestPosts);
        setCareerPosts(careerPosts);
        setInterviewPosts(interviewPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/commentList');
        const comments = response.data;

        const commentCountMap = comments.reduce((acc, comment) => {
          acc[comment.articleId] = (acc[comment.articleId] || 0) + 1;
          return acc;
        }, {});

        setBestPosts(prevPosts => updatePostsWithCommentCount(prevPosts, commentCountMap));
        setCareerPosts(prevPosts => updatePostsWithCommentCount(prevPosts, commentCountMap));
        setInterviewPosts(prevPosts => updatePostsWithCommentCount(prevPosts, commentCountMap));
        setFilteredPosts(prevPosts => updatePostsWithCommentCount(prevPosts, commentCountMap));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const updatePostsWithCommentCount = (posts, commentCountMap) => {
    return posts.map(post => ({
      ...post,
      commentCount: commentCountMap[post.id] || 0
    }));
  };

  useEffect(() => {
    const filtered = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBestPosts(filtered.slice(0, 4));
    setCareerPosts(filtered.filter(post => post.category === '이직, 커리어').slice(0, 4));
    setInterviewPosts(filtered.filter(post => post.category === '면접 후기').slice(0, 4));
  }, [searchQuery, filteredPosts]);

  const CommunityToWrite = () => {
    window.location.href = "./write"
  }

  const navigateToPost = (postId) => {
    window.location.href = `/post?id=${postId}`;
  };

  return (
    <>
      <HomeLayout>
        <div className='CommunityTitleBox'>
          <div className='CommunityBigTitle'>Topic</div>
          <button className='CommunityWriteButton' onClick={CommunityToWrite}>글쓰기</button>
        </div>
        <div className='CommunityUnderline'></div>
        <div className='CommunityInputBox'>
          <input
            className='CommunityInput'
            placeholder='제목으로 검색하세요'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className='CommunityListBox'>
        <div className='CommunityListTitleBox'>
          <div className='CommunityListTitle'>베스트</div>
          <Link to='/best' className='CommunitySeeAll'>전체보기 ></Link>
        </div>
        <div className='CommunityUnderline'></div>
        {bestPosts.map(post => (
          <div
            className='CommunityContent'
            key={post.id}
            onClick={() => navigateToPost(post.id)}
          >
            {post.title}
            <div style={{ float: 'right', width: '120px' }}>
              <FaHeart /> {post.likes} &nbsp;&nbsp;&nbsp;
              <FaCommentDots /> {post.commentCount}
            </div>
          </div>
        ))}
      </div>

      <div className='CommunityListBox'>
        <div className='CommunityListTitleBox'>
          <div className='CommunityListTitle'>이직, 커리어</div>
          <Link to='/communitycareer' className='CommunitySeeAll'>
            전체보기 >
          </Link>
        </div>
        <div className='CommunityUnderline'></div>
        {careerPosts.map(post => (
          <div
            className='CommunityContent'
            key={post.id}
            onClick={() => navigateToPost(post.id, post.category)}
          >
            {post.title}
            <div style={{ float: 'right', width: '120px' }}>
              <FaHeart /> {post.likes} &nbsp;&nbsp;&nbsp;
              <FaCommentDots /> {post.commentCount}
            </div>
          </div>
        ))}
      </div>

      <div className='CommunityListBox'>
        <div className='CommunityListTitleBox'>
          <div className='CommunityListTitle'>면접 후기</div>
          <Link to='/testreview' className='CommunitySeeAll'>
            전체보기 >
          </Link>
        </div>
        <div className='CommunityUnderline'></div>
        {interviewPosts.map(post => (
          <div
            className='CommunityContent'
            key={post.id}
            onClick={() => navigateToPost(post.id, post.category)}
          >
            {post.title}
            <div style={{ float: 'right', width: '120px' }}>
              <FaHeart /> {post.likes} &nbsp;&nbsp;&nbsp;
              <FaCommentDots /> {post.commentCount}
            </div>
          </div>
        ))}
      </div>
      </HomeLayout>
    </>
  )
}

export default Community;
