<template>
  <v-dialog v-model="open" max-width="500" persistent>
    <v-card v-if="!completed" color="blue" dark class="pb-3">
      <v-card-title>処理中</v-card-title>
      <v-card-text>リクエストを処理しています。しばらくお待ちください。</v-card-text>
      <v-container class="text-center">
        <v-progress-circular indeterminate color="white" size="50"/>
      </v-container>
    </v-card>
    <v-card v-else-if="!error.length">
      <v-card-title>完了</v-card-title>
      <v-card-text>リクエストを正常に処理しました。</v-card-text>
      <v-card-text class="text-center"><v-icon color="success" size="70">mdi-check-circle</v-icon></v-card-text>
      <v-card-actions>
        <div class="flex-grow-1" /><v-btn color="primary" @click="closed" >OK</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title>エラー</v-card-title>
      <v-card-text v-text="error" />
      <v-card-text class="text-center"><v-icon color="warning" size="70">mdi-alert</v-icon></v-card-text>
      <v-card-actions>
        <div class="flex-grow-1" /><v-btn color="primary" @click="closed" >OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export const eventBus = new Vue();

export default {
  data() {
    return {
      open: false,
      completed: false,
      error: ""
    };
  },
  methods: {
    closed() {
      this.open = false;
      eventBus.$emit("closed");
    }
  },
  mounted() {
    eventBus.$on("open", () => {
      this.completed = false;
      this.open = true
    });
    eventBus.$on("completed", (error = "") => {
      this.error = error;
      this.completed = true;
    });
  }
}
</script>