<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('issues.issue_add') }}</h2>
      </v-col>

      <v-col cols="12">
        <v-card class="pa-5" outlined tile>

          <v-form ref="form" @submit.prevent="SubmitForm()" v-model="valid" pa-3 lazy-validation>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="issue_name" :counter="150" :rules="nameRules"
                  :label="$t('issues.table.issue_name')" required :placeholder="$t('issues.table.issue_name')" outlined
                  dense></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-combobox v-model="issue_status" :items="options" :label="$t('issues.table.type_status')" outlined
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
            <!-- <v-btn color="green darken-1" text @click="dialog = false">
              Disagree
            </v-btn> -->
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
      dialog: false,
      icons: null,
      success: null,
      completed: null,
      colors: null,
      issue_name: null,
      issue_status: 'Active',
      nameRules: [
        v => !!v || 'Issue Name is required',
        v => (v && v.length <= 150) || 'Issue Name must be less than 150 characters',
      ],
      options: [
        'Active',
        'InActive',
      ],
      checkbox: false,
    }
  },

  methods: {
    async SubmitForm() {
      try {
        let formData = new FormData();
        formData.append("issue_name", this.issue_name);
        formData.append("issue_status", this.issue_status == "Active" ? 1 : 2);

        const res = await this.$axios.post('issue/store', formData)
        console.log(res);
        if (res.data.success) {
          this.dialog = true;
          this.issue_name = '';
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
        // this.$refs.form.reset()
        this.icons = 'mdi-check-circle-outline';
        this.colors = 'error';
        this.completed = 'Error';
      }
    },
    goBack() {
      this.$router.push('/' + this.$i18n.locale + '/issue')
    },
  },


  head() {
    return {
      title: 'Create Title issue',
    }
  }
}
</script>
