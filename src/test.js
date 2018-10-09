
const initialSate={
    searchResult=[]

    

}


newResult=action.result;
let resultObject={}
for (let i = 0; i < array.length; i++) {
   resultObject={album:newResult[i].title,artist:newResult[i].artist.name}
    
}


[
    {
      album: stateGenre[i].album,
      artist: stateGenre[i].artist,
      id: stateGenre[i].id,
      cover: state.covers[stateGenre[i].id]
    }
  ];

/*{ album: "4 Your Eyez Only", artist: "J Cole", genre: "Rap" },
{ album: "YSIV", artist: "Logic", genre: "hip-hop rap" },
{ album: "blond", artist: "Frank Ocean", genre: "RnB" },
{ album: "Chance 4", artist: "Chance the rapper", genre: "Soul" },
{ album: "Swimming", artist: "Mac Miller", genre: "Rap" },
{ album: "2014 Forest Hills Drive", artist: "J Cole", genre: "Rap" },
{ album: "Baby Teeth", artist: "Dizzy", genre: "Indie" },
{ album: "Change", artist: "Ella Mai", genre: "RnB" },
{ album: "DDD- Single", artist: "Ama Lou", genre: "Soul" }*/









for (let i = 0; i < newResult.length; i++) {
    resultObject = {
      album: newResult[i].title,
      artist: newResult[i]["artist-credit"][0]["artist"].name,
      artistID: newResult[i].id,
      cover: ""
    };

    resultOfsearch.push(resultObject);
    axios
      .get(musicbrainzrecentCover + resultOfsearch[i].artistID)
      .then(res => {
        let foundThesearch = res.data.images[0].image;

        searchCover = { [resultOfsearch[i].artistID]: foundThesearch };
        console.log(searchCover);
      });
    resultOfsearch = [
      {
        ...resultOfsearch,
        cover: searchCover[i]
      }
    ];