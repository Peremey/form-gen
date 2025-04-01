<template>
    <h3>Здесь применяется наш компонент, обернутый в декоратор, который позволяет принимать, вместо объекта модели
        данных, url, из которого и подгружаются данные модели. Одно из полей формы кастомизировано через слоты.
    </h3>
    <FormFieldsGeneratorLazy :structure="testStructure" :dataUrl="dataUrl" :formAction="formAction"
        @submit-error="errorWarning">

        <template #about="{ field, model }">
            <div class="textarea--custom">
                <textarea :id="field.id" :name="field.id" v-bind="field.attrs" v-model="model[field.id]"></textarea>
                <img src="https://i.pinimg.com/originals/24/ac/ef/24acef8b3a6a45d7239480bcc4ff0193.jpg" />

            </div>
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
const dataUrl = "/data.json"

const errorWarning = (error: Error) => {
    alert(`
        ${error.name}
        ${error.message}
        `)
}
</script>
<style lang="scss">
.textarea--custom {
    display: flex;
    overflow: hidden;

    img {
        width: 50%;
        height: 50%;
        transform: translateX(-40%) rotateZ(-45deg);
        border: solid 1px rgb(61, 57, 57);
    }

    textarea {
        background-color: antiquewhite;
    }
}
</style>