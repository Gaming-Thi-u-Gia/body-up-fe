import { create } from "zustand";

type FilterOption = "All" | "Workout" | "Food" | "Chloe's Programs" | "Misc";

interface FilterState {
    selectedFilter: FilterOption;
    setSelectedFilter: (filter: FilterOption) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    selectedFilter: "All",
    setSelectedFilter: (filter) => set((state) => ({ selectedFilter: filter })),
}));
