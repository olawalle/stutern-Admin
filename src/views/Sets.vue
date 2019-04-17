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
            <button v-if="sets && sets.length > 0" class="main-btn-sm" @click="createUser()">
                Create User
            </button>
            <div class="sort" v-if="sets.length > 0">
                <span>
                    <b>Cohurt:</b>
                </span>
                <b-form-select class="mySelect my-select" @change="fetchSet($event)" v-model="set" :options="sets" />
                <!-- <b-form-select class="mySelect my-select" v-model="selected"  :options="options" />
                <b-form-select class="mySelect my-select" v-model="selected"  :options="options" /> -->
            </div>
            <div class="myTable" v-if="setStudents.students && setStudents.students.length > 0">
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
            <div class="myTable" v-else>
                <img src="../assets/empty.svg" alt="" style="width: 30%; margin: 30px 35%">
                <p style="width: 100%; text-align: center; font-size: 16px; font-weight: 600">
                    There is nothing here. Create a set, tracks, scholarships and skills then start creating student records.
                </p>
            </div>
        </div>

        <b-modal v-model="createSet" centered title="Create new set" :hide-footer="true">
            <span class="two">
                <label>
                    Set name (E.g: SGA 0.1)
                </label>
                <b-form-input
                    style="height: 55px;"
                    type="text"
                    v-model="setName"
                    required />
            </span>
            <span style="color: red; font-size; 10px">
                Please ensure you create the sets in a sequential order
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
                Email address
            </label>
            <b-form-input
                style="margin-bottom:20px; height: 55px;"
                type="text"
                v-model="selectedUser.userEmail"
                required
                 />

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
                CV link / user portfolio website url
            </label>
            <b-form-input
                style="margin-bottom:20px; height: 55px;"
                type="text"
                v-model="selectedUser.userCV"
                required
                 />

            <label>
                Job title
            </label>
            <b-form-select style="margin-bottom:20px; height: 55px;" @change="change($event, 2)" v-model="selectedUser.jobTitle" :options="jobTitles" />

            <label>Skill(s)</label>
            <b-form-group>
                <b-form-checkbox-group v-model="selectedUser.userSkills" :options="skills" />
            </b-form-group>

            <label>Scholarship(s)</label>
            <b-form-group>
                <b-form-checkbox-group v-model="selectedUser.userScholarship" :options="scholarships" />
            </b-form-group>

            <label>
                Availability
            </label>
            <b-form-group label="" style="margin-bottom:20px; height: 55px;">
                <b-form-radio-group  v-model="selectedUser.availability" :options="availabilities" name="some-radios">
                </b-form-radio-group>
            </b-form-group>

            <label>
                User Photo <img v-if="isUploading" src="../assets/loading.svg" class="spin-img" alt="">
            </label>
            <b-form-file v-model="imgFile"
                    style="height: 55px;" class="" v-on:change="upload($event.target.files, 2)" placeholder="Upload User Photo"></b-form-file>
            <span style="color: red">
                ensure image is as close to a square as possible
            </span> <br>

            <button style="float: right;
                            background-color: #00D7C4;
                            border: 0;
                            color: #fff;
                            padding: 12px 30px;
                            border-radius: 6px;
                            margin-top: 20px;" @click="submitEdit()">Save</button>
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
                 />

            <label>
                Email address
            </label>
            <b-form-input
                style="margin-bottom:20px; height: 55px;"
                type="text"
                v-model="newUser.userEmail"
                required
                 />

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
                Photo <img v-if="isUploading"  src="../assets/loading.svg" class="spin-img" alt="">
            </label>
            <b-form-file v-model="imgFile" class="" v-on:change="upload($event.target.files, 1)" placeholder="Upload User Photo"></b-form-file>
            <span style="color: red; margin-bottom: 12px;">
                ensure image is as close to a square as possible
            </span> <br>

            <label>
                Cohurt
            </label>
            <b-form-select style="margin-bottom:20px; height: 55px;" v-model="newUser.userSet" :options="sets" />


            <label>
                CV link / user portfolio website url
            </label>
            <b-form-input
                style="margin-bottom:20px; height: 55px;"
                type="text"
                v-model="newUser.userCV"
                required
                 />

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
import { mapGetters } from 'vuex';
import axios from 'axios';
import myServices from '../myServices';
import * as mutationTypes from '../mutationTypes';

