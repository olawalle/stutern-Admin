<template>
    <div class="wrapper">
        <!-- <div class="empty-content" v-if="topics.length === 0">
            <p class="empty">
                Seems no sets have been added yet. You can do so with the button below
            </p>
            <button class="main-btn">
                Add Topic
            </button>
        </div> -->
        <div class="full-content">
            <button class="main-btn-sm" @click="addSet()">
                Add Set
            </button>
            <!-- <button class="main-btn-sm" @click="openAddTrack()">
                Create new track
            </button> -->
            <button class="main-btn-sm" @click="createUser()">
                Create User
            </button>
            <div class="sort">
                <span>
                    <b @click="test()">Cohurt:</b>
                </span>
                <b-form-select class="mySelect my-select" @change="fetchSet($event)" v-model="set" :options="sets" />
                <!-- <b-form-select class="mySelect my-select" v-model="selected"  :options="options" />
                <b-form-select class="mySelect my-select" v-model="selected"  :options="options" /> -->
            </div>
            <div class="myTable">
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Photo</td>
                            <td>Cohurt</td>
                            <td>Job title</td>
                            <td>Availability</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(student, i) in setStudents.students" :key="i">
                            <td>
                                {{student.userName}}
                            </td>
                            <td v-if="!student.userPhoto"><img src="../assets/user.png" alt="" width="50"></td>
                            <td v-else><img :src="student.userPhoto" alt="" width="50"></td>
                            <td>
                                {{student.userSet}}
                            </td>
                            <td>{{student.jobTitle}}</td>
                            <td v-if="student.availability">Available</td>
                            <td v-else>Hired</td>
                            <td>
                                <span class="edit" @click="edit(student)">Edit</span>
                                <span class="project" @click="openProjects(student)">View projects</span>
                                <span class="delete" @click="remove(student._id)">Delete</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <b-modal v-model="createSet" centered title="Create new set" :hide-footer="true">
            <span class="two">
                <b-input-group
                    class="mb-3"
                    prepend="E.g: SGA 0.1"
                >
                    <b-form-input
                    style="height: 55px;"
                    type="text"
                    v-model="setName"
                    required />
                </b-input-group>
            </span>
            <span class="three">
                <button style="float: right;
                                background-color: #00D7C4;
                                border: 0;
                                color: #fff;
                                padding: 12px 30px;
                                border-radius: 6px;
                                margin-top: 20px;" @click="newSet()">Create</button>
            </span>
        </b-modal>
        
        <b-modal v-model="editUser" centered title="Edit User details" :hide-footer="true">
            <label>
                Full name
            </label>
            <b-form-input
                style="margin-bottom:20px; height: 55px;"
                type="text"
                v-model="selectedUser.userName"
                required/>

            <label>
                Short description
            </label>
            <b-form-textarea
                style="margin-bottom:20px; height: 55px;"
                type="text"
                v-model="selectedUser.userDesc"
                rows="3"
                required />

            <label>
                Cohurt
            </label>
            <b-form-select style="height: 55px; margin-bottom:20px;" @change="change($event, 1)" v-model="selectedUser.userSet" :options="sets" />

            <label>
                Job title
            </label>
            <b-form-select style="margin-bottom:20px; height: 55px;" @change="change($event, 2)" v-model="selectedUser.jobTitle" :options="jobTitles" />

            <label>Skill(s)</label>
            <b-form-group>
                <b-form-checkbox-group v-model="selectedUser.userSkills" :options="skills" />
            </b-form-group>

            <label>
                Availability
            </label>
            <b-form-group label="" style="margin-bottom:20px; height: 55px;">
                <b-form-radio-group  v-model="selectedUser.availability" :options="availabilities" name="some-radios">
                </b-form-radio-group>
            </b-form-group>

            <label>
                User Photo
            </label>
            <b-form-file v-model="imgFile"
                    style="height: 55px;" class="inp" v-on:change="upload($event.target.files, 2)" placeholder="Upload User Photo"></b-form-file>
            
            <button style="float: right;
                            background-color: #00D7C4;
                            border: 0;
                            color: #fff;
                            padding: 12px 30px;
                            border-radius: 6px;
                            margin-top: 20px;" @click="submitEdit()">Edit</button>
        </b-modal>
        
        <b-modal v-model="createUserModal" centered title="Create new user" :hide-footer="true">
            <label>
                Full name
            </label>
            <b-form-input
                style="margin-bottom:20px; height: 55px;"
                type="text"
                v-model="newUser.userName"
                required
                label= "name"
                placeholder="Full name" />
                
            <label>
                Short description
            </label>
            <b-form-textarea
                style="margin-bottom:20px; height: 55px;"
                type="text"
                v-model="newUser.userDesc"
                rows="3"
                required />
                
            <label>
                Photo
            </label>
            <b-form-file v-model="imgFile" class="inp" v-on:change="upload($event.target.files, 1)" placeholder="Upload User Photo"></b-form-file>

            <label>
                Cohurt
            </label>
            <b-form-select style="margin-bottom:20px; height: 55px;" v-model="newUser.userSet" :options="sets" />

            <label>
                Job title
            </label>
            <b-form-select style="margin-bottom:20px; height: 55px;" v-model="newUser.jobTitle" :options="jobTitles" />

            <label>Skill(s)</label>
            <b-form-group>
                <b-form-checkbox-group v-model="newUser.userSkills" :options="skills" />
            </b-form-group>

            <label>Scholarship(s)</label>
            <b-form-group>
                <b-form-checkbox-group v-model="newUser.userScholarship" :options="scholarships" />
            </b-form-group>

            <b-form-group label="" style="margin-bottom:20px; padding-top: 12px; height: 55px; border-top: 1px solid #eee">
                <b-form-radio-group  v-model="newUser.availability" :options="availabilities"></b-form-radio-group>
            </b-form-group>
            
            <button style="float: right;
                            background-color: #00D7C4;
                            border: 0;
                            color: #fff;
                            padding: 12px 30px;
                            border-radius: 6px;
                            margin-top: 20px;" @click="submitCreate()">Create</button>
        </b-modal>
    </div>
