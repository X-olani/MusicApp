import { createStore } from "redux";

const initialState = {
  selected_genre: "",
  genre: [],
  selectedAlbums: [],
  music_genre: ["Rap", "hip-hop rap", "RnB", "Soul", "Indie"],
  search: "",
  albums: [
    { album: "4 Your Eyez Only", artist: "J Cole", genre: "Rap" },
    { album: "YSIV", artist: "Logic", genre: "hip-hop rap" },
    { album: "blond", artist: "Frank Ocean", genre: "RnB" },
    { album: "Chance 4", artist: "Chance the rapper", genre: "Soul" },
    { album: "Swimming", artist: "Mac Miller", genre: "Rap" },
    { album: "2014 Forest Hills Drive", artist: "J Cole", genre: "Rap" },
    { album: "Baby Teeth", artist: "Dizzy", genre: "Indie" },
    { album: "Change", artist: "Ella Mai", genre: "RnB" },
    { album: "DDD- Single", artist: "Ama Lou", genre: "Soul" }
  ]
};
export const Genre = args => {
  return {
    type: "genre",
    text: args
  };
};
export const selected_album = args => {
  console.log(args);
  return {
    text: args,
    type: "select_album"
  };
};

export const Search_bar = args => {
  let A = args.target.value;

  return {
    type: "search_bar",
    text: A
  };
};

export const Search_button = args => {
  return {
    type: "search_button"
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "genre":
      let stateGenre = state.albums;
      let arrygenre = [];
      let arryAlbum = state.albums.genre;
      for (let i = 0; i < stateGenre.length; i++) {
        if (stateGenre[i].genre === action.text) {
          arrygenre.push(stateGenre[i]);
          console.log(arryAlbum);
        }
      }

      return {
        ...state,
        selected_genre: action.text,
        genre: arrygenre
      };

    case "select_album":
      let Album_select = action.text;
      let state_ofAlbums = state.albums;
      let foundAlbum;

      for (let i = 0; i < state_ofAlbums.length; i++) {
        if (state_ofAlbums[i].album === Album_select) {
          foundAlbum = state_ofAlbums[i];
          console.log(foundAlbum);
        }
      }

      return {
        ...state,
        selectedAlbums: foundAlbum
      };
    case "search_bar":
      console.log(action.text);
      return {
        ...state,
        search: action.text
      };

    case "search_button":
      let hold_Search = state.search;
      let hold_album = state.albums;
      let Found_search = [];
      let newSearch = hold_Search.toLowerCase();
      for (let i = 0; i < hold_album.length; i++) {
        if (hold_album[i].artist.toLowerCase() === newSearch) {
          Found_search.push(hold_album[i]);
        }
      }
      if (Found_search.length === 0) {
        alert("not  found");
      }
      console.log(Found_search);
      return {
        ...state,
        genre: Found_search
      };
  }

  return state;
};

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
