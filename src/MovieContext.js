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

    const [pagination, setPagination] = useState([
        {label: "<<", value: 0, active: false},
        {label: "1", value: 1, active: true},
        {label: "2", value: 2, active: false},
        {label: "3", value: 3, active: false},
        {label: "4", value: 4, active: false},
        {label: "5", value: 5, active: false},
        {label: ">>", value: 6, active: false}
    ])

    function resetPagination() {
        const newSetOfPage = []
            for (let i = 0; i < 7; i++ ) {
                newSetOfPage.push({
                    label: i === 0 ? "<<" : i === 6 ? ">>" : `${i}`, 
                    value: i, 
                    active: i === 1 ? true : false
                })
            }
        setPagination(newSetOfPage)
    }

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
            pagination,
            setPagination,
            resetPagination
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}