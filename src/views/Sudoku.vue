<template>
    <div
        class="sudoku"
        ref="containRef"
        :style="{
            gridTemplateColumns: `repeat(${gridTemplate.col}, 1fr)`,
            gridTemplateRows: `repeat(${gridTemplate.row}, 1fr)`
        }"
    >
        <div
            v-for="(item, index) in imgsSorted"
            :key="index"
            class="img"
            :style="{
                background: `url(${item}) no-repeat center / cover`
            }"
        ></div>
    </div>

    <div class="w-full h-[50px] items-center flex gap-x-[20px]">
        <Button @click="pickImg">选择</Button>
        <Button @click="generate">生成</Button>

        <div>
            Col:
            <InputNumber
                v-model="gridTemplate.col"
                :max="15"
                :min="-2"
            />
        </div>
        <div>
            Row
            <InputNumber
                v-model="gridTemplate.row"
                :max="15"
                :min="-2"
            />
        </div>
        <div class="flex items-center gap-x-[5px]">
            <Input v-model="gridTemplate.sort" />
            <Button @click="onEnter">resort</Button>
        </div>
    </div>
</template>

<script setup>
import { Button, InputNumber, Input } from 'tdesign-vue-next'
import Html2Img from 'html2img'
import { reactive, ref } from 'vue'
import clonedeep from 'lodash.clonedeep'

const gridTemplate = reactive({
    col: 1,
    row: 1,
    sort: ''
})

const containRef = ref()
// const pickInpRef = ref()

const imgs = ref([])

const imgsSorted = ref([])
const onEnter = () => {
    const arr = gridTemplate.sort.split(',').map(i => parseInt(i))
	imgsSorted.value = arr.map((index) => imgs.value[index])
}

const pickImg = async () => {
    imgs.value = []
    const inp = document.createElement('input')

    inp.type = 'file'
    inp.accept = 'image/*'
    inp.multiple = true

    inp.onchange = async () => {
        const files = Array.from(inp.files)

        gridTemplate.sort = files.map((_, index) => index).join(',')

        const urls = await Promise.all(files.map((file) => readAsUrl(file)))

        imgs.value = urls
        imgsSorted.value = imgs.value
    }

    inp.click()
}

const readAsUrl = (file) => {
    return new Promise((re) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const url = reader.result
            re(url)
        }
    })
}

const generate = () => {
    Html2Img.save(containRef.value, {
        name: 'download-file-name',
        type: 'png'
    })
}
</script>

<style lang="scss" scoped>
.sudoku {
    width: 800px;
    height: 800px;
    background-color: beige;
    display: grid;
    gap: 2px;
}
.img {
    width: 100%;
    height: 100%;
}
</style>
