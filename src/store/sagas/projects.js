import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import ProjectsActions from '../ducks/projects';

export function* getProjects() {
  const response = yield call(api.get, 'projects');

  yield put(ProjectsActions.getProjectsSuccess(response.data));
}

export function* createProject({ title }) {
  try {
    const response = yield call(api.post, 'projects', { title });
    yield put(ProjectsActions.createProjectSuccess(response.data));
    yield put(ProjectsActions.closeProjectModal());
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao salvar',
        message: 'Falha na criação do projeto',
        timeOut: 5,
        closeButton: true,
      }),
    );
  }
}

export function* deleteProject({ id }) {
  try {
    yield call(api.delete, `projects/${id}`);
    yield put(ProjectsActions.deleteProjectSuccess(id));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Sucesso',
        message: 'Projeto excluído com sucesso',
        timeOut: 5,
        closeButton: true,
      }),
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao excluir',
        message: 'Falha na exclusão do projeto',
        timeOut: 5,
        closeButton: true,
      }),
    );
  }
}
