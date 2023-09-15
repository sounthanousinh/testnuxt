<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('users.user_add') }}</h2>
      </v-col>

      <v-col cols="12">
        <v-card class="pa-5" outlined tile>

          <v-form  ref="form" @submit.prevent="SubmitForm" v-model="valid" pa-3 lazy-validation>

            <v-row>
              <v-col cols="4">
                <v-text-field v-model="fullname" :counter="150" :rules="nameRules" :label="$t('users.table.fullname')"
                  required :placeholder="$t('users.table.fullname')" outlined dense></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-combobox v-model="type_user_selected" :items="cbx_type_user" item-text="type_name" item-value="id"
                  :label="$t('users.table.type_user')" @change="onChangeType" outlined dense></v-combobox>
              </v-col>
              <v-col cols="4">
                <v-combobox v-model="departmen_selected" :items="cbx_department" item-text="dep_name" item-value="id"
                  :label="$t('users.table.departmen_id')" @change="onChangeDepartment" outlined dense></v-combobox>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="username" :counter="150" :rules="nameRules" :label="$t('users.table.username')"
                  required :placeholder="$t('users.table.username')" outlined dense></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="password" :counter="150" :rules="nameRules" :label="$t('users.table.password')"
                  required :placeholder="$t('users.table.password')" outlined dense></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="password_confirmation" :counter="150" :rules="nameRules"
                  :label="$t('users.table.password_confirmation')" required
                  :placeholder="$t('users.table.password_confirmation')" outlined dense></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="tel" :counter="150" :rules="nameRules" :label="$t('users.table.tel')" required
                  :placeholder="$t('users.table.tel')" outlined dense></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field v-model="email" :counter="150" :rules="nameRules" :label="$t('users.table.email')" required
                  :placeholder="$t('users.table.email')" outlined dense></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-combobox v-model="province" :items="cbx_province" item-text="pn" item-value="pid"
                  @change="onChangeProvince" :label="$t('users.table.province')" outlined dense></v-combobox>
              </v-col>
              <v-col cols="3">
                <v-combobox v-model="district" :items="cbx_district" item-text="dn" item-value="did"
                  @change="onChangeDistrict" :label="$t('users.table.district')" outlined dense></v-combobox>
              </v-col>
              <v-col cols="3">
                <v-combobox v-model="village" :items="cbx_village" item-text="vn" item-value="vid"
                  @change="onChangeVillages" :label="$t('users.table.village')" outlined dense></v-combobox>
              </v-col>
              <v-col cols="3">
                <v-combobox v-model="zone" :items="cbx_zone" :label="$t('users.table.zone')" outlined dense></v-combobox>
              </v-col>
              <v-col cols="9">
                <v-text-field v-model="address" :counter="150" :rules="nameRules" :label="$t('users.table.address')"
                  required :placeholder="$t('users.table.address')" outlined dense></v-text-field>
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
      dialog: false,
      success: '',
      icons: '',
      colors: '',
      completed: '',
      name: '',
      nameRules: [
        v => !!v || 'Is required',
        v => (v && v.length <= 150) || 'Must be less than 150 characters',
      ],
      departmen_selected: '',
      departmen_id: '',
      type_user: '',
      type_user_selected: '',
      username: '',
      password: '',
      password_confirmation: '',
      tel: '',
      email: '',
      province: '',
      district: '',
      village: '',
      address: '',
      fullname: '',
      zone: '',
      cbx_zone: ['ເຫນືອ', 'ໃຕ້', 'ກາງ'],
      cbx_type_user: [],
      cbx_department: [],
      cbx_province: [],
      cbx_district: [],
      cbx_village: [],
      checkbox: false,
    }
  },
  mounted() {
    this.fetchDepartment();
    this.fetchType();
    this.fetchProvince();
  },
  methods: {
    goBack() {
      this.$router.push('/' + this.$i18n.locale + '/users')
    },
    async fetchDepartment() {
      let res = await this.$axios.get("/department/show");
      console.log('fetchDepartment', res);
      const resData = res.data.data;
      this.cbx_department = resData.data;
    },
    onChangeDepartment(entry) {
      console.log('entry', entry);
      this.departmen_id = entry.id;
      this.departmen_selected = entry.dep_name

    },
    async fetchType() {
      let res = await this.$axios.get("/typeuser/all");
      // console.log('fetchType', res);
      const resData = res.data;
      this.cbx_type_user = resData.data;

    },
    onChangeType(entry) {
      // console.log('entry', entry);
      this.type_user = entry.id;
      this.type_user_selected = entry.type_name;
    },


    async fetchProvince() {
      let res = await this.$axios.get("/setting/province");
      console.log('fetchProvince', res);
      const resData = res.data;
      this.cbx_province = resData.province;
      console.log(resData.province)
    },
    onChangeProvince(entry) {
      // console.log('onChangeProvince', entry);
      this.cbx_district = null;
      this.fetchDistrict(entry.pid);
      this.province = entry.pn;

    },

    async fetchDistrict(pid) {
      let res = await this.$axios.get("/setting/province/district/" + pid);
      // console.log('fetchDistrict', res);
      const resData = res.data;
      this.cbx_district = resData.district;
    },

    onChangeDistrict(entry) {
      // console.log('onChangeDistrict', entry);
      this.district = entry.dn;
      this.fetchVillage(entry.did);

    },

    async fetchVillage(did) {
      let res = await this.$axios.get("/setting/district/village/" + did);
      console.log('fetchVillage', res);
      const resData = res.data;
      this.cbx_village = resData.villages;
    },
    onChangeVillages(entry) {
      this.village = entry.vn;
      // console.log('onChangeVillages', entry);

    },

    async SubmitForm() {
      try {
        let formData = new FormData();
        formData.append("departmen_id", this.departmen_id);
        formData.append("type_user", this.type_user);
        formData.append("username", this.username);
        formData.append("password", this.password);
        formData.append("password_confirmation", this.password_confirmation);
        formData.append("tel", this.tel);
        formData.append("email", this.email);
        formData.append("province", this.province);
        formData.append("district", this.district);
        formData.append("village", this.village);
        formData.append("address", this.address);
        formData.append("fullname", this.fullname);
        formData.append("zones", this.zone);

        const res = await this.$axios.post('auth/register', formData)
        console.log(res);
        if (res.data.success) {
          this.dialog = true;
          // this.dep_name = '';
          this.success = res.data.message;
          this.icons = 'mdi-check-circle-outline';
          this.colors = 'success';
          this.completed = 'successfully';
          this.departmen_id
          this.type_user = "";
          this.username = "";
          this.password = "";
          this.password_confirmation = "";
          this.tel = "";
          this.email = "";
          this.province = "";
          this.district = "";
          this.village = "";
          this.address = "";
          this.fullname = "";
          this.zone = "";
          this.$refs.form.reset()
        }
      } catch (error) {
        console.log(error.data)
        this.dialog = true;
        // this.dep_name = '';
        this.success = error.data;
        this.icons = 'mdi-check-circle-outline';
        this.colors = 'error';
        this.completed = 'Error';
      }
    },
  },
  head() {
    return {
      title: 'Create User',
    }
  }
}
</script>
