import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'


import * as mutationTypes from "./mutationTypes";
Vue.use(Vuex);

const vuexSessionStorage = new VuexPersistence({
  storage: window.localStorage
})

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
    skills: []
  },
  getters: {
    getToken: (state) => {
      return state.token
    },
    logginStatus: (state) => {
      return state.loginStatus
    },
    getSkills: (state) => {
      return state.skills
    },
    getSets: (state) => {
      return state.sets
    },
    getStudents: (state) => {
      return state.students
    },
    getSetStudents: (state) => {
      return state.setStudents
    },
    getAllScholarships: (state) => {
      return state.allScholarships
    },
    getJobTitles: (state) => {
      return state.jobTitles
    },
    getSelectedStudent: (state) => {
      return state.selectedStudent
    }
  },
  mutations: {
    [mutationTypes.TOKEN] (state, data) {
      state.token = data
    },
    [mutationTypes.ALL_STUDENTS] (state, data) {
      state.students = data
    },
    [mutationTypes.ALL_SETS] (state, data) {
      state.sets = data
    },
    [mutationTypes.SET_STUDENTS] (state, data) {
      state.setStudents = data
    },
    [mutationTypes.SELECTED_STUDENT] (state, data) {
      state.selectedStudent = data
    },
    [mutationTypes.JOB_TITLES] (state, data) {
      state.jobTitles = data
    },
    [mutationTypes.SKILLS] (state, data) {
      state.skills = data
    },
    [mutationTypes.ALL_SCHOLARSHIPS] (state, data) {
      state.allScholarships = data
    },
    [mutationTypes.CLEAR_STORE] (state) {
      state = {   
      }
    },
    [mutationTypes.LOGIN_STATUS] (state, data) {
      state.loginStatus = data
    }
  },
  actions: {

  },
  plugins: [vuexSessionStorage.plugin]
});
