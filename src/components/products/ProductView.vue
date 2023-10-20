<template>
  <div>
    {{productList}}
    <div>
     <!--  <product-filter-select
        class="px-3 pb-2"
        :selected="selectedStatus"
        :status-count="statusCount"
      />
      -->
    </div>
    <template>
      <!-- <product-element v-for="p in filteredProductList" :key="p.productNumber" :product="p" /> Todo: Refactor der Komponente nötig -->
    </template>
    <div>
      <v-btn @click="getKeys">get ORDER Amount</v-btn> {{oKeys}},
    </div>
  </div>
</template>

<script setup>
import StatusChanges from "./types/StatusChanges";
import productStatus from "./types/ProductStatus";
//import ProductFilterSelect from "./ProductFilterSelect";
import Product from "./types/Product";

import {computed, onMounted, ref} from "vue";



      const productList = ref([])
      const openPanels = ref([0])
      const a = ref([])
      const mapstatus = ref(1)
      const oKeys = ref(0)
      const selectedStatus = ref([productStatus.AVAILABLE, productStatus.INSTOCK])


    function getStatus() {
      for (let p in productStatus) {
        this.a.push(p);
      }
      console.info("pushed a", this.a)
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

      this.productList.push(p1)
      this.productList.push(p2)
      this.productList.push(p3)
      this.productList.push(p4)
    }
    function getKeys(){ //Funktion um die Anzahl an Produkten zu zählen die den jeweiligen Status haben mithilfe einer Map. Macht auch statusCount()
      //this.oKeys = Object.keys(productStatus);
      console.log("länge", this.productList)
      const m = new Map(Object.keys(productStatus).map(value => [productStatus[value], this.productList.filter(value1 => value1.statusChanges[0].status === productStatus[value]).length]));
      this.oKeys = m.get("ORDER")
    }


    const statusCount = computed(() => {
      const map = new Map(
        Object.keys(productStatus).map(value => {
          const pValue = productStatus[value];
          return [pValue, this.productList.filter(value1 => value1.statusChanges[0].status === pValue).length];
        })
      );
      return map;
    });
    const filteredProductList = computed(() => {
      return this.productList.filter(value => {
        return this.selectedStatus.includes(value.statusChanges[0].status);
      });
    });
  onMounted(() => {
    this.generateProducts();
    this.getStatus();
  });

</script>

<style scoped></style>
