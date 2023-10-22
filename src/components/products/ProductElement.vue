<template>
  <div style="background-color: floralwhite; border:1px solid">
    <v-list>
    <v-list-item dense>
      <div>
        <v-list-item-title>{{ product.productName }}</v-list-item-title>
        <v-list-item-subtitle>
        <v-chip v-for="(value, key) in product.statusChanges" :key="key">
          <div>{{ key}}: {{ value }}</div>

        </v-chip>
        </v-list-item-subtitle>
      </div>
    </v-list-item>
    </v-list>
  </div>
</template>

<script setup>

  const props = defineProps(["product"]);

</script>
<style scoped></style>
