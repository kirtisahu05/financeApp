<template>
  <div>
    <!-- TODO: Design and work on banner text and images -->
    <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">{{ slide }} Slide</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <!-- TODO: Replace hard coded values with api data & implement graphs once transaction api's are done -->
    <v-container>
      <v-row dense>
        <v-col cols="18" sm="9" md="6">
          <v-card class="mx-auto" max-width="344" outlined style="background-color: #8BC34A;">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Deposit</div>
              <v-list-item-title class="headline mb-1">{{ deposit }}</v-list-item-title>
              <v-list-item-subtitle>
                <span>
                  Transaction Count: {{ '12' }}
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="18" sm="9" md="6">
          <v-card class="mx-auto" max-width="344" outlined style="background-color: #FF9800;">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">withdrawal</div>
              <v-list-item-title class="headline mb-1">{{ withdrawal }}</v-list-item-title>
              <v-list-item-subtitle>
                Transaction Count: {{ '6' }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      </v-row>
    </v-container>
  </div>  
</template>

<script>
  export default {
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
        deposit: '12000',
        withdrawal: '8000'
      }
    },
  }
</script>