<template>
  <v-row>
    <v-col cols="12">
      <h2>Add New Data</h2>
    </v-col>

    <v-col cols="12">
      <v-card class="pa-5" outlined tile>

        <v-form ref="form" v-model="valid" pa-3 lazy-validation>

          <v-row>
            <v-col cols="6">
              <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required placeholder="name"
                outlined dense></v-text-field>
              <!-- <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field> -->
            </v-col>
            <v-col cols="6">
              <!-- <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field> -->
              <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required placeholder="name"
                outlined dense></v-text-field>
            </v-col>
          </v-row>


          <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
            Save
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            Reset Form
          </v-btn>

          <!-- <v-btn color="warning" @click="resetValidation">
            Reset Validation
          </v-btn> -->
        </v-form>

      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {

  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }
  },

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
  head() {
    return {
      title: 'Create Parcel',
    }
  }
}
</script>
