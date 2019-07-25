import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import api from '~/services/api';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MembersAction from '~/store/ducks/members';

import { MembersList } from './styles';
import Button from '~/styles/components/Button';
import Modal from '~/components/Modal';

class Members extends Component {
  static propTypes = {
    closeMembersModal: PropTypes.func.isRequired,
    getMembersRequest: PropTypes.func.isRequired,
    updateMemberRequest: PropTypes.func.isRequired,
    members: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        role: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        })),
        user: PropTypes.shape({
          name: PropTypes.string,
        }),
      })),
    }).isRequired,
  };

  state = {
    roles: [],
  }

  async componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();

    const response = await api.get('roles');
    this.setState({roles: response.data});
  }

  handleRolesChange = (id, roles) => {
    const { updateMemberRequest } = this.props;
    updateMemberRequest(id, roles)
  }

  render() {
    const { members, closeMembersModal } = this.props;
    const { roles } = this.state;

    return (
      <Modal size="big">
        <h1>Membros</h1>
        <form>
          <MembersList>
            {members.data.map(member => (
              <li key={member.id}>
                <strong>{member.user.name}</strong>
                <Select
                  isMulti
                  options={roles}
                  value={member.roles}
                  getOptionLabel={role => role.name}
                  getOptionValue={role => role.id}
                  onChange={value => this.handleRolesChange(member.id, value)}
                />
              </li>
            ))}
          </MembersList>
          <Button filled={false} color="gray" onClick={closeMembersModal}>
            Cancelar
          </Button>
        </form>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(MembersAction, dispatch);

const mapStateToProps = state => ({
  members: state.members,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);
