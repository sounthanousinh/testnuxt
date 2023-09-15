<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="logo py-4 d-flex justify-center">
          <NuxtLogo />
          <VuetifyLogo />
        </v-card>
        <v-card class="d-flex justify-center">
          <h1>Welcome...!</h1>
        </v-card>
        <v-card class="d-flex justify-center">
          <h1>Hello..! {{ this.$auth.user.fullname }}</h1>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
