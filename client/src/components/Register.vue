<template>
  <v-form ref="form" v-model="valid" lazy-validation style="width: 60%">
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field v-model="password" :counter="10" :rules="passwordRules" label="Password" required></v-text-field>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="register">
      Register
    </v-btn>
  </v-form>
</template>




<script>
import AuthenticationService from '@/services/AuthenticationService';
export default {
  name: 'Register',
    data () {
        return {
            error: null,
            valid: true,
            password: '',
            passwordRules: [
              v => !!v || 'Password is required',
              v => (v && v.length <= 10) || 'Password must be less than 10 characters',
            ],
            email: '',
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    methods: {
        async register() {
            try {
                const response = await AuthenticationService.register({
                    email: this.email,
                    password: this.password,
                })
                this.error = null;
            } catch (error) {
                this.error = error.response.data.error
            }
        },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    }
}
</script>

<style lang="stylus" scoped>
</style>
