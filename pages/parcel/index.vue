<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2>Parcel</h2>
      </v-col>
      <v-col cols="6">
        <v-select style="width: 100px;" v-model="seleted" :items="items" density="compact"></v-select>
      </v-col>
      <v-col cols="6" class="text-end py-8">
        <v-btn @click="create()" tile color="primary">
          <v-icon left>
            mdi-pencil
          </v-icon>
          Add New
        </v-btn>
      </v-col>

      <v-col cols="12">

        <v-card elevation="2">
          <v-simple-table>
            <template v-slot:default>
              <thead class="teal accent-3">
                <tr>
                  <th width="15" class="text-left">
                    No.
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                  <th width="280" class="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in desserts" :key="item.name">
                  <td>{{ (index + 1) }}</td>
                  <td>{{ item.name }}</td>
                  <td>
                    <v-btn @click="edit(item.calories)" tile color="warning">
                      <v-icon left>
                        mdi-pencil
                      </v-icon>
                      Edit
                    </v-btn>

                    <v-btn @click="deleted(item.calories)" tile color="error">
                      <v-icon left>
                        mdi-pencil
                      </v-icon>
                      Delete
                    </v-btn>

                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-pagination v-model="page" :length="10" :total-visible="7"></v-pagination>

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
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
  methods: {
    create() {
      this.$router.push('/parcel/create')
    },

    edit(id) {
      this.$router.push('/parcel/edit/' + id)
    },

    deleted(id) {
      this.depId = id;
      this.dialog = true;
    }

  },
  head() {
    return {
      title: 'Parcel',
    }
  }
}
</script>
