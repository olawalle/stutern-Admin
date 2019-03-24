import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';


import * as mutationTypes from './mutationTypes';

Vue.use(Vuex);

const vuexSessionStorage = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    token: '',
    loginStatus: false,
    sets: [],
    students: [],
    setStudents: [],
    jobTitles: [],
    selectedStudent: {},
    allScholarships: [],
    skills: [],
  },
  getters: {
    getToken: state => state.token,
    logginStatus: state => state.loginStatus,
    getSkills: state => state.skills,
    getSets: state => state.sets,
    getStudents: state => state.students,
    getSetStudents: state => state.setStudents,
    getAllScholarships: state => state.allScholarships,
    getJobTitles: state => state.jobTitles,
    getSelectedStudent: state => state.selectedStudent,
    getCloudinaryPresets: () => ({
      uploadPreset: 'stutern_api',
      // uploadPreset: 'stutern_demo',
      apiKey: '537473421397761',
      cloudName: 'dtdjxcklu',
      // cloudName: 'dl78ezj6d',
    }),
  },
  mutations: {
    [mutationTypes.TOKEN](state, data) {
      state.token = data;
    },
    [mutationTypes.ALL_STUDENTS](state, data) {
      state.students = data;
    },
    [mutationTypes.ALL_SETS](state, data) {
      state.sets = data;
    },
    [mutationTypes.SET_STUDENTS](state, data) {
      state.setStudents = data;
    },
    [mutationTypes.SELECTED_STUDENT](state, data) {
      state.selectedStudent = data;
    },
    [mutationTypes.JOB_TITLES](state, data) {
      state.jobTitles = data;
    },
    [mutationTypes.SKILLS](state, data) {
      state.skills = data;
    },
    [mutationTypes.ALL_SCHOLARSHIPS](state, data) {
      state.allScholarships = data;
    },
    [mutationTypes.CLEAR_STORE](state) {
      state = {
      };
    },
    [mutationTypes.LOGIN_STATUS](state, data) {
      state.loginStatus = data;
    },
  },
  actions: {

  },
  plugins: [vuexSessionStorage.plugin],
});
