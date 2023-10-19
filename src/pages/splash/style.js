import styled from 'styled-components'
import {Layout} from '../../components/common/Layout'


const TrailsText = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  line-height: 80px;
  color: black;
  font-size: 2em;
  font-weight: 800;
  letter-spacing: -0.05em;
  will-change: transform, opacity;
  overflow: hidden;

  > div{
    padding-right: 0.05em;
  overflow: hidden;
  }
`;



const Container = styled(Layout)`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const SplashTextBox= styled.div`

position: relative;
top :-100px;

`;

const ButtonContainer = styled.div`
display: flex;
align-items: center;
  justify-content: center;
  height: 100%;

`;

const Button= styled.button`
font-size: 30px;
border: 3px solid #8C8C8C;
padding: 5px 60px;
border-radius: 30px;
transition: 0.3s;
background-color: transparent;
letter-spacing: 2px;
overflow: hidden;
position: relative;
transition: all 0.4s;
cursor: pointer;


&:focus{
  outline: none;
  
}
&::before{
  content: '';
  position: absolute;
  left: 0px;
  bottom:0px;
  z-index:-1;
  width: 100%;
  height:100%;
  background: transparent;
  box-shadow: inset 0px 0px 0px #6098FF;
  display: block;
  -webkit-transition: all 0.4s cubic-bezier(.5, .24, 0, 1);
  transition: all 0.4s cubic-bezier(.5, .24, 0, 1)
}
  
}

&:hover::before{
  box-shadow: inset 300px 0px 10px #6098FF;

  
  
}

&:hover{
  color:transparent;
}


`;

export{
  TrailsText,
  Container,
  SplashTextBox,
  ButtonContainer,
  Button
}