import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const placeHolderImage2 =
  "https://img.discogs.com/rcwDYjJN5lTQO9mFeQ8Y-b1mqLg=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-847702-1269279852.jpeg.jpg";

const initialState = {
  selected_genre: "",
  genre: [],
  selectedAlbums: [],
  newSelectedAlbums: [],
  music_genre: ["rap", "hip-hop rap", "rnb", "soul", "indie"],
  search: "",
  albums: [],
  covers: {},
  playPLaycover: ""
};

//"http://musicbrainz.org/ws/2/cdstub/"
let musicbrainzURL = "http://musicbrainz.org/ws/2/release/";
let musicbrainzAllAlbums = "http://musicbrainz.org/ws/2/release/";
let musicbrainzCoverart = "https://musicbrainz.org/release/";
let musicbrainzrecentCover = "http://coverartarchive.org/release/";

export const fetcTheAata = () => {
  return (dispatch, getState) => {
    axios
      .get(musicbrainzAllAlbums, {
        params: { query: "country:US AND tag:rap", limit: 6 }
      })
      .then(res => {
        const state = getState();

        console.log("show all albums" + res.data);

        let resultOfAlbum = res.data.releases;

        let albumsObject;
        let albumState = [];

        for (let i = 0; i < resultOfAlbum.length; i++) {
          console.log(resultOfAlbum[i]["artist-credit"][0].artist.name);
          albumsObject = {
            album: resultOfAlbum[i].title,
            artist: resultOfAlbum[i]["artist-credit"][0].artist.name,
            id: resultOfAlbum[i].id,
            genre: resultOfAlbum[i].tags[0].name
          };

          albumState.push(albumsObject);

          if (state.covers[albumsObject.id] === undefined) {
            dispatch(getCover(albumsObject.id, albumState));
          }
        }

        return dispatch({
          type: "FETCH_DATA",
          result: res.data,
          albumState: albumState
        });
      });
  };
};

export const getCover = (coverId, coverArry) => (dispatch, getState) => {
  console.log("Getting cover id", [coverId]);
  axios.get(musicbrainzrecentCover + coverId).then(res => {
    return dispatch({
      type: "GotTheCover",
      releaseID: coverId,
      imageUrl: res.data.images[0].image,
      coverLength: coverId
    });
  });
};

export const Genre = args => {
  return {
    type: "genre",
    text: args
  };
};
export const selected_album_fromGenre = args => {
  return {
    text: args,
    type: "select_album_from_search"
  };
};
export const selected_album_from_albums = args => {
  return {
    text: args,
    type: "selected_from_al"
  };
};

export const Search_bar = args => {
  let A = args.target.value;

  return {
    type: "search_bar",
    text: A
  };
};

export const doSearch = args => {
  return (dispatch, getState) => {
    const artist = getState().search;
    let artistID;
    axios

      .get(musicbrainzURL, { params: { query: artist, limit: 0 } })
      .then(res => {
        //

        //

        console.log("DATA", res.data);
        return dispatch({
          type: "search_button",
          results: res.data
        });
      });
  };
};

//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        albums: action.albumState
      };

    case "findImages":
      let a;
      let b = [];
      let c = [];
      let s;
      state.covers = {};

      for (let i = 0; i < state.albums.length; i++) {
        b.push(state.albums[i].id);
        axios.get(musicbrainzrecentCover + state.albums[i].id).then(res => {
          c.push(res.data.images[0].image);
        });
      }
      a = {
        albumcover: b,
        art: c
      };

      //http://coverartarchive.org/release/cdd4ba80-b911-4942-916f-b984dac07f16/
      return {
        ...state,
        covers: a
      };

    //
    case "GotTheCover":
      const releaseID = action.releaseID;
      const imageUrl = action.imageUrl;
      //  let coverFound = coverFound.push(coverUrl.images[0].image);
      return {
        ...state,
        covers: { ...state.covers, [releaseID]: imageUrl }
      };
    case "genre":
      let stateGenre = state.albums;
      let arryGenre = [];

      for (let i = 0; i < stateGenre.length; i++) {
        if (stateGenre[i].genre === action.text) {
          //  arryGenre.push(stateGenre[i]);
          arryGenre.push({
            album: stateGenre[i].album,
            artist: stateGenre[i].artist,
            id: stateGenre[i].id,
            genre: stateGenre[i].genre,
            cover: state.covers[stateGenre[i].id]
          });
        }
      }
      console.log(arryGenre);
      return {
        ...state,
        selected_genre: action.text,
        genre: arryGenre
      };

    case "select_album_from_search":
      let AlbumSelect = action.text;
      let stateOfGenre = state.genre;
      let foundAlbum;
      for (let i = 0; i < state.genre.length; i++) {
        if (stateOfGenre[i].album === AlbumSelect) {
          foundAlbum = stateOfGenre[i];
        }
      }

      return {
        ...state,
        newSelectedAlbums: foundAlbum
      };

    case "search_bar":
      return {
        ...state,
        search: action.text
      };

    case "search_button":
      let resultOfsearch = [];
      return {
        ...state,
        genre: resultOfsearch
      };
    case "selected_from_al":
      //
      let AlbumSelected = action.text;
      let stateOfal = state.albums;
      let cover = state.covers;
      let AlbumFound;
      for (let i = 0; i < state.albums.length; i++) {
        if (stateOfal[i].artist === AlbumSelected) {
          AlbumFound = {
            album: stateOfal[i].album,
            artist: stateOfal[i].artist,
            id: stateOfal[i].id,
            genre: stateOfal[i].genre,
            cover: cover[stateOfal[i].id]
          };
          console.log(stateOfal[i].artist);
        }
      }

      return {
        ...state,
        newSelectedAlbums: AlbumFound
      };
  }

  return state;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);
