import { create } from "zustand";

const useInStore = create((set) => ({
  filter: "all",
  editingId: null,

  //set filter
  setFilter: (val) => set({ filter: val }),
  setEditingId: (id) => set({ editingId: id }),
  clearEditingId: () => set({ editingId: null }),
}));

export default useInStore;
