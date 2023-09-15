<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('usertypes.user_edit') }}</h2>
      </v-col>

      <v-col cols="12">
        <v-card class="pa-5" outlined tile>

          <v-form ref="form" @submit.prevent="SubmitForm" v-model="valid" pa-3 lazy-validation>

            <v-row>
              <v-col cols="4">
                <v-text-field v-model="getId" label="Id" required outlined dense></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="type_name" :counter="150" :rules="nameRules"
                  :label="$t('usertypes.table.type_name')" required placeholder="name"
                  outlined dense></v-text-field>
              </v-col>

              <!-- <v-col cols="3">
                <v-combobox v-model="type_level" :items="options_level" :label="$t('usertypes.table.type_level')" outlined
                  dense></v-combobox>
              </v-col> -->

              <v-col cols="4">
                <v-combobox v-model="type_status" :items="options" :label="$t('usertypes.table.type_status')" outlined
                  dense></v-combobox>
              </v-col>
            </v-row>


            <v-btn color="grey" class="mr-4" @click="goBack">
              {{ $t('button.btn_back') }}
            </v-btn>

            <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
              {{ $t('button.btn_edit') }}
            </v-btn>

            <!-- <v-btn color="warning" @click="resetValidation">
            Reset Validation
          </v-btn> -->
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
      type_name: '',
      // type_level: '',
      type_status: '',
      nameRules: [
        v => !!v || 'Type Name is required',
        v => (v && v.length <= 150) || 'Type Name must be less than 150 characters',
      ],
      options: [
        'Active',
        'InActive',
      ],
      // options_level: [
      //   '1',
      //   '2',
      // ],
      checkbox: false,
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      let res = await this.$axios.get("/typeuser/edit/" + this.getId);
      console.log('res', res);
      const typeuser = res.data.type_user;
      this.type_name = res.data.type_user.type_name;
      // this.type_level = res.data.type_user.type_level;
      this.type_status = res.data.type_user.type_status == 1 ? 'Active' : 'InActive';

    },
    async SubmitForm() {
      try {
        let formData = new FormData();
        formData.append("type_name", this.type_name);
        formData.append("type_level",1);
        formData.append("type_status", this.type_status == "Active" ? 1 : 2);
        formData.append("id", this.getId);

        const res = await this.$axios.post('typeuser/update', formData)
        console.log(res);
        if (res.data.success) {
          this.dialog = true;
          this.$refs.form.reset()
          this.type_name = '';
          this.success = res.data.message;
          this.icons = 'mdi-check-circle-outline';
          this.colors = 'success';
          this.completed = 'successfully';
        }

      } catch (error) {
        console.log(error.data)
        this.dialog = true;
        this.type_name = '';
        this.success = error.data;
        this.icons = 'mdi-check-circle-outline';
        this.colors = 'error';
        this.completed = 'Error';
      }
    },
    goBack() {
      this.$router.push('/' + this.$i18n.locale + '/user-type')
    },
  },
  head() {
    return {
      title: 'Edit Type User',
    }
  }
}
</script>
