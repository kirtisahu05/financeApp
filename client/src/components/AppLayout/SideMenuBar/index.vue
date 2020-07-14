<template>
  <v-card 
      class="overflow-hidden" align="left" style="border-top-left-radius: 0px; border-top-right-radius: 0px;">
    <v-navigation-drawer class="side-bar" v-model="drawer" color="teal darken-1" :expand-on-hover="expandOnHover" :mini-variant.sync="mini"
        permanent>
      <v-list-item dense nav class="px-2">
        <v-list-item-avatar>
          <v-avatar color="indigo" size="48">
            <span class="white--text headline">U</span>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>User</v-list-item-title>
          <v-list-item-subtitle>Role</v-list-item-subtitle>
        </v-list-item-content>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
          <v-list-item v-for="(rule, index) in sideMenuItems"
          :key="index"
          :to="rule.path"
          link
          >
          <v-list-item-icon>
              <v-icon>{{ rule.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
              <v-list-item-title>{{ rule.name }}</v-list-item-title>
          </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    name: 'SideMenuBar',
    data () {
      return {
        drawer: true,
        expandOnHover: false,
        mini: true,
      }
    },
    computed: {
      sideMenuItems() {
        return this.$router.options.routes.filter(({ isMenuItem }) => isMenuItem);
      }
    }
  }
</script>

<style lang="less" scoped>
</style>