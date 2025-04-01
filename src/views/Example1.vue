<template>
    <h3>Здесь создается форма по умолчанию и она заполняется заранее подготовленными данными, путем передачи напрямую
        объекта с данными.</h3>
    <FormFieldsGenerator :structure="testStructure" v-model="formData" :formAction="formAction"
        @submit-error="errorWarning" />
</template>
<script setup lang="ts">
import { FieldTypeEnum, type IFieldStructure } from "@/types/FormFields";
import FormFieldsGenerator from "../components/FormFieldsGenerator.vue"
import { ref } from "vue";

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

const formData = ref<Record<string, any>>({
    lastname: "Иванов",
    firstname: "Иван",
    gender: "Мужской",
    checkAges: true,
    about: "Моя жизнь - мое личное дело."
})

const formAction = "/url.testFormFieldsGenerator.gov"

const errorWarning = (error: Error) => {
    alert(`
        ${error.name}
        ${error.message}
        `)
}
</script>