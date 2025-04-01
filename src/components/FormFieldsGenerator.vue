<template>
    <form @submit.prevent="submitForm()" method="POST" :action="formAction" class="_formBase">
        <div v-for="field in structure" class="_formBase--field">
            <slot :name="field.id" :field="field" :value="modelValue[field.id]" :update="updateValue">
                <label :for="field.id" :class="{ '_formBase--field-lcheck': field.type == FieldTypeEnum.Checkbox }">{{
                    field.label }} <span v-if="field.attrs?.required != undefined"
                        class="_formBase--field-reqiured">*</span></label>

                <input v-if="field.type == FieldTypeEnum.Input" :id="field.id" :name="field.id" v-bind="field.attrs"
                    :value="modelValue[field.id]"
                    @input="updateValue(field.id, ($event.target as HTMLInputElement).value)"
                    class="_formBase--field-input" />

                <input v-else-if="field.type == FieldTypeEnum.Checkbox" type="checkbox" :id="field.id" :name="field.id"
                    v-bind="field.attrs" :checked="modelValue[field.id]"
                    @change="updateValue(field.id, ($event.target as HTMLInputElement).checked)" />

                <textarea v-else-if="field.type == FieldTypeEnum.TextArea" :id="field.id" :name="field.id"
                    v-bind="field.attrs" :value="modelValue[field.id]"
                    @input="updateValue(field.id, ($event.target as HTMLTextAreaElement).value)" />

                <select v-else-if="field.type == FieldTypeEnum.Select" :id="field.id" :name="field.id"
                    v-bind="field.attrs" :value="modelValue[field.id]"
                    @change="updateValue(field.id, ($event.target as HTMLSelectElement).value)">
                    <option v-for="option in field.dataSet" :key="option" :value="option">
                        {{ option }}
                    </option>
                </select>
            </slot>
        </div>
        <div class="_formBase--btns">
            <button type="button" @click="resetForm()" class="_formBase--btns-cancel">Отмена</button>
            <div class="_formBase--btns-submit">
                <button type="submit">Сохранить</button>
                <div class="_formBase--btns-loader">
                    <loader v-if="showLoader" />
                </div>
            </div>
        </div>
    </form>
</template>
<script setup lang="ts">
import { FieldTypeEnum, type IFieldStructure } from '@/types/FormFields';
import loader from "./loader.vue";
import { ref } from 'vue';

const props = defineProps<{
    structure: IFieldStructure[]
    modelValue: Record<string, any>
    formAction: string
}>()

const emit = defineEmits<{
    (e: "update:modelValue", obj: any): void,
    (e: "submit"): void,
    (e: "submitError", error: Error): void
}>();

const updateValue = (key: string, value: any) => {
    emit("update:modelValue", { ...props.modelValue, [key]: value });
};

const resetForm = () => {
    const resetData = Object.keys(props.modelValue).reduce((acc: any, key) => {
        acc[key] = "";
        return acc;
    }, {});
    emit("update:modelValue", resetData);
};

const showLoader = ref(false)
const submitForm = () => {

    showLoader.value = true
    fetch(props.formAction, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(props.modelValue),
    })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(`${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(result => {
            showLoader.value = false
            emit("submit")
        })
        .catch(error => {
            showLoader.value = false
            console.log(error)
            emit("submitError", new Error(error))
        });
};
</script>