/* eslint-disable no-param-reassign */
import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.FETCHED_USERS](state, { users }) {
    state.users = users;
  }
};

