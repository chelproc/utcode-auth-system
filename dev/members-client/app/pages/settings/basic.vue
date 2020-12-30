<template>
  <v-container>
    <h2 class="display-1 mb-5">アカウント基本情報</h2>
    <v-card max-width="800" class="mx-auto">
      <v-card-title>{{ this.$store.state.userData.nickname }}</v-card-title>
      <v-card-text>
        <v-text-field label="本名" :value="this.$store.state.userData.fullname" disabled />
        <v-text-field label="ユーザーID" :value="this.$store.state.userData.username" disabled />
        <v-text-field label="所属" :value="this.$store.state.userData.affiliation" disabled />
        <v-text-field label="加入日" :value="this.$store.state.userData.joinedAt" disabled />
        <v-text-field
          v-if="this.$store.state.userData.permissions && this.$store.state.userData.permissions.length"
          label="権限"
          :value="permissionTypes.join(',')"
          disabled
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { PermissionMapToString } from '../../lib/permission-type';
export default {
  computed: {
    permissionTypes() {
      return this.$store.state.userData.permissions.map(item => PermissionMapToString[item]);
    }
  }
}
</script>