import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;

  border: 1px solid black;
  width: 80%;
  min-height: 50vh;
  margin: 10vh auto;
`;
export const CurrentDayBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;

  padding: 40px 20px;
  margin-right: 30px;
  border-right: 1px solid black;
`;
export const WeekBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  max-width: 50%;
  padding-top: 100px;
`;

export const CityBlock = styled.div``;
export const City = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: bold;
  font-family: sans-serif;
`;
export const CurrentDayInfoBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CurrentDayInfo = styled.div``;

export const WeekIcons = styled.div`
  display: flex;
`;

export const WeekElement = styled.div`
  margin-right: 10px;
`;

export const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }`;

export const LoaderWrapper = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #000000;
    border-color: #000000 transparent #000000 transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`;
