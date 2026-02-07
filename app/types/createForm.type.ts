export type CreateProp = {
    onSubmit: (data: any) => void | Promise<void>
     mode?: "create" | "edit";
}