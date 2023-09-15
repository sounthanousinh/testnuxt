<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('subissues.issue_edit') }}</h2>
      </v-col>

      <v-col cols="12">
        <v-card class="pa-5" outlined tile>

          <v-form @submit.prevent="SubmitForm" v-model="valid" pa-3 lazy-validation>

            <v-row>
              <v-col cols="4">
                <v-combobox v-model="title_issue_name" :items="header_issue" item-text="issue_name" item-value="id"
                  :label="$t('subissues.table.title_issue_id')" @change="onChangeDepartment" :return-object="true" outlined dense></v-combobox>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="sub_name" :counter="150" :rules="nameRules" :label="$t('subissues.table.sub_name')"
                  required :placeholder="$t('subissues.table.sub_name')" outlined dense></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-combobox v-model="sub_status" :items="options" :label="$t('subissues.table.sub_status')" outlined
                  dense></v-combobox>
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

<script>
export default {

  data() {
    return {
      valid: true,
      getId: this.$route.params.id,
      dialog: false,
      title_issue_id: '',
      title_issue_name: '',
      sub_name: '',
      sub_status: 'Active',
      nameRules: [
        v => !!v || 'is required',
        v => (v && v.length <= 150) || 'Name must be less than 150 characters',
      ],
      options: [
        'Active',
        'InActive',
      ],
      header_issue: [],
      success: '',
      icons: '',
      colors: '',
      completed: '',
    }
  },
  mounted() {
    this.fetch();
    this.fetchEdit();
  },

  methods: {
    async fetch() {
      let res = await this.$axios.get("/issue/all");
      console.log('res', res);
      const resData = res.data;
      this.header_issue = resData.data;
    },
    async fetchEdit() {
      let res = await this.$axios.get("/subtitleissue/edit/" + this.getId);
      console.log('fetchEdit', res.data.title);
      const resData = res.data.title;
      this.sub_name = resData.sub_name;
      this.title_issue_id = resData.title_issue_id;
      this.sub_status = resData.sub_status == 1 ? 'Active' : 'InActive';

      let fetchHeaderIssue = await this.$axios.get("/issue/edit/" + resData.title_issue_id);
      console.log('fetchHeaderIssue', fetchHeaderIssue);
      this.title_issue_name = fetchHeaderIssue.data.title.issue_name;
    },
    async fetchHeaderIssue() {
      let res = await this.$axios.get("/issue/edit/" + this.getId);
      console.log('fetchEdit', res.data.title);
      const resData = res.data.title;
      this.sub_name = resData.sub_name;
      this.title_issue_id = resData.title_issue_id;
      this.sub_status = resData.sub_status == 1 ? 'Active' : 'InActive';
    },
    async SubmitForm() {
      try {
        let formData = new FormData();
        formData.append("id", this.getId);
        formData.append("title_issue_id", this.title_issue_id);
        formData.append("sub_name", this.sub_name);
        formData.append("sub_status", this.sub_status == "Active" ? 1 : 2);

        const res = await this.$axios.post('subtitleissue/update', formData)
        console.log(res);
        if (res.data.success) {
          this.dialog = true;
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
    onChangeDepartment(entry) {
      this.title_issue_id = entry.id;
      this.title_issue_name = entry.issue_name;

    },
    goBack() {
      this.$router.push('/' + this.$i18n.locale + '/sub-issue')
    },
  },
  head() {
    return {
      title: 'Create Sub issue',
    }
  }
}
</script>
