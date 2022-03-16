import React, {useState, useEffect} from 'react';
import {PageContainer, HeaderContainer, HeaderText, GroupsContainer,
  Group, GroupName, GroupMember, GroupMembersContainer, MoreMembers,
  AddGrpOptions, AddGrpBtnContainer, AddGrpOption, NewGroupCode, GroupsFooter,
  GroupItemsContainer,
} from './Groups.styles';
import axios from 'axios';
import {GET_GROUPS_QUERY,
  CREATE_GROUP_MUTATION, JOIN_GROUP_MUTATION} from '../../graphql/group.defs';

import ClickAwayListener from '@mui/base/ClickAwayListener';
import Pagination from '@mui/material/Pagination';
import PopUp from '../../components/PopUp/PopUp';
import AddGroupForm from '../../components/AddGroupForm/AddGroupForm';
import AddItemBtn from '../../components/AddItemBtn/AddItemBtn';


function Groups() {
  const [groups, setGroups] = useState({
    data: [],
    totalItems: 0,
    isLoading: false,
    error: '',
  });
  const [groupPage, setGroupPage] = useState(1);
  const [popUp, setPopUp] = useState({
    page: '',
    input: '',
  });
  const [newGroup, setNewGroup] = useState({
    data: null,
    isLoading: false,
    error: '',
  });

  const groupsPerPage = 6;

  const [openGroupOptions, setOpenGroupOptions] = useState(false);

  const fetchError = 'Failed to fetch data';

  const handleClosePopUp = () => {
    if (!newGroup.isLoading) {
      setPopUp({input: '', page: ''});
    }
  };

  const handleGroupPageChange = (event, value) => {
    setGroupPage(value);
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
    setGroups({...groups, isLoading: true, error: ''});
    axios.post(
        'http://localhost:8000',
        {
          query: GET_GROUPS_QUERY,
          variables: {limit: groupsPerPage, skip: groupPage - 1},
        },
    ).then((res) =>
      res.data.errors ?
        setGroups({data: [], isLoading: false,
          error: res.data.errors[0].message}) :
      setGroups({data: res.data.data.getGroups.data, isLoading: false,
        error: '', totalItems: res.data.data.getGroups.totalItems}))
        .catch((error) => {
          console.log(error);
          setGroups({data: [], isLoading: false,
            error: fetchError, totalItems: 0});
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
  }, [groupPage]);

  const renderPopupPage = () => {
    switch (popUp.page) {
      case 'CREATE_GROUP':
        return (
          <AddGroupForm
            header={'Please enter a group name'}
            inputError={newGroup.error}
            handleInputChange={(e) =>
              setPopUp({...popUp, input: e.target.value})}
            handleBtnClick={() => {
              if (!newGroup.isLoading) createGroup();
            }}
            btnText={newGroup.isLoading ? 'Creating Group...' : 'Create Group'}
          />
        );
      case 'GROUP_CODE':
        return (
          <>
            <div>Your new group code is:</div>
            <NewGroupCode>{newGroup.data.code}</NewGroupCode>
          </>
        );
      case 'JOIN_GROUP':
        return (
          <AddGroupForm
            header={'Please enter a group code'}
            inputError={newGroup.error}
            handleInputChange={(e) =>
              setPopUp({...popUp, input: e.target.value})}
            handleBtnClick={() => {
              if (!newGroup.isLoading) joinGroup();
            }}
            btnText={newGroup.isLoading ? 'Joining Group...' : 'Join Group'}
          />
        );
    }
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <HeaderText>Your Groups</HeaderText>
        <ClickAwayListener onClickAway={() => setOpenGroupOptions(false)}>
          <AddGrpBtnContainer>
            <AddItemBtn
              handleOnClick={() => setOpenGroupOptions(true)}
              text={'Add Group'}/>
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
        <GroupItemsContainer>
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
        </GroupItemsContainer>
      </GroupsContainer>
      <GroupsFooter>
        <Pagination count={Math.ceil(groups.totalItems/groupsPerPage)}
          onChange={handleGroupPageChange}/>
      </GroupsFooter>
      <PopUp
        open={popUp.page ? true : false} handleClose={handleClosePopUp}>
        {renderPopupPage()}
      </PopUp>
    </PageContainer>
  );
}

export default Groups;

