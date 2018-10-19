import { connect } from "react-redux";
import {
  Genre,
  selectedAlbumFromGenre,
  searchBar,
  doSearch,
  selected_album_from_albums,
  addToCart,
  doClearOfCart,
  doShowTheBIO
} from "./store";
import { getAlbumsWithCovers } from "./selectors";

import { App } from "./App";

const mapStateToProps = state => ({
  BIO: state.BIO,
  genre: state.genre,
  musicGenre: state.musicGenre,
  selectedAlbums: state.selectedAlbums,
  selected_genre: state.selected_genre,
  search: state.search,
  albums: getAlbumsWithCovers(state),
  newCovers: state.newCovers,
  newSelectedAlbums: state.newSelectedAlbums,
  covers: state.covers.art,
  cart: state.cart,
  cartLength: state.cartLength
});

const mapDispatchToProps = dispatch => {
  const doCartClear = () => dispatch(doClearOfCart());
  const getCartButton = args => dispatch(addToCart(args));
  const getAlbumFromAlbums = index =>
    dispatch(selected_album_from_albums(index));
  const getAlbumFromGenre = args => dispatch(selectedAlbumFromGenre(args));
  const getGenre = args => dispatch(Genre(args));
  const getSearch = args => dispatch(searchBar(args));
  const getSearchButtonResult = () => dispatch(doSearch());
  const doTheBIO = () => dispatch(doShowTheBIO());

  return {
    doTheBIO: doTheBIO,
    doCartClear: doCartClear,
    getCartButton: getCartButton,
    getAlbumFromAlbums: getAlbumFromAlbums,
    getGenre: getGenre,
    getAlbumFromGenre: getAlbumFromGenre,
    getSearch: getSearch,
    getSearchButtonResult: getSearchButtonResult
  };
};
export const Component = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
