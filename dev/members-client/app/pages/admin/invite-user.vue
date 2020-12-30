<template>
  <v-container>
    <h2 class="display-1 mb-5">新規ユーザー招待</h2>
    <v-card>
      <v-card-title>ユーザー情報</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-row>
            <v-col class="flex-grow-1">
              <v-text-field
                :rules="[v => /^[a-z][a-z0-9]{5,}$/.test(v) || '6文字以上の半角小文字・数字で入力してください。なお、数字で始めることは認められません。']"
                v-model="username" label="ユーザー名 (変更不可)"
              />
            </v-col>
            <v-col class="flex-grow-0">
              <v-btn @click="check">チェック</v-btn>
            </v-col>
          </v-row>
          <v-text-field
            :rules="[v => v.length >= 4 || '4文字以上で指定してください。']"
            v-model="nickname" label="ニックネーム (後から変更可)"
          />
          <v-text-field
            :rules="[v => v.length >= 3 || '3文字以上で指定してください。']"
            v-model="fullname" label="本名 (名前の区切りを半角スペースで示す，母国語，変更: 要申請)"
          />
          <v-text-field
            :rules="[v => v.length >= 3 || '3文字以上で指定してください。']"
            v-model="affiliation" label="所属 (大学名等，変更: 要申請)"
          />
          <div class="title">入会日</div>
          <v-date-picker
            landscape
            v-model="joinedAt"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1" />
        <v-btn v-if="valid" color="primary" @click="save">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { PermissionMapToString } from '../../lib/permission-type';
import { postWithProcessingDialog } from '../../lib/http';

export default {
  data() {
    return {
      valid: false,
      username: "",
      nickname: "",
      fullname: "",
      affiliation: "",
      joinedAt: new Date().toISOString().slice(0, 10)
    };
  },
  methods: {
    async save() {
      const response = await postWithProcessingDialog("/api/admin/invite-user/create", {
        username: this.username,
        nickname: this.nickname,
        fullname: this.fullname,
        affiliation: this.affiliation,
        joinedAt: this.joinedAt
      }, true);
      if (response.data) {
        alert('新規ユーザーの登録に成功しました。\n登録用URL: https://members.utcode.net/api/auth/newcomer/' + response.data.hash);
      }
    },
    async check() {
      const response = await postWithProcessingDialog("/api/admin/invite-user/check", {
        username: this.username
      }, true);
      if (response.data) {
        alert(response.data.exists ? "このユーザー名は使用できません。" : "このユーザー名は使用できます。");
      }
    }
  }
}
</script>