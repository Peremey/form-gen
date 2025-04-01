<template>
    <div class="_formBaseLazy">
        <div v-if="Object.keys(formData).length == 0 && !isErrorLoadData" class="_formBaseLazy--loader">
            <loader />
        </div>
        <div v-if="isErrorLoadData" class="_formBaseLazy--error">
            {{ errorMessage }}
        </div>
        <FormFieldsGenerator :structure="structure" v-model="formData" :formAction="formAction"
            @submit-error="submitError" @submit="emit('submit')" v-if="Object.keys(formData).length > 0">
            <template v-for="(_, name) in $slots" v-slot:[name]="slotProps">
                <slot :name="name" v-bind="slotProps" :model="formData"></slot>
            </template>
        </FormFieldsGenerator>
    </div>
</template>
<script setup lang="ts">
import type { IFieldStructure } from '@/types/FormFields';
import { onMounted, ref } from 'vue';
import loader from "./loader.vue";
import FormFieldsGenerator from "@/components/FormFieldsGenerator.vue"

const props = defineProps<{
    structure: IFieldStructure[]
    dataUrl: string
    formAction: string
}>()

const formData = ref<Record<string, any>>({})

const emit = defineEmits<{
    (e: "submit"): void,
    (e: "submitError", error: Error): void
}>();

const submitError = (error: Error) => {
    emit('submitError', error)
}

const isErrorLoadData = ref(false)
const errorMessage = ref("")
onMounted(() => {
    fetch(props.dataUrl).then(response => {
        return response.json();
    }).then(result => {
        formData.value = result
    }).catch(error => {
        isErrorLoadData.value = true
        errorMessage.value = "Данные не были загружены"
    })
})
</script>