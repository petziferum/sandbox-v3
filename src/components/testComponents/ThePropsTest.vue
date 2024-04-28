<template>
<v-row>
  <v-col cols="12">
    Parent: ThePropsTest, <br />
    Child: BaseDialog
  </v-col>
  <v-col>
    <v-card title="Parent Component">
      <v-card-text>
        <v-table>
          <v-data-iterator :items="items" :page="page">
            <template v-slot:default="{ items }">
              <template
                  v-for="(item, i) in items"
                  :key="i"
              >
                <v-card>
                  <v-card-title>Title {{i}}: <v-spacer /> {{ item.raw.name }}
                    <base-dialog v-bind="item.raw" />
                  </v-card-title>
                  <v-card-text>
                    {{ item.raw.description }}<br />
                    Preis: {{ item.raw.price }}
                  </v-card-text>
                </v-card>
                <br>
              </template>
            </template>
          </v-data-iterator>
        </v-table>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
</template>
<script setup lang=ts>
import {onMounted, ref} from "vue";
  import BaseDialog from "@/components/BaseDialog.vue";
  import Product from "@/components/Product";

  const page = ref(1)
  const items = ref<Product[]>([])

  onMounted(()=> {
    items.value = [
      new Product("1", "Product 1", "Description 1", 100),
      new Product("2", "Product 2", "Description 2", 200),
      new Product("3", "Product 3", "Description 3", 300),
      new Product("4", "Product 4", "Description 4", 400),
    ]
  })
</script>
<style scoped>

</style>