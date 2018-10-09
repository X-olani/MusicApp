import { Genre } from "./store";
import { getCover } from "./store";
const placeHolderImage =
  "https://www.scaleforce.net/theme/assets/img/img_placeholder.jpg";

export const getAlbumsWithCovers = state => {
  let albumsFromStore = state.albums;
  let newAlbums = [];

  for (let i = 0; i < albumsFromStore.length; i++) {
    const album = albumsFromStore[i];
    let imageUrl = state.covers[album.id];

    if (imageUrl === undefined) {
      imageUrl = placeHolderImage;
    }

    const newAlbum = {
      album: album.album,
      artist: album.artist,
      id: album.id,
      genre: album.genre,
      coverArt: imageUrl
    };
    newAlbums.push(newAlbum);
  }

  return newAlbums;
};
