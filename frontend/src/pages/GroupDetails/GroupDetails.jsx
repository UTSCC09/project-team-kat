import React, {useState} from 'react';

import {PageContainer, HeaderContainer, HeaderText,
  AddGrpBtn, AddGrpBtnContainer, PopupInput, PopupBtn, PopupInputContainer,
} from '../Groups/Groups.styles.jsx';

import {GroupsContainer, Transaction, TransactionCost, Tag,
  GroupMembersContainer, TransactionLogger, PopupInputLabel,
} from './GroupDetails.styles';

import PopUp from '../../components/PopUp/PopUp.jsx';

function GroupDetails() {
  const [popUp, setPopUp] = useState({
    page: '',
    input: '',
  });

  const mockGroup = {
    name: 'Homies V2',
    isLoading: false,
    transactions: [
      {
        id: 'a',
        cost: '$25.23',
        name: 'Groceries',
        user: 'keshavaa',
        tags: ['Grocery'],
      },
      {
        id: 'b',
        cost: '$30.23',
        name: 'Gas Bill',
        user: 'Ammar',
        tags: ['Bills'],
      },
      {
        id: 'c',
        cost: '$3000',
        name: 'Rent',
        user: 'keshavaa',
        tags: ['Rent'],
      },
    ],
  };

  const handleClose = () => {
    setPopUp({input: '', page: ''});
  };

  const renderPopupPage = () => {
    return (
      <>
        <div>{'Please enter the cost\'s name'}</div>
        <PopupInputContainer>
          <PopupInput
            onChange={(e) => setPopUp({...popUp, input: e.target.value})}>
          </PopupInput>
          {/* <PopupInputError>
                    {newGroup.error ? newGroup.error.message : null}
                  </PopupInputError> */}
        </PopupInputContainer>
        <PopupInputLabel>
          {'Please enter the cost\'s amount (numerical value)'}
        </PopupInputLabel>
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
            setPopUp({...popUp, page: 'JOIN_GROUP'});
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
          <Transaction key={transaction.id}>
            <TransactionCost>
              {transaction.name} - {transaction.cost}
            </TransactionCost>
            <TransactionLogger>
                  Created by: {transaction.user}
            </TransactionLogger>
            <GroupMembersContainer>
              <Tag >{transaction.tags[0]}</Tag>
            </GroupMembersContainer>
          </Transaction>
        )))}
      </GroupsContainer>
      <PopUp
        open={popUp.page ? true : false}
        onClose={handleClose}
      >
        {renderPopupPage()}
      </PopUp>
    </PageContainer>
  );
}

export default GroupDetails;
