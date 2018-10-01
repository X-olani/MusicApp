import { connect } from "react-redux";
import { Genre, selected_album, Search_bar, Search_button } from "./store";
import { App } from "./App";

const mapStateToProps = state => ({
  genre: state.genre,
  music_genre: state.music_genre,
  selectedAlbums: state.selectedAlbums,
  selected_genre: state.selected_genre,

  albums: state.albums
});

const mapDispatchToProps = dispatch => {
  const Getalbum = args => dispatch(selected_album(args));
  const Getgenre = args => dispatch(Genre(args));
  const Getsearch = args => dispatch(Search_bar(args));
  const Getsearch_button = () => dispatch(Search_button());
  return {
    Getgenre: Getgenre,
    Getalbum: Getalbum,
    Getsearch: Getsearch,
    Getsearch_button: Getsearch_button
  };
};
export const Component = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
