// src/store/MovieStore.js
import { create } from "zustand";

const movieStore = create((set, get) => ({
  movieData: [],
  movieDetails: null,
  currentPage: 1,
  totalPage: 0,
  searchText: "",

  popularData: [],
  currPage: 1,
  popularLoading: false,

  setMovieData: (data) => set(() => ({ movieData: data })),

  setPopularData: (data) => set({ popularData: data }),

  appendPopularData: (newData) =>
    set((state) => {
      return {
        popularData: [...state.popularData, ...newData],
      };
    }),

  setPopularPage: (page) => set({ currPage: page }),
  setPopularLoading: (loading) => set({ popularLoading: loading }),

  resetPopular: () =>
    set({
      popularData: [],
      currPage: 1,
      popularLoading: false,
    }),

  fetchPopularMovies: async () => {
    const state = get();

    try {
      const url = `http://localhost:8080/api/popular/${state.currPage}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data && data.results && data.results.length > 0) {
        get().appendPopularData(data.results);
        set((state) => ({ currPage: state.currPage + 1 }));
      }
    } catch (e) {
      console.log(e);
    }
  },
}));

export default movieStore;
