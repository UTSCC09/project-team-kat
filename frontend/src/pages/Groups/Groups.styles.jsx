import styled from 'styled-components';
import ModalUnstyled from '@mui/base/ModalUnstyled';

export const PageContainer = styled.div`
    margin: 40px;
    font-family: "Comfortaa", cursive;
`;

export const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderText = styled.div`
    font-size: 36px;
`;

export const AddGrpBtnContainer = styled.div`
    position: relative;
`;

export const AddGrpBtn = styled.button`
    background-color: white;
    font-family: inherit;    
    font-size: 24px;
    padding: 40px;
    border: 2px solid black;
    border-radius: 78px;
    transition: all 0.2s;

    &:hover{
        cursor: pointer; 
    }
`;

export const AddGrpOptions = styled.div`
    position: absolute;
    right: 50%;
    transform: translateX(50%);
    top: 100%;
    width: 70%;
    background-color: white;
    border-radius:  5px;
    margin-top: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: left;
`;

export const AddGrpOption = styled.button`
    background-color: white;
    color: black;
    font-family: inherit;
    font-size: 14px;
    padding: 10px;
    transition: all 0.2s;
    border: none;

    &:hover{
        background-color: gray;
        color: white;
        cursor: pointer;
    }
`;

export const GroupsContainer = styled.div`
margin-top: 40px;
display: flex;
width: 100%;
justify-content: space-between;
flex-wrap: wrap;
`;

export const Group = styled.div`
background-color: black;
width: 49.5%;
margin-bottom: 1%;
padding: 40px;
display: flex;
flex-direction: column;
border-radius: 20px;
overflow: hidden;
`;

export const GroupName = styled.div`
    font-family: inherit;
    font-size: 36px;
    color: white;
`;

export const GroupMembersContainer = styled.div`
display: flex;
flex-wrap: wrap;
`;

export const GroupMember = styled.div`
background-color: transparent;
font-family: inherit;    
font-size: 24px;
padding: 20px;
margin-top: 25px;
border: 2px solid white;
border-radius: 78px;
color: white;

&:not(:last-child){
    margin-right: 20px;
}
`;

export const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
`;

export const MoreMembers = styled.div`
background-color: transparent;
font-family: inherit;    
font-size: 24px;
padding: 20px 30px;
margin-top: 25px;
border: 2px solid white;
border-radius: 78px;
color: white;
`;


export const PopupContainer = styled.div`
    display: flex;
    font-family: "Comfortaa", cursive;
    flex-direction: column;
    font-size: 22px;
    text-align: center;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    padding: 50px;
    max-width: 650px;
    flex: 1;
`;

export const PopupBtn = styled.button`
    margin-top: 50px;
    background-color: white;
    font-family: inherit;
    font-size: 18px;
    padding: 15px;
    border: 1px solid black;
    border-radius: 78px;
    transition: all 0.2s;

    &:hover{
        cursor: pointer;
        background-color: black;
        color: white;
    }

    &:not(:last-child){
        margin-right: 10px;
    }
`;

export const PopupInputContainer = styled.div`
    width: 100%;
    position: relative;
`;

export const PopupInput = styled.input`
    max-width: 700px;
    width: 80%;
    border: none;
    border-bottom: 2px solid ${(props) => props.error ? 'red' : 'black'};
    outline: none;
    background-color: white;
    font-family: "Comfortaa", cursive;
    font-size: 30px;
    margin-top: 30px;
    color: ${(props) => props.error ? 'red' : 'black'};
`;

export const PopupInputError = styled.div`
     position: absolute;
     text-align: center;
     color: red;
     bottom: -30px;
     left: 50%;
     transform: translateX(-50%);
     width: 100%;
`;

export const PupupText = styled.div`
    margin-top: 20px;
    border: 2px dotted black;
    padding: 10px;
`;
