import React from 'react';

import {ReactComponent as GoBack} from 'assets/icon/GoBackButton.svg';


//삭제하는 함수
const GoBackIcon = (props) =>{
  return (
    <GoBack width={props.size} height={props.size}/>
  );
};

export default GoBackIcon
