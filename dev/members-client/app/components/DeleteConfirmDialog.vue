<template>
  <v-dialog :value="value" @input="$emit('input', $event)" max-width="500">
    <v-card>
      <v-card-title>確認</v-card-title>
      <v-card-text>
        以下のアイテムを削除します。よろしいですか？
      </v-card-text>
      <v-container>
        <v-list dense>
          <v-list-item v-for="(item, index) in items" :key="index">
            {{ item }}
          </v-list-item>
        </v-list>
      </v-container>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn @click="accepted">OK</v-btn>
        <v-btn @click="canceled">キャンセル</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    items: Array
  },
  methods: {
    accepted() {
      this.$emit("accepted");
      this.$emit("input", false);
    },
    canceled() {
      this.$emit("input", false);
    }
  }
}
</script>