<template>
    <h3>Здесь в форму передается пустой объект модели данных, при этом поле "Имя" кастомизировано через
        слот.</h3>
    <FormFieldsGenerator :structure="testStructure" v-model="formData" :formAction="formAction"
        @submit-error="errorWarning">
        <template #firstname="{ field }">
            <input :id="field.id" :name="field.id" v-bind="field.attrs" v-model="formData[field.id]"
                class="_formBase--field-input" :placeholder="field.label + (field.attrs?.required ? '*' : '')" />
        </template>
    </FormFieldsGenerator>
</template>
<script setup lang="ts">
import { FieldTypeEnum, type IFieldStructure } from "@/types/FormFields";
import FormFieldsGenerator from "../components/FormFieldsGenerator.vue";
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
        type: FieldTypeEnum.Input,
        label: "Отчество",
        id: "tname"
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

const formData = ref<Record<string, any>>({})

const formAction = "/url.testFormFieldsGenerator.gov"

const errorWarning = (error: Error) => {
    alert(`
        ${error.name}
        ${error.message}
        `)
}
</script>