export default {
  data() {
    return {
      isUploading: false,
      addDisabled: false,
      imgFile: null,
      editUser: false,
      createSet: false,
      createUserModal: false,
      addTrackModal: false,
      setName: '',
      selected: null,
      newUser: {
        userName: '',
        availability: '',
        jobTitle: null,
        userSet: null,
        userSetid: '',
        userPhoto: '',
        userEmail: '',
        userCV: '',
        userSkills: [],
        userDesc: '',
        userScholarship: [],
      },
      selectedUser: {
        userName: '',
        jobTitle: '',
        availability: '',
        userDesc: '',
        userPhoto: '',
        userEmail: '',
        userCV: '',
        userSkills: [],
        userScholarship: [],
        // userSet: ''
        // userSetid: ''
      },
      newObj: {
        userName: '',
        jobTitle: '',
        availability: '',
        userSet: '',
        userSetid: '',
      },
      newTrack: {
        trackName: '',
        trackTitle: '',
        trackDesc: '',
        banner: '',
      },
      //   userName_: "",
      // cohurt_: "",
      // jobTitle_: "",
      availabilities: [
        { text: 'Available', value: true },
        { text: 'Hired', value: false },
      ],
    };
  },
  computed: {
    ...mapGetters({
      sets: 'getSets',
      setStudents: 'getSetStudents',
      jobTitles: 'getJobTitles',
      scholarships: 'getAllScholarships',
      skills: 'getSkills',
      cloudinary: 'getCloudinaryPresets',
    }),
    set() {
      if (this.sets.length > 0) {
        return this.sets[0].value;
      }
      return '';
    },
    cohurt: {
      get() {
        return this.selectedUser.userSet;
      },
      set(value) {
        this.newObj.userSet = value;
      },
    },
    jobTitle: {
      get() {
        return this.selectedUser.jobTitle;
      },
      set(value) {
        this.newObj.jobTitle = value;
      },
    },
  },
  mounted() {
    // console.log(this.sets);
  },
  methods: {

    test() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
        .then((result) => {
          if (result.value) {
            console.log('yes');
          } else {
            console.log('no');
          }
        });
    },

    makeid(length) {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },

    upload(e, n) {
      this.isUploading = true;
      const formData = new FormData();
      formData.append('file', e[0]);
      formData.append('upload_preset', this.cloudinary.uploadPreset);
      formData.append('public_id', this.makeid(20));
      this.$http.post(`https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/image/upload`, formData)
        .then((res) => {
          this.isUploading = false;
          switch (n) {
            case 1:
              this.newUser.userPhoto = res.body.secure_url;
              break;
            case 2:
              this.selectedUser.userPhoto = res.body.secure_url;
            case 3:
              this.newTrack.banner = res.body.secure_url;
            default:
              break;
          }
        })
        .catch((err) => {
          this.isUploading = false;
          this.$swal({
            title: 'Error',
            type: 'error',
            text: err.body.error.message,
          });
        });
    },

    addSet() {
      this.createSet = true;
    },

    openAddTrack() {
      this.addTrackModal = true;
    },

    newSet() {
      myServices.postSet({ setName: this.setName })
        .then((res) => {
          this.createSet = false;
          myServices.getSets();
          this.$swal({
            title: 'Success',
            type: 'success',
            text: 'Cohurt/set sucessfully created',
          });
        })
        .catch((err) => {
        //   console.log(err.response);
          this.$swal({
            title: 'Error',
            type: 'error',
            text: err.response.data.error,
          });
        });
    },

    addNewTrack() {
      myServices.addJobTitle(this.newTrack)
        .then((res) => {
          console.log(res);
          myServices.getJobTitles();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openProjects(student) {
      this.$store.commit(mutationTypes.SELECTED_STUDENT, student);
      this.$router.push({ name: 'userProjects', params: { id: student._id } });
    },
    fetchSet($v) {
      // console.log($v)
      this.set = {
        text: $v,
        value: $v,
      };
      myServices.getSetStudents($v);
    },
    edit(user) {
      console.log(user);
      this.editUser = true;
      this.selectedUser = user;
    },
    submitEdit() {
      this.$swal({
        title: 'Are you sure?',
        text: 'You are about to edit the students details!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((res) => {
        if (res.value) {
          myServices.updateUser(this.selectedUser)
            .then((res) => {
              console.log(res);
              myServices.getSetStudents(this.selectedUser.userSet);
              this.editUser = false;
            })
            .catch((err) => {
              this.$swal({
                type: 'error',
                text: 'An error occured, pls try again',
                title: 'Error',
              });
            });
        }
      });
    },
    remove(id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
        .then((result) => {
          if (result.value) {
            myServices.deleteUser(id)
              .then((res) => {
                console.log(res);
                myServices.getUsers();
                this.$swal({
                  type: 'success',
                  text: 'Student successfully deleted',
                  title: 'Success',
                });
              })
              .catch((err) => {
                console.log(err);
                this.$swal({
                  type: 'error',
                  text: 'An error occured, pls try again',
                  title: 'Error',
                });
              });
          }
        });
    },
    change($event, n) {
      console.log(this.selectedUser);
    },
    createUser() {
      this.createUserModal = true;
    },
    submitCreate() {
      if (!this.newUser.userSet) {
        this.$swal({
          type: 'error',
          title: 'error',
          text: 'Select a cohurt for the student',
        });
      } else {
        this.newUser.userSetid = this.sets.find(set => set.setName === this.newUser.userSet)._id;
        myServices.createUser(this.newUser)
          .then((res) => {
            this.createUserModal = false;
            this.fetchSet(this.newUser.userSet);
            this.newUser = {
                userName: '',
                availability: '',
                jobTitle: null,
                userSet: null,
                userSetid: '',
                userPhoto: '',
                userEmail: '',
                userCV: '',
                userSkills: [],
                userDesc: '',
                userScholarship: [],
            },
            this.$swal({
              type: 'success',
              title: 'Success',
              text: `Student named ${newUser.userName} successfully created`,
            });
          })
          .catch((err) => {
            this.$swal({
              type: 'error',
              title: 'Error',
              text: err.response.data.error,
            });
          });
      }
    },
  },
  beforeMount() {
    myServices.getUsers();
    myServices.getSets();
    myServices.getJobTitles();
    myServices.getScholarships();
    myServices.getSkills();
    myServices.getSetStudents(this.set);
  },
};
</script>
<style scoped>
    .wrapper {
        width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
        background-color: #FAFAFA
    }
    .empty-content {
        padding: 50px 480px;
    }
    .full-content {
        padding: 100px 32px;
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
