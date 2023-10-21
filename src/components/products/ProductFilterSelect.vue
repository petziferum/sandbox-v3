<template>
  <v-row>
    <v-col cols="12">selected: {{ selected }}, showBadge: {{showBadge(productStatus[1])}}</v-col>
    <v-row>
      <v-col>
    <v-badge
      v-for="status in productStatus"
      :key="status"
      class="ma-1"
      :value="showBadge(status)"
      bordered
      :content="getBadgeCount(status)"
      overlap
    >
      <v-chip
        filter
        :input-value="isSelected(status)"
        :color="isSelected(status) ? 'primary' : ''"
        @click="toggle(status)"
      >
        {{ toBeschreibung(status) }}
        <v-icon class="pr-2 success--text" right>{{toIcon(status)}}</v-icon>
      </v-chip>
    </v-badge>
      </v-col>
    </v-row>
  </v-row>
</template>

<script setup>
import ProductStatus, {statusToBeschreibung} from "./types/ProductStatus";
import {ref} from "vue";


  const props = defineProps(["selected", "statusCount"])

    const productStatus = ref([
        ProductStatus.AVAILABLE,
    ProductStatus.ORDER,
    ProductStatus.INSTOCK,
    ProductStatus.UNAVAILABLE]);


    function isSelected(productStatus) {
      return props.selected.indexOf(productStatus) !== -1;
    }

    function toBeschreibung(status){
      return statusToBeschreibung.get(status)
    }

    function toIcon(status) {
      if(status === 'AVAILABLE'){
        return "mdi-storefront"
      } else if(status === 'ORDER'){
        return 'mdi-truck'
      }else if(status === 'INSTOCK'){
        return 'mdi-book'
      } else return 'mdi-delete-restore'
    }

    function showBadge(status) { //status = ProductStatus
      //return [ProductStatus.AVAILABLE, ProductStatus.INSTOCK].includes(status)
      return !props.selected.includes(status) && getBadgeCount(status) != "0"
    }

    function getBadgeCount(s) {
      if(props.statusCount) {
        const statusCountResult = props.statusCount.get(s);
        if(statusCountResult === undefined) {
          return '0'
        } else {
          return statusCountResult;
        }
      }
    }

    function toggle(productStatus) {
      const index = props.selected.indexOf(productStatus);
      if(index !== -1) {

        props.selected.splice(index, 1);
      } else {
        props.selected.push(productStatus);      }
  }
</script>

<style scoped>
.v-chip--active::before {
  opacity: 0 !important;
}
</style>
