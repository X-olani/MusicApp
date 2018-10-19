import React from "react";

export const AlbumsList = ({ album, index, getAlbum, getCart }) => {
  return (
    <div className="DivCart">
      <div className="Albums" onClick={() => getAlbum(index)}>
        <img className="AlbumCover" src={album.coverArt} />
        <br />
        {album.album}
        <br />
        {album.artist}
        <br />
      </div>
      <button onClick={() => getCart(index)} className="CartButton">
        add to cart
        <img
          className="CartIcon"
          src={"https://static.thenounproject.com/png/1989110-200.png"}
        />
      </button>
    </div>
  );
};
