import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HomeLayout } from "pages/home/style";
import { FaPlus, FaPenAlt, FaTrashAlt } from "react-icons/fa";
import TodoHead from 'components/Home/TodoHead';
import styled from 'styled-components';
import Underscore from 'components/Underscore';

const Home = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [menuIndex, setMenuIndex] = useState(0);
  const [splitCompanies, setSplitCompanies] = useState([]);
  const [menuList, setMenuList] = useState([
    { name: '전체', count: 0 },
    { name: '지원 완료', count: 0 },
    { name: '서류 통과', count: 0 },
    { name: '면접', count: 1 },
    { name: '최종 합격', count: 0 },
    { name: '불합격', count: 0 },
  ]);
  const storedName = localStorage.getItem('name');

  const storedId = localStorage.getItem('id');
  if (!storedId) {
      navigate('/login');
  }

  const counting = () => {
    const newMenuList = [...menuList];
    newMenuList[0].count = companies.length;
    newMenuList[1].count = companies.filter((item) => item.applyCheck === "true").length;
    newMenuList[2].count = companies.filter((item) => item.documentCheck === "true").length;
    newMenuList[3].count = companies.filter((item) => item.interviewCheck === "true").length;
    newMenuList[4].count = companies.filter((item) => item.pass === "true").length;
    newMenuList[5].count = companies.filter((item) => item.pass == "false" || item.documentCheck === "false" || item.interviewCheck === "false").length;

    setMenuList(newMenuList);
  };

  const split = () => {
    if (menuIndex === 0) setSplitCompanies(companies);
    if (menuIndex === 1) setSplitCompanies(companies.filter((item) => item.applyCheck === "true"));
    if (menuIndex === 2) setSplitCompanies(companies.filter((item) => item.documentCheck === "true"));
    if (menuIndex === 3) setSplitCompanies(companies.filter((item) => item.interviewCheck === "true"));
    if (menuIndex === 4) setSplitCompanies(companies.filter((item) => item.pass === "true"));
    if (menuIndex === 5) setSplitCompanies(companies.filter((item) => item.pass !== "true" && (item.documentCheck === "false" || item.interviewCheck === "false")));
  };

  useEffect(() => {
    counting();
    split();
  }, [menuIndex, companies]);

  useEffect(() => {
    split();
  }, [menuIndex, companies]);

  const handleDeleteButton = async (index, applyInfoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/applyInfo/delete/${applyInfoId}`);
      alert("삭제가 완료되었습니다.");
      setCompanies((prev) => prev.filter((_, idx) => idx !== index));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/applyList');
            const filteredData = response.data.filter(item => item.member == storedId);
            
            setCompanies(filteredData);
        } catch (error) {
            console.error(error);
        }
    };

    if (storedId) {
        fetchData();
    }
}, [storedId]);

  return (
    <>
      <HomeLayout>
        <Container>
          <TodoHead />
          <MainTab>
            <Ul>
              {menuList.map((item, index) => {
                return (
                  <Li key={index}>
                    <Button onClick={() => setMenuIndex(index)}>
                      <Counts>
                        <CountBox>{item.count}</CountBox>
                        <Bar visible={index === menuList.length - 1 && 'hidden'} />
                      </Counts>
                      <CountBox>{item.name}</CountBox>
                    </Button>
                  </Li>
                );
              })}
            </Ul>
          </MainTab>
        </Container>

        <ListBox>
          <ListBoxHead>
            <ListBoxTitle>{`${menuList[menuIndex].name} 총 ${splitCompanies.length}건`}</ListBoxTitle>
            <Button onClick={() => navigate('/writeInfo')}>
              <FaPlus />
            </Button>
          </ListBoxHead>
          <Underscore />

          <ListItemUl>
            {splitCompanies?.map((item, index) => {
              return (
                <ListItemLi key={index}>
                  <ListItemDiv>
                    <div>{item.companyName}</div>
                    <IconBox>
                      <Button onClick={() => navigate(`/writeInfo?id=${item.id}`)}>
                        <FaPenAlt />
                      </Button>
                      <Button onClick={() => handleDeleteButton(index, item.id)}>
                        <FaTrashAlt />
                      </Button>
                    </IconBox>
                  </ListItemDiv>
                  <JobContainer>
                    <JobBox>{item.role}</JobBox> <JobBox>|</JobBox> <JobBox>면접</JobBox>
                  </JobContainer>
                </ListItemLi>
              );
            })}
          </ListItemUl>
        </ListBox>
      </HomeLayout>
    </>
  );
};

const JobContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const JobBox = styled.div`
  font-size: 12px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Button = styled.button`
  background-color: inherit;
  padding: 0;
`;

const ListItemUl = styled.ul`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ListItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ListItemLi = styled.li`
  box-shadow: 0px 2px 4px 0px #eae5ec;
  padding: 18px 12px;
  border: 1px solid #eee;
  border-radius: 2px;
`;

const ListBox = styled.div``;

const ListBoxHead = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListBoxTitle = styled.h2`
  font-size: 20px;
`;

const Container = styled.div`
  margin-top: 40px;
`;

const MainTab = styled.div`
`;

const Ul = styled.ul`
  margin: 20px 0;
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 4px 0px #eae5ec;
  padding : 10px 5px;
  border: 1px solid #eee;
  border-radius: 2px;
  overflow-x: auto;
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Counts = styled.div`
  display: flex;
  justify-content: space-around;
  width: 64px;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  font-size: 12px;
`;

const Bar = styled.div`
  width: 2px;
  height: 20px;
  background-color: #999;
  visibility: ${(props) => props.visible};
`;

export default Home;
