
import * as api from './api';
import * as types from './mutation-types';

// Right now, getting all users is getting all fake users
// TODO: when multiplayer comes into play, separate fake users api into own module
export const getAllUsers = ({ commit }) => {
  api.getUsers((users) => {
    commit(types.FETCHED_USERS, { users });
  });
};
