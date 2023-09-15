<template>
  <v-app dark>
    <v-navigation-drawer class="teal accent-3" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <!-- <img src="https://randomuser.me/api/portraits/women/81.jpg"> -->
            <v-avatar color="brown">
              <span class="white--text text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ users }}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>


      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="langs + item.to" router exact>

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="#e60000" @click="btnLogiout()">
            <v-icon>mdi-logout-variant</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>



    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />



      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />

      <!-- <v-btn icon color="primary" elevation="2" >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn> -->

      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="brown" size="48">
              <span class="white--text text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="white--text text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text>
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text>
                Disconnect
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>


      <div class="text-center">
        <v-menu open-on-hover offset-y rounded="0">
          <template v-slot:activator="{ on, attrs }">
            <!--  color="primary" dark  -->
            <v-btn icon v-bind="attrs" v-on="on">
              <!-- Dropdown -->
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>

          <v-list>
            <!-- link -->
            <v-list-item v-for="(item, index) in itemsMenu" :key="index" :href="switchLocalePath(item.sort)">
              <!-- @click="switchTo(item.sort)" -->
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <!-- <a :href="switchLocalePath(item.sort)"> </a> -->
            </v-list-item>
          </v-list>
        </v-menu>
      </div>


      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>
<style>
html,body {
  overflow: auto !important;
}
</style>
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      users: this.$auth.user.username,
      clipped: false,
      drawer: true,
      fixed: false,
      langs: '/' + this.$i18n.locale,
      user: {
        initials: this.$auth.user.username.slice(0, 2),
        fullName: this.$auth.user.username,
        email: this.$auth.user.email,
      },
      itemsMenu: [
        {
          title: 'Laos',
          sort: 'la'
        },
        {
          title: 'Thailand',
          sort: 'th'
        },
        {
          title: 'English',
          sort: 'en'
        },
      ],
      items: [
        {
          icon: 'mdi-contacts',
          title: this.$t('links.department'),
          to: '/department',
        },
        {
          icon: 'mdi-account-switch',
          title: this.$t('links.usertype'),
          to: '/user-type',
        },
        {
          icon: 'mdi-account-group',
          title: this.$t('links.users'),
          to: '/users',
        },
        {
          icon: 'mdi-card-account-phone',
          title: this.$t('links.typecontact'),
          to: '/type-contact',
        },
        {
          icon: 'mdi-clipboard-alert',
          title: this.$t('links.issue'),
          to: '/issue',
        },
        {
          icon: 'mdi-lightbulb-alert',
          title: this.$t('links.subissue'),
          to: '/sub-issue',
        },
        {
          icon: 'mdi-database-alert',
          title: this.$t('links.opencase'),
          to: '/opencase',
        },
        // {
        //   icon: 'mdi-cube',
        //   title: this.$t('links.parcel'),
        //   to: '/parcel',
        // },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tracking Issue'
    }
  },



  methods: {

    async btnLogiout() {
      await this.$auth.logout()
      this.$router.push('/' + this.$i18n.locale + '/login')
    },

    async switchTo(locate) {
      //
      this.$i18n.setLocale(locate)
      // this.$router.replace(this.switchLocalePath(locate));
      const _path = this.$nuxt.$route.path;
      const pathSplit = _path.split('/');
      const pathCurrent = pathSplit[2];
      const pathCurrents = "";
      if (pathCurrent != '') {
        pathCurrents = '/' + pathCurrent;
      }
      window.location.href = '/' + locate + pathCurrents
    }

  }



}
</script>
