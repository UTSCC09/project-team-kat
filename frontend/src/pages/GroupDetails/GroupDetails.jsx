import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {PageContainer, HeaderContainer, HeaderText,
  AddGrpBtn, AddGrpBtnContainer, GroupsFooter,
} from '../Groups/Groups.styles.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import {GroupsContainer} from './GroupDetails.styles';

import PopUp from '../../components/PopUp/PopUp.jsx';
import Cost from '../../components/Cost/Cost';
import Pagination from '@mui/material/Pagination';
import AddCostForm from '../../components/AddCostForm/AddCostForm.jsx';
import costsAPI from '../../api/costs.api.js';
import groupsAPI from '../../api/groups.api.js';

import {Link, Breadcrumbs} from '@mui/material';

function GroupDetails({auth}) {
  const {id} = useParams();
  const navigate = useNavigate();
  const pageSize = 9;

  const [loading, setLoading] = useState(true);

  const [group, setGroup] = useState({});
  const [costs, setCosts] = useState([]);
  const [totalCosts, setTotalCosts] = useState(0);
  const [costPage, setCostPage] = useState(1);

  const [newCost, setNewCost] = useState({
    data: null,
    isLoading: false,
    error: '',
  });

  const [popUp, setPopUp] = useState({
    page: '',
    input: '',
  });

  useEffect(async () => {
    await loadCosts();
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCosts();
  }, [costPage]);

  const loadCosts = async () => {
    const rawGroup = await groupsAPI.getGroup(id);
    const group = rawGroup.data.data.getGroup;

    const costs = [];
    const rawCosts = await costsAPI
        .getPaginatedCostsByGroup(id, pageSize, costPage - 1);

    rawCosts.data.data.getPaginatedCostsByGroup.data.map((rawCost) => {
      const ownerId = rawCost.ownerId;
      const ownerName = group.members.find((mem) => mem.id == ownerId).username;
      costs.push({...rawCost, owner: ownerName});
    });

    setTotalCosts(rawCosts.data.data.getPaginatedCostsByGroup.totalItems);
    setGroup(group);
    setCosts(costs);
  };

  const handleCostPageChange = (_event, value) => {
    setCostPage(value);
  };

  const handleClose = () => {
    setPopUp({input: '', page: ''});
    setNewCost({...newCost, error: ''});
  };

  const createCost = async () => {
    const cost = newCost.data;

    if (!cost || !cost.name || !cost.amount || !cost.applicableUsers) {
      setNewCost({...newCost, error: 'Fill in all fields!'});
      return;
    } else if (!isNumeric(cost.amount)) {
      setNewCost({...newCost, error: 'Amount must be a numeric value!'});
      return;
    }

    const payload = {
      name: cost.name,
      amount: cost.amount,
      applicableUsers: cost.applicableUsers.map((user) => user.id),
      groupId: id,
    };

    setNewCost({...newCost, isLoading: true});
    await costsAPI.createCost(payload)
        .then(async (res) => {
          if (res.data.errors) {
            setNewCost({...newCost, isLoading: false});
            setNewCost({...newCost, error: res.data.errors[0].message});
            return;
          }
          await loadCosts();
          setNewCost({...newCost, isLoading: false});
          setNewCost({...newCost, error: ''});
          handleClose();
        }).catch((error) => {
          setNewCost({...newCost, isLoading: false});
          setNewCost({...newCost, error: error.toString()});
        });
  };

  const isNumeric = (str) => {
    if (typeof str != 'string') return false;
    return !isNaN(str) &&
           !isNaN(parseFloat(str));
  };

  const renderPopupPage = () => {
    return (
      <AddCostForm
        users={group.members.filter((usr) => usr.id != auth.user.id)}
        inputError={newCost.error}
        handleNameChange={(e) =>
          setNewCost({...newCost, data: {...newCost.data,
            name: e.target.value}})}
        handleAmountChange={(e) =>
          setNewCost({...newCost, data: {...newCost.data,
            amount: e.target.value}})}
        handleUsersChange={(e) =>
          setNewCost({...newCost, data: {...newCost.data,
            applicableUsers: e.target.value}})}
        handleBtnClick={() => {
          if (!newCost.isLoading) createCost();
        }}
        btnText={newCost.isLoading ? 'Creating Cost...' : 'Create Cost'}
      />
    );
  };


  return (
    <PageContainer>
      <HeaderContainer>
        {!loading &&
        <Breadcrumbs aria-label="breadcrumb" sx={{
          '& .MuiBreadcrumbs-separator': {
            fontSize: '25px',
          },
        }} fontFamily="Comfortaa" color="black">
          <Link underline="hover" color="inherit"
            href={`/groups`} >
            <HeaderText>groups</HeaderText>
          </Link>
          <HeaderText>{group.name} : {group.code}</HeaderText>
        </Breadcrumbs>
        }
        {!loading && <AddGrpBtnContainer>
          <AddGrpBtn onClick={() => navigate('/groups/' + id + '/canvas')}>
              View Posts</AddGrpBtn>
          <AddGrpBtn onClick={() => navigate('/groups/' + id + '/finances')}>
              View Finances</AddGrpBtn>
          <AddGrpBtn onClick={() => {
            setPopUp({...popUp, page: 'ADD_COST'});
          }}>
              Add Cost</AddGrpBtn>
        </AddGrpBtnContainer>}
      </HeaderContainer>
      <GroupsContainer>
        {loading && <CircularProgress />}
        {!loading && costs.length != 0 &&
        costs.map((cost) => (
          <Cost key={cost.id} cost={cost}/>
        ))}
        {!loading && costs.length == 0 &&
        <div>No costs created!</div>}
      </GroupsContainer>
      <GroupsFooter>
        <Pagination count={Math.ceil(totalCosts/pageSize)}
          onChange={handleCostPageChange}/>
      </GroupsFooter>
      {!loading && <PopUp
        open={popUp.page ? true : false}
        handleClose={handleClose}
      >
        {renderPopupPage()}
      </PopUp>}
    </PageContainer>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(GroupDetails);
