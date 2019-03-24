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
                This is where the magic happens! Log in with your admin passcode to proceed
            </h4>
            <br>
            <b-form-input id="inputLive"
                  v-model="code"
                  class="main-inp"
                  type="text"
                  aria-describedby="inputLiveHelp inputLiveFeedback"
                  placeholder="Enter Passcode">
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
                Don’t have credentials? <b>Contact</b> the Stutern team
            </p>
        </div>
    </div>
</template>
<script>
// import axios from 'axios';
import { mapGetters } from 'vuex';
// import services from '../myServices';
import * as mutationTypes from '../mutationTypes';

export default {
  data() {
    return {
      code: '',
      password: '',
      btnDisable: false,
    };
  },
  computed: {
    ...mapGetters({
      token: 'getToken',
    }),
  },
  methods: {
    login() {
      if (this.code === 'stutern_12345') {
        this.$store.commit(mutationTypes.LOGIN_STATUS, true);
        this.$router.push('/sets');
      } else {
        alert('wrong passcode!');
      }
    },
  },
  mounted() {
    this.$store.commit(mutationTypes.LOGIN_STATUS, false);
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
