<template>
<v-card title="Zeugnis">
  Zeugnis mit Map und Set erstellen
  <v-card-text>
    <v-btn @click="createZeugnis">Zeugnis erstellen</v-btn>
  </v-card-text>
  <v-card-text>
    <v-table dense>
    <v-row>
      <v-col v-for="entry in zeugnis" cols="4" :key="entry.fach">
        <th>{{ entry.fach }}: </th>
        <td>&nbsp;{{ entry.note === 0 ? ' - ' : entry.note }}</td>
      </v-col>
    </v-row>
    </v-table>
  </v-card-text>
</v-card>
</template>
<script setup lang=ts>
import ZeugnisEntry from "@/components/testComponents/zeugnis/ZeugnisEntry";
import {ref} from "vue";
import Schulfach from "@/components/testComponents/zeugnis/Schulfach.type";

const zeugnis = ref<ZeugnisEntry[]>([]);
 const createZeugnis = () => {
    zeugnis.value = ZeugnisEntry.createZeugnisEntryList([new ZeugnisEntry(Schulfach.MATHE, 4), new ZeugnisEntry(Schulfach.MOTORRADFAHREN, 1)])
 }
</script>
<style scoped>

</style>