<template>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <v-toolbar-title class="text-center">Home</v-toolbar-title>
      <form ref="formular" @submit.prevent="save">
        <v-text-field label="Name des Produkts" v-model="product.name" @keyup.enter="saveName" />
        <v-text-field label="Beschreibung" v-model="product.description" />
        <v-text-field label="Preis" type="number" v-model.number="product.price" />
        <v-btn type="submit">speichern</v-btn>
      </form>
    </v-col>
    <v-col cols="12" md="6">
      {{ product }}
    </v-col>
    <v-col cols="3" v-for="p in allProducts" :key="p.id">
      <v-card elevation="4" class="ma-8">
        <v-card-text v-for="(value, key) in p" :key="key">{{ key }}: {{ value }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang=ts setup>

  import {onMounted, reactive, ref} from "vue";
import Product from "@/components/Product";

const product = reactive<Product>({
  id: "",
  name: "",
  description: "",
  price: 0
})

const allProducts = ref()

function saveName(): void {
  alert("Save Name " + product.name);
}
function fetchAllProducts(): void {
  fetch("http://localhost:8000/products/all",{
    method: "GET",
  }).then((res)=> {
    return res.json()
  }).then((productlist) => {
    console.log("list", productlist);
    allProducts.value = productlist;
  })
}

async function post(): Promise<JSON> {
  const options = {
    method: "POST",
    mode: "cors" as RequestMode,
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(product)
  };
  const response = await fetch("http://localhost:8000/products/save", options)
  return response.json();
}

function save(): void {
  post().then((res) => {
    console.log("response", res);
  })
}

onMounted(()=> {
  fetchAllProducts();
})

</script>

<style scoped>

</style>
