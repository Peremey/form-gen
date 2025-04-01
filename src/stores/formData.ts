import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormDataStore = defineStore('formData', () => {
    const formData = ref<Record<string, any>>({})

    const fetchFormData = (url: string) => {
        fetch(url).then(response => {
            return response.json()
        }).then(result => {
            formData.value = result as Record<string, any>
        })
    }

    return { formData, fetchFormData }
})