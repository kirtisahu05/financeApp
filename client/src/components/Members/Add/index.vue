<template>
  <div class="content-wrapper">
  <v-card>
    <v-toolbar color="white" flat>
          <v-toolbar-title class="grey--text text--darken-4">Add New Member</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

    <v-form ref="form" :model="member" style="margin-bottom: 2em;">
      <v-subheader class="subheader"><h4>Personal Details</h4></v-subheader>
      <v-container fluid>
        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="First Name" v-model="member.firstName"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Middle Name" v-model="member.middleName"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Last Name" v-model="member.lastName"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-menu v-model="fromDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="member.dob"
                  label="Date Of Birth" prepend-icon=""
                  readonly v-bind="attrs" v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="member.dob" locale="en-in" @input="fromDateMenu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6" md="4">
            <v-select :items="['Male', 'Female', 'Other']"
              label="Sex" v-model="member.sex"
            ></v-select>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6" md="4">
            <v-select :items="['Single', 'Married', 'Divorced', 'Widowed']"
              label="Marital Status" v-model="member.maritalStatus"
            ></v-select>
          </v-col>
        </v-row>

        <v-row v-if="member.maritalStatus === 'Married'">
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Spouse First Name" v-model="member.familyDetails.spouseName.firstName"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Spouse Middle Name" v-model="member.familyDetails.spouseName.middleName"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Spouse Last Name" v-model="member.familyDetails.spouseName.lastName"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Father First Name" v-model="member.familyDetails.fatherName.firstName"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Father Middle Name" v-model="member.familyDetails.fatherName.middleName"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Father Last Name" v-model="member.familyDetails.fatherName.lastName"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Mother First Name" v-model="member.familyDetails.motherName.firstName"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Mother Middle Name" v-model="member.familyDetails.motherName.middleName"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Mother Last Name" v-model="member.familyDetails.motherName.lastName"></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-subheader class="subheader"><h4>Employment Details</h4></v-subheader>
      <v-container fluid>
        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-select :items="['Salaried', 'SelfEmployed']"
              label="Employment Nature" v-model="member.employmentDetails.employmentNature"
            ></v-select>
          </v-col>
          <v-col cols="16" sm="8" md="4" v-if="member.employmentDetails.employmentNature === 'Salaried'">
            <v-text-field label="Employer Name" v-model="member.employmentDetails.employerName"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4" v-if="member.employmentDetails.employmentNature === 'SelfEmployed'">
            <v-text-field label="Employment Type" v-model="member.employmentDetails.employmentType"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Annual Income" v-model="member.employmentDetails.annualIncome"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      
      <v-subheader class="subheader"><h5>Employer/Employment Contact Details</h5></v-subheader>
      <v-container fluid>
        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Contact Number" v-model="member.employmentDetails.employmentContactNumber"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Address line 1" v-model="member.employmentDetails.employmentAddress.line1"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Address line 2" v-model="member.employmentDetails.employmentAddress.line2"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Nearest Landmark" v-model="member.employmentDetails.employmentAddress.nearestLandMark"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="City" v-model="member.employmentDetails.employmentAddress.city"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="State" v-model="member.employmentDetails.employmentAddress.state"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Pin Code" v-model="member.employmentDetails.employmentAddress.pinCode"></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-subheader class="subheader"><h4>Contact Details</h4></v-subheader>
      <v-container fluid>
        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Personal Mobile Number" v-model="member.contactDetails.personalCellNumber"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Alternate Mobile Number" v-model="member.contactDetails.alternateCellNumber"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Landline Number" v-model="member.contactDetails.landline"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-text-field v-model="member.contactDetails.email" :rules="rules.emailRules" label="E-mail" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-subheader class="subheader"><h5>Present Address</h5></v-subheader>
      <v-container fluid>
        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Address line 1" v-model="member.contactDetails.presentAddress.line1"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Address line 2" v-model="member.contactDetails.presentAddress.line2"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Nearest Landmark" v-model="member.contactDetails.presentAddress.nearestLandMark"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="City" v-model="member.contactDetails.presentAddress.city"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="State" v-model="member.contactDetails.presentAddress.state"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Pin Code" v-model="member.contactDetails.presentAddress.pinCode"></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-subheader class="subheader">
        <h5>Premanent Address</h5>
      </v-subheader>
      <v-checkbox v-model="member.contactDetails.hasSingleAddress" label="Same as Present Address"></v-checkbox>
      <v-container fluid v-if="!member.contactDetails.hasSingleAddress">
        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Address line 1" v-model="member.contactDetails.permanentAddress.line1"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Address line 2" v-model="member.contactDetails.permanentAddress.line2"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Nearest Landmark" v-model="member.contactDetails.permanentAddress.nearestLandMark"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="City" v-model="member.contactDetails.permanentAddress.city"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="State" v-model="member.contactDetails.permanentAddress.state"></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Pin Code" v-model="member.contactDetails.permanentAddress.pinCode"></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-subheader class="subheader"><h4>KYC Details</h4></v-subheader>
      <v-container fluid>
        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Adhar Card Number" v-model="member.adharCardNumber" required></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Pan Card Number" v-model="member.panCardNumber" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <!-- L&D https://bezkoder.com/vuetify-file-upload/ -->
      <v-subheader class="subheader"><h4>Upload KYC Documents</h4></v-subheader>
      <v-container fluid>
        <v-row>
          <v-file-input
            v-model="fileList"
            color="deep-purple accent-4"
            counter
            label="File input"
            multiple
            placeholder="Select your file List"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000">
            <template v-slot:selection="{ index, text }">
              <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
                {{ text }}
              </v-chip>
              <span v-else-if="index === 2"
                class="overline grey--text text--darken-3 mx-2">
                +{{ files.length - 2 }} File(s)
              </span>
            </template>
          </v-file-input>
        </v-row>
      </v-container>

      <v-subheader class="subheader"><h4>Create Account</h4></v-subheader>
      <v-container fluid>
        <v-row>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Member Id" v-model="member.memberRelationNumber" required></v-text-field>
          </v-col>
          <v-col cols="16" sm="8" md="4">
            <v-text-field label="Share Alloted" v-model="member.shareAlloted" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>  
  <v-footer>
      <div>
        <v-btn color="default" class="mr-4" @click="redirectToListMembers()">
          Cancel
        </v-btn>
        <v-btn color="success" class="mr-4" @click="onSubmit">
          Register
        </v-btn>
      </div>
  </v-footer>
  </div>
</template>



<script>
  import ServiceAdapter from '@/services/ServiceAdapter';
  import { memberForm, rules } from './utils';
  import router from '@/router';

  export default {
    name: 'Members',
    components: {
    },
    data() {
      return {
        member: memberForm(),
        fileList: [],
        rules: rules(),
        fromDateMenu: false,
        minDate: "2020-01-05",
      }
    },
    methods: {
      redirectToListMembers() {
        router.push({
          name: 'List Members'
        });
      },
      async onSubmit() {
        // TODO: Implement Vuex stores
        try {
          const response = await ServiceAdapter.members(this.member)
          console.log(response);
          this.redirectToListMembers();
        } catch (error) {
          console.log(error);
          // TODO: Implement error handler
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style lang="less" scoped>
  .subheader {
        background: cornflowerblue;

  }
</style>