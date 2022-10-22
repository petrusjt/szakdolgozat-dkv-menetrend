

export function baseChangeListener(handler: any) {
    return (event: any) => handler(event.target.value)
}