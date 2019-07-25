import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  getMembersRequest: null,
  getMembersSuccess: ['data'],
  openMembersModal: null,
  closeMembersModal: null,
  updateMemberRequest: ['id', 'roles'],
});

export const MembersTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  data: [],
  membersModalOpen: false,
});

/* Reducers */
export const getSuccess = (state, { data }) => state.merge({ data });
export const updateMember = (state, { id, roles }) => state.merge({
  data: state.data.map(member => (member.id === id ? { ...member, roles } : member)),
});
export const openModal = state => state.merge({ membersModalOpen: true });
export const closeModal = state => state.merge({ membersModalOpen: false });

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_MEMBERS_MODAL]: openModal,
  [Types.CLOSE_MEMBERS_MODAL]: closeModal,
  [Types.GET_MEMBERS_SUCCESS]: getSuccess,
  [Types.UPDATE_MEMBER_REQUEST]: updateMember,
});
