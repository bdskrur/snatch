export interface IGenericUploadInputProps<T> {
    onSuccess?: (response: T | undefined) => void;
}
