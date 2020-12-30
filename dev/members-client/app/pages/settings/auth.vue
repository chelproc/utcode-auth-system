<template>
  <v-container>
    <h2 class="display-1 mb-5">認証情報設定</h2>
    <v-alert type="warning">ログインアカウントを全て削除すると、現在のセッションが切れたのち、再度ログインすることができなくなります。</v-alert>
    <v-card>
      <v-card-title>Google</v-card-title>
      <v-data-table
        show-select v-model="googleSelected"
        :headers="googleHeaders" :items="googleData" :loading="loading"
      />
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="red" v-if="googleSelected.length" @click="googleDeleteSelectedConfirmDialog = true" dark><v-icon>mdi-delete</v-icon>選択したアイテムの削除</v-btn>
        <v-btn color="primary" href="/api/auth/google/redirect?returnTo=/settings/auth&add=1"><v-icon>mdi-plus</v-icon>新しいアカウントの追加</v-btn>
      </v-card-actions>
    </v-card>
    <delete-confirm-dialog
      v-model="googleDeleteSelectedConfirmDialog"
      :items="googleSelected.map(data => data.email)"
      @accepted="deleteSelectedGoogles"
    />
  </v-container>
</template>
<script>
import Axios from 'axios';
import { postWithProcessingDialog } from '../../lib/http';
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog.vue';

export default {
  components: {
    DeleteConfirmDialog
  },
  data() {
    return {
      googleHeaders: [
        { text: "メールアドレス", value: "email" }
      ],
      googleData: [],
      googleSelected: [],
      googleDeleteSelectedConfirmDialog: false,
      loading: true
    }
  },
  methods: {
    async init() {
      const response = await Axios.get("/api/client/auth/all");
      this.googleData = response.data.google;
      this.loading = false;
    },
    async deleteSelectedGoogles() {
      await postWithProcessingDialog("/api/client/auth/google/delete", {
        id: this.googleSelected.map(item => item.id)
      });
      this.googleSelected = [];
      this.init();
    }
  },
  created() {
    this.init();
  }
}
</script>