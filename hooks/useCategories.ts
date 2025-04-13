import { useStore } from "@/store/useStore"

export const useCategories = () => useStore(store => store.categories)
