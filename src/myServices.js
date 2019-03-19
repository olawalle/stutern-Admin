import axios from 'axios'
import * as apiUrls from './apiUrls'
import store from './store'
import * as mutationTypes from './mutationTypes'


let getUsers = () => {
    return axios({
        method: 'get',
        url: apiUrls.allUsers
    })
    .then(res => {
       store.commit(mutationTypes.ALL_STUDENTS, res.data)
    })
    .catch(err => console.log(err))
}

let createUser = (data) => {
    return axios({
        method: 'post',
        url: apiUrls.allUsers,
        data: data
    })
}

let deleteUser = (id) => {
    return axios({
        method: 'delete',
        url: apiUrls.allUsers+'/'+id
    })
}

let updateUser = (user) => {
    return axios({
        method: 'PUT',
        url: apiUrls.allUsers+'/'+user._id,
        data: user
    })
}

let getSets = () => {
    return axios({
        method: 'get',
        url: apiUrls.allSets
    })
    .then(res => {
        let data = res.data.map(set => {
            return {
                ...set,
                text: set.setName,
                value: set.setName
            }
        })
       store.commit(mutationTypes.ALL_SETS, data)
    })
    .catch(err => console.log(err))
}

let postSet = (data) => {
    return axios({
        method: 'post',
        url: apiUrls.allSets,
        data: data
    })
}

let getSetStudents = (set) => {
    return axios({
        method: 'get',
        url: apiUrls.allSets+'/'+set
    })
    .then(res => {
        // let data = res.data.map(set => {
        //     return {
        //         ...set,
        //         text: set.setName,
        //         value: set.setName
        //     }
        // })
       store.commit(mutationTypes.SET_STUDENTS, res.data)
    })
    .catch(err => console.log(err))
}


let getJobTitles = () => {
    return axios({
        method: 'get',
        url: apiUrls.tracks
    })
    .then(res => {
        let data = res.data.map(job => {
            return {
                ...job,
                text: job.trackName,
                value: job.trackName
            }
        })
        // console.log(data)
       store.commit(mutationTypes.JOB_TITLES, data)
    })
    .catch(err => console.log(err))
}

let addJobTitle = (data) => {
    return axios({
        method: 'post',
        url: apiUrls.tracks,
        data: data
    })
}

let updateJobTitle = (data) => {
    return axios({
        method: 'put',
        url: apiUrls.tracks+'/'+data._id,
        data: data
    })
}

let getScholarships = () => {
    return axios({
        method: 'get',
        url: apiUrls.scholarships
    })
}

let addScholarship = (data) => {
    return axios({
        method: 'post',
        url: apiUrls.scholarships,
        data: data
    })
}

let postJob = (data) => {
    return axios({
        method: 'get',
        url: apiUrls.jobTitles,
        data: data
    })
    .then(res => {
        console.log(res)
    //     let data = res.data.map(job => {
    //         return {
    //             ...job,
    //             text: set.jobTitle,
    //             value: set.jobTitle
    //         }
    //     })
    //    store.commit(mutationTypes.JOB_TITLES, data)
    })
    .catch(err => console.log(err))
}


let getUserProjects = (id) => {
    return axios({
        method: 'get',
        url: apiUrls.projects+'/'+id,
    })
}

let deleteUserProjects = (id) => {
    return axios({
        method: 'delete',
        url: apiUrls.projects+'/'+id
    })
}

let addProject = (data) => {
    return axios({
        method: 'post',
        url: apiUrls.projects,
        data: data
    })
}

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
    getScholarships,
    addScholarship
}