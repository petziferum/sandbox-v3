<template>
  <v-card>
    <v-card-title>Chip Filter</v-card-title>
    <v-row>
      <v-col>
        <v-chip
          v-for="(c, i) in chips"
          :key="i"
          @click="c.active = true"
          close
          @click:close="c.active = false"
          :color="c.active ? 'success' : ''"
          >{{ c.text }}</v-chip
        >
      </v-col>
    </v-row>
    a{{ activeProducts }}
    <v-row>
      <v-col>
        <v-list dense>
          <v-list-item-group>
            <v-list-item v-for="(p, i) in activeProducts" selectable :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ p.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ p.status }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ProductViewChips",
  data() {
    return {
      chips: [
        { active: true, text: "Verfügbar" },
        { active: false, text: "Nicht verfügbar" },
        { active: false, text: "In Zulieferung" }
      ],
      products: [
        { nr: 1, status: "Verfügbar", name: "Produkt 1" },
        { nr: 1, status: "Nicht Verfügbar", name: "Produkt 2" },
        { nr: 1, status: "Verfügbar", name: "Produkt 3" }
      ],
      selectedStatus: ["Verfügbar", "Nicht Verfügbar"]
    };
  },
  methods: {
    sortFunction() {
      this.groups.forEach(item => {
        const found = this.products.find(
          el => el.productstatus[0] === item.name
        );
        console.log("suche: ", found);
        item.products.push(
          this.products.find(el => el.productstatus[0] === item.name)
        );
      });
      setTimeout(() => (this.loading = false), 500);
      console.log(this.groups);
    }
  },
  computed: {
    activeProducts() {
      return this.products.filter(value => {
        return this.selectedStatus.includes(value.statusChanges[0].status);
      });
    }
  }
};
</script>

<style scoped>
.chipActive {
  color: #394a58;
}
</style>
