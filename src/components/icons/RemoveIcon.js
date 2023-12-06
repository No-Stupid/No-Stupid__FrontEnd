import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Remove} from 'assets/icon/trashcan.svg';


//삭제하는 함수
const RemoveIcon = (props) =>{
  return (
    <Remove width={props.size} height={props.size}/>
  );
};

export default RemoveIcon







