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
                    <img class="card-img" :src="scholarship.banner" alt="">
                    <p class="card-text-heading">
                        {{scholarship.scholarshipName}} - {{scholarship.scholarshipFacilitator}}
                    </p>
                    <p class="card-text-content">
                        {{scholarship.scholarshipDesc}}
                    </p>
                </div>
                <div class="overlay">
                    <button class="edit" @click="openEdit(project._id)">
                        Edit
                    </button>
                    <button class="delete" @click="delteProject(scholarship._id)">
                        Delete
                    </button>
                </div>
            </b-col>

            
            <b-col style="text-align: center" sm="12" xs="12" v-if="scholarships.length === 0">
                <img src="../assets/empty.svg" class="empty-img" alt="">
                <p class="empty">
                    There are no scholarships
                </p>
            </b-col>
        </b-row>
        
        <b-modal v-model="addScholarshipModal" centered title="Create new scholarship" :hide-footer="true">
            <span class="two">
                <b-form-input
                    style="margin-top:12px; height: 55px;"
                    type="text"
                    placeholder="e.g: Web development"
                    v-model="newscholarship.scholarshipName"
                    required />
                <b-form-input
                    style="margin-top:12px; height: 55px;"
                    type="text"
                    placeholder="e.g: Web developer"
                    v-model="newscholarship.scholarshipTitle"
                    required />
                <b-form-input
                    style="margin-top:12px; height: 55px;"
                    type="text"
                    placeholder="e.g: Web development"
                    v-model="newscholarship.scholarshipFacilitator"
                    required />
                    
                <b-form-textarea
                    style="margin-top:12px; height: 55px;"
                    type="text"
                    placeholder="e.g: scholarship description"
                    v-model="newscholarship.scholarshipDesc"
                    rows="15"
                    required />
                    
                <b-form-textarea
                    style="margin-top:12px; height: 55px;"
                    type="text"
                    placeholder="e.g: scholarship description"
                    v-model="newscholarship.overview"
                    rows="15"
                    required />

                <b-form-file v-model="imgFile" class="inp" v-on:change="upload($event.target.files)" placeholder="Upload scholarship banner"></b-form-file>
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
      imgFile: null,
      addScholarshipModal: false,
      newscholarship: {
        scholarshipName: '',
        scholarshipTitle: '',
        scholarshipDesc: '',
        scholarshipFacilitator: '',
        banner: '',
        overView: ''
      },
      scholarships: []
    };
  },
  computed: {
    ...mapGetters({
        sets: 'getSets',
        setStudents: 'getSetStudents'
    })
  },
  methods: {
    
    makeid(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    upload (e) {
      console.log(e)
      const formData = new FormData()
      formData.append('file', e[0]);
      formData.append('upload_preset', this.cloudinary.uploadPreset);
      formData.append('public_id', this.makeid(20))
      axios.post(`https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/image/upload`, formData)
      .then(res => {
        console.log(res)
        this.newscholarship.banner = res.data.secure_url 
      })
      .catch(err => {
        console.log(err.response) 
      })
    },

    openAddscholarship() {
        this.addScholarshipModal = true
    },

    addNewscholarship () {
        myServices.addScholarship(this.newscholarship)
        .then(res => {
            console.log(res)
            this.addScholarshipModal = false
            myServices.getJobTitles()
        })
        .catch(err => {
            console.log(err)
        })
    },

    log () {
        console.log(this.scholarships)
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
            this.editUser = false
        })
        .catch(err => {
            console.log({...err})
        })
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
    }
  },
  beforeMount() {
    myServices.getScholarships()
    .then(res => {
        let data = res.data.map(scholarship => {
            return {
                ...scholarship,
                text: scholarship.scholarshipName,
                value: scholarship.scholarshipName
            }
        })
        this.scholarships = data
        console.log(data)
    })
    .catch(err => console.log(err))
  },
};
</script>
<style lang="scss" scoped>
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
                .card-img {
                    height: 290px;
                    margin: 0;
                    border-radius: 0;
                    margin-bottom: 15px
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
