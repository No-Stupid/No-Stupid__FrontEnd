import styled from 'styled-components';
import {Layout} from '../../components/common/Layout'




export const EventColorContainer = styled.div`
  display: flex;
  margin: 16px;
  align-items: center;
  cursor: pointer;
`;

export const EventColorLabel = styled.div`
  flex: 1 0 auto;
`;

export const EventColorCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 10px;
  margin-left: 240px;
  background: #5ac8fa;
`;

export const CrudColorRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px;
`;

export const CrudColorContainer = styled.div`
  padding: 3px;
  margin: 2px;
`;

export const CrudColorCircle = styled.div`
  position: relative;
  min-width: 46px;
  min-height: 46px;
  margin: 2px;
  cursor: pointer;
  border-radius: 23px;
  background: #5ac8fa;

  &.selected,
  &:hover {
    box-shadow: inset 0 0 0 3px #007bff;
    border-radius: 48px;
  }

  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10px;
    margin-left: -10px;
    color: #f7f7f7;
    font-size: 20px;
    text-shadow: 0 0 3px #000;
    display: none;
  }

  &.selected:before {
    display: block;
  }
`;


