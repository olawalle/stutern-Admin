<template>
    <div class="wrapper">
        <div class="mycontent">
            <div class="myform">
                <b class="add">
                    Add Textbook
                </b>
                <b-form-select class="mySelect my-select" v-model="selectedClass" :options="classes" />
                <b-form-select class="mySelect my-select" v-model="selectedSubject"  :options="subjects" />
                <b-form-input id="inputLive"
                    v-model="title"
                    class="main-inp"
                    type="text"
                    aria-describedby="inputLiveHelp inputLiveFeedback"
                    placeholder="Textbook title (less than 19 characters)">
                </b-form-input>
                <!-- <b-input-group>
                    <b-form-input class="main-inp"
                                required
                                type="file"
                                placeholder="Upload Thumbnail">
                    </b-form-input>
                    <b-input-group-append is-text id="exampleInput1">
                        <i class="fa fa-image"></i>
                    </b-input-group-append>
                </b-input-group> -->
                <!-- <b-input-group>
                    <b-form-input class="main-inp"
                                required
                                type="file"
                                placeholder="Upload Ebook">
                    </b-form-input>
                    <b-input-group-append is-text id="exampleInput1">
                        <i class="fa fa-file"></i>
                    </b-input-group-append>
                </b-input-group> -->
                <!-- <input type="file" v-model="thumb.url" class="form-control" v-on:change="upload($event.target.files)" accept="image/*" /> -->
                <b-form-file v-model="imgFile" class="main-inp-file" v-on:change="upload($event.target.files)" placeholder="Upload Thumbnail"></b-form-file>
                <b-form-file v-model="pdfFile" class="main-inp-file" placeholder="Upload Ebook"></b-form-file>
                <b-form-group>
                    <b-form-radio-group :options="radios"
                                        v-model="isFree"
                                        class="radios"
                                        name="radioInline">
                    </b-form-radio-group>
                </b-form-group>
                <button class="main-btn-sm" @click="uploadTextBook()">
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
import axios from 'axios';
import Vue from 'vue';
import services from '../myServices';

export default {
  data() {
    return {
      cloudinary: {
        uploadPreset: 'f0zojmne',
        apiKey: '537473421397761',
        cloudName: 'dtdjxcklu',
      },
      imgFile: null,
      pdfFile: null,
      selected: null,
      selectedSubject: null,
      selectedClass: null,
      thumbnailUrl: '',
      isFree: false,
      title: '',
      classes: [
        { value: null, text: 'Class' },
        { text: 'SS 1', value: 'SS 1' },
        { text: 'SS 2', value: 'SS 2' },
        { text: 'SS 3', value: 'SS 3' },
      ],
      subjects: [
        { value: null, text: 'Subject' },
        { text: 'Mathematics', value: 'Mathematics' },
        { text: 'English Language', value: 'English Language' },
      ],
      radios: [
        { text: 'Paid', value: false },
        { text: 'Free', value: true },
      ],
    };
  },
  methods: {
    uploadTextBook() {
      if (this.pdfFile !== null && this.title !== '' && this.selectedSubject !== null && this.selectedClass !== null && this.thumbnailUrl !== '') {
        const data = {
          book: this.pdfFile,
          title: this.title,
          subject: this.selectedSubject.toUpperCase(),
          class: this.selectedClass.toUpperCase(),
          isFree: this.isFree,
          thumbnailUrl: this.thumbnailUrl,
        };
        console.log(data);
        services.addTextbook(data)
          .then((res) => {
            console.log(res);
          });
      } else {
        alert('fill all the fields naaaa');
      }
    },
    upload(e) {
      console.log(e);
      const formData = new FormData();
      formData.append('file', e[0]);
      formData.append('upload_preset', this.cloudinary.uploadPreset);
      formData.append('tags', 'stutern textbook thumbnail');
      this.$http.post(`https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`, formData)
        .then((res) => {
          console.log(res.body.secure_url);
        });
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
      text-align: center;
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
    .main-inp-file {
        margin: 30px auto 0 auto !important;
        height: 50px !important;
    }
</style>
