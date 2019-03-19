<template>
    <div class="wrapper">
        <!-- <div class="mynav">
            <img src="../assets/logo.svg" alt="">
        </div> -->
        <div class="content">
            <h2>
                <b>
                    Welcome
                </b>
            </h2>
            <h4>
                This is where the magic happens! Log in with your admin credentials to proceed
            </h4>
            <br>
            <b-form-input id="inputLive"
                  v-model="code"
                  class="main-inp"
                  type="text"
                  aria-describedby="inputLiveHelp inputLiveFeedback"
                  placeholder="Enter Code">
            </b-form-input>
             <!-- <b-form-input id="inputLive"
                  v-model="password"
                  class="main-inp"
                  type="text"
                  aria-describedby="inputLiveHelp inputLiveFeedback"
                  placeholder="Enter your password"></b-form-input> -->
                  <!-- <v-icon name="beer"/> -->
            <!-- <input type="text" placeholder="Enter ID" class="main-inp"><br>
            <input type="text" placeholder="Enter your password" class="main-inp"><br> -->
            <button class="main-btn" @click="login()" :disabled="btnDisable">
                Login
            </button>
            <p class="footer">
                Don’t have credentials? <b>Contact</b> the engineering team
            </p>
        </div>
    </div>
</template>
<script>
import services from '../myServices'
import axios from 'axios'
import * as mutationTypes from '../mutationTypes'
import { mapGetters } from 'vuex'
export default {
  computed: {
    // idState () {
    //   this.name.length > 2 ? initialPwrdStatetrue : false
    // },
  },
  data() {
    return {
      code: '',
      password: '',
      btnDisable: false
    };
  },
  computed: {
    ...mapGetters({
        token: 'getToken'
    })
  },
  methods: {
    login() {
        // this.btnDisable = true
        // let data = {
        //     email: this.email,
        //     password: this.password
        // }
        // services.userLogin(data)
        // .then(res => {
        //     this.btnDisable = false
        //     let token = res.data.token
        //     this.$store.commit(mutationTypes.TOKEN, token)
        //     //   Store the access token in session, so users who reload can still access resources
        //     window.sessionStorage.setItem('accessToken', token)
        //     //   Add authorization header to all future axios requests, until the user logs out
        //     axios.defaults.headers.common['x-access-token'] = window.sessionStorage.accessToken
        //     services.getAllSubjects()
        //     // services.getSubjectByClassUrl('SS 1')
        //     // services.getSubjectByClassUrl('SS 2')
        //     // services.getSubjectByClassUrl('SS 3')
        //     console.log(res)
        //     this.$store.commit(mutationTypes.LOGIN_STATUS, true)
        //     this.$router.push({ name: 'subjects' });
        // })
        if (this.code === 'stutern_12345') {
            this.$store.commit(mutationTypes.LOGIN_STATUS, true)
            this.$router.push ('/sets')
        } else {
            alert('wrong passcode!')
        }
    },
  },
};
</script>
<style>
    .wrapper {
        width: 100%;
        /* height: auto; */
        overflow-x: hidden
    }
    .content {
        padding: 80px 480px;
        text-align: center !important
    }
    .content h2 {
        color: #3B444F;
        font-size: 28px;
        margin: 12px 75px
    }
    .content h4 {
        color: #67747C;
        font-size: 18px;
        margin: 12px 100px
    }
    button {
        outline: none
    }
    .footer {
        color: #67747C;
        font-size: 14px;
        margin: 30px 170px
    }
</style>
