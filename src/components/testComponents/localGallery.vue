<template>
<v-container>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <h3>Local Gallery 1</h3>
        </v-card-title>
        <v-card-text>
          <v-btn @click="getImageList">Get list</v-btn>
          <v-btn @click="clearList">Clear list</v-btn>
          Server ist: <v-icon :color="online ? 'green' : 'red'">mdi-circle</v-icon>{{ online ? 'online' : 'offline' }}
        </v-card-text>
        <v-card-text>
          <v-row>
            <v-col cols="2" v-for="imgName in imageList" :key="imgName">
              <v-img :src="getImageUrl(imgName)" cover class="pa-2" width="200" />
            </v-col>
          </v-row>
        </v-card-text>
        <div>{{ imageList }}</div>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="mt-10">
    <v-col>
      <v-card>
        <v-card-item>
          <v-btn @click="postQuestion">Post Question</v-btn>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>
<script setup lang=ts>

import {onBeforeMount, onMounted, ref} from "vue";
const imageList = ref([]);
const loading = ref(false);
const online = ref(false);

const getImageList = async () => {
  loading.value = true;
  const response = await fetch('http://localhost:3000/api/images/');
  const data = await response.json();
  imageList.value = data.images;
  console.log(data);
  loading.value = false;
};

// function that return true if the Server under "http://localhost:3000/ is reachable"
const isServerReachable = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/images/');
    console.log("response", response);
    online.value = response.status >= 200 && response.status < 300;
  } catch (err) {
    online.value = false;
  }
};

function postQuestion() {
  const question = {
    title: "How to post a question?",
    text: "I am trying to post a question to the forum but I can't find the button. Can someone help me?",
    tags: ["question", "help"],
    authorId: "12345",
  };
  fetch('http://localhost:3000/api/question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const clearList = () => {
  imageList.value = [];
};

const getImageUrl = (imgName) => {
  return `http://localhost:3000/api/images/${imgName}`;
};

onBeforeMount(async () => {
  await isServerReachable();
});
</script>
<style scoped>

</style>