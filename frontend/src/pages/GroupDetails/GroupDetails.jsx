import React, { useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener';

import {PageContainer, HeaderContainer, HeaderText,
    AddGrpBtn, MoreMembers, AddGrpOptions, AddGrpBtnContainer,
    AddGrpOption, StyledModal, Backdrop, PopupContainer, PopupInput, PopupBtn,
    PupupText, PopupInputError, PopupInputContainer
  } from '../Groups/Groups.styles.jsx';

import {GroupsContainer, Transaction, TransactionCost, GroupMember,
    GroupMembersContainer, TransactionLogger, TagHeader, PopupInputLabel} from './GroupDetails.styles'

function GroupDetails() {

    const [popUp, setPopUp] = useState({
        open: false,
        page: '',
        input: '',
    });

    const mockGroup = {
        name: "Homies V2",
        isLoading: false,
        transactions: [
            {
                cost: "$25.23",
                name: "Groceries",
                user: "keshavaa",
                tags: ["Grocery"]
            }, 
            {
                cost: "$30.23",
                name: "Gas Bill",
                user: "Ammar",
                tags: ["Bills"]
            },
            {
                cost: "$3000",
                name: "Rent",
                user: "keshavaa",
                tags: ["Rent"]
            }
        ]
    }

    const handleClose = () => {
        setPopUp({input: '', open: false, page: ''});
      };

    const renderPopupPage = () => {
            return (
              <>
                <div>Please enter the cost's name</div>
                <PopupInputContainer>
                  <PopupInput
                    onChange={(e) => setPopUp({...popUp, input: e.target.value})}>
                  </PopupInput>
                  {/* <PopupInputError>
                    {newGroup.error ? newGroup.error.message : null}
                  </PopupInputError> */}
                </PopupInputContainer>
                <PopupInputLabel>Please enter the cost's amount (numerical value)</PopupInputLabel>
                <PopupInputContainer>
                  <PopupInput
                    onChange={(e) => setPopUp({...popUp, input: e.target.value})}>
                  </PopupInput>
                  {/* <PopupInputError>
                    {newGroup.error ? newGroup.error.message : null}
                  </PopupInputError> */}
                </PopupInputContainer>
                <PopupBtn onClick={() => {
                //   if (!newGroup.isLoading) createGroup();
                }}>
                  {/* {newGroup.isLoading ? 'Creating Group...' : 'Create Group'} */}
                </PopupBtn>
              </>
            );
        };


  return (
    <PageContainer>
      <HeaderContainer>
        <HeaderText>{mockGroup.name}</HeaderText>
          <AddGrpBtnContainer>
            <AddGrpBtn onClick={() => {
              setPopUp({...popUp, open: true, page: 'JOIN_GROUP'});
            }}>
              Add Cost</AddGrpBtn>
          </AddGrpBtnContainer>
      </HeaderContainer>
      <GroupsContainer>
      {mockGroup.isLoading ?
        <div>Loading...</div> :
        (mockGroup.transactions.length === 0 ?
        <div>No groups found</div> :
        mockGroup.transactions.map((transaction) => (
            <Transaction >
              <TransactionCost>
                {transaction.name} - {transaction.cost}
              </TransactionCost>
              <TransactionLogger>
                  Created by: {transaction.user}
              </TransactionLogger>
              <GroupMembersContainer>
                  <TagHeader>Tagged With: </TagHeader>
                  <GroupMember >{transaction.tags[0]}</GroupMember>
              </GroupMembersContainer>
            </Transaction>
          )))}
      </GroupsContainer>
      <StyledModal
        open={popUp.open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <PopupContainer>
          {renderPopupPage()}
        </PopupContainer>
      </StyledModal>
    </PageContainer>
  )
}

export default GroupDetails