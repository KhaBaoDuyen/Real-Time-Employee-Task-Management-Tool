export type LoginProp = {
    mode: "staff" | "owner",
    onSubmit?: (data: any) => void | Promise<void>,
}