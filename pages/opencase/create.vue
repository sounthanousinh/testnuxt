<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('opencase.issue_add') }}</h2>
      </v-col>

      <v-col cols="6">
        <v-card class="pa-5" outlined tile>
          <v-form ref="form" @submit.prevent="SubmitForm" v-model="valid" pa-3 lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="barcode_parcel" :counter="15" :rules="codeRules"
                  :label="$t('opencase.table.barcode_parcel')" required @blur="getDetailTracking()"
                  :placeholder="$t('opencase.table.barcode_parcel')" outlined dense></v-text-field>
              </v-col>


              <v-col cols="6">
                <v-text-field v-model="full_name" readonly :counter="255" :rules="nameRules"
                  :label="$t('opencase.table.full_name')" required :placeholder="$t('opencase.table.full_name')" outlined
                  dense></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="tel" :counter="255" readonly :rules="nameRules" :label="$t('opencase.table.tel')"
                  required :placeholder="$t('opencase.table.tel')" outlined dense></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="email" :counter="255" :rules="nameRules" :label="$t('opencase.table.email')"
                  required :placeholder="$t('opencase.table.email')" outlined dense></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field v-model="issue_case" :counter="255" :rules="nameRules"
                  :label="$t('opencase.table.issue_case')" required :placeholder="$t('opencase.table.issue_case')"
                  outlined dense></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-combobox v-model="issue_name" :items="cbx_issue" item-text="issue_name" item-value="id"
                  @change="onChangeIssue" :label="$t('opencase.table.issue_id')" outlined dense></v-combobox>
              </v-col>

              <v-col cols="6">
                <v-combobox v-model="sub_issue_name" :items="cbx_sub_issue" item-text="sub_name" item-value="id"
                  @change="onChangeSubIssue" :disabled="sub_disabled" :label="$t('opencase.table.sub_issue')" outlined
                  dense></v-combobox>
              </v-col>


              <v-col cols="6">
                <v-combobox v-model="current_department_name" :items="cbx_department" item-text="dep_name" item-value="id"
                  @change="onChangeDepartment" :label="$t('opencase.table.current_department')" outlined
                  dense></v-combobox>
              </v-col>

              <v-col cols="6">
                <v-combobox v-model="tag_person_name" :items="cbx_person" item-text="fullname" item-value="id"
                  @change="onChangePerson" :label="$t('opencase.table.tag_person')" outlined dense></v-combobox>
              </v-col>

              <v-col cols="6">
                <v-combobox v-model="type_contact_name" :items="cbx_contact" item-text="type_name" item-value="id"
                  @change="onChangeTypeContact" :label="$t('opencase.table.type_contact_id')" outlined dense></v-combobox>
              </v-col>

              <v-col cols="6">
                <v-combobox v-model="issue_status" :items="opt_status" :label="$t('opencase.table.issue_status')" outlined
                  dense></v-combobox>
              </v-col>

              <v-col cols="12">
                <v-file-input @change="oncheckFile($event)" type="file" :label="$t('opencase.table.documents')" outlined
                  dense></v-file-input>
              </v-col>

              <v-col cols="12">
                <v-textarea rows="5" v-model="issue_discription" outlined :label="$t('opencase.table.issue_discription')"
                  required :placeholder="$t('opencase.table.issue_discription')" dense></v-textarea>
              </v-col>
            </v-row>

            <v-btn color="grey" class="mr-4" @click="goBack">
              {{ $t('button.btn_back') }}
            </v-btn>

            <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
              {{ $t('button.btn_save') }}
            </v-btn>
          </v-form>

        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card v-show="vshow" class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ tracking_no }}
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ sender_fullname }}
                <v-icon>mdi-swap-horizontal</v-icon>
                {{ receive_fullname }}

              </v-list-item-title>

              <v-list-item-subtitle>
                {{ sender_phone_no }}
                <v-icon>mdi-swap-horizontal</v-icon>
                {{ receive_phone_no }}
                <br>
                {{ dropship_start_name }}
                <v-icon>mdi-swap-horizontal</v-icon>
                {{ dropship_end_name }}
                <br>
                {{ created_at }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <!-- <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar> -->
          </v-list-item>
        </v-card>

        <v-card v-show="vshow" class="pa-5" outlined tile>
          <template>
            <v-container>
              <v-timeline dense clipped>
                <v-timeline-item color="grey" small v-for="(values, index) in follows" :key="index" icon="mdi-clock">
                  <v-row justify="space-between">
                    <v-col cols="7">
                      {{ values.tracking_description }}
                      {{ values.tracking_status_name }}
                    </v-col>
                    <v-col class="text-right" cols="5">
                      {{ values.created_at }}
                    </v-col>
                  </v-row>
                </v-timeline-item>
              </v-timeline>



            </v-container>
          </template>
        </v-card>

        <v-progress-linear :active="loading" :indeterminate="load" color="cyan"></v-progress-linear>

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

      valid: true,
      dialog: false,
      opt_status: ['Open New', 'On Going', 'Completed'],
      issue_status: 'Open New',
      nameRules: [
        v => !!v || 'Is required',
        v => (v && v.length <= 255) || 'Name must be less than 255 characters',
      ],
      codeRules: [
        v => !!v || 'Is required',
        v => (v && v.length <= 15) || 'Must be less than 15 characters',
      ],
      success: '',
      icons: '',
      colors: '',
      completed: '',
      userid: '',
      issue_case: '',
      issue_id: '',
      issue_name: '',
      cbx_issue: [],
      documents: null,
      issue_discription: '',
      current_department: '',
      current_department_name: '',
      cbx_department: [],
      last_department: '',
      full_name: '',
      email: '',
      tel: '',
      type_contact_id: '',
      type_contact_name: '',
      cbx_contact: [],
      issue_status: '',
      tag_person: '',
      tag_person_name: '',
      cbx_person: [],
      sub_issue: '',
      sub_issue_name: '',
      sub_disabled: true,
      barcode_parcel: '',
      cbx_sub_issue: [],

      events: [],
      input: null,
      nonce: 0,
      Token: '',
      follows: [],
      detail: null,
      loading: false,
      load: false,

      tracking_no: '',
      sender_fullname: '',
      sender_phone_no: '',
      dropship_start_code: '',
      dropship_start_name: '',
      receive_fullname: '',
      receive_phone_no: '',
      dropship_end_code: '',
      dropship_end_name: '',
      created_at: '',
      vshow: false
    }
  },
  // computed: {

  // },
  mounted() {
    this.fetchTypeOfIssue();
    this.fetchDepartment();
    this.fetchTypeContact();
  },
  methods: {
    async getDetailTracking() {

      if (this.barcode_parcel.length == 15) {
        this.loading = true;
        this.load = true;
        this.vshow = false;
        let formData = new FormData();
        formData.append("phone_no", "+8562093142221");
        formData.append("password", "0854677656");
        formData.append("provider_status", "Y");
        const res = await this.$axios.post('https://api-dev.mixayexpress.com/api/auth/login', formData)
        // get detail tracking
        this.Token = res.data.data.authorization.token;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.Token}`);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        const responve = await fetch(`https://api-dev.mixayexpress.com/api/v1/tracking/${this.barcode_parcel}`, requestOptions).then(res => res.json())

        console.log(responve);

        if (responve) {
          this.loading = false;
          this.load = false;
          this.follows = responve.data[0]?.follow;
          this.detail = responve.data[0]?.detail;
          this.tracking_no = responve.data[0]?.detail.tracking_no;

          this.sender_fullname = responve.data[0]?.detail.sender_fullname;
          this.sender_phone_no = responve.data[0]?.detail.sender_phone_no;
          this.dropship_start_code = responve.data[0]?.detail.dropship_start_code;
          this.dropship_start_name = responve.data[0]?.detail.dropship_start_name;
          this.receive_fullname = responve.data[0]?.detail.receive_fullname;
          this.receive_phone_no = responve.data[0]?.detail.receive_phone_no;
          this.dropship_end_code = responve.data[0]?.detail.dropship_end_code;
          this.dropship_end_name = responve.data[0]?.detail.dropship_end_name;
          this.created_at = responve.data[0]?.detail.created_at;
          this.vshow = true;

          this.full_name = responve.data[0]?.detail.sender_fullname;
          this.tel = responve.data[0]?.detail.sender_phone_no;
        }
      }


      // 300-30804-10037


    },
    async fetchTypeOfIssue() {
      let res = await this.$axios.get("/issue/all");
      const resData = res.data.data;
      this.cbx_issue = resData;
      // console.log('cbx_issue', resData);
    },
    onChangeIssue(entry) {
      // console.log('entry_cbx_issue', entry);
      this.issue_name = entry.issue_name;
      this.issue_id = entry.id;
      if (entry.subissued.length > 0) {
        this.sub_disabled = false;
        this.cbx_sub_issue = entry.subissued;
      } else {
        this.cbx_sub_issue = [];
        this.sub_issue_name = "";
        this.sub_issue = "";
        this.sub_disabled = true;
      }

    },
    onChangeSubIssue(entry) {
      // console.log('onChangeSubIssue', entry);
      this.sub_issue_name = entry.sub_name;
      this.sub_issue = entry.id;
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
    async fetchTypeContact() {
      let res = await this.$axios.get("/contact/all");
      const resData = res.data.data;
      this.cbx_contact = resData;
      // console.log('cbx_contact', resData);
    },
    onChangeTypeContact(entry) {
      // console.log('entry', entry);
      this.type_contact_id = entry.id
      this.type_contact_name = entry.type_name
    },
    oncheckFile(event) {
      this.documents = event;
    },
    async SubmitForm() {
      try {
        let formData = new FormData();
        formData.append("userid", this.$auth.user.id);
        formData.append("full_name", this.full_name);
        formData.append("tel", this.tel);
        formData.append("email", this.email);
        formData.append("issue_case", this.issue_case);
        formData.append("issue_id", this.issue_id);
        formData.append("sub_issue_id", this.sub_issue);
        formData.append("barcode_parcel", this.barcode_parcel);
        formData.append("current_department", this.current_department);
        formData.append("tag_person", this.tag_person);
        formData.append("type_contact_id", this.type_contact_id);
        formData.append("issue_status", this.issue_status == "Open New" ? 1 : (this.issue_status == "On Going" ? 2 : 3));
        formData.append("documents", this.documents);
        // formData.append("documents", 'documents_file');
        formData.append("issue_discription", this.issue_discription);


        const res = await this.$axios.post('issued/store', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(res);
        if (res.data.success) {
          this.dialog = true;
          this.$refs.form.reset()
          this.issue_name = '';
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
