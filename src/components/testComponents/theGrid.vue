
<template>
  <div>Boxen
  <div class="box-container" ref="boxContainer"></div>
  </div>
</template>
<script setup lang=ts>
import {onMounted, ref} from "vue";

const boxContainer = ref(null);
const generateBoxes = () => {
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 53; col++) {
      const box = document.createElement('div');
      box.classList.add('box');
      box.id = `box-${row}-${col}`;
      box.addEventListener('click', readBox)
      boxContainer.value.appendChild(box);
    }
  }
};
const readBox = (event) => {
  console.log('box clicked', event.target);
};
onMounted(generateBoxes);
</script>
<style>
.box-container {
  display: grid;
  grid-template-columns: repeat(53, 10px);
  grid-template-rows: repeat(7, 10px);
  gap: 4px;
}
.box {
  cursor: pointer;
  width: 12px;
  height: 12px;
  background-color: #ccc;
  border: 0px solid rgba(0, 100, 0, 0.2);
  border-radius: 2px;
}
.box:hover {
  z-index: 100;
  background-color: #6dfff9;
  border: 1px solid rgba(0, 0, 150, 0.2);
  box-shadow: 0 0 20px 9px #00ffe1;
}
</style>