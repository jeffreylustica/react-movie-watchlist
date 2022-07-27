import React, {useState, useEffect} from "react"
const Context = React.createContext()

function ContextProvider({children}) {
    const [searchText, setSearchText] = useState("")
    const [movieIds, setMovieIds] = useState([])
    const [allMovies, setAllMovies] = useState([])
    const [api, setApi] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [hasValidReturn, setHasValidReturn] = useState(false)
    const [watchlists, setWatchlists] = useState(
        () => JSON.parse(localStorage.getItem("movieWatchlists")) || []
    )

    function setUrl({searchInput}, pageNumber) {
        if (searchInput !== "") {
            setSearchText(searchInput)
            const url = `http://www.omdbapi.com/?apikey=6c3bc615&s=${searchInput}&page=${pageNumber}`
            setApi(url) 
        }
    }

    useEffect(() => {
        if (api !== "") {
            setIsLoading(true)
            async function fetchMovieIds() {
                const res = await fetch(api)
                const data = await res.json()
                if (data.Response === "False") {
                    setHasValidReturn(false)
                    setIsLoading(false)
                } else {
                    setHasValidReturn(true)
                    const allMovieIds = data.Search.map(movieId => movieId.imdbID)
                    setMovieIds(allMovieIds)
                }
            }
            fetchMovieIds()
        }
    }, [api])

    useEffect(() => {
        if (movieIds.length > 0) {
            async function awaitReturn() {
                const moviesArr = movieIds.map(movieId => {
                    async function fetchMovieData() {
                        const res = await fetch(`http://www.omdbapi.com/?apikey=6c3bc615&i=${movieId}`)
                        const data = await res.json()
                        return data
                    }
                    return fetchMovieData()
                })
                return moviesArr
            }
            (async () => {
                const values = await Promise.all(await awaitReturn())
                setAllMovies(values)
                setIsLoading(false)
            })()
        }
    }, [movieIds])

    function addToWatchlist(newMovie) {
        const isInclude = watchlists.some(item => {
            return item.imdbID === newMovie.imdbID
        })
        if (!isInclude) {
            setWatchlists(prevList => [...prevList, newMovie])
        }
    }

    function removeFromWatchlist(movie) {
        const newWatchlists = watchlists.filter(item => {
            return item.imdbID !== movie.imdbID
        })
        setWatchlists(newWatchlists)
    }

    useEffect(() => {
        localStorage.setItem("movieWatchlists", JSON.stringify(watchlists))
    }, [watchlists])

    return (
        <Context.Provider value={{
            searchText,
            setUrl, 
            allMovies, 
            hasValidReturn, 
            api, 
            isLoading, 
            watchlists,
            addToWatchlist,
            removeFromWatchlist,
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}