import { create } from "zustand";

interface SearchStoreState {
    searchText: string;
    setSearchText: (text: string) => void;
}

const useSearchStore = create<SearchStoreState>((set) => ({
    searchText: "",
    setSearchText: (text: string) => set({ searchText: text }),
}));

export default useSearchStore;
