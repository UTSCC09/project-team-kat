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
    error: '',
  });
  const [popUp, setPopUp] = useState({
    page: '',
    input: '',
  });
  const [newGroup, setNewGroup] = useState({
    data: null,
    isLoading: false,
    error: '',
  });

  const [openGroupOptions, setOpenGroupOptions] = useState(false);

  const fetchError = 'Failed to fetch data';

  const handleClosePopUp = () => {
    if (!newGroup.isLoading) {
      setPopUp({input: '', page: ''});
    }
  };

  const resetNewGroup = () =>
    setNewGroup({
      data: null,
      isLoading: false,
      error: ''});

  const setNewGroupData = (data) =>
    setNewGroup({
      data: data,
      isLoading: false,
      error: ''});

  const setNewGroupError = (error) =>
    setNewGroup({
      data: null,
      isLoading: false,
      error: error});

  const setNewGroupLoading = () =>
    setNewGroup({
      data: null,
      isLoading: true,
      error: ''});

  const handleAddGrpOptionClick = (popUpPage) => {
    setPopUp({input: '', page: popUpPage});
    setOpenGroupOptions(false);
    resetNewGroup();
  };

  const getGroups = () => {
    setGroups({data: [], isLoading: true, error: ''});
    axios.post(
        'http://localhost:8000',
        {
          query: GET_GROUPS_QUERY,
        },
    ).then((res) =>
      res.data.errors ?
        setGroups({data: [], isLoading: false,
          error: res.data.errors[0].message}) :
      setGroups({data: res.data.data.getGroups, isLoading: false, error: ''}))
        .catch((error) => {
          console.log(error);
          setGroups({data: [], isLoading: false, error: fetchError});
        });
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
            setNewGroupError(res.data.errors[0].message);
            return;
          }
          setNewGroupData(res.data.data.joinGroup);
          getGroups();
          handleClosePopUp();
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
        setNewGroupError(res.data.errors[0].message);
        return;
      }
      setNewGroupData(res.data.data.createGroup);
      getGroups();
      setPopUp({input: '', page: 'GROUP_CODE'});
    }).catch((error) => {
      console.log(error);
      setNewGroupError(fetchError);
    });
  };


  useEffect(() => {
    getGroups();
  }, []);

  const renderPopupPage = () => {
    switch (popUp.page) {
      case 'CREATE_GROUP':
        return (
          <>
            <div>Please enter a group name</div>
            <PopupInputContainer>
              <PopupInput
                error={newGroup.error}
                onChange={(e) => setPopUp({...popUp, input: e.target.value})}>
              </PopupInput>
              {
                newGroup.error ?
                <PopupInputError>
                  {newGroup.error}
                </PopupInputError> :
                null
              }
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
              <PopupInput error={newGroup.error}
                onChange={(e) => setPopUp({...popUp, input: e.target.value})}>
              </PopupInput>
              {
                newGroup.error ?
                <PopupInputError>
                  {newGroup.error}
                </PopupInputError> :
                null
              }
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
            {
              openGroupOptions ?
              <AddGrpOptions>
                <AddGrpOption
                  onClick={() => handleAddGrpOptionClick('CREATE_GROUP')}>
                    Create group</AddGrpOption>
                <AddGrpOption
                  onClick={() => handleAddGrpOptionClick('JOIN_GROUP')}>
                      Join group
                </AddGrpOption>
              </AddGrpOptions> :
              null
            }
          </AddGrpBtnContainer>
        </ClickAwayListener>
      </HeaderContainer>
      <GroupsContainer>
        {
          groups.isLoading ?
          <div>Loading...</div> :
          (
            groups.error ?
            <div>{groups.error}</div> :
            (
              groups.data.length === 0 ?
              <div>No groups found</div> :
              groups.data.map((group) => (
                <Group key={group.id}>
                  <GroupName>
                    {group.name}
                  </GroupName>
                  <GroupMembersContainer>
                    {
                      group.members.map((member, index) => (
                      index <= 3?
                      <GroupMember key={member.id}>
                        {member.username}
                      </GroupMember> :
                      null
                      ))
                    }
                    {
                      group.members.length > 3 ?
                      <MoreMembers>...</MoreMembers> :
                      null
                    }
                  </GroupMembersContainer>
                </Group>
              ))
            )
          )
        }
      </GroupsContainer>
      <StyledModal
        open={popUp.page ? true : false}
        onClose={handleClosePopUp}
        BackdropComponent={Backdrop}
      >
        {
          <PopupContainer>
            {renderPopupPage()}
          </PopupContainer>
        }
      </StyledModal>
    </PageContainer>
  );
}

export default Groups;

