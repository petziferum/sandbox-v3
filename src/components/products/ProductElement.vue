<template>
  <div style="background-color: floralwhite; border:1px solid">
    <v-list-item dense>
      <v-list-item-content>
        <v-list-item-title>{{ product.productName }}</v-list-item-title>
        <v-list-item-subtitle>
        <v-chip v-for="(value, key) in product.statusChanges" :key="key">
          <div>{{ value.status }}</div>
        </v-chip>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script setup>

  const props = defineProps(["product"]);

</script>

<style scoped></style>
