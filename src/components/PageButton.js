import React, {useContext} from "react";
import { Context } from "../MovieContext";
import useScrollTop from "../hooks/useScrollTop"

export default function PageButton({item, next, back, setCurrentPage}) {
    const {searchText, setUrl} = useContext(Context)
    const [ref] = useScrollTop()

    function changePage() {
        setUrl({searchInput: searchText}, item.value)
        if (item.label === ">>") {
            next(item.value)    
        } else if (item.label === "<<") {
            back(item.value)
        } else {
            setCurrentPage(item.value)
        }
    }

    const btnStyle = item.active === true ? "page-button page-active" : item.value === 0 ? "page-button page-hide" : "page-button"

    return (
        <button ref={ref} className={btnStyle} key={item.value} onClick={changePage}>{item.label}</button>
    )
}