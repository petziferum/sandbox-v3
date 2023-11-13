<template>
<v-container fluid>
  <v-toolbar>
    <v-toolbar-title>Suchen und Filtern</v-toolbar-title>
  </v-toolbar>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          Diese Tabelle Zeigt Produkte, die nach ihrer 'ID' sortiert sind, jedoch werden zusammengehörige Produkte untereinander angezeigt.
        </v-card-text>
        <v-card-text>
      <v-data-table density="compact" :items="sortedItems" :headers="headers">
        <template #item.produktart="{ item }">
          <span v-if="item.produktart === 'Hauptprodukt'"><strong>{{ item.produktart }}</strong></span>
          <span v-else>{{ item.produktart }}</span>
        </template>
        <template v-slot:item.parentProduct="{ item }">
          <span v-if="item.parentProduct"><strong>{{ item.parentProduct }}</strong></span>
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

import {computed, ref} from "vue";

const items = ref([
  {id: "10001", nr: "40/432/2000", produktart: ProductFamily.HAUPTPRODUKT, name: "Roboterarm", price: "199,99"},
  {id: "13213", nr: "46/412/1001", produktart: ProductFamily.NEBENPRODUKT, name: "Roboterarm Motor", parentProduct: "10001", price: "199,99"},
  {id: "23413", nr: "30/432/1002", produktart: ProductFamily.EINZELPRODUKT, name: "Kleber", price: "1,99"},
  {id: "12315", nr: "31/427/1003", produktart: ProductFamily.NEBENPRODUKT, name: "Controller ESP32", parentProduct: "10001", price: "19,99"},
  {id: "12316", nr: "42/432/1004", produktart: ProductFamily.EINZELPRODUKT, name: "Stereo Lautsprecher", price: "199,99"},
  {id: "12317", nr: "30/432/1005", produktart: ProductFamily.HAUPTPRODUKT, name: "Computer", price: "199,99"},
  {id: "12318", nr: "40/432/1006", produktart: ProductFamily.NEBENPRODUKT, name: "Grafikkarte", parentProduct: "12317", price: "199,99"},
  {id: "12319", nr: "60/432/1007", produktart: ProductFamily.NEBENPRODUKT, name: "Gehäuse", parentProduct: "12317", price: "199,99"}
])

const headers = ref([
  {title: "ID", value: "id", key: "id"},
  {title: "parent", value: "parentProduct"},
  {title: "Nummer", value: "nr", key: "nr"},
  {title: "Produktart", value: "produktart", key: "produktart"},
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
    group.sort((a, b) => a.id - b.id);
  });

  // Sort the main items list by id
  const sortedList = items.value
      .filter(item => !item.parentProduct)
      .sort((a, b) => a.id - b.id);

  // Insert dependent items after their parent items
  for (let i = 0; i < sortedList.length; i++) {
    const parentItem = sortedList[i];
    if (withDependencies.has(parentItem.id)) {
      const dependents = withDependencies.get(parentItem.id);
      sortedList.splice(i + 1, 0, ...dependents);
      i += dependents.length; // Skip the newly added items
    }
  }

  return sortedList;
});


</script>
<style scoped>

</style>