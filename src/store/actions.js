
import * as api from './api';
import * as types from './mutation-types';

export const getAllUsers = ({ commit }) => {
  api.getUsers((users) => {
    commit(types.FETCHED_USERS, { users });
  });
};
