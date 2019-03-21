<template>
    <div class="wrapper">        
        <b-row class="sect-two">
            <b-col sm="12">
                <div class="full-content">
                    <button class="main-btn-sm" @click="openAddSkill()">
                        Create new skill
                    </button>
                </div>
            </b-col>

            <b-col style="text-align: center" class="skill" title="Click to edit" sm="3" xs="3" v-for="(skill, i) in skills" :key="i">
                <button @click="deleteSkill(skill._id)">
                    delete
                </button>
                <div v-if="skill.type === 'photo'" style="width: 100%; text-align: center">
                    <img :src="skill.skillPhoto" alt="" height="100">
                    <p v-if="skill.type === 'photo'" style="font-size: 20px; width: 100%; text-align: center">{{skill.name}}</p>
                </div>
                
                <div v-if="skill.type === 'text'" style="font-size: 20px color: red; width: 100%">
                    <span style="background-color: #bbe6f8;
                                color: #688ec5;
                                border-radius: 47px;
                                padding: 20px;">
                        {{skill.name}}
                    </span>
                </div>
            </b-col>
            
            <b-col style="text-align: center" sm="12" xs="12" v-if="skills.length === 0">
                <img src="../assets/empty.svg" class="empty-img" alt="">
                <p class="empty">
                    There are no skills 
                    <button @click="openAdd()">
                        Create skill
                    </button>
                </p>
            </b-col>
        </b-row>
        
        <b-modal v-model="addSkillModal" centered title="Create new skill" :hide-footer="true">
            <span class="two">
                <label>
                    Skill Type
                </label>
                <b-form-select class="mySelect my-select" @change="switchType($event)" v-model="type" :options="types" /> <br> <br>
                <label>
                    Skill Name
                </label>
                <b-form-input
                    style="margin: 5px 0 20px 0; height: 55px;"
                    type="text"
                    v-model="newSkill.name"
                    required />
                    
                <label v-if="this.showText">
                    Skill Text
                </label>
                <b-form-input
                    v-if="this.showText"
                    style="margin: 5px 0 20px 0; height: 55px;"
                    type="text"
                    v-model="newSkill.skillText"
                    required />
                    
                    
                <label v-if="!this.showText">
                    Skill Icon
                </label>
                <b-form-file v-if="!this.showText" v-model="imgFile" v-on:change="upload($event.target.files, 1)" placeholder="Upload skill icon"></b-form-file>
            </span>
            <span class="three">
                <button style="float: right;
                                background-color: #00D7C4;
                                border: 0;
                                color: #fff;
                                padding: 12px 30px;
                                border-radius: 6px;
                                margin-top: 5px;" @click="addNewSkill()">Create</button>
            </span>
        </b-modal>
        
        <b-modal v-model="editSkillModal" centered title="Edit track" :hide-footer="true">
            <span class="two">
                <label>
                    Skill Type
                </label>
                <b-form-select class="mySelect my-select" @change="switchType($event)" v-model="type" :options="types" /> <br> <br>
                <label>
                    Skill Name
                </label>
                <b-form-input
                    style="margin: 5px 0 20px 0; height: 55px;"
                    type="text"
                    v-model="selectedSkill.name"
                    required />
                    
                <label v-if="this.showText">
                    Skill Text
                </label>
                <b-form-input
                    v-if="this.showText"
                    style="margin: 5px 0 20px 0; height: 55px;"
                    type="text"
                    v-model="selectedSkill.skillText"
                    required />
                    
                    
                <label v-if="!this.showText">
                    Skill Icon
                </label>
                <b-form-file v-if="!this.showText" v-model="imgFile" v-on:change="upload($event.target.files, 0)" placeholder="Upload skill icon"></b-form-file>
            </span>
            <span class="three">
                <button style="float: right;
                                background-color: #00D7C4;
                                border: 0;
                                color: #fff;
                                padding: 12px 30px;
                                border-radius: 6px;
                                margin-top: 5px;" @click="editSkill()">Create</button>
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
      addSkillModal: false,
      editSkillModal:  false,
      selectedSkill: {
        name: '',
        skillPhoto: '',
        skillText: '',
        type: ''
      },
      newSkill: {
        name: '',
        skillPhoto: '',
        skillText: '',
        type: ''
      },
      showText: true,
      type: 0,
      types: [
        {text: 'Text', value: 0},
        {text: 'Picture', value: 1}
      ]
    };
  },
  computed: {
    ...mapGetters({
        sets: 'getSets',
        setStudents: 'getSetStudents',
        tracks: 'getJobTitles',
        skills: 'getSkills'
    }),
    set () {
        return this.sets[0].value
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
    switchType (e) {
        console.log(e)
        if (e === 0) { this.showText = true } else { this.showText = false }
        console.log(this.showText)
    },
    openEdit (id) {
        this.selectedTrack = this.tracks.find(track => track._id === id)
        this.editSkillModal = true
    },

    editSkill () {
        myServices.updateJobTitle(this.selectedTrack)
        .then(res => {
            console.log(res)
            myServices.getJobTitles()
        })
        .catch(err => {
            console.log(err)
        })
    },
    
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
        n === 1 ? this.newSkill.skillPhoto = res.data.secure_url : this.selectedSkill.skillPhoto = res.data.secure_url
      })
      .catch(err => {
        console.log(err.response) 
      })
    },

    openAddSkill() {
        this.addSkillModal = true
    },

    addNewSkill () {
        this.type === 1 ? this.newSkill.type = 'photo' : this.newSkill.type = 'text'
        myServices.addSkill(this.newSkill)
        .then(res => {
            console.log(res)
            this.addSkillModal = false
            myServices.getSkills()
        })
        .catch(err => {
            console.log(err)
        })
    },
    

    log () {
        console.log(this.tracks)
    },

    deleteSkill (id) {
        myServices.deleteSkill(id)
        .then(res => {
            console.log(res)
            myServices.getSkills()
        })
        .catch(err => {
            console.log(err)
        })
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
    // myServices.getSkills()
    // .then(res => {
    //     console.log(res)
    //     // this.tracks = res.data
    // })
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
        margin: 10px 140px 0 140px
    }
    .my-select {
        width: 250px;
        margin: 0 12px;
        height: 40px !important;
    }
    .skill {
        border: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 40px 0;
    }
    .skill button {
        position: relative;
        top: -65px;
        left: 10px;
        background-color: red;
        cursor: pointer;
        display: none;
        border: 0;
        border-radius: 30px;
        color: #fff
    }
    
    .skill:hover button {
        display: block
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
            font-size: 18px;
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
            // .delete {
            //     background-color: ;
            //     color: #fff
            // }
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
