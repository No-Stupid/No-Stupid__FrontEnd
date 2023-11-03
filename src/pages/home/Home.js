import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import TodoHead from 'components/Home/TodoHead';

import Navbar from 'components/common/navigation'

import {atom, useAtom} from "jotai";

import {HomeLayout} from './style'

import styled from 'styled-components';

import PlusCircle from "components/icons/PlusCircle";
import Underscore from "components/Underscore";
import RemoveIcon from "components/icons/RemoveIcon";
import ReviseIcon from "components/icons/ReviseIcon";



const companyList = [
  {
    name: '아무개 회사 1',
    job: '디자이너',
    Qualification: 'React',
    deadline: {month: 5, day: 10},
    homepage: 'https://aa',
    Salary: 5000,
    ideal: '그랬으면 좋겠다',
    apply: true,
    document: true,
    interview: true,
    questions: '왜 지원하셨습니까',
    retrospect: '회고'
  },
  {
    name: '아무개 회사 2',
    job: '디자이너',
    Qualification: 'React',
    deadline: {month: 5, day: 10},
    homepage: 'https://aa',
    Salary: 5000,
    ideal: '그랬으면 좋겠다',
    apply: false,
    document: true,
    interview: true,
    questions: '왜 지원하셨습니까',
    retrospect: '회고'
  },
  {
    name: '아무개 회사 3',
    job: '디자이너',
    Qualification: 'React',
    deadline: {month: 5, day: 10},
    homepage: 'https://aa',
    Salary: 5000,
    ideal: '그랬으면 좋겠다',
    apply: true,
    document: true,
    interview: true,
    questions: '왜 지원하셨습니까',
    retrospect: '회고',
    pass: true
  }
]

export const infoAtom = atom(companyList)



const menus = [{name: '전체', count: 0}, {name: '지원 완료', count: 0}, {name: '서류 통과', count: 0}, {name: '면접', count: 1}, {name: '최종 합격', count: 0}, {name: '불합격', count: 0}]




const Home= ()=> {
  const navigate = useNavigate();
  const [companies, setCompanies] = useAtom(infoAtom)
  const [menuIndex, setMenuIndex] = React.useState(0);
  const [splitCompanies, setSplitCompanies] = React.useState(companies);
  const [menuList, setMenuList] = React.useState(menus);

  const counting = () => {
    menuList[0].count = companies.length
    menuList[1].count = companies.filter(item => item.apply === true).length
    menuList[2].count = companies.filter(item => item.document === true).length
    menuList[3].count = companies.filter(item => item.interview === true).length
    menuList[4].count = companies.filter(item => item.pass === true).length
    menuList[5].count = companies.filter(item => item.pass === false).length
    setMenuList([...menuList])

  }

  const split = () => {
    if (menuIndex === 0) setSplitCompanies(companies)
    if (menuIndex === 1) setSplitCompanies(companies.filter(item => item.apply === true))
    if (menuIndex === 2) setSplitCompanies(companies.filter(item => item.document === true))
    if (menuIndex === 3) setSplitCompanies(companies.filter(item => item.interview === true))
    if (menuIndex === 4) setSplitCompanies(companies.filter(item => item.pass === true))
    if (menuIndex === 5) setSplitCompanies(companies.filter(item => item.pass === false))
  }

  useEffect(() => {
    counting()
  }, [splitCompanies])

  useEffect(() => {
    split()
  }, [menuIndex, companies])

  const handleDeleteButton = (index) => {
    setCompanies(prev => {
      return prev.filter((_, idx) => idx !== index)
    })
  }

  return (
    <>
    <HomeLayout>
    { /*헤더 부분*/}
      <Container>
        <TodoHead/>
        <MainTab>
          <Ul>
            {menus.map((item, index) => {
              return (
                <Li key={index}>
                  <Button onClick={() => setMenuIndex(index)}>
                    <Counts>
                      <CountBox>{item.count}</CountBox>
                      <Bar visible={index === menus.length - 1 && 'hidden'}/>
                    </Counts>
                    <CountBox>{item.name}</CountBox>
                  </Button>
                </Li>
              )
            })}
          </Ul>
        </MainTab>
      </Container>
        { /*리스트 박스 부분*/}

      <ListBox>
        <ListBoxHead>
          <ListBoxTitle>
            {`${menus[menuIndex].name} 총 ${splitCompanies.length}건`}
          </ListBoxTitle>
          <Button onClick={() => navigate('/writeInfo')}>
            <PlusCircle size={40}/>
          </Button>
        </ListBoxHead>
        <Underscore />
        <ListItemUl>
          {splitCompanies?.map((item, index) => {
            return (
              <ListItemLi key={index}>
                <ListItemDiv>
                  <div>{item.name}</div>
                  <IconBox>
                    <Button onClick={() => navigate(`/modifyInfo/${index}`)}>
                      <ReviseIcon size={20} />
                    </Button>
                    <Button onClick={() => handleDeleteButton(index)}>
                      <RemoveIcon size={20}  />
                    </Button>
                  </IconBox>
                </ListItemDiv>
                <JobContainer>
                  <JobBox>{item.job}</JobBox> <JobBox>|</JobBox> <JobBox>면접</JobBox>
                </JobContainer>
              </ListItemLi>
            )
          })}

        </ListItemUl>
      </ListBox>

<Navbar/>
    </HomeLayout>
    </>
  )
}

const JobContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`

const JobBox = styled.div`
  font-size: 12px;
`

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`


export const Button = styled.button`
  background-color: inherit;
  padding: 0;
`

const ListItemUl = styled.ul`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const ListItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const ListItemLi = styled.li`
  height: 80px;
  padding: 18px 12px;
  background-color: #fff4f1;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #555;
  box-shadow: 1px 3px 3px 1px #aaa;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ListBox = styled.div`

`

const ListBoxHead = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ListBoxTitle = styled.h2`
  font-size: 20px;
`

const Container = styled.div`
  margin-top: 40px;
`

const MainTab = styled.div`
  padding: 8px;
`
const Ul = styled.ul`
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  border: 1px #999 solid;
  padding: 20px;
`
const Li = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;

`

const Counts = styled.div`
  display: flex;
  justify-content: space-around;
  width: 64px;
`

const CountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  font-size: 12px;
`

const Bar = styled.div`
  width: 2px;
  height: 20px;
  background-color: #999;
  visibility: ${(props) => props.visible}
`

export default Home
