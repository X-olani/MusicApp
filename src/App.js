import React, { Component } from "react";
import { FaArrowLeft, FaBars, FaCartPlus, FaArrowRight } from "react-icons/fa";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import { AlbumsList } from "./AlbumsList";
import { findDOMNode } from "react-dom";
import "./App.css";

import "./jquery.js";

export const App = props => {
  const ShowBIO = () => props.doTheBIO();
  document.onclick = evt => {
    document.getElementById("Cart").style.display = "none";
    document.getElementById("Slider").style.width = "0";
    document.getElementById("DisplayGenre").style.display = "none";
    document.getElementById("Cart").style.display = "none";
  };

  function openSlider() {
    document.getElementById("Slider").style.width = "250px";
    document.getElementById("DisplayGenre").style.display = "block";
    document.getElementById("Slider").style.display = "block";
  }
  function closeSlider() {
    document.getElementById("Slider").style.width = "0";
    document.getElementById("DisplayGenre").style.display = "none";
  }
  function openCart() {
    document.getElementById("Cart").style.display = "block";
  }
  function closeCartSlider() {
    document.getElementById("Cart").style.display = "none";
  }
  document.addEventListener("DOMContentLoaded", function(event) {
    //do work

    document.getElementById("DisplayGenre").style.display = "none";
    document.getElementById("Cart").style.display = "none";
  });
  const ClearingCart = () => props.doCartClear();
  const getGenreValue = args => {
    props.getGenre(args);
  };
  const reSet = () => {
    window.location.reload();
  };
  const openGenre = () => {};
  const getAlbum = index => props.getAlbumFromAlbums(index);
  const Get_album_fromGenre = args => props.getAlbumFromGenre(args);
  const getSearch = args => props.getSearch(args);
  const getSearchButton = () => {
    props.getSearchButtonResult();
  };
  const getCart = args => {
    props.getCartButton(args);
  };

  return (
    <div className="App">
      <nav id="ch">
        <h3 onClick={openSlider} className="MenuIcon">
          <FaBars />
        </h3>

        <h2 id="home" className="Header" onClick={reSet}>
          Home
        </h2>
        <div className="Search">
          <button onClick={getSearchButton}>Search </button>
          <input type="text" onChange={getSearch} />
          <h3 onClick={openCart} className="CartLength">
            <FaCartPlus />
            <p className="CountCart">{props.cartLength}</p>
          </h3>
        </div>
      </nav>
      <div id="Slider" className="Slider">
        <h3 onClick={closeSlider} className="CloseIcon">
          <FaArrowLeft />
        </h3>

        <div id="DisplayGenre" className="DisplayGenre">
          <div className="DisplayGenre1">
            {props.musicGenre.map((genres, index) => {
              return (
                <div
                  id="A"
                  key={index}
                  onClick={() => getGenreValue(genres)}
                  value={index}
                >
                  {genres}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="MainContent ">
        <div id="DisplayGenre1" className="DisplayAlbums">
          <div className="DisplayedAlbums">
            <h1>All the albums</h1>

            {props.albums.map((album, index) => {
              return (
                <AlbumsList
                  album={album}
                  index={index}
                  getCart={getCart}
                  getAlbum={getAlbum}
                />
              );
            })}
          </div>
        </div>
        <div className="selected_G">
          <h2>Album: {props.newSelectedAlbums.album}</h2>
          <p>Artist: {props.newSelectedAlbums.artist}</p>
          <p>Genre: {props.newSelectedAlbums.genre}</p>
          <section id="ImgFromSelected">
            <img className="AlbumCover" src={props.newSelectedAlbums.cover} />
          </section>
          <p id="BIOstyle" onClick={ShowBIO}>
            <p id="BIO">BIO:</p> {ReactHtmlParser(props.BIO)}
          </p>
        </div>
      </div>
      <div id="Cart" className="CART">
        <h3 onClick={closeCartSlider} className="CloseCart">
          <FaArrowRight />
        </h3>
        <h3 className="CartIcon1">
          <FaCartPlus />
        </h3>
        <h2 className="CartP">Cart Items:</h2>
        <section className="ItemsOfCart">
          {props.cart.map((carts, index) => {
            return (
              <p className="CartPTag">
                {"Album: " + carts.album + " By " + carts.artist}
              </p>
            );
          })}
        </section>
        <section onClick={ClearingCart} id="ClearButton">
          Clear
        </section>
      </div>
    </div>
  );
};
