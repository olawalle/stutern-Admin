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
        <div class="empty-content" v-if="textbooks.length === 0">
            <p class="empty">
                Seems no textbooks have been added yet. You can do so with the button below
            </p>
            <button class="main-btn">
                Add Textbook
            </button>
        </div>
        <div class="full-content" v-else>
            <button class="main-btn-sm" @click="addTextbook()">
                Add Textbook
            </button>
            <div class="sort">
                <span @click="test()">
                    <b>Sort by</b>
                </span>
                <b-form-select class="mySelect my-select" v-model="selectedSubject" :options="subjects" />
                <b-form-select class="mySelect my-select" v-model="selectedClass"  :options="classes" />
                <b-form-select class="mySelect my-select" v-model="selectedType"  :options="type" />
            </div>
            <div class="myTable">
                <table>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Class</td>
                            <td>Subject</td>
                            <td>Type</td>
                            <td>Status</td>
                            <td class="action"></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(book, i) in filteredBooks" :key="i" v-if="filteredBooks.length > 0">
                            <td>
                                {{book.title}}
                            </td>
                            <td>
                                {{book.class}}
                            </td>
                            <td>{{book.subject}}</td>
                            <td>{{book.type}}</td>
                            <td>{{book.status}}</td>
                            <td class="action">
                                <span class="edit">Edit</span>
                                <span class="delete">Delete</span>
                            </td>
                        </tr>
                        <tr v-if="filteredBooks.length === 0">
                            <td colspan="6">
                            No book meets your specified criteria. Please add one if you can! <i class="em em-pray"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      selectedSubject: null,
      selectedClass: null,
      selectedType: null,
      subjects: [
        { value: null, text: 'Subject' },
        { text: 'Mathematics', value: 'Mathematics' },
        { text: 'English Language', value: 'English Language' },
      ],
      classes: [
        { value: null, text: 'Class' },
        { text: 'SS 1', value: 'SS 1' },
        { text: 'SS 2', value: 'SS 2' },
        { text: 'SS 3', value: 'SS 3' },
      ],
      type: [
        { value: null, text: 'Type' },
        { text: 'Free', value: 'Free' },
        { text: 'Paid', value: 'Paid' },
      ],
      textbooks: [
        {
          title: 'New General Mathematics', class: 'SS 1', subject: 'Mathematics', status: 'Published', type: 'Free',
        },
        {
          title: 'New General english', class: 'SS 2', subject: 'English Language', status: 'Published', type: 'Paid',
        },
        {
          title: 'New General Mathematics', class: 'SS 1', subject: 'Mathematics', status: 'Published', type: 'Free',
        },
        {
          title: 'New english Mathematics', class: 'SS 3', subject: 'English Language', status: 'Published', type: 'Free',
        },
        {
          title: 'English General Mathematics', class: 'SS 3', subject: 'English Language', status: 'Published', type: 'Free',
        },
        {
          title: 'New General Mathematics', class: 'SS 1', subject: 'Mathematics', status: 'Published', type: 'Paid',
        },
      ],
    };
  },
  computed: {
    filterBySubject() {
      if (this.selectedSubject !== null) {
        return this.textbooks.filter(book => book.subject.toUpperCase() === this.selectedSubject.toUpperCase());
      }
      return this.textbooks;
    },
    filterByClass() {
      if (this.selectedClass !== null) {
        return this.textbooks.filter(book => book.class.toUpperCase() === this.selectedClass.toUpperCase());
      }
      return this.textbooks;
    },
    filterByType() {
      if (this.selectedType !== null) {
        return this.textbooks.filter(book => book.type.toUpperCase() === this.selectedType.toUpperCase());
      }
      return this.textbooks;
    },
    filteredBooks() {
      if (this.selectedSubject !== null && this.selectedClass !== null && this.selectedType !== null) {
        return this.textbooks.filter(book => book.class.toUpperCase() === this.selectedClass.toUpperCase()
                       && book.type.toUpperCase() === this.selectedType.toUpperCase()
                       && book.subject.toUpperCase() === this.selectedSubject.toUpperCase());
      } if (this.selectedSubject === null && this.selectedClass !== null && this.selectedType !== null) {
        return this.textbooks.filter(book => book.class.toUpperCase() === this.selectedClass.toUpperCase()
                       && book.type.toUpperCase() === this.selectedType.toUpperCase());
      } if (this.selectedSubject !== null && this.selectedClass === null && this.selectedType !== null) {
        return this.textbooks.filter(book => book.subject.toUpperCase() === this.selectedSubject.toUpperCase()
                       && book.type.toUpperCase() === this.selectedType.toUpperCase());
      } if (this.selectedSubject !== null && this.selectedClass !== null && this.selectedType === null) {
        return this.textbooks.filter(book => book.subject.toUpperCase() === this.selectedSubject.toUpperCase()
                       && book.class.toUpperCase() === this.selectedClass.toUpperCase());
      } if (this.selectedSubject !== null && this.selectedClass === null && this.selectedType === null) {
        return this.textbooks.filter(book => book.subject.toUpperCase() === this.selectedSubject.toUpperCase());
      } if (this.selectedSubject === null && this.selectedClass !== null && this.selectedType === null) {
        return this.textbooks.filter(book => book.class.toUpperCase() === this.selectedClass.toUpperCase());
      } if (this.selectedSubject === null && this.selectedClass === null && this.selectedType !== null) {
        return this.textbooks.filter((book) => {
          book.type.toUpperCase() === this.selectedType.toUpperCase();
        });
      }
      return this.textbooks;
    },
  },
  methods: {
    addTextbook() {
      console.log('clicked');
      this.$router.push({ name: 'addTextbooks' });
    },
    test() {
    //   console.log(this.filterByType);
      console.log(this.filteredBooks);
    //   console.log(this.selectedClass.toUpperCase())
    //   console.log(this.filterBySubject);
    },
  },
  mounted() {
    // console.log(this.textbooks);
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
    .empty-content {
        padding: 50px 480px;
    }
    .full-content {
        padding: 20px 32px
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
    .action {
        width: 200px
    }
    .delete {
        display: none;
        color:#FC575E;
        margin: 0 20px
    }
    .edit {
        display: none;
        color: #67747C
    }
    tr:hover .edit, tr:hover .delete {
        display: inline
    }
</style>
