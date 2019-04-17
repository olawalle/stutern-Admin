<template>
    <div class="wrapper">
        <b-row class="sect-two">
            <b-col sm="12">
                <div class="full-content">
                    <button class="main-btn-sm" @click="openAddscholarship()">
                        Create new Scholarship
                    </button>
                </div>
            </b-col>

            <b-col class="card-container" v-for="(scholarship, i) in scholarships" :key="i" sm="6" xs="12">
                <div class="card">
                    <div class="card-img-wrap">
                        <img class="card-img" :src="scholarship.banner" alt="">
                    </div>
                    <p class="card-text-heading">
                        {{scholarship.scholarshipName}} - {{scholarship.scholarshipFacilitator}}
                    </p>
                    <p class="card-text-content">
                        {{scholarship.scholarshipDesc}}
                    </p>
                </div>
                <div class="overlay">
                    <button class="edit" @click="openEdit(scholarship._id)">
                        Edit
                    </button>
                    <button class="delete" @click="delteProject(scholarship._id)">
                        Delete
                    </button>
                </div>
            </b-col>


            <b-col style="text-align: center" sm="12" xs="12" v-if="scholarships.length === 0">
                <img src="../assets/empty.svg" alt="" style="width: 30%; margin: 30px 35%">
                <p style="width: 100%; text-align: center; font-size: 16px; font-weight: 600">
                    There is nothing here. Create a set, tracks, scholarships and skills then start creating student records.
                </p>
            </b-col>
        </b-row>

        <b-modal v-model="addScholarshipModal" centered title="Create new scholarship" :hide-footer="true">

            <span class="two">
                <label>
                Scholarship Name
            </label>
                <b-form-input
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="newscholarship.scholarshipName"
                    required />
                    <label>
                Scholarship Title
            </label>
                <b-form-input
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="newscholarship.scholarshipTitle"
                    required />

            <label>
                Scholarship Faciltator
            </label>
                <b-form-input
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="newscholarship.scholarshipFacilitator"
                    required />

            <label>
                Scholarship Visioner profile
            </label>
                <b-form-textarea
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="newscholarship.visionerProfile"
                    rows="15"
                    required />

            <label>
                Scholarship Description
            </label>
                <b-form-textarea
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="newscholarship.scholarshipDesc"
                    rows="15"
                    required />

                    <label>
                Scholarship Overview
            </label>
                <b-form-textarea
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="newscholarship.overview"
                    rows="15"
                    required />

            <label>
                Scholarship Banner (1365 * 596px) <img v-if="isUploading"  src="../assets/loading.svg" class="spin-img" alt="">
            </label>
                <b-form-file v-model="imgFile" class="" v-on:change="upload($event.target.files, 1)" placeholder="Upload scholarship banner"></b-form-file>
            </span>
            <span class="three">
                <button style="float: right;
                                background-color: #00D7C4;
                                border: 0;
                                color: #fff;
                                padding: 12px 30px;
                                border-radius: 6px;
                                margin-top: 20px;" @click="addNewscholarship()">Create</button>
            </span>
        </b-modal>


        <b-modal v-model="editScholarshipModal" centered title="Edit scholarship" :hide-footer="true">
            <span class="two">
                 <label>
                Scholarship Name
            </label>
                <b-form-input
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="selectedScholarship.scholarshipName"
                    required />
                    <label>
                Scholarship Title
            </label>
                <b-form-input
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="selectedScholarship.scholarshipTitle"
                    required />

            <label>
                Scholarship Faciltator
            </label>
                <b-form-input
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="selectedScholarship.scholarshipFacilitator"
                    required />

            <label>
                Scholarship Visioner profile
            </label>
                <b-form-textarea
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="selectedScholarship.visionerProfile"
                    rows="15"
                    required />

            <label>
                Scholarship Description
            </label>
                <b-form-textarea
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="selectedScholarship.scholarshipDesc"
                    rows="15"
                    required />

            <label>
                Scholarship Overview
            </label>
                <b-form-textarea
                    style="margin-bottom:20px; height: 55px;"
                    type="text"
                    v-model="selectedScholarship.overview"
                    rows="15"
                    required />

            <label>
                Scholarship Banner (1365 * 596px) <img v-if="isUploading"  src="../assets/loading.svg" class="spin-img" alt="">
            </label>
                <b-form-file v-model="imgFile" class="" v-on:change="upload($event.target.files, 2)" placeholder="Upload scholarship banner"></b-form-file>
            </span>
            <span class="three">
                <button style="float: right;
                                background-color: #00D7C4;
                                border: 0;
                                color: #fff;
                                padding: 12px 30px;
                                border-radius: 6px;
                                margin-top: 20px;" @click="updateScholarship()">Save</button>
            </span>
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
      imgFile: null,
      addScholarshipModal: false,
      editScholarshipModal: false,
      newscholarship: {
        scholarshipName: '',
        scholarshipTitle: '',
        scholarshipDesc: '',
        scholarshipFacilitator: '',
        banner: '',
        overView: '',
        vision: '',
        visionerProfile: '',
      },
      selectedScholarship: {
        scholarshipName: '',
        scholarshipTitle: '',
        scholarshipDesc: '',
        scholarshipFacilitator: '',
        banner: '',
        overView: '',
        vision: '',
        visionerProfile: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      sets: 'getSets',
      scholarships: 'getAllScholarships',
      setStudents: 'getSetStudents',
      cloudinary: 'getCloudinaryPresets',
    }),
  },
  methods: {
    openEdit(id) {
      this.selectedScholarship = this.scholarships.find(sch => sch._id === id);
      this.editScholarshipModal = true;
    },

    makeid(length) {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < length; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }

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
          n === 1 ? this.newscholarship.banner = res.body.secure_url : this.selectedScholarship.banner = res.body.secure_url;
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

    openAddscholarship() {
      this.addScholarshipModal = true;
    },

    addNewscholarship() {
      this.$swal({
        title: 'Creating a new scholarship',
        text: 'You are about to create a new scholarship!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
        .then((response) => {
          if (response.value) {
            myServices.addScholarship(this.newscholarship)
              .then((res) => {
                console.log(res);
                this.addScholarshipModal = false;
                myServices.getScholarships();
                this.$swal({
                  type: 'success',
                  title: 'Success',
                  text: 'Scholarship sucessfully created',
                });
              })
              .catch((err) => {
                console.log(err);
                this.$swal({
                  type: 'error',
                  title: 'Error',
                  text: err.response.data.error,
                });
              });
          }
        });
    },


    updateScholarship() {
      this.$swal({
        title: 'Editing Scholarship',
        text: 'You are about to edit the track!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
        .then((response) => {
          if (response.value) {
            myServices.updateScholarship(this.selectedScholarship)
              .then((res) => {
                console.log(res);
                this.editScholarshipModal = false;
                myServices.getScholarships();
                this.$swal({
                  type: 'success',
                  title: 'Edit scholarship details',
                  text: 'Scholarship sucessfully edited',
                });
              })
              .catch((err) => {
                console.log(err);
                this.$swal({
                  type: 'error',
                  title: 'Error',
                  text: err.response.data.error,
                });
              });
          }
        });
    },

    log() {
      console.log(this.scholarships);
    },

    edit(user) {
      console.log(user);
      this.editUser = true;
      this.selectedUser = user;
    },
    submitEdit() {
      myServices.up(this.selectedUser)
        .then((res) => {
          console.log(res);
          this.editUser = false;
        })
        .catch((err) => {
          console.log({ ...err });
        });
    },

    remove(id) {
      myServices.deleteUser(id)
        .then((res) => {
          console.log(res);
          myServices.getUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    myServices.getScholarships();
  },
};
</script>
<style lang="scss" scoped>
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
        padding: 40px 0px
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
        margin-top: 20px;
    }
    .sect-two {
        padding: 60px 100px;
        .name {
            color:#47b8a3;
            font-size: 25px;
            margin-top: 20px;
        }
        .empty {
            color: #67747C;
            width: 100%;
            font-size: 25px;
            text-align: center;
            button {
                background-color: #00D7C4;
                color: #fff;
                border: 0 !important;
                border-radius: 6px;
                margin-left: 12px;
                font-size: 14px;
                padding: 10px 30px;
                cursor: pointer;
            }
        }
        .empty-img {
            width: 400px;
            margin: 12px auto;
        }
        .jobTitle {
            color:#a3a7a6;
            font-size: 15px;
            margin-top: 0 !important
        }
        .topp {
            border-bottom: 1px solid #eee;
            padding-bottom: 40px !important
        }
        .topp-img {
            height: 150px;
            width: auto;
            float: right;
        }
        .sect-two-heading {
            font-family: 'Playfair Display', serif;
            width: 100%;
            text-align: center;
            margin: 20px 0;
            font-style: normal;
            font-weight: bold;
            line-height: normal;
            font-size: 24px;
            text-align: center;
            color: #222829;
        }
        .card-container {
            padding: 0 20px;
            margin: 0 0 40px 0;
            overflow: hidden;
            height: 500px;
            p {
                margin: 12px 0px
            }
            .card {
                background: #FFFFFF;
                // box-shadow: 0px 2.5px 5px rgba(0, 0, 0, 0.05);
                padding: 0 !important;
                height: 500px;
                border: 0 !important;
                border-radius: 0 !important;
                overflow: hidden;
                .card-img-wrap {
                    height: 290px;
                    width: 100%;
                    overflow: hidden;
                    .card-img {
                        border-radius: 0;
                        margin-bottom: 15px;
                        height: 360px;
                        width: auto
                    }
                }
                .card-text-heading {
                    font-style: normal;
                    font-weight: bold;
                    line-height: normal;
                    font-size: 20px;
                    padding: 0 20px !important;
                    font-family: 'Playfair Display', serif;
                    color: #222829;
                }
                .card-text-subheading {
                    font-style: normal;
                    font-weight: 600;
                    line-height: normal;
                    font-size: 18px;
                    margin-top: 0 !important;
                    padding: 0 20px !important;
                    color: #67747C;
                }
                .card-text-content {
                    font-style: normal;
                    font-weight: normal;
                    line-height: 24px;
                    font-size: 16px;
                    padding: 0 20px !important;
                    color: #67747C;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 4;  /* Number of lines displayed before it truncate */
                        overflow: hidden;
                        text-overflow: ellipsis;
                }
                .more {
                    font-style: normal;
                    font-weight: 600;
                    line-height: 26px;
                    font-size: 18px;
                    margin: 20px;
                    color: #00D7C4;
                    cursor: pointer;
                    img {
                        width: 30px;
                        height: auto;
                        margin-left: 12px
                    }
                }
            }
        }
        .overlay {
            background-color: #000;
            width: 100%;
            height: 550px;
            opacity: 0.9;
            transition: linear all 0.3s;
            // display: flex;
            align-items: center;
            text-align: center;
            button {
                border: 0;
                // background-color: #fff;
                width: 30%;
                margin: 40px 10px;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
            }
            .delete {
                background-color: red;
                color: #fff
            }
        }
        .card-container:hover .overlay {
            margin-top: -210px;
        }
        .edit {
            background-color: #00D7C4;
            border: 0;
            color: #fff;
            padding: 12px 30px;
            border-radius: 6px;
            margin-top: 20px;
        }
        .add {
            float: right;
        }
    }
</style>
