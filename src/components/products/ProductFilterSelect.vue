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

<script>
import ProductStatus, {statusToBeschreibung} from "./types/ProductStatus";
export default {
  name: "ProductFilterSelect",
  props: ["selected", "statusCount"],
  data: () => ({
    productStatus: [
        ProductStatus.AVAILABLE,
    ProductStatus.ORDER,
    ProductStatus.INSTOCK,
    ProductStatus.UNAVAILABLE]
  }),
  methods: {
    isSelected(productStatus) {
      return this.selected.indexOf(productStatus) !== -1;
    },
    toBeschreibung(status){
      return statusToBeschreibung.get(status)
    },
    toIcon(status) {
      if(status === 'AVAILABLE'){
        return "mdi-storefront"
      } else if(status === 'ORDER'){
        return 'mdi-truck'
      }else if(status === 'INSTOCK'){
        return 'mdi-book'
      } else return 'mdi-delete-restore'
    },
    showBadge(status) { //status = ProductStatus
      //return [ProductStatus.AVAILABLE, ProductStatus.INSTOCK].includes(status)
      return !this.selected.includes(status) && this.getBadgeCount(status) != "0"
    },
    getBadgeCount(s) {
      if(this.statusCount) {
        const statusCountResult = this.statusCount.get(s);
        if(statusCountResult === undefined) {
          return '0'
        } else {
          return statusCountResult;
        }
      }
    },
    toggle(productStatus) {
      const index = this.selected.indexOf(productStatus);
      if(index !== -1) {

        this.selected.splice(index, 1);
      } else {
        this.selected.push(productStatus);      }
    }
  }
};
</script>

<style scoped>
.v-chip--active::before {
  opacity: 0 !important;
}
</style>
