import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  getTeamsRequest: null,
  getTeamsSuccess: ['data'],
  selectTeam: ['team'],
  openTeamModal: null,
  closeTeamModal: null,
  createTeamRequest: ['name'],
  createTeamSuccess: ['team'],
  deleteTeamRequest: null,
  deleteTeamSuccess: null,
});

export const TeamsTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  data: [],
  teamModalOpen: false,
  active: JSON.parse(localStorage.getItem('@app:team')) || null,
});

/* Reducers */
export const getSuccess = (state, { data }) => state.merge({ data });
export const selectTeam = (state, { team }) => {
  localStorage.setItem('@app:team', JSON.stringify(team));
  return state.merge({ active: team });
};

export const createTeamSuccess = (state, { team }) => state.merge({ data: [...state.data, team] });
export const deleteTeamSuccess = (state) => {
  const teamStored = JSON.parse(localStorage.getItem('@app:team'));
  localStorage.removeItem('@app:team');
  return state.merge({ data: state.data.filter(team => team.id !== teamStored.id), active: null });
};

export const openModal = state => state.merge({ teamModalOpen: true });
export const closeModal = state => state.merge({ teamModalOpen: false });

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TEAMS_SUCCESS]: getSuccess,
  [Types.SELECT_TEAM]: selectTeam,
  [Types.OPEN_TEAM_MODAL]: openModal,
  [Types.CLOSE_TEAM_MODAL]: closeModal,
  [Types.CREATE_TEAM_SUCCESS]: createTeamSuccess,
  [Types.DELETE_TEAM_SUCCESS]: deleteTeamSuccess,
});
