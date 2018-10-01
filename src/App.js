import React from "react";

import "./App.css";

export const App = props => {
  const getgenervalue = args => {
    props.Getgenre(args);
    document.getElementById("search_change").innerHTML = "Genre:";
  };
  const Get_album = args => props.Getalbum(args);
  const Get_search = args => props.Getsearch(args);
  const Get_searchButton = () => {
    props.Getsearch_button();
    document.getElementById("search_change").innerHTML = "Search Result";
    document.getElementById("clearing").innerHTML = "";
  };

  return (
    <div className="App">
      <nav>
        <button onClick={Get_searchButton}>Search </button>
        <input type="text" onChange={Get_search} />
      </nav>
      <div className="display_genre">
        <div className="display_genre1">
          {props.music_genre.map((genres, index) => {
            return (
              <div onClick={() => getgenervalue(genres)} value={index}>
                {genres}
              </div>
            );
          })}
        </div>
      </div>
      <div className="display_albums">
        <div className="displayed_albums">
          <h1>All the albums</h1>
          {props.albums.map((album, index) => {
            return (
              <div className="albums" onClick={() => Get_album(album.album)}>
                {album.album}

                <br />
                {album.artist}
              </div>
            );
          })}
        </div>
        <div className="display_selected_genre">
          <h1 id="search_change"> Genre</h1>
          <h1 id="clearing">{props.selected_genre}</h1>
          {props.genre.map((selected, index) => {
            return (
              <div className="albums" onClick={() => Get_album(selected.album)}>
                {selected.album}
                <br />
                {selected.artist}
              </div>
            );
          })}
        </div>
      </div>

      <div className="selected_G">
        <h2>Ablum: {props.selectedAlbums.album}</h2>
        <p>Artist: {props.selectedAlbums.artist}</p>
        <p>Genre: {props.selectedAlbums.genre}</p>
      </div>
    </div>
  );
};
