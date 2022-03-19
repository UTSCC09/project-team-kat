import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams, useNavigate} from 'react-router-dom';
import {PageContainer, HeaderContainer, HeaderText,
  AddGrpBtn, AddGrpBtnContainer,
} from '../Groups/Groups.styles.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import {GroupsContainer, Transaction, TransactionCost, TransactionLogger,
} from './GroupDetails.styles';

import PopUp from '../../components/PopUp/PopUp.jsx';
import AddCostForm from '../../components/AddCostForm/AddCostForm.jsx';
import costsAPI from '../../api/costs.api.js';
import groupsAPI from '../../api/groups.api.js';

function GroupDetails({auth}) {
  const {id} = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [group, setGroup] = useState({});
  const [costs, setCosts] = useState([]);

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

  const loadCosts = async () => {
    const rawGroup = await groupsAPI.getGroup(id);
    const group = rawGroup.data.data.getGroup;

    const costs = [];
    const rawCosts = await costsAPI.getCostsByGroup(id);
    rawCosts.data.data.getCostsByGroup.map((rawCost) => {
      const ownerId = rawCost.ownerId;
      const ownerName = group.members.find((mem) => mem.id == ownerId).username;
      costs.push({...rawCost, owner: ownerName});
    });

    setGroup(group);
    setCosts(costs);
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
        <HeaderText>{!loading && group.name}</HeaderText>
        <AddGrpBtnContainer>
          <AddGrpBtn onClick={() => navigate('/groups/' + id + '/finances')}>
              View Finances</AddGrpBtn>
          <AddGrpBtn onClick={() => {
            setPopUp({...popUp, page: 'ADD_COST'});
          }}>
              Add Cost</AddGrpBtn>
        </AddGrpBtnContainer>
      </HeaderContainer>
      <GroupsContainer>
        {loading && <CircularProgress />}
        {!loading && costs.length != 0 &&
        costs.map((cost) => (
          <Transaction key={cost.id}>
            <TransactionCost>
              {cost.name} - ${cost.amount}
            </TransactionCost>
            <TransactionLogger>
                  Created by: {cost.owner}
            </TransactionLogger>
          </Transaction>
        ))}
        {!loading && costs.length == 0 &&
        <div>No costs created!</div>}
      </GroupsContainer>
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
