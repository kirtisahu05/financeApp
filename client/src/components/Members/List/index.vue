<template>
  <v-data-table :headers="headers" :items="members" sort-by="firstName" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Members List</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" @click="redirectToAddMemeber()">
              <v-icon class="mr-2">mdi-account-plus</v-icon>
                Register New Member</v-btn>

        <!-- TODO: Move to child component -->
        <v-dialog v-model="transactionDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Transaction</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="18" sm="9" md="6">
                    <v-text-field v-model="transactionForm.memberRelationNumber" label="Member Id" disabled></v-text-field>
                  </v-col>
                  <v-col cols="18" sm="9" md="6">
                    <v-text-field v-model="transactionForm.firstName" label="Name" disabled></v-text-field>
                  </v-col>
                </v-row>
                <div v-if="disableTranction">
                  <v-row>
                    <v-col cols="18" sm="9" md="6">
                      <v-select :items="listAccounts"
                      v-model="transactionForm.accountNumber"
                      name="accountNumber"
                      v-validate="'required'"
                      item-text="accountNumber"
                      label="Account Number" 
                      ></v-select>
                    </v-col>
                    <v-col cols="18" sm="9" md="6">
                      <v-select :items="['Deposit', 'Withdraw']"
                        label="Transaction Type" v-model="transactionForm.type"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="18" sm="9" md="6">
                      <v-text-field v-model="transactionForm.amount" label="Transaction Amount"></v-text-field>
                    </v-col>
                    <v-col cols="18" sm="9" md="6">
                      <v-select :items="['Cash', 'Cheque', 'Online Transaction']"
                        label="Transaction Mode" v-model="transactionForm.mode"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="36" sm="12" md="8">
                      <v-textarea v-model="transactionForm.details" label="Transaction Details"></v-textarea>
                    </v-col>
                  </v-row>
                </div>
                <div v-else>
                  <p>You Dont have any account linked to this Member Id.</p>
                </div>
              </v-container>
            </v-card-text>

            <v-card-actions v-if="disableTranction">
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <v-dialog v-model="accountsDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Accounts</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="18" sm="9" md="6">
                    <v-text-field v-model="accountForm.memberRelationNumber" label="Member Id" disabled></v-text-field>
                  </v-col>
                  <v-col cols="18" sm="9" md="6">
                    <v-text-field v-model="accountForm.accountNumber" label="Account Number"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="18" sm="9" md="6">
                    <v-select :items="['Current Account', 'Savings Account', 'Recurring Deposit Account', 'Fixed Deposit Account']"
                      label="Account Type" v-model="accountForm.type"
                    ></v-select>
                  </v-col>
                  <v-col cols="18" sm="9" md="6">
                    <v-text-field v-model="accountForm.balance" label="Account Balance"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="18" sm="9" md="6">
                    <v-select :items="['Active', 'Inactive', 'dormant']"
                      label="Account status" v-model="accountForm.status"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="createAccount">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="transaction(item)">
        mdi-book-open-variant
      </v-icon>
      <v-icon small class="mr-2" @click="accounts(item)">
        mdi-account-edit
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  import ServiceAdapter from '@/services/ServiceAdapter';
  import router from '@/router';
  export default {
  name: 'MemberList',
    data: () => ({
      transactionDialog: false,
      accountsDialog: false,
      headers: [
        { text: 'Member Id', align: 'start', value: 'memberRelationNumber'},
        { text: 'Name', value: 'firstName' },
        { text: 'dob', value: 'dob', sortable: false  },
        { text: 'sex', value: 'sex', sortable: false  },
        { text: 'adharCardNumber', value: 'adharCardNumber', sortable: false  },
        { text: 'panCardNumber', value: 'panCardNumber', sortable: false  },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      members: [],
      transactionForm: {},
      listAccounts: [],
      accountForm: {}, 
      defaultTransactionForm: {
        memberRelationNumber: '',
        firstName: '',
        type: '',
        amount: '',
        accountNumber: '',
        mode: '',
        details: ''
      },
      defaultAccountForm: {
        memberRelationNumber: '',
        accountNumber: '',
        type: '',
        balance: '',
        status: ''
      }
    }),

    computed: {
      disableTranction() {
        return this.listAccounts.length !== '0';
      }
    },

    watch: {
      transactionDialog (val) {
        val || this.close()
      },
      accountsDialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        // TODO: Implement Vuex stores and getMembers using props
        try {
              const { data } = await ServiceAdapter.getMembers()
              this.members = data;
            } catch (error) {
              console.log(error);
            }
      },
      redirectToAddMemeber() {
        router.push({
            name: 'Register Member'
        });
      },
      async transaction (item) {
        await this.getAccounts(item);
        this.transactionForm = Object.assign({}, this.defaultTransactionForm, {
          firstName: item.firstName,
          memberRelationNumber: item.memberRelationNumber,
        })
        this.transactionDialog = true
      },
      async accounts (item) {
        await this.getAccounts(item);
        this.accountForm = Object.assign({}, this.defaultAccountForm, {
          memberRelationNumber: item.memberRelationNumber,
        });
        this.accountsDialog = true
      },
      async getAccounts (item) {
        // TODO: Implement Vuex stores
        try {
          const { data } = await ServiceAdapter.getAccounts();
          this.listAccounts = data?.filter(({ memberRelationNumber }) => item.memberRelationNumber === memberRelationNumber)
        } catch (error) {
          console.log(error);
        } finally {
          this.close();
        }
      },
      close () {
        this.transactionDialog = false;
        this.accountsDialog = false;
        this.$nextTick(() => {
          this.transactionForm = Object.assign({}, this.defaultTransactionForm);
        })
      },
      async save () {
        // TODO: Implement Vuex stores
        try {
          const response = await ServiceAdapter.postTransaction(this.transactionForm)
        } catch (error) {
          console.log(error);
        } finally {
          this.close();
        }
      },
      async createAccount() {
        // TODO: Implement Vuex stores
        try {
          console.log('accountForm', this.accountForm);
          const response = await ServiceAdapter.accounts(this.accountForm)
        } catch (error) {
          console.log(error);
          // TODO: Implement Error handler
        } finally {
          this.close();
        }

      }
    },
  }
</script>

<style lang="less" scoped>
  /deep/.v-dialog {
    max-width: 700px !important;
  }
</style>