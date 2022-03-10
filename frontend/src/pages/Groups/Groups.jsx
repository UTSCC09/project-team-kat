import React, {useState, useEffect} from 'react';
import {PageContainer, HeaderContainer, HeaderText,
  AddGrpBtn, GroupsContainer, Group, GroupName, GroupMember,
  GroupMembersContainer, MoreMembers, AddGrpOptions, AddGrpBtnContainer,
  AddGrpOption, StyledModal, Backdrop, PopupContainer, PopupInput, PopupBtn,
  PupupText,
} from './Groups.styles';
import axios from 'axios';
import {GET_GROUPS_QUERY,
  CREATE_GROUP_MUTATION, JOIN_GROUP_MUTATION} from '../../graphql/group.defs';
import ClickAwayListener from '@mui/base/ClickAwayListener';


function Groups() {
  const [groups, setGroups] = useState({
    data: [],
    isLoading: false,
  });
  const [openGroupOptions, setOpenGroupOptions] = useState(false);
  const [popUp, setPopUp] = useState({open: false, page: '', input: ''});
  const [newGroup, setNewGroup] = useState({
    data: null,
    isLoading: false,
  });

  const handleClose = () => {
    if (!newGroup.isLoading) {
      setPopUp({input: '', open: false, page: ''});
    }
  };

  useEffect(() => {
    setGroups({...groups, isLoading: true});
    axios.post('http://localhost:8000', {query: GET_GROUPS_QUERY}).then((res) => {
      if (res.data.errors) throw Error('Could not fetch group data');
      setGroups({data: res.data.data.getGroups, isLoading: false});
    }).catch((error) => {
      console.log(error);
    });
  }, [newGroup]);

  const joinGroup = async () => {
    axios
        .post('http://localhost:8000',
            {
              query: JOIN_GROUP_MUTATION,
              variables: {code: popUp.input},
            }).then((res) => {
          if (res.data.errors) throw Error('Could not fetch group data');
          setNewGroup({data: res.data.data.joinGroup, isLoading: false});
          handleClose();
        }).catch((error) => {
          console.log(error);
        });
  };

  const createGroup = async () => {
    setNewGroup({...groups, isLoading: true});
    axios.post('http://localhost:8000', {
      query: CREATE_GROUP_MUTATION,
      variables: {name: popUp.input},
    }).then((res) => {
      if (res.data.errors) throw Error('Could not fetch group data');
      setNewGroup({data: res.data.data.createGroup, isLoading: false});
      setPopUp({...popUp, page: 'GROUP_CODE'});
    }).catch((error) => {
      console.log(error);
    });
  };

  const renderPopupPage = () => {
    switch (popUp.page) {
      case 'CREATE_GROUP':
        return (
          <>
            <div>Please enter a group name</div>
            <PopupInput
              onChange={(e) => setPopUp({...popUp, input: e.target.value})}>
            </PopupInput>
            <PopupBtn onClick={createGroup}>
              {newGroup.isLoading ? 'Creating Group...' : 'Create Group'}
            </PopupBtn>
          </>
        );
      case 'GROUP_CODE':
        return (
          <>
            <div>Your new group code is:</div>
            <PupupText>{newGroup.data.code}</PupupText>
          </>
        );
      case 'JOIN_GROUP':
        return (
          <>
            <div>Please enter a group code</div>
            <PopupInput
              onChange={(e) => setPopUp({...popUp, input: e.target.value})}>
            </PopupInput>
            <PopupBtn onClick={joinGroup}>
              {newGroup.isLoading ? 'Joining Group...' : 'Join Group'}
            </PopupBtn>
          </>
        );
    }
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <HeaderText>Your Groups</HeaderText>
        <ClickAwayListener onClickAway={() => setOpenGroupOptions(false)}>
          <AddGrpBtnContainer>
            <AddGrpBtn onClick={() => setOpenGroupOptions(true)}>
              Add Group</AddGrpBtn>
            {openGroupOptions ? <AddGrpOptions>
              <AddGrpOption
                onClick={() => {
                  setPopUp({...popUp, open: true, page: 'CREATE_GROUP'});
                  setOpenGroupOptions(false);
                }}>
                  Create group</AddGrpOption>
              <AddGrpOption
                onClick={() => {
                  setPopUp({...popUp, open: true, page: 'JOIN_GROUP'});
                  setOpenGroupOptions(false);
                }}>Join group</AddGrpOption>
            </AddGrpOptions> : null}
          </AddGrpBtnContainer>
        </ClickAwayListener>
      </HeaderContainer>
      <GroupsContainer>
        {groups.isLoading ?
        <div>Loading...</div> :
        (groups.data.length === 0 ?
        <div>No groups found</div> :
          groups.data.map((group) => (
            <Group key={group.id}>
              <GroupName>
                {group.name}
              </GroupName>
              <GroupMembersContainer>
                {group.members.map((member, index) => (
                index <= 3?
                <GroupMember key={member.id}>{member.username}</GroupMember> :
                null
                ))}
                {group.members.length > 3 ?
                (<MoreMembers>...</MoreMembers>) :
                null}
              </GroupMembersContainer>
            </Group>
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
  );
}

export default Groups;

