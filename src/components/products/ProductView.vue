<template>
  <div>
    <div>
     <product-filter-select
        class="px-3 pb-2"
        :selected="selectedStatus"
        :status-count="statusCount"
      />
    </div>
    StatusCount: {{ statusCount }}
    <v-card class="my-4">
        <product-element v-for="p in filteredProductList" :key="p.productNumber" :product="p" />
    </v-card>

    <div>
      <v-btn @click="getKeys">get ORDER Amount</v-btn> {{oKeys}},
    </div>
  </div>
</template>

<script lang="ts" setup>
import StatusChanges from "./types/StatusChanges";
import productStatus from "./types/ProductStatus";
import Product from "./types/Product";

import ProductElement from "@/components/products/ProductElement.vue";
import ProductFilterSelect from "@/components/products/ProductFilterSelect.vue";
import {computed, onMounted, ref} from "vue";



      const productList = ref([]);
      const openPanels = ref([0])
      const a = ref([])
      const mapstatus = ref(1)
      const oKeys: number = ref(0)
      const selectedStatus = ref([productStatus.AVAILABLE, productStatus.INSTOCK])


    function getStatus() {
      for (let p in productStatus) {
        a.value.push(p);
      }
      console.info("pushed a", a.value);
    }

    function generateProducts() {
      let available = StatusChanges.createEmptyStatusChanges()
        .withStatus(productStatus.AVAILABLE)
        .withChangeDate(new Date(2020, 2, 20));
      let instock = StatusChanges.createEmptyStatusChanges()
          .withStatus(productStatus.INSTOCK)
          .withChangeDate(new Date(2020, 3, 25));
      let order = StatusChanges.createEmptyStatusChanges()
          .withStatus(productStatus.ORDER)
          .withChangeDate(new Date(2020, 4, 20));
      let unavailable = StatusChanges.createEmptyStatusChanges()
          .withStatus(productStatus.UNAVAILABLE)
          .withChangeDate(new Date(2020, 2, 10));

      let p1 = Product.createEmptyProduct()
      p1.productName = "produkt 1"
      p1.productNumber = "p1"
      p1.withStatus(instock)

      let p2 = Product.createEmptyProduct()
          p2.productName = "produkt 2"
          p2.productNumber = "p2"
          p2.withStatus(available)

      let p3 = Product.createEmptyProduct()
      p3.productName = "produkt 3"
      p3.productNumber = "p3"
      p3.withStatus(order)
      let p4 = Product.createEmptyProduct()
      p4.productName = "produkt 4"
      p4.productNumber = "p4"
      p4.withStatus(unavailable)

      productList.value.push(p1)
      productList.value.push(p2)
      productList.value.push(p3)
      productList.value.push(p4)
    }
    function getKeys(){ //Funktion um die Anzahl an Produkten zu zählen die den jeweiligen Status haben mithilfe einer Map. Macht auch statusCount()
      //oKeys = Object.keys(productStatus);
      console.log("länge", productList.value)
      const m = new Map(Object.keys(productStatus).map((value: Product) => [productStatus[value], productList.value.filter((value1:Product) => value1.statusChanges[0].status === productStatus[value]).length]));
      oKeys.value = m.get("ORDER")
    }


    const statusCount = computed(() => {
      const map = new Map(
        Object.keys(productStatus).map(value => {
          const pValue = productStatus[value];
          return [pValue, productList.value.filter((value1: Product) => value1.statusChanges[0].status === pValue).length];
        })
      );
      return map;
    });
    const filteredProductList = computed(() => {
      return productList.value.filter((value: Product) => {
        return selectedStatus.value.includes(value.statusChanges[0].status);
      });
    });
  onMounted(() => {
    generateProducts();
   getStatus();
  });

</script>

<style scoped></style>
