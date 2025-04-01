<template>
    <h3>В эту форму загрузка данных осуществляется с использованием ssr и pinia в качестве store. В случае отключенного
        ssr загрузка осуществляется в onMounted</h3>
    <FormFieldsGenerator :structure="testStructure" v-model="store.formData" :formAction="formAction"
        @submit-error="errorWarning">
    </FormFieldsGenerator>
</template>
<script setup lang="ts">
import { useFormDataStore } from '@/stores/formData';
import FormFieldsGenerator from "../components/FormFieldsGenerator.vue";
import { FieldTypeEnum, type IFieldStructure } from '@/types/FormFields';
import { onMounted, onServerPrefetch } from 'vue';

const testStructure: IFieldStructure[] = [
    {
        type: FieldTypeEnum.Input,
        label: "Фамилия",
        id: "lastname",
        attrs: {
            required: "required"
        }
    },
    {
        type: FieldTypeEnum.Input,
        label: "Имя",
        id: "firstname",
        attrs: {
            required: "required"
        }
    },
    {
        type: FieldTypeEnum.Select,
        label: "Пол",
        id: "gender",
        dataSet: ["Мужской", "Женский"]
    },
    {
        type: FieldTypeEnum.Checkbox,
        label: "Мне есть 18 лет",
        id: "checkAges"
    },
    {
        type: FieldTypeEnum.TextArea,
        label: "Расскажите о себе",
        id: "about"
    },
]

const dataUrl = "/data.json"
const store = useFormDataStore()
onServerPrefetch(async () => {
    store.fetchFormData(dataUrl)
})
onMounted(() => {
    if (!Object.keys(store.formData).length) {
        store.fetchFormData(dataUrl)
    }
})

const formAction = "/url.testFormFieldsGenerator.gov"
const errorWarning = (error: Error) => {
    alert(`
        ${error.name}
        ${error.message}
        `)
}
</script>