import styled from 'styled-components';
import star from '../images/star.png';

export const MainDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 17.546%; 
  left: 0px;
  top: 0px;
  z-index: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #FFFFFF;

  @media(max-width: 1024px) {
    justify-content: flex-start;
  }
`;

export const ProfilePic = styled.img`
  width: 5%;
  height: auto;
  margin-right: 2.5%;
  border-radius: 50%;

  @media(max-width: 1024px) {
    width: 0%;
  }
`;

export const NameP = styled.p`
  width: 5%;

  font-family: Epilogue;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  margin-right: 5%

  display: flex;
  align-items: center;

  color: #000000;

  @media(max-width: 1024px) {
    width: 0px;
    height: 0px;
    font-size: 0px;
  }
`;

export const StarDiv = styled.div`
  width: 5%;
  height: 35%;

  background-image: url(${star});
  background-size: contain;
  background-repeat: no-repeat;

  @media(max-width: 1024px) {
    width: 15%;
    height: 30%;
    font-size: 0px;
  }
`;

export const ScoreDiv = styled.div`
  width: 5%;
  margin-right: 10%;

  display: flex;
  align-items: center;
`;
