import {defineStore} from "pinia";
import {ref} from "vue";

export const useRootStore= defineStore("rootStore", ()=> {
  const drawer = ref(true);

  function switchDrawer() {
    drawer.value = !drawer.value;
  }

  return {drawer, switchDrawer};
})