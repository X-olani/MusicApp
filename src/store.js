import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import PirateBay from "thepiratebay";

const placeHolderImage2 =
  "https://img.discogs.com/rcwDYjJN5lTQO9mFeQ8Y-b1mqLg=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-847702-1269279852.jpeg.jpg";

const initialState = {
  selectedGenre: "",
  genre: [],
  selectedAlbums: [],
  newSelectedAlbums: [],
  musicGenre: ["rap", "hip-hop/rap", "r&b", "soul", "indie"],
  search: "",
  albums: [],
  covers: {},
  cart: [],
  cartLength: "",
  BIO: ""
};
let o;
let musicBrainzURL = "http://musicbrainz.org/ws/2/release/";
let musicbrainzAllAlbums = "http://musicbrainz.org/ws/2/release/";
let musicbrainzRecentCover = "http://coverartarchive.org/release/";
export const mapReleasesToSearch = releases => {
  console.log(releases);
  // Rewrite using map
  let albumState = [];
  for (let i = 0; i < releases.length; i++) {
    const albumsObject = {
      album: releases[i].title,
      artist: releases[i]["artist-credit"][0].artist.name,
      id: releases[i].id
    };
    albumState.push(albumsObject);
  }
  return albumState;
};
export const mapReleasesToAlbums = releases => {
  console.log(releases);
  // Rewrite using map
  let albumState = [];

  for (let i = 0; i < releases.length; i++) {
    const genreIsNull = index => {
      let q;

      if (
        releases[index].tags !== undefined &&
        releases[index].tags.length > 0
      ) {
        q = releases[index].tags[0].name;
      } else {
        q = "none";

        console.log(q);
      }
      return q;
    };

    const albumsObject = {
      album: releases[i].title,
      artist: releases[i]["artist-credit"][0].artist.name,
      id: releases[i].id,
      genre: genreIsNull(i)
    };

    albumState.push(albumsObject);
  }
  return albumState;
};

export const getCover = coverId => (dispatch, getState) => {
  axios.get(musicbrainzRecentCover + coverId).then(res => {
    return dispatch({
      type: "GOT_THE_COVER",
      releaseID: coverId,
      imageUrl: res.data.images[0].image,
      coverLength: coverId
    });
  });
};
export const addToCart = args => {
  console.log(args);

  return {
    type: "CART",
    index: args
  };
};
export const getAllCovers = releases => dispatch =>
  releases.forEach(release => {
    dispatch(getCover(release.id));
  });

export const Genre = args => {
  console.log(args);
  return (dispatch, getState) => {
    let selectGenre = args;
    axios
      .get(musicbrainzAllAlbums, {
        params: {
          query: "tag:" + selectGenre + " AND country:US AND date:2018",
          limit: 5
        }
      })
      .then(res => {
        let releases = res.data.releases;
        dispatch(getAllCovers(releases));
        const genreState = mapReleasesToAlbums(releases);

        return dispatch({
          type: "GENRE",
          genreState: genreState
        });
      });
  };
};
export const selectedAlbumFromGenre = args => {
  return {
    text: args,
    type: "SELECT_ALBUM_FROM_SEARCH"
  };
};
export const selected_album_from_albums = index => (dispatch, getState) => {
  let artistBIO = getState().albums[index].artist;
  axios
    .get(
      " https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" +
        artistBIO +
        " " +
        getState().albums[index].album
    )
    .then(res => {
      console.log(res.data.query.search[0].snippet);

      let BIO = res.data.query.search[0].snippet;
      return dispatch({
        type: "SELECTED_FROM_AL",
        index: index,
        GetBIO: BIO
      });
    })
    .catch(err => console.log(err));
};

export const searchBar = args => {
  let A = args.target.value;

  return {
    type: "SEARCH_BAR",
    text: A
  };
};

export const fetchAllAlbums = () => {
  return (dispatch, getState) => {
    axios
      .get(musicbrainzAllAlbums, {
        params: {
          query: "country:US AND tag:r&b,rap,indie,hip-hop,soul date:2018",
          limit: 10
        }
      })
      .then(res => {
        let releases = res.data.releases;
        dispatch(getAllCovers(releases));
        const albumState = mapReleasesToAlbums(releases);

        return dispatch({
          type: "FETCH_DATA",
          albumState: albumState
        });
      });
  };
};
export const doClearOfCart = () => {
  return {
    type: "CLEAR_CART"
  };
};
export const doSearch = args => {
  return (dispatch, getState) => {
    const artist = getState().search;

    axios
      .get(musicBrainzURL, {
        params: { query: artist, limit: 0 }
      })
      .then(res => {
        const releases = res.data.releases;

        dispatch(getAllCovers(releases));
        const albumState = mapReleasesToAlbums(releases);
        return dispatch({
          type: "SEARCH_BUTTON",
          albumState: albumState
        });
      });
    axios
      .get(
        " https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" +
          artist
      )
      .then(res => {
        console.log(res.data.query.search[0].snippet);
        let BIO = res.data.query.search[0].snippet;
        return dispatch({
          type: "BIO",
          GetBIO: BIO
        });
      });
  };
};

//
export const doShowTheBIO = () => {
  return {
    type: "SHOW_THE_BIO"
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      let theResult = action.albumState;

      return {
        ...state,
        albums: theResult
      };
    case "SEARCH_BUTTON":
      return {
        ...state,
        albums: action.albumState
      };

    case "GOT_THE_COVER":
      const releaseID = action.releaseID;
      const imageUrl = action.imageUrl;
      //  let coverFound = coverFound.push(coverUrl.images[0].image);
      return {
        ...state,
        covers: { ...state.covers, [releaseID]: imageUrl }
      };
    case "GENRE":
      let resultGenre = action.genreState;
      console.log(resultGenre);
      return {
        ...state,
        albums: resultGenre
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
        cartLength: 0
      };
    case "GENRE_SELECTED":
      let genreState = action.genreState;
      console.log(genreState);
      return {};

    case "SELECT_ALBUM_FROM_SEARCH":
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

    case "SEARCH_BAR":
      return {
        ...state,
        search: action.text
      };
    case "SHOW_THE_BIO":
      return {
        ...state,
        BIO: state.newSelectedAlbums.BIO
      };
    case "SELECTED_FROM_AL":
      let getBIO = action.GetBIO;
      const albumIndex = action.index;
      let addCoverToSelected;
      let stateAlbums = state.albums;
      let stateCovers = state.covers;

      addCoverToSelected = {
        album: stateAlbums[albumIndex].album,
        artist: stateAlbums[albumIndex].artist,
        id: stateAlbums[albumIndex].id,
        cover: stateCovers[stateAlbums[albumIndex].id],
        genre: stateAlbums[albumIndex].genre,
        BIO: getBIO
      };

      return {
        ...state,
        newSelectedAlbums: addCoverToSelected,
        BIO: ""
      };
    case "CART":
      let index = action.index;
      let stateOfAlbums = state.albums;
      let cart = state.cart;
      let cartArry = [];
      let a = stateOfAlbums[index];
      let lengthOfCart = state.cart.length + 1;

      cart.push(a);
      console.log(lengthOfCart.length);
      return {
        ...state,
        cart: cart,
        cartLength: lengthOfCart
      };
  }

  return state;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);
