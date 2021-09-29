<template>
<div>
  <div class="pa-12 ">
    <form class="elevation-10 pb-12 pl-6">
      <h1 class="text-center">Link jamb reg</h1>
      <v-text-field v-model="jamb" label="Jamb Reg" required @input="$v.jamb.$touch()" @blur="$v.jamb.$touch()"></v-text-field>
      <v-btn class="mr-4" @click="next">
        Next
      </v-btn>
    </form>
  </div>
  <v-card class="elevation-10">
    <v-row style="margin:0">
      <v-col md="1"></v-col>
      <v-col md="2">
        <v-avatar class="profile" color="grey" size="164" tile>
          <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
        </v-avatar>
      </v-col>
      <v-col md="1"></v-col>
      <v-col md="8">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="surname" label="surname" required></v-text-field>

          <v-text-field v-model="name" label="name" required></v-text-field>

          <v-text-field v-model="othernames" label="other names" required></v-text-field>

          <v-text-field v-model="localGovt" label="Local Govt" required></v-text-field>

          <v-text-field v-model="state" :rules="nameRules" label="state" required></v-text-field>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="jamb1" :rules="nameRules" label="Jamb Score1" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="jamb2" :rules="nameRules" label="Jamb score2" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="jamb3" :rules="emailRules" label="Jamb Score3" required></v-text-field>
            </v-col>
          </v-row>

          <v-text-field v-model="Total" :rules="nameRules" label="Total Jamb Score" required></v-text-field>

          <v-btn color="success" @click="link">
            Link
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-card>

  <v-card class="elevation-10 pt-12">
    <h1 class="text-center">New Content Form</h1>
    <v-row style="margin=0">
      <v-col md="1"></v-col>
      <v-col md="2">
        <v-avatar class="profile" color="grey" size="164" tile>
          <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
        </v-avatar>
      </v-col>
      <v-col md="1"></v-col>
      <v-col md="8">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="surname" label="surname" required></v-text-field>

          <v-text-field v-model="name" label="name" required></v-text-field>

          <v-text-field v-model="othernames" label="other names" required></v-text-field>

          <v-text-field v-model="localGovt" label="Local Govt" required></v-text-field>

          <v-text-field v-model="state" :rules="nameRules" label="state" required></v-text-field>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="jamb1" :rules="nameRules" label="Jamb Score1" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="jamb2" :rules="nameRules" label="Jamb score2" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="jamb3" :rules="emailRules" label="Jamb Score3" required></v-text-field>
            </v-col>
          </v-row>
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="date" label="Birthday date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" :active-picker.sync="activePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01" @change="save"></v-date-picker>
          </v-menu>
          <v-text-field v-model="nextofking" :rules="nameRules" label="Next of kin" required></v-text-field>
          <v-text-field v-model="nextofkingfone" :rules="nameRules" label="Next of kin phone number" required></v-text-field>
          <v-btn color="success" @click="link">
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

  </v-card>

  <v-card class="elevation-10 pt-12">
    <h1 class="text-center pb-6">Post Utme Slip</h1>
    <v-row>
      <v-col md="1"></v-col>
      <v-col md="2">
        <v-avatar class="profile" color="grey" size="164" tile>
          <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
        </v-avatar>
      </v-col>
      <v-col md="1"></v-col>
      <v-col md="8">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="surname" label="surname" required></v-text-field>

          <v-text-field v-model="name" label="name" required></v-text-field>

          <v-text-field v-model="othernames" label="other names" required></v-text-field>

          <v-text-field v-model="localGovt" label="Local Govt" required></v-text-field>

          <v-text-field v-model="state" :rules="nameRules" label="state" required></v-text-field>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="jamb1" :rules="nameRules" label="Jamb Score1" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="jamb2" :rules="nameRules" label="Jamb score2" required></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="jamb3" :rules="emailRules" label="Jamb Score3" required></v-text-field>
            </v-col>
          </v-row>
          <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="date" label="Birthday date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" :active-picker.sync="activePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01" @change="save"></v-date-picker>
          </v-menu>
          <v-text-field v-model="nextofking" :rules="nameRules" label="Next of kin" required></v-text-field>
          <v-text-field v-model="nextofkingfone" :rules="nameRules" label="Next of kin phone number" required></v-text-field>
          <v-btn color="success" @click="link">
            Print
          </v-btn>
        </v-form>

      </v-col>

    </v-row>
  </v-card>

  <v-card class="elevation-10 pb-2 pt-12 mb-2">
    <v-toolbar color="blue darken-4" dark>
      <div class="row">
        <div class="col-md-6">NNAMDI AZIKWE UNIVERSITY</div>
        <div class="col-md-6 text-right">INTEGRATED e-INVOICE</div>
      </div>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col md="12">
          <p class="text-right ma-0">Nnamdi Azikiwe University</p>
          <p class="text-right ma-0">
            PMB 5025, Awka, Anambra State
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="9">
          <v-card elevation="2">
            <v-row>
              <v-col md="12">
                <v-toolbar color="blue darken-4 lighten-3" dark>
                  <div class="row">
                    <div class="col-md-6">BILL TO:</div>
                  </div>
                </v-toolbar>
                <v-list v-for="credential in studentCredentials" :key="credential.Reg_No" class="pa-2">
                  <div><strong>Name</strong>: <span>{{credential.Name}}</span></div>
                  <div><strong>Reg Number</strong>: <span>{{credential.Reg_No}}</span></div>
                  <div><strong>Program</strong>: <span>{{credential.Program}}</span></div>
                  <div><strong>Department</strong>: <span>{{credential.Department}}</span></div>
                  <div><strong>Current Level</strong>: <span>{{credential.Current_Level}}</span></div>
                </v-list>
              </v-col>
              <v-col md="12">
                <v-toolbar color="blue darken-4 lighten-3" dark>
                  <div class="row">
                    <div class="col-md-6">PAYING:</div>
                  </div>
                </v-toolbar>
                <div class="pa-2">
                  <p class="ma-0"><strong style="font-size: 15px">School Charges And Other Dues For 2020/2021 Academic Session.</strong></p>
                  <p class="ma-0"><strong>Department as at 2020/2021 Academic session:</strong>Educational Foundations</p>
                  <p class="ma-0"><strong>Levels as at 2020/2021 Academic session</strong>: 100</p>
                  <strong>Note that your certificate verification is #2000, because you came is with one result.</strong>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col md="3">
          <v-row>
            <v-col md="12">
              <v-avatar class="profile float-right" color="grey" size="164" tile>
                <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
              </v-avatar>
            </v-col>
            <v-col md="12" class="text-right">

              <span>Invioce Date: 2, Jul 2021 09:43am</span><br>
              <span>Invioce No: 1882983</span><br>
              <strong>RRR: 2827928379283</strong><br>
              <span>Order di: 3182982wieo8298232</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

</div>
</template>

<script>
export default {
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
  },

  data() {
    return {
      studentCredentials: [{
        Name: 'Chinecherem Benedicta Okoye',
        Reg_No: "20938209EK",
        Program: ' Undergraduate (Regualr)',
        Department: 'Educational Foundations',
        Current_Level: '100 Level',
      }],
    }
  },
}
</script>
