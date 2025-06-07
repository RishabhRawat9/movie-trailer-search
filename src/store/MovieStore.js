// src/store/MovieStore.js
import { create } from "zustand";

const movieStore = create((set, get) => ({
  loggedIn: false,
  setLoggedIn: (data) => set(() => ({ loggedIn: data })),

  movieData: [],
  movieDetails: null,
  currentPage: 1,
  totalPage: 0,
  searchText: "",

  popularData: [],
  currPage: 1,
  popularLoading: false,

  setMovieData: (data) => set(() => ({ movieData: data })),
  setCurrentPage: (data) => set(() => ({ currentPage: data })),
  setMovieDetails: (data) => set(() => ({ movieDetails: data })),
  setSearchText: (data) => set(() => ({ searchText: data })),
  setTotalPage: (data) => set(() => ({ totalPage: data })),
  //actions for setting movieData;
  fetchMoviesPage: async (page) => {
    //for when the user changes the pages.
    const state = get();
    try {
      const url = `http://localhost:8080/api/search/${state.searchText}/${page}`;
      const res = await fetch(url);
      const data = await res.json();
      state.setTotalPage(data.total_pages || 0);
      state.setMovieData(data || []);
    } catch (e) {
      console.log(e);
      state.setMovieData([]);
      state.setTotalPage(0);
    }
  },

  //popular.jsx states and actions.
  setPopularData: (data) => set({ popularData: data }),

  appendPopularData: (newData) =>
    set((state) => {
      const existingIds = new Set(state.popularData.map((movie) => movie.id));

      // Filter out movies that already exist
      const uniqueNewMovies = newData.filter(
        (movie) => !existingIds.has(movie.id)
      );

      return {
        popularData: [...state.popularData, ...uniqueNewMovies],
      };
    }),

  setPopularPage: (page) => set({ currPage: page }),

  setPopularLoading: (loading) => set({ popularLoading: loading }),

  resetPopular: () =>
    set({
      popularData: [],
      currPage: 1,
      popularLoading: true,
    }),

  fetchPopularMovies: async () => {
    const state = get();

    state.setPopularLoading(true); //when the popular data is loading set it to true o/w keep it false;

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
