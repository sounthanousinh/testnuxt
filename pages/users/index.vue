<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('users.user') }}</h2>
      </v-col>
      <v-col cols="6">
        <v-select style="width: 100px;" v-model="seleted" :items="items" density="compact"></v-select>
      </v-col>
      <v-col cols="6" class="text-end py-8">
        <v-btn @click="create()" tile color="primary">
          <v-icon left>
            mdi-pencil
          </v-icon>
          {{ $t('button.btn_add') }}
        </v-btn>
      </v-col>
      <v-col cols="12">

        <v-card elevation="2">
          <v-simple-table>
            <template v-slot:default>
              <thead class="teal accent-3">
                <tr>
                  <th width="15" class="text-center">
                    {{ $t('users.table.no') }}
                  </th>
                  <th class="text-left">
                    {{ $t('users.table.fullname') }}
                  </th>
                  <th class="text-left">
                    {{ $t('users.table.type_user') }}
                  </th>
                  <th class="text-left">
                    {{ $t('users.table.departmen_id') }}
                  </th>
                  <th class="text-left">
                    {{ $t('users.table.username') }}
                  </th>
                  <th class="text-left">
                    {{ $t('users.table.tel') }}
                  </th>
                  <th class="text-left">
                    {{ $t('users.table.email') }}
                  </th>
                  <th class="text-left">
                    {{ $t('users.table.province') }}
                  </th>
                  <th class="text-left">
                    {{ $t('users.table.district') }}
                  </th>
                  <th class="text-left">
                    {{ $t('users.table.village') }}
                  </th>
                  <th class="text-left">
                    {{ $t('users.table.address') }}
                  </th>
                  <th width="280" class="text-center">
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in desserts" :key="index">
                  <td>{{ (index + 1) }}</td>
                  <td>{{ item.fullname }}</td>
                  <td>{{ item.type_users_name.type_name }}</td>
                  <td>{{ item.departmen.dep_name }}</td>
                  <td>{{ item.username }}</td>
                  <td>{{ item.tel }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.province }}</td>
                  <td>{{ item.district }}</td>
                  <td>{{ item.village }}</td>
                  <td>{{ item.address }}</td>
                  <td>
                    <v-btn @click="edit(item.id)" tile color="warning">
                      <v-icon left>
                        mdi-pencil
                      </v-icon>
                      {{ $t('button.btn_edit') }}
                    </v-btn>

                    <v-btn @click="deleted(item.id)" tile color="error">
                      <v-icon left>
                        mdi-delete-forever
                      </v-icon>
                      {{ $t('button.btn_del') }}
                    </v-btn>

                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <!-- pagination -->
          <v-pagination v-model="page" :length="per_page" :total-visible="7"
            @input="handlePagination($event)"></v-pagination>


          <template>
            <v-dialog v-model="dialog" persistent max-width="350">
              <v-card>
                <center>
                  <v-icon class="text-center" color="red" size="110">mdi-delete-circle-outline</v-icon>
                </center>
                <h1 class="text-center"> Are you sure?</h1>

                <v-card-text>
                  This is Dep ID: {{ depId }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    No
                  </v-btn>
                  <v-btn color="green darken-1" text @click="confirm_deleted()">
                    Yes Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

        </v-card>
      </v-col>
    </v-row>


  </div>
</template>

<style>
.bg-body {
  background-color: rgb(190, 189, 186) !important;
}
</style>
<script>
export default {
  data() {
    return {
      page: 1,
      depId: 0,
      seleted: '5',
      items: ['5', '10', '15', '50', '100', 'all'],
      dialog: false,
      desserts: [],
      per_page: 0,
      total: 0,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      let res = await this.$axios.get("/auth/show");
      console.log('res', res);
      const resData = res.data;
      this.desserts = resData.user.data;
      console.log(resData.user.data)
      this.page = resData.user.from;
      this.per_page = resData.user.last_page;
    },
    create() {
      this.$router.push('/' + this.$i18n.locale + '/users/create')
    },

    edit(id) {
      this.$router.push('/' + this.$i18n.locale + '/users/edit/' + id)
    },

    deleted(id) {
      this.depId = id;
      this.dialog = true;
    },
    async confirm_deleted() {
      let res = await this.$axios.get("/auth/destroy/" + this.depId);
      console.log('res', res);
      const ressuccess = res.data.success;
      if (ressuccess) {
        this.dialog = false;
        this.fetch()
      } else {
        this.dialog = false;
        this.dialog_error = true;
        this.text_error = res.data.message;
      }

    },
    async handlePagination(pageId) {
      // console.log(pageId);
      let res = await this.$axios.get("/auth/show?page=" + pageId);
      console.log('res', res);
      const resData = res.data.data;
      this.desserts = resData.data;
      this.page = resData.current_page;
      this.total = resData.last_page;
    },
  },
  head() {
    return {
      title: 'User',
    }
  }
}
</script>
