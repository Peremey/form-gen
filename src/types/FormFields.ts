type ValueOf<T> = T[keyof T]

export const FieldTypeEnum = {
    Input: "input", Select: "select", TextArea: "textArea", Checkbox: "checkbox"
} as const
export type FieldTypeEnum = ValueOf<typeof FieldTypeEnum>

export interface IFieldStructure {
    type: FieldTypeEnum
    label: string
    id: string
    dataSet?: string[]
    attrs?: Record<string, any>
}
