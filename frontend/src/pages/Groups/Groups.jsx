import React, {useState, useEffect} from 'react';
import {PageContainer, HeaderContainer, HeaderText,
  AddGrpBtn, GroupsContainer, Group, GroupName, GroupMember,
  GroupMembersContainer, MoreMembers, AddGrpOptions, AddGrpBtnContainer,
  AddGrpOption, StyledModal, Backdrop, PopupContainer, PopupInput, PopupBtn,
  PupupText, PopupInputError, PopupInputContainer,
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
  const [popUp, setPopUp] = useState({
    open: false,
    page: '',
    input: '',
  });
  const [newGroup, setNewGroup] = useState({
    data: null,
    isLoading: false,
    error: null,
  });

  const handleClose = () => {
    if (!newGroup.isLoading) {
      setPopUp({input: '', open: false, page: ''});
    }
  };

  const resetNewGroup = () =>
    setNewGroup({
      data: null,
      isLoading: false,
      error: null});

  const setNewGroupData = (data) =>
    setNewGroup({
      data: data,
      isLoading: false,
      error: null});

  const setNewGroupError = (error) =>
    setNewGroup({
      data: null,
      isLoading: false,
      error: error});

  const setNewGroupLoading = () =>
    setNewGroup({
      data: null,
      isLoading: true,
      error: null});

  const getGroups = () => {
    setGroups({...groups, isLoading: true});
    axios.post('http://localhost:8000', {query: GET_GROUPS_QUERY}).then((res) => {
      if (res.data.errors) throw Error('Could not fetch group data');
      console.log(res.data.data.getGroups);
      setGroups({data: res.data.data.getGroups, isLoading: false});
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getGroups();
  }, []);

  const getErrors = (err) => ({
    code: err.extensions.code,
    type: err.extensions.type,
    message: err.message,
  });

  const fetchError =
  {
    code: 'FETCH_ERROR',
    type: 'FETCH_ERROR',
    message: 'Unable to fetch data',
  };

  const joinGroup = async () => {
    setNewGroupLoading();
    axios
        .post('http://localhost:8000',
            {
              query: JOIN_GROUP_MUTATION,
              variables: {code: popUp.input},
            }).then((res) => {
          if (res.data.errors) {
            setNewGroupError(getErrors(res.data.errors[0]));
            return;
          }
          setNewGroupData(res.data.data.joinGroup);
          getGroups();
          handleClose();
        }).catch((error) => {
          console.log(error);
          setNewGroupError(fetchError);
        });
  };

  const createGroup = async () => {
    setNewGroupLoading();
    axios.post('http://localhost:8000', {
      query: CREATE_GROUP_MUTATION,
      variables: {name: popUp.input},
    }).then((res) => {
      if (res.data.errors) {
        setNewGroupError(getErrors(res.data.errors[0]));
        return;
      }
      setNewGroupData(res.data.data.createGroup);
      getGroups();
      setPopUp({...popUp, page: 'GROUP_CODE'});
    }).catch((error) => {
      console.log(error);
      setNewGroupError(fetchError);
    });
  };

  const renderPopupPage = () => {
    switch (popUp.page) {
      case 'CREATE_GROUP':
        return (
          <>
            <div>Please enter a group name</div>
            <PopupInputContainer>
              <PopupInput
                error={newGroup.error ?
                  newGroup.error.code === 'BAD_USER_INPUT': false}
                onChange={(e) => setPopUp({...popUp, input: e.target.value})}>
              </PopupInput>
              <PopupInputError>
                {newGroup.error ? newGroup.error.message : null}
              </PopupInputError>
            </PopupInputContainer>
            <PopupBtn onClick={() => {
              if (!newGroup.isLoading) createGroup();
            }}>
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
            <PopupInputContainer>
              <PopupInput error={newGroup.error ?
                  newGroup.error.code === 'BAD_USER_INPUT': false}
              onChange={(e) => setPopUp({...popUp, input: e.target.value})}>
              </PopupInput>
              <PopupInputError>
                {newGroup.error ? newGroup.error.message : null}
              </PopupInputError>
            </PopupInputContainer>
            <PopupBtn onClick={() => {
              if (!newGroup.isLoading) joinGroup();
            }}>
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
                  resetNewGroup();
                }}>
                  Create group</AddGrpOption>
              <AddGrpOption
                onClick={() => {
                  setPopUp({...popUp, open: true, page: 'JOIN_GROUP'});
                  setOpenGroupOptions(false);
                  resetNewGroup();
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

