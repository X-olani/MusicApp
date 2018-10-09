import { connect } from "react-redux";
import {
  Genre,
  selected_album_fromGenre,
  Search_bar,
  doSearch,
  selected_album_from_albums
} from "./store";

import { getAlbumsWithCovers } from "./selectors";

import { App } from "./App";

const mapStateToProps = state => ({
  genre: state.genre,
  music_genre: state.music_genre,
  selectedAlbums: state.selectedAlbums,
  selected_genre: state.selected_genre,
  search: state.search,
  albums: getAlbumsWithCovers(state),
  newCovers: state.newCovers,
  newSelectedAlbums: state.newSelectedAlbums,
  covers: state.covers.art
});

const mapDispatchToProps = dispatch => {
  const Getalbum_from_Ablum = args =>
    dispatch(selected_album_from_albums(args));
  const Getalbum_fromGenre = args => dispatch(selected_album_fromGenre(args));
  const Getgenre = args => dispatch(Genre(args));
  const Getsearch = args => dispatch(Search_bar(args));
  const Getsearch_button = () => dispatch(doSearch());
  return {
    Getalbum_from_Ablum: Getalbum_from_Ablum,
    Getgenre: Getgenre,
    Getalbum_fromGenre: Getalbum_fromGenre,
    Getsearch: Getsearch,
    Getsearch_button: Getsearch_button
  };
};
export const Component = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
