<template>
  <div>

    <v-row>
      <v-col cols="12">
        <h2>{{ $t('departments.dep_edit') }}</h2>
      </v-col>

      <v-col cols="12">
        <v-card class="pa-5" outlined tile>

          <v-form ref="form" @submit.prevent="SubmitForm" v-model="valid" pa-3 lazy-validation>

            <v-row>
              <v-col cols="6">
                <v-text-field v-model="getId" label="Id" required outlined dense></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="dep_name" :counter="150" :rules="nameRules"
                  :label="$t('departments.table.dep_name')" required placeholder="name" outlined dense></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-combobox v-model="dep_status" :items="options" :label="$t('departments.table.dep_status')" outlined
                  dense></v-combobox>
              </v-col>
            </v-row>


            <v-btn color="grey" class="mr-4" @click="goBack">
              {{ $t('button.btn_back') }}
            </v-btn>

            <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
              {{ $t('button.btn_edit') }}
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
      getId: this.$route.params.id,
      dialog: false,
      valid: true,
      dep_name: '',
      dep_status: '',
      nameRules: [
        v => !!v || 'Department Name is required',
        v => (v && v.length <= 150) || 'Department Name must be less than 150 characters',
      ],
      options: [
        'Active',
        'InActive',
      ],
      checkbox: false,
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      let res = await this.$axios.get("/department/edit/" + this.getId);
      console.log('res', res);
      const department = res.data.department;
      this.dep_name = res.data.department.dep_name;
      this.dep_status = res.data.department.dep_status == 1 ? 'Active' : 'InActive';

    },
    async SubmitForm() {
      try {
        let formData = new FormData();
        formData.append("dep_name", this.dep_name);
        formData.append("dep_status", this.dep_status == "Active" ? 1 : 2);
        formData.append("id", this.getId);

        const res = await this.$axios.post('department/update', formData)
        console.log(res);
        if (res.data.success) {
          this.dialog = true;
          this.dep_name = '';
          this.$refs.form.reset()
          this.success = res.data.message;
          this.icons = 'mdi-check-circle-outline';
          this.colors = 'success';
          this.completed = 'successfully';
        }

      } catch (error) {
        console.log(error.data)
        this.dialog = true;
        this.dep_name = '';
        this.success = error.data;
        this.icons = 'mdi-check-circle-outline';
        this.colors = 'error';
        this.completed = 'Error';
      }
    },
    goBack() {
      this.$router.push('/' + this.$i18n.locale + '/department')
    },
  },
  head() {
    return {
      title: 'Edit Department',
    }
  }
}
</script>
