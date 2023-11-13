<template>
<v-container fluid>
  <v-toolbar>
    <v-toolbar-title>Suchen und Filtern</v-toolbar-title>
  </v-toolbar>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          Diese Tabelle Zeigt Produkte, die nach ihrer 'Nummer' sortiert sind, jedoch werden zusammengehörige Produkte untereinander angezeigt.
        </v-card-text>
        <v-card-text>
      <v-data-table :options.sync="options" density="compact" :items="sortedItems" :headers="headers">
        <template v-slot:item="{ item }">
          <tr :class="item.class">
            <td>{{ item.nr }}</td>
            <td>{{ item.parentProduct }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.productFamily }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
          </tr>
        </template>

      </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-divider />
    </v-col>
  </v-row>
</v-container>
</template>
<script setup lang=ts>

enum ProductFamily {
  "HAUPTPRODUKT" = "Hauptprodukt",
  "TEILPRODUKT" = "Teilprodukt",
  "ZUBEHOER" = "Zubehör",
  "NEBENPRODUKT" = "Nebenprodukt",
  "PRODUKTGRUPPE" = "Produktgruppe",
  "EINZELPRODUKT" = "Einzelprodukt",
}

class Product {
  id?: string;
  nr?: string;
  productFamily?: ProductFamily;
  name: string | undefined;
  price: string | undefined;
  parentProduct?: string;
  class?: string;

}
import {computed, ref} from "vue";

const options =  {
  sortBy: 'name',
      sortDesc: true,
      multiSort: false,
}
const items = ref<Product[]>([
  {id: "10001", nr: "2000", productFamily: ProductFamily.HAUPTPRODUKT, name: "Roboterarm", price: "199,99"},
  {id: "13213", nr: "1001", productFamily: ProductFamily.NEBENPRODUKT, name: "Roboterarm Motor", parentProduct: "10001", price: "199,99"},
  {id: "23413", nr: "1020", productFamily: ProductFamily.EINZELPRODUKT, name: "Kleber", price: "1,99"},
  {id: "42222", nr: "1022", productFamily: ProductFamily.ZUBEHOER, name: "Schraubenzieher", price: "19,90"},
  {id: "12315", nr: "1003", productFamily: ProductFamily.NEBENPRODUKT, name: "Controller ESP32", parentProduct: "10001", price: "19,99"},
  {id: "12316", nr: "1004", productFamily: ProductFamily.EINZELPRODUKT, name: "Stereo Lautsprecher", price: "199,99"},
  {id: "12317", nr: "1005", productFamily: ProductFamily.HAUPTPRODUKT, name: "Computer", price: "199,99"},
  {id: "12318", nr: "1006", productFamily: ProductFamily.NEBENPRODUKT, name: "Grafikkarte", parentProduct: "12317", price: "199,99"},
  {id: "12319", nr: "1007", productFamily: ProductFamily.NEBENPRODUKT, name: "Gehäuse", parentProduct: "12317", price: "199,99"},
  {id: "45320", nr: "3008", productFamily: ProductFamily.EINZELPRODUKT, name: "Staubsauger", price: "11299,99"},
])

const headers = ref([
  {title: "Nummer", key: "nr"},
  {title: "Parent ID", value: "parentProduct", align: "start"},
  {title: "ID", value: "id", key: "id"},
  {title: "Produktart", value: "productFamily", key: "productFamily"},
  {title: "Name", value: "name", key: "name"},
  {title: "Preis", value: "price", key: "price"},
])

const sortedItems = computed(() => {
  console.log("items", items.value);
  // Create a map to hold the items with dependencies
  const withDependencies = new Map();

  // Separate items with dependencies
  items.value.forEach(item => {
    if (item.parentProduct) {
      if (!withDependencies.has(item.parentProduct)) {
        withDependencies.set(item.parentProduct, []);
      }
      withDependencies.get(item.parentProduct).push(item);
    }
  });
  console.log("withDependencies", withDependencies);
  // Sort each group of dependencies by id
  withDependencies.forEach(group => {
    group.sort((a, b) => a.nr - b.nr);
  });

  // Sort the main items list by id
  const sortedList = items.value
      .filter(item => !item.parentProduct)
      .sort((a, b) => a.nr - b.nr);

  // Insert dependent items after their parent items
  for (let i = 0; i < sortedList.length; i++) {
    const parentItem = sortedList[i];
    if (withDependencies.has(parentItem.id)) {
      const dependents = withDependencies.get(parentItem.id);
      sortedList.splice(i + 1, 0, ...dependents);
      i += dependents.length; // Skip the newly added items
    }
  }

  let prevParentId: string | null = "";
  sortedList.forEach(item => {
    if(item.productFamily === ProductFamily.HAUPTPRODUKT) {
      item.class = 'group-parent';
    }
    if (item.parentProduct) {
      item.class = 'group-item';
      if (item.parentProduct !== prevParentId) {
        item.class = 'group-start';
      }
      prevParentId = item.parentProduct;
    } else {
      prevParentId = null;
    }
  });

  return sortedList;
});


</script>
<style>
.group-parent {
  background-color: #d8d8d8;
}

.group-start {
  background-color: #eaeaea;
}

.group-item {
  background-color: #eaeaea;
}

.group-item:last-child {
  background-color: #eaeaea;
}

</style>