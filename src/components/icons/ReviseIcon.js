import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Revise} from 'assets/icon/revise.svg';


//삭제하는 함수
const ReviseIcon = (props) =>{
  return (
    <Revise width={props.size} height={props.size}/>
  );
};

export default ReviseIcon

