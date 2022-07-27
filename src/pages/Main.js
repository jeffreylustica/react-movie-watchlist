import React, {useContext} from "react";
import Header from "../components/Header";
import Movie from "../components/Movie";
import Message from "../components/Message";
import Search from "../components/Search";
import { Context } from "../MovieContext";
import Pagination from "../components/Pagination"

export default function Movies() {
    const {allMovies, hasValidReturn, api, isLoading} = useContext(Context)
    const moviesDisplay = allMovies.map(movieData => {
        return (
            <Movie key={movieData.imdbID} movieData={movieData} page="mainPage"/>
            )
        })

    function displayToMain() {
        if (isLoading) {
            return  <Message>
                <h3 className="message">Loading...</h3>
            </Message>
        }else if(hasValidReturn) {
            return moviesDisplay
        } else if(!hasValidReturn && api !== "") {
            return  <Message>
                <h3 className="message message-error">Unable to find what you’re looking for. Please try another search.</h3>
            </Message>           
        } else {
            return <Message>
                <i className="fa-solid fa-film icon-film"></i>
                <h3 className="message message-intro">Start exploring</h3>
            </Message>
        }
    }

    return (
        <div className="main-page">
            <Header 
                textMain={"Find your film"}
                linkSecondary= {"/watchlist"}
                textSecondary={"My watchlist"}
            />
            <Search />
            <div className="movies-placeholder">
                {displayToMain()}
            </div>
            {hasValidReturn && <Pagination />}
        </div>
    )
}