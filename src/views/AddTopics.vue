<template>
    <div class="wrapper">
        <!-- <div class="mynav">
            <img src="../assets/logo.svg" alt="">
            <p class="logout">
                <b>Log Out</b>
            </p>
            <ul>
                <li>TextBooks</li>
                <li>Topics</li>
            </ul>
        </div> -->
        <div class="mycontent">
            <div class="myform">
                <b class="add">
                    Add Topic
                </b>
                <b-form-select class="mySelect my-select" v-model="selectedClass" :options="classes" />
                <b-form-select class="mySelect my-select" v-model="subject"  :options="subjects" />
                <b-input-group>
                    <b-form-input class="main-inp"
                                required
                                type="text"
                                placeholder="Topic (less thn 19 characters)">
                    </b-form-input>
                </b-input-group>
                <b-form-group>
                    <b-form-radio-group :options="radios"
                                        class="radios"
                                        name="radioInline">
                    </b-form-radio-group>
                </b-form-group>
                <button class="main-btn-sm">
                    <b>Publish</b>
                </button>
                <button class="sec-btn-sm">
                    <b>Save as Draft</b>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import services from '../myServices';

export default {
  data() {
    return {
      selected: null,
      selectedClass: null,
      subject: null,
      classes: [
        { value: null, text: 'Class' },
        { text: 'SS 1', value: 'SS 1' },
        { text: 'SS 2', value: 'SS 2' },
        { text: 'SS 3', value: 'SS 3' },
      ],
      subjects: [
        { value: null, text: 'Subject' },
        { text: 'Free', value: 'second' },
      ],
      radios: [
        { text: 'Paid', value: 'first' },
        { text: 'Free', value: 'second' },
      ],
    };
  },
  methods: {
    addTopic() {
      const data = {

      };
      services.addTopic(data);
    },
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
    .mycontent {
        padding: 20px 400px;
        text-align: center;
        background-color: #FAFAFA
    }
    .myform {
        background-color: #fff;
        padding: 20px 120px 80px 120px
    }
    .add {
        color: #3B444F;
        font-size: 20px;
        text-align: center;
        margin: 10px 0 30px 0
    }
    .input-group-text {
      background-color: #DBE6EC !important;
      border: 1px solid #DBE6EC !important;
      width: 100px;
      height: 50px;
      margin: 30px 0 0 -98px;
      z-index: 10000;
      border-radius: 0 50px 50px 0
    }
    .my-select {
        width: 100%;
        height: 50px !important;
        margin: 30px 0 0 0;
    }
    .radios {
        margin: 30px 0;
        float: left;
        color: #3B444F !important
    }
    .main-btn-sm {
        float: left;
        margin-left: 18px
    }
    .sec-btn-sm {
        float: right;
        margin-right: 18px
    }
</style>
