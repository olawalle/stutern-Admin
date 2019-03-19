<template>
  <div id="app">
        <div class="mynav">
              <img src="./assets/logo.png" alt="" class="logo" @click="toHome()">
            <p class="logout" @click="logout">
                <b>Log Out</b>
            </p>
            <ul>
                <li v-for="(link, i) in links" :key="i" @click="setActive(i)">
                  <router-link :to="'/'+link.link">
                    <span :class="link.state">{{link.link}}</span>
                  </router-link>
                </li>
            </ul>
        </div>
    <router-view class="router-view"/>
  </div>
</template>
<script>
import services from './myServices'
import * as mutationTypes from './mutationTypes'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      links: [
        {link: 'Sets', state: 'active-link'}, 
        {link: 'Tracks', state: ''}, 
        {link: 'Scholarships', state: ''}
      ]
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'logginStatus'
    }),
    homeLink () {
      if (this.isLoggedIn) {
        return '/sets'
      } else {
        return '/'
      }
    },
  },
  methods: {
    // getAllSubjects () {
    //   services.getAllSubjects()
    //   .then(res => {
    //     console.log(res)
    //   })
    // }
    toHome () {
      this.$router.push(this.homeLink)
    },
    logout () {
      this.$store.commit(mutationTypes.CLEAR_STORE)
      this.$store.commit(mutationTypes.LOGIN_STATUS, false)
      window.sessionStorage.removeItem('accessToken')
      this.$router.push({name: 'welcome'})
    },
    setActive (i) {
      this.links.map(link => {
        return link.state = ''
      })
      this.links[i].state = 'active-link'
    }
  },
  mounted () {
  }
}
</script>
<style>
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>

<style lang="scss">
#app {
  font-family: 'Rubik', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.logo {
  width: 135px;
  cursor: pointer;
}
// main styles
.main-inp {
  border:  1px solid #DBE6EC !important;
  border-radius: 30px !important;
  margin: 30px auto 0 auto !important;
  height: 50px !important;
  padding: 0 20px !important;
}
.main-btn {
  border: 0 !important;
  background-color: #4ed3c8;
  padding: 0px 100px;
  color: #fff;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  margin: 0 10px 0 0;
  cursor: pointer;
  margin-top: 12px;
  border-radius: 50px;
}
.main-btn-sm {
  border: 0 !important;
  background-color: #4ed3c8;
  padding: 0px 60px;
  color: #fff;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  margin: 0 10px 0 0;
  margin-top: 12px;
  cursor: pointer;
  border-radius: 50px;
}
.sec-btn {
  background-color: transparent;
  padding: 0px 100px;
  color: #67747C;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  margin-top: 12px;
  border-radius: 50px;
  border: 1px solid #DBE6EC !important
}
.sec-btn-sm {
  border: 0 !important;
  background-color: transparent;
  margin: 0 10px 0 0;
  padding: 0px 60px;
  color: #67747C;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  margin-top: 12px;
  border-radius: 50px;
  border: 1px solid #DBE6EC !important
}
.mySelect {
  border:  1px solid #DBE6EC !important;
  border-radius: 30px !important;
  padding: 0 20px !important;
  color: #767778 !important;
}
.router-view {
  margin-top: 60px
}
// placeholder default overrride
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #a8acae;
    opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #a8acae;
}

::-ms-input-placeholder { /* Microsoft Edge */
    color: #a8acae;
}

// navbar styles
    .mynav {
      position: fixed;
      top: 0;
      width: 100%;
      margin: 0;
      padding: 12px 32px;
      height: 64px;
      background-color: #fff;
      border-bottom: 1px solid #fafafa;
      z-index: 100;
    }
    .mynav img {
        margin: 0;
        float: left;
    }
    .mynav {
      text-align: center
    }
    .mynav a {
      font-weight: 600;
      font-size: 16px;
      color:#2c3e50;
      font-family: 'Rubik', sans-serif;
    }
    .active-link {
      color: #4ed3c8 !important
    }
    .mynav a:hover {
      text-decoration: none;
      color: #4ed3c8
      }
    .mynav ul {
        list-style: none
    }
    .mynav ul li {
        display: inline;
        margin: 16px;
        font-size: 20px
    }
    .logout {
        color: #FC575E;
        margin-top: 6px;
        font-size: 16px;
        float: right;
        cursor: pointer;
    }
    label {
        color: #67747C !important;
        font-weight: 600;
        margin-bottom: 0 !important
    }
</style>
