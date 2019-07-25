import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */
const { Types, Creators } = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
  openProjectModal: null,
  closeProjectModal: null,
  createProjectRequest: ['title'],
  createProjectSuccess: ['project'],
  deleteProjectRequest: ['id'],
  deleteProjectSuccess: ['id'],
});

export const ProjectsTypes = Types;
export default Creators;

/* Initial State */
export const INITIAL_STATE = Immutable({
  data: [],
  projectModalOpen: false,
});

/* Reducers */
export const success = (state, { data }) => state.merge({ data });
export const openModal = state => state.merge({ projectModalOpen: true });
export const closeModal = state => state.merge({ projectModalOpen: false });
export const createProjectSuccess = (state, { project }) => state.merge({ data: [...state.data, project] });
export const deleteProjectSuccess = (state, { id }) => state.merge({ data: state.data.filter(project => project.id !== id) });

/* Reducers to types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: success,
  [Types.OPEN_PROJECT_MODAL]: openModal,
  [Types.CLOSE_PROJECT_MODAL]: closeModal,
  [Types.CREATE_PROJECT_SUCCESS]: createProjectSuccess,
  [Types.DELETE_PROJECT_SUCCESS]: deleteProjectSuccess,
});
