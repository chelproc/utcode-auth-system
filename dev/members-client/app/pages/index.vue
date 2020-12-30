<template>
  <v-container>
    <h2 class="display-1 mb-5">ホーム</h2>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>お知らせ</v-card-title>
          <v-divider />
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>サービス</v-card-title>
          <v-divider />
          <v-list>
            <v-list-item href="https://gitea.members.utcode.net/" three-line>
              <v-list-item-content>
                <v-list-item-title>Git</v-list-item-title>
                <v-list-item-subtitle>ソースコードを管理するためのサービスです。</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item href="https://blog.members.utcode.net/wp-admin" three-line>
              <v-list-item-content>
                <v-list-item-title>ブログ</v-list-item-title>
                <v-list-item-subtitle>全世界に私たちの技術力を知らしめよう！</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>アカウント設定</v-card-title>
          <v-divider />
          <v-list>
            <v-list-item to="/settings/basic" three-line>
              <v-list-item-content>
                <v-list-item-title>アカウント基本情報</v-list-item-title>
                <v-list-item-subtitle>ut.code();のアカウントに関する基本的な情報を取得・設定します。</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/settings/auth" three-line>
              <v-list-item-content>
                <v-list-item-title>認証情報</v-list-item-title>
                <v-list-item-subtitle>ut.code();にログインするための手段を設定します。</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/settings/notification" three-line>
              <v-list-item-content>
                <v-list-item-title>通知</v-list-item-title>
                <v-list-item-subtitle>ut.code();からの連絡をあなたにお知らせするための手段を設定します。</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" v-if="this.$store.state.userData.permissions && this.$store.state.userData.permissions.length">
        <v-card>
          <v-card-title>管理</v-card-title>
          <v-divider />
          <v-list>
            <v-list-item v-if="hasUserInvitationPermission" to="/admin/invite-user" three-line>
              <v-list-item-content>
                <v-list-item-title>ユーザー招待</v-list-item-title>
                <v-list-item-subtitle>新たな仲間をut.code();に招待します。</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { hasPermission, PermissionType } from '../lib/permission-type';

export default {
  computed: {
    isNewcomer() {
      return this.$route.query.newcomer !== undefined;
    },
    hasUserInvitationPermission() {
      return this.$store.state.userData.permissions && hasPermission(this.$store.state.userData.permissions, PermissionType.NEW_USER);
    }
  },
  methods: {
    inc() {
      return this.$store.commit("increment")
    }
  }
}
</script>
