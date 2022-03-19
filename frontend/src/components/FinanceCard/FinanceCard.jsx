import React from 'react';
import {connect} from 'react-redux';
import {AmountOwingContainer, AmountText,
  AmountValue, Card} from './FinanceCard.styles';
import {GroupName} from '../../pages/Groups/Groups.styles';

function FinanceCard({member, auth}) {
  return (
    <Card>
      <GroupName>
        {member && member.username}
      </GroupName>
      {member.id == auth.user.id &&
      <AmountOwingContainer>
        <AmountText>They Owe You (Total):</AmountText>
        <AmountValue style={{color: '#3BFB4F'}}>
          ${member.amountOwed ?? 0}
        </AmountValue>
      </AmountOwingContainer>}
      {member.id == auth.user.id &&
      <AmountOwingContainer>
        <AmountText>You Owe (Total):</AmountText>
        <AmountValue style={{color: 'red'}}>
          ${member.amountOwing ?? 0}
        </AmountValue>
      </AmountOwingContainer>}
      {member.id != auth.user.id &&
      <AmountOwingContainer>
        <AmountText>Owes You:</AmountText>
        <AmountValue style={{color: '#3BFB4F'}}>
          ${member.amountOwing ?? 0}
        </AmountValue>
      </AmountOwingContainer>}
      {member.id != auth.user.id &&
      <AmountOwingContainer>
        <AmountText>You Owe:</AmountText>
        <AmountValue style={{color: 'red'}}>
          ${member.amountOwed ?? 0}
        </AmountValue>
      </AmountOwingContainer>}
    </Card>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(FinanceCard);
