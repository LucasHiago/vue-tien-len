import Vue from 'vue';
import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.FETCHED_USERS](state, { users }) {
    Vue.set(state.users, users);
  }
};

