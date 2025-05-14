<template>
  <!-- <input type="file" ref="pickInpRef" multiple accept="image/*" v-show="false" /> -->
  <Button @click="pickImg">选择</Button>
  <Button @click="generate">生成</Button>
  <div class="sudoku" ref="containRef">
    <template v-for="(item, index) in imgs" :key="index">
      <div class="img" :style="{
        background:`url(${item}) no-repeat center / cover`
      }">
        <!-- <img :src="item"/> -->
      </div>
    </template>
  </div>
</template>

<script setup>
import { Button } from "tdesign-vue-next";
import Html2Img from "html2img";
import { ref } from "vue";

const containRef = ref();
// const pickInpRef = ref()

const imgs = ref([]);

const pickImg = async () => {
  imgs.value = [];
  const inp = document.createElement("input");

  inp.type = "file";
  inp.accept = "image/*";
  inp.multiple = true;

  inp.onchange = async () => {
    const files = inp.files;

    console.log(files);

    for (const file of files) {
      const url = await readAsUrl(file);
      imgs.value.push(url);
    }
  };

  inp.click();
};

const readAsUrl = (file) => {
  return new Promise((re) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const url = reader.result;
      re(url);
    };
  });
};

const generate = () => {
  Html2Img.save(containRef.value, {
    name: "download-file-name",
    type: "png",
  });
};
</script>

<style lang="scss" scoped>
.sudoku {
  width: 800px;
  height: 800px;
  background-color: beige;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
}
.img {
  width: 100%;
  height: 100%;
  background-color: red;
}
</style>
