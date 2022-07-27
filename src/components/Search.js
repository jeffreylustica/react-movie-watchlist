import React, {useState, useContext} from "react";
import { Context } from "../MovieContext";

export default function Search() {
    const [formData, setFormData] = useState({searchInput: ""})
    const {setUrl} = useContext(Context)

    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    function submitSearchInput(e) {
        e.preventDefault()
        const defaultPageNumber = 1
        setUrl(formData, defaultPageNumber)
    }

    return (
        <div className="search-bar">
            <form className="search-form container">
                <i className="fa-solid fa-magnifying-glass icon-search"></i>
                <input 
                    type="text"                    
                    className="input-search" 
                    placeholder="Search movie"
                    name="searchInput"
                    onChange={handleChange}
                    value={formData.searchInput}
                />
                <button type="submit" className="btn-search" onClick={submitSearchInput}>Search</button>
            </form>
        </div>
    )
}

