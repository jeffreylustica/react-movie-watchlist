import React, {useContext} from "react";
import Header from "../components/Header";
import {Link} from "react-router-dom"
import Message from "../components/Message";
import Movie from "../components/Movie";
import { Context } from "../MovieContext";

export default function Watchlist() {
    const {watchlists} = useContext(Context)

    const watchlistElement = watchlists.map(movieData => {
        return (
            <Movie key={movieData.imdbID} movieData={movieData} page="watchlistPage"/>
        )
    })

    return (
        <div>
            <Header 
                textMain={"My Watchlist"}
                linkSecondary= {"/"}
                textSecondary={"Search for movies"}
            />
            <div className="movies-placeholder">
                {watchlists.length > 0 ? watchlistElement :
                    <Message>
                        <h3 className="message message-empty">Your watchlist is looking a little empty...</h3>
                        <Link to="/" className="link link-message">
                            <i className="fa-solid fa-circle-plus icon-add"></i>
                            <p className="message-add">Let’s add some movies!</p>
                        </Link>
                    </Message>
                }
            </div>
        </div>
    )
}