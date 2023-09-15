<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('opencase.issue') }}</h2>
      </v-col>
      <v-col cols="6">
        <v-select style="width: 100px;" v-model="seleted" :items="items" density="compact"></v-select>
      </v-col>
      <v-col cols="6" class="text-end py-8">
        <v-btn @click="dialog_alert = true" tile color="warning">
          <v-icon left>
            mdi-filter-menu
          </v-icon>
          <!-- {{ $t('button.btn_add') }} -->
        </v-btn>
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
                  <th width="15" class="text-left">
                    {{ $t('opencase.table.no') }}
                  </th>
                  <th class="text-left">
                    {{ $t('opencase.table.issue_code') }}
                  </th>
                  <th class="text-left">
                    {{ $t('opencase.table.issue_case') }}
                  </th>
                  <th class="text-left">
                    {{ $t('opencase.table.issue_id') }}
                  </th>
                  <th class="text-left">
                    {{ $t('opencase.table.issue_discription') }}
                  </th>
                  <th class="text-left">
                    {{ $t('opencase.table.current_department') }}
                  </th>
                  <!-- <th class="text-left">
                    {{ $t('opencase.table.last_department') }}
                  </th> -->
                  <th class="text-left">
                    {{ $t('opencase.table.userid') }}
                  </th>
                  <th class="text-left">
                    {{ $t('opencase.table.full_name') }}
                  </th>
                  <!-- <th class="text-left">
                    {{ $t('opencase.table.email') }}
                  </th> -->
                  <th class="text-left">
                    {{ $t('opencase.table.tel') }}
                  </th>
                  <!-- <th class="text-left">
                    {{ $t('opencase.table.type_contact_id') }}
                  </th> -->
                  <!-- <th class="text-left">
                    {{ $t('opencase.table.documents') }}
                  </th> -->
                  <th class="text-left">
                    {{ $t('opencase.table.issue_status') }}
                  </th>
                  <th width="200" class="text-center"> </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in desserts" :key="item.name">
                  <td>{{ (index + 1) }}</td>
                  <td>{{ item.issue_code }}</td>
                  <td>{{ item.issue_case }}</td>
                  <td>{{ item.issue.issue_name }}</td>
                  <td>{{ item.issue_discription }}</td>
                  <td>{{ item.department.dep_name }}</td>
                  <!-- <td>{{ item.lastdepartment != null ? item.lastdepartment.dep_name : 'First Department' }}</td> -->
                  <td>{{ item.user.fullname }}</td>
                  <td>{{ item.full_name }}</td>
                  <!-- <td>{{ item.email }}</td> -->
                  <td>{{ item.tel }}</td>
                  <!-- <td>{{ item.type_contact.type_name }}</td> -->
                  <!-- <td>{{ item.documents }}</td> -->
                  <td>{{ item.issue_status == 1 ? 'Open New' : (item.issue_status == 2 ? 'On Going' : 'Completed') }}</td>
                  <td>
                    <v-btn @click="edit(item.id)" tile color="warning">
                      <v-icon left>
                        mdi-tag-arrow-right
                      </v-icon>
                      {{ $t('button.btn_follow') }}
                    </v-btn>

                    <!-- <v-btn @click="deleted(item.calories)" tile color="error">
                      <v-icon left>
                        mdi-delete-forever
                      </v-icon>
                      {{ $t('button.btn_del') }}
                    </v-btn> -->

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
                    Disagree
                  </v-btn>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Agree
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

        </v-card>
      </v-col>
    </v-row>

    <template>
      <v-dialog v-model="dialog_alert" transition="dialog-top-transition" max-width="600">
        <template>
          <v-card>
            <v-toolbar color="teal accent-3" dark>Opening from the top</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog_alert = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </template>

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
      dialog_alert: false,
      page: 1,
      depId: 0,
      seleted: '5',
      items: ['5', '10', '15', '50', '100', 'all'],
      dialog: false,
      desserts: [],
      per_page: 0,
      total: 0,
      dialog_error: '',
      text_error: '',
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      let res = await this.$axios.get("/issued/show");
      console.log('res', res);
      const resData = res.data;
      this.desserts = resData.data.data;
      this.page = resData.data.from;
      this.per_page = resData.data.last_page;
    },
    create() {
      this.$router.push('/' + this.$i18n.locale + '/opencase/create')
    },
    edit(id) {
      this.$router.push('/' + this.$i18n.locale + '/opencase/tracking/' + id)
    },
    deleted(id) {
      this.depId = id;
      this.dialog = true;
    },
    async confirm_deleted() {
      let res = await this.$axios.get("/issued/delete/" + this.depId);
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
      let res = await this.$axios.get("/issue/show?page=" + pageId);
      console.log('res', res);
      const resData = res.data.data;
      this.desserts = resData.data;
      this.page = resData.current_page;
      this.total = resData.last_page;
    },

  },
  head() {
    return {
      title: 'Open Case',
    }
  }
}
</script>
