//fonts-size 여기는 사용하고 다시 적는걸로 

export const fonts ={
  font26: `
  font-weight: 700;
  font-size: 26px;
`,
font24: `
  font-weight: 700;
  font-size: 24px;
`,
font20: `
  font-weight: 600;
  font-size: 20px;
`,
font18: `
 font-weight: 500;
 font-size: 18px;
`

}


//colors -> 전제 배경 색 정해야함 
export const colors={
  black: '#000000',
  gray : '#A39C9C',
  background: '#808080'
}

const theme={
  fonts,
  colors
};
export default theme;