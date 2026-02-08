import { create } from "zustand"
import { persist } from "zustand/middleware"


type GeneralSettings = {
    last_location: string|undefined
    setLastLocation: (value: string|undefined) => void
}


export const useGeneralSettings = create<GeneralSettings>()(
    persist( (set) => (
{
    last_location: undefined,
    setLastLocation: (value: string|undefined) => set({ last_location: value }),
}),
{
    name: "general-settings-store"
}))