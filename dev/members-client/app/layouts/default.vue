<template>
  <v-app style="background-color: #f5f5f5;">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $store.state.userData && $store.state.userData.nickname }}</v-list-item-title>
          <v-list-item-subtitle>ユーザー</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>ut.code();</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <processing-dialog />
  </v-app>
</template>

<script>
import ProcessingDialog from '../components/ProcessingDialog';

export default {
  components: { ProcessingDialog },
  data() {
    return {
      drawer: false,
      items: [
        { icon: 'mdi-apps', title: 'ホーム', to: '/'},
        { icon: 'mdi-chart-bubble', title: 'Inspire', to: '/inspire'}
      ]
    }
  }
}
</script>
