
//공통 스타일 


import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset'

//모바일 safari에서 vh를 결정할 때 일부 ui 무시하는 버그가 있어 vh 계산 커스텀
//(1)js에서 innerHeight에 0.01 곱하여 새로운 vh단위 구함
//(2) setProperty를 이용해 새롭게 구한 vh값을 —-vh 변수에 담는다

function setScreenSize(){
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setScreenSize();

//브라우저 사이즈가 변경 될때마다 자동으로 --vh의 크기 변경해주기
window.addEventListener('resize', setScreenSize);


//공통으로 들어갈 css 집가서 확인 후 다시 작성 

const GlobalStyle = createGlobalStyle`
${reset};
*,
*:after,
*:before {
  box-sizing: border-box;
  
}
 html ,body {
    
    margin:0;
    padding:0;
    background-color : #B5B5B5;
    
  }

  a{
    text-decoration:none;
  }

  button{
   
    border: none;
    outline: none;


  }
  


  

`;

export default GlobalStyle;