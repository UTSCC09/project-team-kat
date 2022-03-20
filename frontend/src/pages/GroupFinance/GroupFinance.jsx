import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import groupsAPI from '../../api/groups.api';
import costsAPI from '../../api/costs.api';
import FinanceCard from '../../components/FinanceCard/FinanceCard';
import {HeaderContainer, HeaderText} from '../Groups/Groups.styles';
import {FinanceContainer, CardContainer} from './GroupFinance.styles';
import {CircularProgress, Link, Breadcrumbs} from '@mui/material';

function GroupFinance({auth}) {
  const {groupID} = useParams();

  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState({});
  const [members, setMembers] = useState([]);

  useEffect(async () => {
    const resGroup = await groupsAPI.getGroup(groupID);
    const group = resGroup.data.data.getGroup;
    setGroup(group);

    const members = group.members;
    bringCurrentUserToFront(members);

    const resCosts = await costsAPI.getCostsByGroup(group.id);
    const costs = resCosts.data.data.getCostsByGroup;

    calcCostAmounts(costs, members);
    setMembers(members);
    setLoading(false);
  }, []);

  const calcCostAmounts = (costs, members) => {
    // how much they owe me
    costs.map((cost) => {
      const ownerObj = members.find((obj) => obj.id == cost.ownerId);
      const numOwers = cost.applicableUsers.length;

      if (cost.ownerId == auth.user.id) {
        if (ownerObj.amountOwed) {
          ownerObj.amountOwed += parseFloat(cost.amount);
        } else {
          ownerObj.amountOwed = parseFloat(cost.amount);
        }

        cost.applicableUsers.map((ower) => {
          const owerObj = members.find((obj) => obj.id == ower.id);
          if (owerObj.amountOwing) {
            owerObj.amountOwing += parseFloat(cost.amount / numOwers);
          } else {
            owerObj.amountOwing = parseFloat(cost.amount / numOwers);
          }
        });
      }
    });

    // how much I owe them
    costs.map((cost) => {
      const ownerObj = members.find((obj) => obj.id == cost.ownerId);
      const numOwers = cost.applicableUsers.length;

      cost.applicableUsers.map((ower) => {
        const owerObj = members.find((obj) => obj.id == ower.id);
        // if im the ower
        if (ower.id == auth.user.id) {
          if (owerObj.amountOwing) {
            owerObj.amountOwing += parseFloat(cost.amount / numOwers);
          } else {
            owerObj.amountOwing = parseFloat(cost.amount / numOwers);
          }
          if (ownerObj.amountOwed) {
            ownerObj.amountOwed += parseFloat(cost.amount / numOwers);
          } else {
            ownerObj.amountOwed = parseFloat(cost.amount / numOwers);
          }
        }
      });
    });
  };

  const bringCurrentUserToFront = (arr) => {
    // https://stackoverflow.com/questions/34729001/move-array-item-to-front-by-object-key
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === auth.user.id) {
        const a = arr.splice(i, 1); // removes the item
        arr.unshift(a[0]); // adds it back to the beginning
        break;
      }
    }
  };

  return (
    <FinanceContainer>
      {!loading && <HeaderContainer>
        <Breadcrumbs aria-label="breadcrumb" sx={{
          '& .MuiBreadcrumbs-separator': {
            fontSize: '25px',
          },
        }} fontFamily="Comfortaa" color="black">
          <Link underline="hover" color="inherit"
            href={`/groups`} >
            <HeaderText>groups</HeaderText>
          </Link>
          <Link underline="hover" color="inherit"
            href={`/groups/${groupID}`} >
            <HeaderText>{group.name}</HeaderText>
          </Link>
          <HeaderText>Finances</HeaderText>
        </Breadcrumbs>
      </HeaderContainer>}
      <CardContainer>
        {loading && <CircularProgress style={{margin: 'auto'}}/>}
        {!loading && members && members.map((member) =>
          <FinanceCard key={member.id} group={group} member={member}/>)}
      </CardContainer>
    </FinanceContainer>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(GroupFinance);
