import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, 'members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, { roles: roles.map(role => role.id) });
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Membro atualizado',
        message: 'Membro atualizado com sucesso!',
        timeOut: 5,
      }),
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao atualizar',
        message: 'Falha na atualização do membro',
        timeOut: 5,
      }),
    );
  }
}
