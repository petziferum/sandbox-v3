<template>
<v-card>
  <v-card-title> 🤗 Transformers</v-card-title>
  <v-card-subtitle>Test der Huggingface Models mit transformers.js</v-card-subtitle>
  <v-card-text>
    <v-row>
      <v-col cols="6">
        <v-file-input ref="fileinput" accept="image/*" label="Foto" outlined @Change="inputFile" />
        <v-btn color="primary">Upload</v-btn>
      </v-col>
    </v-row>
  </v-card-text>
  <v-card-text>
    <div>Das Modell Sentiment-analysis Analysiert einen Text darauf ob er pisitiv, neutral oder negativ ist.</div>
    <div class="d-flex d-block border">
    <v-text-field
      label="texteingabe"
      v-model="sentimentText"
      />
    <VBtn tile color="blue" @click="analyzeText">
      click
    </VBtn>
    </div>
    {{ out }}
  </v-card-text>
  <v-card-text>
    <v-text-field label="Text 1" v-model="textOne"/>
    <v-text-field label="Text 2" v-model="textTwo"/>
    <v-btn @click="analyzeSentimentMulti">Analyze Sentiment Multi</v-btn>
    <p>Output: <br>
      Ergebnis 1: {{ result[0] }}<br>
      Ergebnis 2: {{ result[1] }}
    </p>
  </v-card-text>
  <v-card-text>
    <v-text-field label="Thema" v-model="topic"/>
    <v-btn @click="createPoem">Create Poem</v-btn>
    <template v-if="!loading"><p class="mt-2">
      Write me a love poem about {{ topic }}.
    </p>
      <div class="my-4" v-if="poem">
        <i>{{ poem[0] }}</i>
      </div>
    </template>
    <template v-else>
      <v-progress-linear class="my-4" indeterminate color="blue"></v-progress-linear>
    </template>
  </v-card-text>
</v-card>
</template>
<script setup lang=ts>
import { pipeline } from '@huggingface/transformers';
import {ref} from "vue";

const loading = ref(false);
const sentimentText = ref("");
const textOne = ref("I love VueJs");
const textTwo = ref("I dont like to go to School");
const out = ref([]);
const result = ref([])
const topic = ref("");
const poem = ref();
const fileinput = ref();
const imgsrc = ref();

function inputFile() {
  const file = fileinput.value.files[0];
  if(file) {
    console.log(file);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      imgsrc.value = e.target?.result as string;
    };
    fileReader.readAsDataURL(file);
  }
}

async function analyzeText() {
// Allocate a pipeline for sentiment-analysis
  const pipe = await pipeline('sentiment-analysis');
  out.value = await pipe(sentimentText.value);
// [{'label': 'POSITIVE', 'score': 0.999817686}]
}
async function analyzeSentimentMulti() {
  const pipe = await pipeline('sentiment-analysis');
  result.value = await pipe([textOne.value, textTwo.value]);
}

async function createPoem() {
  loading.value = true;
  // Allocate a pipeline for text2text-generation
  const poet = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M');
  poem.value = await poet('Write me a love poem about '+topic.value+'.', {
    max_new_tokens: 200,
    temperature: 0.9,
    repetition_penalty: 2.0,
    no_repeat_ngram_size: 3,
  }).then(() => loading.value = false);
}
</script>
<style scoped>

</style>