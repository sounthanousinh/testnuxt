<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('opencase.issue_follow') }}</h2>
      </v-col>
      <v-col cols="12">
        <v-card elevation="2" class="pa-1" outlined tile>
          <v-card-text>
            <p class="text-h4 text--primary">
              {{ issue_case }}
            </p>
            <div class="text--primary">
              <v-row>
                <v-col cols="2">
                  <div class="text--primary">
                    {{ $t('opencase.table.full_name') }}: {{ full_name }}
                  </div>
                </v-col>
                <v-col cols="2">
                  <div class="text--primary">
                    {{ $t('opencase.table.email') }}: {{ email }}
                  </div>
                </v-col>
                <v-col cols="2">
                  <div class="text--primary">
                    {{ $t('opencase.table.tel') }}: {{ tel }}
                  </div>
                </v-col>

                <v-col cols="3">
                  <div class="text--primary">
                    {{ $t('opencase.table.issue_id') }}: {{ issue_name }}
                  </div>
                </v-col>
                <v-col cols="3">
                  <div class="text--primary">
                    {{ $t('opencase.table.sub_issue') }}: {{ sub_issue_name }}
                  </div>
                </v-col>

                <v-col cols="3">
                  <div class="text--primary">
                    {{ $t('opencase.table.current_department') }}: {{ current_department }}
                  </div>
                </v-col>
                <v-col cols="3">
                  <div class="text--primary">
                    {{ $t('opencase.table.tag_person') }}: {{ tag_person }}
                  </div>
                </v-col>
                <v-col cols="3">
                  <div class="text--primary">
                    {{ $t('opencase.table.userid') }}: {{ userid }}
                  </div>
                </v-col>
                <v-col cols="3">
                  <div class="text--primary">
                    {{ $t('opencase.table.type_contact_id') }}: {{ type_contact_id }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text--primary">
                    {{ $t('opencase.table.issue_discription') }}: {{ issue_discription }}
                  </div>
                </v-col>





              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="teal accent-4" @click="windows = 2">
              {{ $t('opencase.table.issue_code') }}: {{ issue_code }}
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="pa-5" elevation="2" outlined tile>
          <v-window v-model="windows" vertical>
            <v-window-item :value="1">
              <v-form ref="form" @submit.prevent="SubmitForm" v-model="valid" pa-3 lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-textarea rows="3" v-model="issuediscription" outlined
                      :label="$t('opencase.table.issue_discription')" required :placeholder="$t('tacking.table.issue')"
                      dense></v-textarea>
                  </v-col>

                  <v-col cols="12">
                    <v-file-input @change="oncheckFile($event)" type="file" :label="$t('opencase.table.documents')"
                      outlined dense></v-file-input>
                  </v-col>

                  <v-col cols="6">
                    <v-combobox v-model="current_department_name" :items="cbx_department" item-text="dep_name"
                      item-value="id" @change="onChangeDepartment" :label="$t('opencase.table.current_department')"
                      outlined dense></v-combobox>
                  </v-col>

                  <v-col cols="6">
                    <v-combobox v-model="tag_person_name" :items="cbx_person" item-text="fullname" item-value="id"
                      @change="onChangePerson" :label="$t('opencase.table.tag_person')" outlined dense></v-combobox>
                  </v-col>

                </v-row>

                <v-btn color="grey" class="mr-4" @click="goBack">
                  {{ $t('button.btn_back') }}
                </v-btn>

                <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
                  {{ $t('button.btn_save') }}
                </v-btn>
              </v-form>
            </v-window-item>

            <v-window-item :value="2">
              <v-card flat>
                <v-card-text>
                  <v-row class="mb-4" align="center">
                    <v-avatar color="grey" class="mr-4"></v-avatar>
                    <strong class="text-h6">Title 22222</strong>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-account</v-icon>
                    </v-btn>
                  </v-row>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </v-card-text>
                <v-btn text color="teal accent-4" @click="windows = 1">
                  Learn More
                </v-btn>
              </v-card>
            </v-window-item>

          </v-window>

        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="pa-1" elevation="2" outlined tile>
          <template>
            <v-container>
              <v-timeline dense clipped>

                <v-timeline-item class="mb-1 " small v-for="(item, index) in alldata" :key="index">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-card :elevation="hover ? 24 : 6" class="mx-auto pa-6">
                        <v-row justify="space-between">
                          <v-col cols="7">
                            <v-row>
                              <v-col cols="12">{{ item.issue_discription }}</v-col>
                              <v-col cols="12"> {{ item.user.fullname }}</v-col>
                            </v-row>

                            <a :href="'http://127.0.0.1:8000/documents/' + item.documents" target="_blank"
                              v-if="item.documents != ''">{{ item.documents }}</a>
                          </v-col>
                          <v-col class="text-right" cols="5">
                            <v-chip class="white--text ml-0" color="purple" label small>
                              {{ formatDate(item.created_at) }}
                            </v-chip>
                          </v-col>
                        </v-row>
                      </v-card>
                    </template>
                  </v-hover>
                </v-timeline-item>
              </v-timeline>
            </v-container>
          </template>
        </v-card>
      </v-col>

    </v-row>
    <template>
      <v-dialog v-model="dialog" persistent max-width="350">
        <v-card>
          <center>
            <v-icon class="text-center" :color="colors" size="110">{{ icons }}</v-icon>
          </center>
          <h1 class="text-center">{{ completed }}</h1>

          <v-card-text class="text-center">
            {{ success }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>
<style>
html,
body {
  overflow: auto !important;
}
</style>
<script>
export default {

  data() {
    return {
      isId: this.$route.params.id,
      events: [],
      input: null,
      nonce: 0,
      length: 3,
      window: 0,
      windows: 1,
      valid: true,
      dialog: false,
      opt_status: ['Open New', 'On Going', 'Completed'],
      issue_status: 'Open New',
      nameRules: [
        v => !!v || 'Is required',
        v => (v && v.length <= 255) || 'Name must be less than 255 characters',
      ],
      success: '',
      icons: '',
      colors: '',
      completed: '',

      documents: null,
      discription: '',
      current_department_name: '',
      cbx_department: [],
      tag_person: '',
      tag_person_name: '',
      cbx_person: [],

      alldata: [],

      userid: '',
      type_contact_id: '',
      issue_id: '',
      issue_name: '',
      sub_issue_id: '',
      sub_issue_name: '',
      barcode_parcel: '',
      issue_code: '',
      issue_case: '',
      issue_discription: '',
      current_department: '',
      department_id: '',
      last_department: '',
      full_name: '',
      email: '',
      tel: '',
      issue_status: '',
      created_at: '',
      updated_at: '',
      issuediscription: '',
    }
  },
  mounted() {
    this.fetchDepartment();
    this.fetchAllData();
  },
  methods: {

    async fetchAllData() {
      let res = await this.$axios.get(`/issued/edit/${this.isId}`);
      const resData = res.data;
      const isData = resData.issued;
      this.issue_case = isData.issue_case;
      this.issue_code = isData.issue_code;
      this.full_name = isData.full_name;
      this.email = isData.email;
      this.tel = isData.tel;
      this.issue_name = isData.issue?.issue_name;
      this.issue_id = isData.issue_id;
      this.sub_issue_name = isData.sub_issue?.sub_name;
      this.sub_issue_id = isData.sub_issue_id;
      this.current_department = isData.department.dep_name;
      this.department_id = isData.current_department;
      // this.tag_person = isData.tag_person;
      this.userid = isData.user.fullname;
      this.type_contact_id = isData.type_contact.type_name;
      this.issue_discription = isData.issue_discription;

      const detail = await this.$axios.get(`/detail-issue/edit/${this.isId}`);
      const full = detail.data.alldata;
      console.log(full);
      this.alldata = full;

      console.log('isData', isData);

    },
    async fetchDepartment() {
      let res = await this.$axios.get("/department/all");
      const resData = res.data.data;
      this.cbx_department = resData;
      // console.log('cbx_department', resData);
    },
    onChangeDepartment(entry) {
      // console.log('entry', entry);
      this.current_department = entry.id
      this.current_department_name = entry.dep_name

      if (entry.users.length > 0) {
        this.cbx_person = entry.users;
      } else {
        this.tag_person = "";
      }
    },
    onChangePerson(entry) {
      // console.log('entry', entry);
      this.tag_person = entry.id;
      this.tag_person_name = entry.fullname;
    },
    oncheckFile(event) {
      this.documents = event;
    },
    async SubmitForm() {
      try {
        let formData = new FormData();
        formData.append("issue_id", this.isId);
        formData.append("userid", this.$auth.user.id);
        formData.append("department_id", this.department_id);
        formData.append("documents", this.documents);
        formData.append("issue_discription", this.issuediscription);


        // formData.append("issue_status", this.issue_status == "Open New" ? 1 : (this.issue_status == "On Going" ? 2 : 3));
        formData.append("current_department", this.current_department);
        formData.append("tag_person", this.tag_person);


        const res = await this.$axios.post('detail-issue/store', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(res);
        if (res.data.success) {
          const full = res.data.alldata;
          // console.log(full);
          this.alldata = full;
          this.dialog = true;
          this.$refs.form.reset()
          this.success = res.data.message;
          this.icons = 'mdi-check-circle-outline';
          this.colors = 'success';
          this.completed = 'successfully';
        }
      } catch (error) {
        console.log(error.data)
        this.dialog = true;
        this.success = error.data;
        this.icons = 'mdi-check-circle-outline';
        this.colors = 'error';
        this.completed = 'Error';
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    goBack() {
      this.$router.push('/' + this.$i18n.locale + '/opencase')
    },
  },
  head() {
    return {
      title: 'Create Open Case',
    }
  }
}
</script>
