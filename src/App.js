import React from "react";

import "./App.css";

export const App = props => {
  const getgenervalue = args => {
    props.Getgenre(args);
    document.getElementById("search_change").innerHTML = "Genre:";
  };
  const get_album = args => props.Getalbum_from_Ablum(args);
  const Get_album_fromGenre = args => props.Getalbum_fromGenre(args);
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
              <div
                key={index}
                onClick={() => getgenervalue(genres)}
                value={index}
              >
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
              <div className="albums" onClick={() => get_album(album.artist)}>
                <img className="albumcover" src={album.coverArt} />
                <br />
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
              <div
                className="albums"
                onClick={() => Get_album_fromGenre(selected.album)}
              >
                <img className="albumcover" src={selected.cover} />
                {selected.album}
                <br />
                {selected.artist}
              </div>
            );
          })}
        </div>
      </div>

      <div className="selected_G">
        <h2>Ablum: {props.newSelectedAlbums.album}</h2>
        <p>Artist: {props.newSelectedAlbums.artist}</p>
        <p>Genre: {props.newSelectedAlbums.genre}</p>
        <img className="albumcover" src={props.newSelectedAlbums.cover} />
      </div>
    </div>
  );
};
