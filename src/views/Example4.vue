<template>
    <h3>Снова компонент с удаленной загрузкой данных. Url не возвращает данных, форма не будет загружена.
    </h3>
    <FormFieldsGeneratorLazy :structure="testStructure" dataUrl="https://ai.com" :formAction="formAction"
        @submit-error="errorWarning">
        <template #firstname="{ field, model }">
            <input :id="field.id" :name="field.id" v-bind="field.attrs" v-model="model[field.id]"
                class="_formBase--field-input" :placeholder="field.label + (field.attrs?.required ? '*' : '')" />
        </template>
    </FormFieldsGeneratorLazy>
</template>
<script setup lang="ts">
import { FieldTypeEnum, type IFieldStructure } from "@/types/FormFields";
import FormFieldsGeneratorLazy from "../components/FormFieldsGeneratorLazy.vue";

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

const formAction = "/url.testFormFieldsGenerator.gov"

const errorWarning = (error: Error) => {
    alert(`
        ${error.name}
        ${error.message}
        `)
}
</script>