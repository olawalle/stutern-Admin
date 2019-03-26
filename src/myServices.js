import axios from 'axios';
import * as apiUrls from './apiUrls';
import store from './store';
import * as mutationTypes from './mutationTypes';


const getUsers = () => axios({
  method: 'get',
  url: apiUrls.allUsers,
})
  .then((res) => {
    let students = res.datasort(function(a, b){
      var keyA = a.userSet,
          keyB = b.userSet;
          // Compare the 2 dates
          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
          return 0;
      });
    store.commit(mutationTypes.ALL_STUDENTS, students);
  })
  .catch(err => console.log(err));

const createUser = data => axios({
  method: 'post',
  url: apiUrls.allUsers,
  data,
});

const deleteUser = id => axios({
  method: 'delete',
  url: `${apiUrls.allUsers}/${id}`,
});

const updateUser = user => axios({
  method: 'put',
  url: `${apiUrls.allUsers}/${user._id}`,
  data: user,
});

const getSets = () => axios({
  method: 'get',
  url: apiUrls.allSets,
})
.then((res) => {
  const data = res.data.map(set => ({
    ...set,
    text: set.setName,
    value: set.setName,
  }))
  .sort(function(a, b){
    var keyA = a.setName,
        keyB = b.setName;
        // Compare the 2 dates
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    });
  store.commit(mutationTypes.ALL_SETS, data);
})
.catch(err => console.log(err));

const postSet = data => axios({
  method: 'post',
  url: apiUrls.allSets,
  data,
});

const getSetStudents = set => axios({
  method: 'get',
  url: `${apiUrls.allSets}/${set}`,
})
  .then((res) => {
    // let data = res.data.map(set => {
    //     return {
    //         ...set,
    //         text: set.setName,
    //         value: set.setName
    //     }
    // })
    store.commit(mutationTypes.SET_STUDENTS, res.data);
  })
  .catch(err => console.log(err));


const getJobTitles = () => axios({
  method: 'get',
  url: apiUrls.tracks,
})
  .then((res) => {
    const data = res.data.map(job => ({
      ...job,
      text: job.trackTitle,
      value: job.trackTitle,
    }));
    // console.log(data)
    store.commit(mutationTypes.JOB_TITLES, data);
  })
  .catch(err => console.log(err));

const addJobTitle = data => axios({
  method: 'post',
  url: apiUrls.tracks,
  data,
});

const updateJobTitle = data => axios({
  method: 'put',
  url: `${apiUrls.tracks}/${data._id}`,
  data,
});

const getScholarships = () => axios({
  method: 'get',
  url: apiUrls.scholarships,
})
  .then((res) => {
    const data = res.data.map(scholarship => ({
      ...scholarship,
      text: scholarship.scholarshipName,
      value: scholarship._id,
    }));
    store.commit(mutationTypes.ALL_SCHOLARSHIPS, data);
  })
  .catch(err => console.log(err));

const addScholarship = data => axios({
  method: 'post',
  url: apiUrls.scholarships,
  data,
});

const updateScholarship = data => axios({
  method: 'put',
  url: `${apiUrls.scholarships}/${data._id}`,
  data,
});

const postJob = data => axios({
  method: 'get',
  url: apiUrls.jobTitles,
  data,
});

const getUserProjects = id => axios({
  method: 'get',
  url: `${apiUrls.projects}/${id}`,
});

const deleteUserProjects = id => axios({
  method: 'delete',
  url: `${apiUrls.projects}/${id}`,
});

const updateUserProjects = id => axios({
  method: 'put',
  url: `${apiUrls.projects}/${id}`,
});

const addProject = data => axios({
  method: 'post',
  url: apiUrls.projects,
  data,
});

const getSkills = () => axios({
  method: 'get',
  url: apiUrls.skills,
})
  .then((res) => {
    const skills = res.data.map(skill => ({ ...skill, text: skill.name, value: skill.name }));
    store.commit(mutationTypes.SKILLS, skills);
  })
  .catch((err) => {
    // console.log(err);
  });

const addSkill = data => axios({
  method: 'post',
  url: apiUrls.skills,
  data,
});

const deleteSkill = id => axios({
  method: 'delete',
  url: `${apiUrls.skills}/${id}`,
});

const fileUpload = data => axios({
  method: 'get',
  url: 'https://api.cloudinary.com/v1_1/dl78ezj6d/upload',
  headers: {
    'Content-Type': 'application/json',
  },
  data,
});

export default {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getSets,
  postSet,
  getSetStudents,
  getJobTitles,
  addJobTitle,
  updateJobTitle,
  postJob,
  addProject,
  getUserProjects,
  deleteUserProjects,
  updateUserProjects,
  getScholarships,
  addScholarship,
  updateScholarship,
  getSkills,
  addSkill,
  deleteSkill,
  fileUpload,
};
