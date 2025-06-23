// src/utils/cn.ts

export function cn(...inputs: Array<string | false | null | undefined>): string {
    return inputs.filter(Boolean).join(" ");
}
