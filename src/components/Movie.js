import React, {useContext} from "react";
import { Context } from "../MovieContext";

export default function Movie(props) {
    const {watchlists, addToWatchlist, removeFromWatchlist} = useContext(Context)
    const {imdbID, Poster, Title, imdbRating, Runtime, Genre, Plot} = props.movieData
    const page = props.page

    function watchlistIcon() {
        const isItemInWatchlist = watchlists.some(item => {
            return item.imdbID === imdbID
        })
        return isItemInWatchlist ? "fa-solid fa-check" : "fa-solid fa-circle-plus"
    }

    function displayButton() {
        if (page === "mainPage") {
            return (
                <button className="watchlist-btn" onClick={() => addToWatchlist(props.movieData)}>
                    <i className={`${watchlistIcon()} icon-add-watchlist`}></i>
                    Watchlist
                </button>
            )
        } else {
            return (
                <button className="watchlist-btn" onClick={() => removeFromWatchlist(props.movieData)}>
                    <i className="fa-solid fa-circle-minus icon-remove-watchlist"></i>
                    Remove
                </button>
            )
        }
    }

    return (
        <div className="movie-container container">
            <img src={Poster} className="poster" alt=""/>
            <div className="title-placeholder">
                <h3 className="title">{Title}</h3>
                <i className="fa-solid fa-star icon-star"></i>
                <span className="rating">{imdbRating}</span>
            </div>
            <div className="info">
                <span className="duration">{Runtime}</span>
                <p className="genre">{Genre}</p>
                {displayButton()}
            </div>
            <p className="synopsis">
               {Plot}
            </p>
        </div>
    )
}