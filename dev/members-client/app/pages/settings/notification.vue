<template>
  <v-container>
    <h2 class="display-1 mb-3">通知設定</h2>
    <v-alert type="warning">通知アカウントを全て削除すると、ut.code();からの重要なお知らせが受信できなくなります。</v-alert>
    <v-row>
      <v-col><v-btn color="primary" @click="testNotification">通知テスト (登録されている通知先全てにメッセージを送信します)</v-btn></v-col>
    </v-row>
    <v-card class="mb-5">
      <v-card-title>メール</v-card-title>
      <v-data-table show-select v-model="emailSelected" :headers="emailHeaders" :items="emailData" :loading="loading" />
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="red" v-if="emailSelected.length" @click="emailDeleteSelectedConfirmDialog = true" dark><v-icon>mdi-delete</v-icon>選択したアイテムの削除</v-btn>
        <v-btn color="primary" @click="emailAddDialog = true"><v-icon>mdi-plus</v-icon>新しいメールアドレスの追加</v-btn>
      </v-card-actions>
    </v-card>
    <delete-confirm-dialog
      v-model="emailDeleteSelectedConfirmDialog"
      :items="emailSelected.map(data => data.email)"
      @accepted="deleteSelectedEmails"
    />
    <v-dialog v-model="emailAddDialog" max-width="500">
      <v-card>
        <v-card-title>メールアドレスの追加</v-card-title>
        <v-card-text>
          <v-text-field v-model="emailAddDialogAddress" label="追加するメールアドレス" />
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn @click="emailAddDialog = false">キャンセル</v-btn>
          <v-btn color="primary" @click="addNewEmailAddress">追加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>Line Notify</v-card-title>
      <v-data-table show-select v-model="lineSelected" :headers="lineHeaders" :items="lineData" :loading="loading" />
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="red" v-if="lineSelected.length" @click="lineDeleteSelectedConfirmDialog = true" dark><v-icon>mdi-delete</v-icon>選択したアイテムの削除</v-btn>
        <v-btn color="primary" href="/api/notification/line/redirect?returnTo=/settings/notification"><v-icon>mdi-plus</v-icon>新しいLINE Notifyの追加</v-btn>
      </v-card-actions>
    </v-card>
    <delete-confirm-dialog
      v-model="lineDeleteSelectedConfirmDialog"
      :items="lineSelected.map(data => data.createdAt)"
      @accepted="deleteSelectedLines"
    />
  </v-container>
</template>
<script>
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog.vue';
import ProcessingDialog from '../../components/ProcessingDialog.vue';
import { postWithProcessingDialog } from '../../lib/http';

export default {
  components: {
    DeleteConfirmDialog, ProcessingDialog
  },
  data() {
    return {
      loading: true,
      emailHeaders: [
        { text: "メールアドレス", value: "email" }
      ],
      emailData: [],
      emailSelected: [],
      emailDeleteSelectedConfirmDialog: false,
      emailAddDialog: false,
      emailAddDialogAddress: "",
      lineHeaders: [
        { text: "送信先", value: "target" }
      ],
      lineData: [],
      lineSelected: [],
      lineDeleteSelectedConfirmDialog: false
    }
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const res = await fetch("/api/client/notification/all");
      const rawData = await res.json();
      this.emailData = rawData.email;
      this.lineData = rawData.line.map(item => ({...item, createdAt: item.createdAt + "に登録されたアカウント"}));
      this.loading = false;
    },
    async testNotification() {
      await postWithProcessingDialog("/api/client/notification/test", {});
    },
    async deleteSelectedEmails() {
      await postWithProcessingDialog("/api/client/notification/email/delete", {
        id: this.emailSelected.map(item => item.id)
      });
      this.emailSelected = [];
      this.init();
    },
    async addNewEmailAddress() {
      this.emailAddDialog = false;
      await postWithProcessingDialog("/api/client/notification/email/add", {
        address: this.emailAddDialogAddress
      });
      this.emailAddDialogAddress = "";
      this.init();
    },
    async deleteSelectedLines() {
      await postWithProcessingDialog("/api/client/notification/line/delete", {
        id: this.lineSelected.map(item => item.id)
      });
      this.lineSelected = [];
      this.init();
    }
  }
}
</script>