import React, { useState, useEffect } from 'react';
import { HomeLayout } from 'pages/home/style';
import axios from 'axios';
import "./Write.css";

function Write() {
  const [category, setCategory] = useState('이직, 커리어');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postId, setPostId] = useState(null);
  const member = localStorage.getItem('id');

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        if (postId) {
          setPostId(postId);

          const response = await axios.get(`http://localhost:8080/api/communityList`);
          const postDataArray = response.data;

          const postData = postDataArray.find(item => item.id === parseInt(postId, 10));

          if (postData) {
            setCategory(postData.category);
            setTitle(postData.title);
            setContent(postData.desc);
          } else {
            console.error(`Post with id ${postId} not found`);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommunityData();
  }, []);

  const handlePostSubmit = async () => {
    const member = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const likes = 0;
    const views = 0;
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const postData = {
      category,
      title,
      name,
      desc: content,
      member,
      likes,
      views,
      created_at: createdAt,
      updated_at: updatedAt,
    };

    try {
      if (postId) {
        await axios.put(`http://localhost:8080/api/community/edit/${postId}`, postData);
      } else {
        await axios.post(`http://localhost:8080/api/community/${member}`, postData);
      }

      window.location.href = '/community';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <HomeLayout>
        <div className='WriteTitleBox'>
          <div className='WriteTitle'>글쓰기</div>
          <button className='WriteButton' onClick={handlePostSubmit}>
            {postId ? '수정' : '완료'}
          </button>
        </div>
        <div className='CommunityUnderline'></div>
        <div className='WriteBox'>
          <select
            className='WriteSmallTitle'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>이직, 커리어</option>
            <option>면접 후기</option>
          </select>
          <input
            className='WriteSmallTitle'
            placeholder='제목'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className='CommunityUnderline'></div>
          <input
            className='WriteContent'
            placeholder='내용을 입력하세요'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </HomeLayout>
    </>
  );
}

export default Write;
