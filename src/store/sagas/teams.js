import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import TeamsActions from '../ducks/teams';

export function* getTeams() {
  const response = yield call(api.get, 'teams');

  yield put(TeamsActions.getTeamsSuccess(response.data));
}

export function* createTeam({ name }) {
  try {
    const response = yield call(api.post, 'teams', { name });
    yield put(TeamsActions.createTeamSuccess(response.data));
    yield put(TeamsActions.closeTeamModal());
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao salvar',
        message: 'Falha na criação do time',
        timeOut: 5,
        closeButton: true,
      }),
    );
  }
}

export function* deleteTeam() {
  try {
    const team = JSON.parse(localStorage.getItem('@app:team'));
    yield call(api.delete, `teams/${team.id}`);
    yield put(TeamsActions.deleteTeamSuccess());
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Sucesso',
        message: 'Time excluído com sucesso',
        timeOut: 5,
        closeButton: true,
      }),
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao excluir',
        message: 'Falha na exclusão do time',
        timeOut: 5,
        closeButton: true,
      }),
    );
  }
}
