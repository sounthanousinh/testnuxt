<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>{{ $t('usertypes.user_type') }}</h2>
      </v-col>
      <v-col cols="6">
        <v-select style="width: 100px;" v-model="selected" :items="items" density="compact"></v-select>
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
              <thead class="bg-primary">
                <tr>
                  <th width="100" class="text-left">
                    {{ $t('usertypes.table.no') }}
                  </th>
                  <th class="text-left">
                    {{ $t('usertypes.table.type_name') }}
                  </th>
                  <!-- <th class="text-left">
                    {{ $t('usertypes.table.type_level') }}
                  </th> -->
                  <th>
                    {{ $t('usertypes.table.type_status') }}
                  </th>
                  <th width="280"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in desserts" :key="index">
                  <td>{{ (index + 1) }}</td>
                  <td>{{ item.type_name }}</td>
                  <!-- <td>{{ item.type_level }}</td> -->
                  <td>{{ item.type_status == 1 ? 'Active' : 'InActive' }}</td>
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
          <v-pagination v-model="page" :length="per_page" :total-visible="3"
            @input="handlePagination($event)"></v-pagination>

          <template>
            <v-dialog v-model="dialog" persistent max-width="350">
              <v-card>
                <center>
                  <v-icon class="text-center" color="red" size="110">mdi-delete-circle-outline</v-icon>
                </center>
                <h1 class="text-center"> Are you sure?</h1>

                <v-card-text>
                  This is Dep ID: {{ typeId }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    No
                  </v-btn>
                  <v-btn color="green darken-1" text  @click="confirm_deleted()">
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
// import Paginate from 'vuejs-paginate'
export default {

  data() {
    return {
      per_page : 0,
      page: 1,
      typeId: 0,
      selected: '5',
      items: ['5', '10', '15', '50', '100', 'all'],
      dialog: false,
      dialog_error: false,
      text_error: '',
      total: 0,
      desserts: [],
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {

    create() {
      this.$router.push('/' + this.$i18n.locale + '/user-type/create')
    },

    edit(id) {
      this.$router.push('/' + this.$i18n.locale + '/user-type/edit/' + id)
    },
    deleted(id) {
      this.typeId = id;
      this.dialog = true;
    },
    async confirm_deleted() {
      let res = await this.$axios.post("/typeuser/destroy/" + this.typeId);
      console.log('res', res);
      const ressuccess = res.data.success;
      if (ressuccess) {
        this.dialog = false;
        this.fetch()
      } else {
        this.dialog = false;
        this.dialog_error = true;
        this.text = res.data.message;
      }

    },
    async fetch() {
      let res = await this.$axios.get("/typeuser/show");
      console.log('res', res);
      const resData = res.data.data;
      this.desserts = resData.data;
      this.page = resData.from;
      this.per_page = resData.last_page;
    },
    async handlePagination(pageId) {
      // console.log(pageId);
      let res = await this.$axios.get("/typeuser/show?page=" + pageId);
      console.log('res', res);
      const resData = res.data.data;
      this.desserts = resData.data;
      this.page = resData.current_page;
      this.total = resData.last_page;
    }


  },
  head() {
    return {
      title: 'Type User',
    }
  }
}
</script>
