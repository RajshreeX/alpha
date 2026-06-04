import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create(
  persist(
    (set) => ({
      publishMap: {},

      togglePublished: (id) =>
        set((state) => ({
          publishMap: {
            ...state.publishMap,
            [id]:
              !state.publishMap[id],
          },
        })),
    }),
    {
      name: "product-storage",
    }
  )
);

export default useProductStore;