<template>
    <div id="app">
        <v-app id="app-layout-wrapper" :dark="true">
            <v-app-bar fixed color="teal darken-1">
                <v-app-bar-nav-icon>
                    <!-- replace with logo -->
                    <v-icon>mdi-home</v-icon>
                </v-app-bar-nav-icon>
                <v-toolbar-title>App title</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
                <v-btn icon @click="toggleTheme"><v-icon>mdi-theme-light-dark</v-icon></v-btn>

                <v-menu left bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                    <v-list-item v-for="n in 5" :key="n" @click="() => {}">
                        <v-list-item-title>Option {{ n }}</v-list-item-title>
                    </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>
                <v-main>
                <v-container class="app-layout-content" style="height: 1000px;">
                    <SideMenuBar />
                    <div class="main-routes-wrapper">
                        <div class="vue-app">
                            <router-view/>
                        </div>
                    </div>
                </v-container>
                </v-main>
        </v-app>
    </div>
</template>

<script>
import SideMenuBar from './SideMenuBar'

export default {
    components: {
        SideMenuBar
    },
	data() {
      return {
        // TODO: implement authentication
        isLoggedIn: false,
      };
    },
    methods: {
        toggleTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        }

	}
}
</script>

<style scoped lang="less">
    .app-layout-wrapper {
        height: 100%;
        position: relative;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        overflow: auto;
        .v-card {
            height: 100px !important;
        }
    }
    .app-layout-content {
        overflow: hidden;
        position: relative;
        padding-bottom: 0px;
        display: flex;
        flex-direction: row;
        height: 100%;
        margin-top: 64px; 
        max-width: 100%;
        padding: 0px;
    }
    .main-routes-wrapper {
            width: 100%;
            overflow: auto;

            .vue-app {
                position: relative;
                padding: 0px 40px;
                padding-top: 15px;
                height: 100%;
                .content-wrapper {
                    text-align: left;
                    /deep/.v-card {
                        padding: 25px;
                        border-radius: 0px;
                        flex: 1;
                    }
                    /deep/.v-footer {
                        height: 60px;
                        line-height: 60px;
                        padding: 0 40px;
                        width: 100%;
                        z-index: 99;
                        bottom: 0;
                        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
                        div {
                            width: 100%;
                            text-align: right;
                        }
                    }
                }
                
            }
    
    }
</style>
