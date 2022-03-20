import styled from 'styled-components';

export const GroupsFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 40px 0;
    position:fixed;
    bottom:0;
`;

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
    display: flex;
    gap: 10px;
`;

export const AddGrpBtn = styled.button`
    background-color: white;
    font-family: inherit;    
    font-size: 24px;
    padding: 15px;
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
`;

export const GroupItemsContainer = styled.div`
display: flex;
width: 100%;
gap: 15px;
flex-wrap: wrap;
@media (max-width: 885px) {
    justify-content: space-around;
  }
`;

export const Group = styled.div`
background-color: black;
width: 32.8%;
padding: 20px;
display: flex;
min-width: 400px;
flex-direction: column;
border-radius: 20px;
overflow: hidden;
cursor: pointer;
`;

export const GroupName = styled.div`
    font-family: inherit;
    font-size: 28px;
    color: white;
`;

export const GroupMembersContainer = styled.div`
display: flex;
flex-wrap: wrap;
`;

export const GroupMember = styled.div`
background-color: transparent;
font-family: inherit;    
font-size: 18px;
padding: 10px;
margin-top: 25px;
border: 2px solid white;
border-radius: 78px;
color: white;

&:not(:last-child){
    margin-right: 20px;
}
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

export const NewGroupCode = styled.div`
    margin-top: 25px;
    border: 2px dotted black;
    padding: 15px;
`;
