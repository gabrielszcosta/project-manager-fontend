import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import TeamsActions from '../ducks/teams';

export function* getTeams() {
  const response = yield call(api.get, 'teams');

  yield put(TeamsActions.getTeamsSuccess(response.data));
}

export function* createTeam({ name }) {
  const response = yield call(api.post, 'teams', { name });
  try {
    yield put(TeamsActions.createTeamSuccess(response.data));
    yield put(TeamsActions.closeTeamModal());
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao salvar',
        message: 'Falha na criação do time',
        timeOut: 5,
      }),
    );
  }
}
