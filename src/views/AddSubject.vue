<template>
    <div class="wrapper">
        <div class="mycontent">
            <div class="myform">
                <b class="add">
                    Add Subject
                </b>
                <!-- <b-form-select class="mySelect my-select" v-model="selected" :options="options" /> -->
                <b-form-select class="mySelect my-select" v-model="selectedClass"  :options="classes" />
                <b-form-input id="inputLive"
                    v-model="subjectName"
                    class="main-inp"
                    type="text"
                    aria-describedby="inputLiveHelp inputLiveFeedback"
                    placeholder="Enter Subject">
                </b-form-input>
                <b-tabs class="class-tabs">
                    <b-tab title="SS 1" active>
                        <ul>
                            <li v-for="(subject, i) in subjects" :key="i">
                                {{subject}}
                            </li>
                        </ul>
                    </b-tab>
                    <b-tab title="SS 2" >
                        <ul>
                            <li v-for="(subject, i) in subjects" :key="i">
                                {{subject}}
                            </li>
                        </ul>
                    </b-tab>
                    <b-tab title="SS 3">
                        <ul>
                            <li v-for="(subject, i) in subjects" :key="i">
                                {{subject}}
                            </li>
                        </ul>
                    </b-tab>
                </b-tabs>
                <div class="buttons">
                    <button class="sec-btn-sm" @click="addToList()">
                        <b>Add to list</b>
                    </button>
                    <button class="main-btn-sm">
                        <b>Publish</b>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import services from '../myServices';

export default {
  data() {
    return {
      selectedClass: null,
      subjectName: '',
      subjects: ['English Language', 'Mathematics', 'English Language', 'Mathematics', 'English Language', 'Mathematics'],
      classes: [
        { value: null, text: 'Class' },
        { text: 'SS 1', value: 'SS 1' },
        { text: 'SS 2', value: 'SS 2' },
        { text: 'SS 3', value: 'SS 3' },
      ],
      radios: [
        { text: 'Paid', value: 'first' },
        { text: 'Free', value: 'second' },
      ],
    };
  },
  methods: {
    addToList() {
      if (this.subjectName !== '' && this.selectedClass !== null) {
        const data = {
          name: this.subjectName.toUpperCase(),
          class: this.selectedClass.toUpperCase(),
        };
        console.log(data);
        services.addSubject(data)
          .then((res) => {
            services.getAllSubjects();
          });
      }
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
    .myform ul {
        margin: 20px 0 0 0;
        /* list-style: none; */
        float: left;
    }
    .myform ul li {
        text-align: left;
        margin: 10px 0 0 0;
    }
    .class-tabs {
        margin: 30px 0;
        height: auto;
        overflow: auto;
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
    .buttons {
        width: 100%;
        margin: 0px 0 0 0;
        /* background-color: aqua */
    }
    button {
        outline: none
    }
    .main-btn-sm {
        /* float: left; */
        margin-left: 18px
    }
    .sec-btn-sm {
        /* float: right; */
        margin-right: 18px
    }
</style>