</template>
<script>
import myServices from '../myServices';
import { mapGetters } from 'vuex'
import * as mutationTypes from '../mutationTypes'
import axios from 'axios'
export default {
  data() {
    return {
      cloudinary: {
        // uploadPreset: 'f0zojmne',
        uploadPreset: 'stutern_demo',
        apiKey: '971377932646732',
        cloudName: 'dl78ezj6d'
      }, 
      addDisabled: false,
      imgFile: null,
      editUser: false,
      createSet: false,
      createUserModal: false,
      addTrackModal: false,
      setName: '',
      selected: null,
      activeSet: null,
      newUser: {
        userName: '',
        availability: '',
        jobTitle: null,
        userSet: null,
        userSetid: '',
        userPhoto: '',
        userSkills: [],
        userDesc: '',
        userScholarship: []
      },
      selectedUser: {
        userName: '',
        jobTitle: '',
        availability: '',
        userDesc: '',
        userPhoto: '',
        userSkills: [],
        userScholarship: []
        // userSet: ''
        // userSetid: ''
      },
      newObj: {
        userName: '',
        jobTitle: '',
        availability: '',
        userSet: '',
        userSetid: ''
      },
      newTrack: {
        trackName: '',
        trackTitle: '',
        trackDesc: '',
        banner: ''
      },
    //   userName_: "",
    // cohurt_: "",
    // jobTitle_: "",
      availabilities: [
          {text: 'Available', value: true},
          {text: 'Hired', value: false}
      ]
    };
  },
  computed: {
    ...mapGetters({
        sets: 'getSets',
        setStudents: 'getSetStudents',
        jobTitles: 'getJobTitles',
        scholarships: 'getAllScholarships',
        skills: 'getSkills',
    }),
    set () {
        return this.sets[0].value
    },
    cohurt: {
        get: function () {
            return this.selectedUser.userSet
        },
        set: function (value) {
            this.newObj.userSet = value
        }
    },
    jobTitle: {
        get: function () {
            return this.selectedUser.jobTitle
        },
        set: function (value) {
            this.newObj.jobTitle = value
        }
    }
  },
  methods: {
    
    makeid(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    upload (e, n) {
      console.log(e)
      const formData = new FormData()
      formData.append('file', e[0]);
      formData.append('upload_preset', this.cloudinary.uploadPreset);
      formData.append('public_id', this.makeid(20))
      axios.post(`https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/image/upload`, formData)
      .then(res => {
        console.log(res)
        switch (n) {
            case 1:
                this.newUser.userPhoto = res.data.secure_url 
                break;
            case 2:
                this.selectedUser.userPhoto = res.data.secure_url
            case 3:
                this.newTrack.banner = res.data.secure_url
            default:
                break;
        }
      })
      .catch(err => {
        console.log(err.response) 
      })
    },

    addSet() {
      this.createSet = true
    },

    openAddTrack() {
        this.addTrackModal = true
    },

    newSet () {
        myServices.postSet({setName: this.setName})
        .then(res => {
            console.log(res)
            myServices.getSets()
        })
        .catch(err => {
            console.log(err)
        })
    },
    addNewTrack () {
        myServices.addJobTitle(this.newTrack)
        .then(res => {
            console.log(res)
            myServices.getJobTitles()
        })
        .catch(err => {
            console.log(err)
        })
    },
    test() {
      console.log(this.jobTitles)
    },
    openProjects(student) {
        this.$store.commit(mutationTypes.SELECTED_STUDENT, student)
        this.$router.push({name: 'userProjects', params:{id: student._id}})
    },
    fetchSet($v) {
        // console.log($v)
        this.set = $v
        this.activeSet = $v
        myServices.getSetStudents($v)
    },
    edit(user) {
        console.log(user)
        this.editUser = true
        this.selectedUser = user
    },
    submitEdit() {
        myServices.updateUser(this.selectedUser)
        .then(res => {
            console.log(res)
            myServices.getSetStudents(this.set)
            this.editUser = false
        })
        .catch(err => {
            console.log({...err})
        })
        // console.log(this.selectedUser)
        // console.log(
        //     this.userName_,
        //     this.cohurt_,
        //     this.jobTitle_
        // )
    },
    remove(id) {
        myServices.deleteUser(id)
        .then(res => {
            console.log(res)
            myServices.getUsers()
        })
        .catch(err => {
            console.log(err)
        })
    },
    change($event, n) {
        console.log(this.selectedUser)
        // if (n === 1) {
        //     this.newObj.userSet = this.cohurt
        // } else {
        //     this.newObj.jobTitle = this.jobTitle
        // }
        // console.log(this.newObj)
    },
    createUser() {
        this.createUserModal = true
    },
    submitCreate () {
        this.newUser.userSetid = this.sets.find(set => set.setName === this.newUser.userSet)._id
        // console.log(this.newUser)
        myServices.createUser(this.newUser)
        .then(res => {
            console.log(res)
            this.createUserModal = false
            this.fetchSet(this.newUser.userSet)
        })
        .catch(err => {
            this.createUserModal = false
            console.log(err)
        })
    }
  },
  beforeMount() {
    myServices.getUsers()
    myServices.getSets()
    myServices.getJobTitles()
    myServices.getScholarships()
    myServices.getSkills()
    myServices.getSetStudents(this.set)
    this.test()
  },
};
</script>
<style scoped>
    .wrapper {
        width: 100%;
        height: 100vh;
        overflow-x: hidden;
        background-color: #FAFAFA
    }
    .empty-content {
        padding: 50px 480px;
    }
    .full-content {
        padding: 20px 32px
    }
    .empty {
        color: #67747C;
        font-size: 14px;
        margin: 190px 140px 0 140px
    }
    .my-select {
        width: 250px;
        margin: 0 12px;
        height: 40px !important;
    }
    .inp {
        margin-bottom: 20px;
    }
    .sort {
        margin: 30px 0
    }
    .sort span {
        color: #67747C
    }
    .myTable, table {
        width: 100%
    }
    table {
        width: 100%;
        border-radius: 10px 10px 0 0;
        background-color: #fff
    }
    .myTable thead {
        padding: 0.5rem 1rem;
        background-color: #EEEEEE;
        font-weight: 600;
    }
    .myTable thead td {
        padding: 1rem;
        font-size: 15px
    }
    .myTable tbody td {
        padding: 1rem;
        color: #67747C;
        font-size: 15px
    }
    tbody tr {
        border-bottom: 1px solid #f1f1f1
    }
    tbody tr:hover {
        background-color: #045de908;
        cursor: pointer;
    }
    .delete {
        color:#FC575E;
        margin: 0 20px
    }
    .edit {
        color: #67747C
    }
    .project {
        color:#47b8a3;
        margin: 0 20px
    }

    /* Modal styles */
    .one {
        width: 10%
    }
    .two {
        width: 80%
    }
    .three {
        width: 10%
    }
</style>
