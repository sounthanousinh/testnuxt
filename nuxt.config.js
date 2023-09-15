import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'tacking isseu',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/style.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/i18n',
  ],
  i18n: {
    // defaultLocale: 'la',
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'la',
        file: 'la.json'
      },
      {
        code: 'th',
        file: 'th.json'
      },
    ],
    langDir: 'locales/',
    switchLocalePath: '/:lang/:route',
    setLocaleCookie: true,
    getLocaleCookie: 'i18n_loc',
    strategy: 'prefix_except_default',
    skipSettingLocaleOnNavigate: true,
  },
  // axios: {
  //   baseURL: process.env.URL_API, // Used as fallback if no runtime config is provided
  // },
  // env: {
  //   baseUrl: process.env.URLAPI
  // },
  axios: {
    // baseURL: 'http://127.0.0.1:8000/api',
    baseURL: process.env.URLAPI,

  },

  //Authentication
  auth: {
    watchLoggedIn: true,
    redirect: {
      login: '/la/login'
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
        },
        user: {
          property: 'user',
        },

        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          // user: false
          user: {
            url: '/auth/users',
            method: 'get',
            propertyName: 'user'
          },
          // logout: false,
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
        },
      }
    }
  },
  router: {
    middleware: ['auth']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
