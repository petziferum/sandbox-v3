<template>
<v-row>
  <v-col cols="12">
    Parent: ThePropsTest, <br />
    Child: BaseDialog
  </v-col>
  <v-col>
    <v-card title="Parent Component">
      <v-card-text>
        <v-btn @click="editMode = !editMode" class="ma-2">Edit</v-btn>
        <v-table>
          <v-data-iterator :items="items" :page="page">
            <template v-slot:default="{ items }">
              <template
                  v-for="(item, i) in items"
                  :key="i"
              >
                <v-card>
                  <v-card-title>
                  <template v-if="editMode">
                    <edit-text-field v-bind="item.raw" @update:productName="value => item.raw.name = value" />
                  </template>
                  <template v-else>
                  {{i}}: {{ item.raw.name }}
                  </template>
                    <v-btn @click="openDialog(item.raw)" variant="flat" slim icon class="mx-4">
                      <v-icon icon="mdi-pencil" />
                    </v-btn>
                  </v-card-title>
                  <v-card-subtitle>
                  </v-card-subtitle>
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
      <edit-product-dialog ref="editProductDialog" />
    </v-card>
  </v-col>
</v-row>
</template>
<script setup lang=ts>
import {onMounted, ref} from "vue";
  import Product from "@/components/Product";
import EditProductDialog from "@/components/testComponents/propsandemits/editProductDialog.vue";
import EditTextField from "@/components/testComponents/propsandemits/editTextField.vue";

  const page = ref(1)
  const items = ref<Product[]>([])
  const editMode = ref(false)
const editProductDialog = ref<typeof EditProductDialog | null>(null)

function openDialog(product: Product) {
  editProductDialog.value?.openDialog(product);
}

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