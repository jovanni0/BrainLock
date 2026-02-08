import { create } from "zustand"
import { persist } from "zustand/middleware"


type GeneralSettings = {
    is_dark_theme: boolean|undefined
    setDarkTheme: (value: boolean) => void

    api_url: string
    setApiUrl: (api_url: string) => void 
}


export const useGeneralSettings = create<GeneralSettings>()(
    persist( (set) => (
{
    is_dark_theme: undefined,
    setDarkTheme: (value: boolean) => set({ is_dark_theme: value }),

    api_url: "",
    setApiUrl: (api_url: string) => set({ api_url })
}),
{
    name: "general-settings-store"
}))