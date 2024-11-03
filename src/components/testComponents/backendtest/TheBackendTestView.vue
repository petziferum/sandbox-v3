<template>
<v-card>
  <v-card-text>
    <v-row>
      <v-col>
        <v-btn @click="fetchProducts(0)">fetch Products</v-btn>
        <div>
          {{ page }} von {{ pageCount }}<br />
          Total: {{ totalItems }}<br />
          Message: {{ message }}
        </div>
      </v-col>
      <v-col>
        <v-data-iterator :items="products" :items-per-page="itemsPerPage">
          <template v-slot:header="">
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                  :disabled="page === 1"
                  density="comfortable"
                  icon="mdi-arrow-left"
                  variant="tonal"
                  rounded
                  @click="fetchProducts(page - 2)"
              ></v-btn>

              <div class="mx-2 text-caption">
                Page {{ page }} of {{ pageCount }}
              </div>

              <v-btn
                  :disabled="page >= pageCount"
                  density="comfortable"
                  icon="mdi-arrow-right"
                  variant="tonal"
                  rounded
                  @click="fetchProducts(page)"
              ></v-btn>
            </div>
          </template>

          <template v-slot:default="{ items }">
            <v-container class="pa-2" fluid>
              <v-row dense>
                <v-col
                    v-for="item in items"
                    :key="item.title"
                    cols="auto"
                    md="4"
                >
                  <v-card class="pb-3" border flat>
                    <v-skeleton-loader type="image" />

                    <v-list-item  class="mb-2">
                      <template v-slot:title>
                        <strong class="text-h6 mb-2">{{ item.raw.name }}</strong>
                      </template>
                      <v-list-item-subtitle>
                        {{ item.raw.description }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="text-truncate text-caption">
                        {{ item.raw.id }}
                      </v-list-item-subtitle>
                    </v-list-item>

                    <div class="d-flex justify-space-between px-4">
                      <div class="d-flex align-center text-amber text-medium-emphasis me-1">
                        <v-icon icon="mdi-tag" start></v-icon>
                        <div class="text-truncate">{{ item.raw.price }}€</div>
                      </div>
                      <v-btn
                          class="text-none"
                          size="small"
                          text="Kaufen"
                          border
                          flat
                      >
                      </v-btn>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-card-text>
</v-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import OwnerDetailsCard from "@/components/testComponents/backendtest/OwnerDetailsCard.vue";

const products = ref([])
const itemsPerPage = ref(3);
const page = ref(0);
const pageCount = ref(0);
const totalItems = ref(0);
const message = ref("");

const fetchProducts = async (p: number) => {
  products.value = [];
  const response = await fetch('http://localhost:8080/products/all'+ '?page=' + p + '&size=' + itemsPerPage.value);
  const data = await response.json()

  message.value = data.message;
  page.value = data.currentPage + 1;
  pageCount.value = data.totalPages;
  totalItems.value = data.totalItems;
  products.value = data.content;
}
</script>
<style scoped>

</style>