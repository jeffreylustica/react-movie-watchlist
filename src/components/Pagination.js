import React, {useState} from "react";
import { Context } from "../MovieContext";
import PageButton from "./PageButton";

export default function Pagination() {
    const [pagination, setPagination] = useState([
        {label: "<<", value: 0, active: false},
        {label: "1", value: 1, active: true},
        {label: "2", value: 2, active: false},
        {label: "3", value: 3, active: false},
        {label: "4", value: 4, active: false},
        {label: "5", value: 5, active: false},
        {label: ">>", value: 6, active: false}
    ])

    function nextSetOfPage(currentPage) {
        const newSetOfPage = pagination.map(item => {
            return {...item, 
                    label: item.label === "<<" || item.label === ">>" ? item.label : 
                    (parseInt(item.label) + 5).toString(), 
                    value: item.value + 5,
                    active: item.value + 5 === currentPage ? true : false
                }
        })
        setPagination(newSetOfPage)
    }

    function backSetOfPage(currentPage) {
        const newSetOfPage = pagination.map(item => {
            return {...item, 
                label: item.label === "<<" || item.label === ">>" ? item.label : 
                (parseInt(item.label) - 5).toString(), 
                value: item.value - 5,
                active: item.value - 5 === currentPage ? true : false
            }
        })
        setPagination(newSetOfPage)
    }

    function setCurrentPage(currentPage) {
        const newSetOfPage = pagination.map(item => {
            return {...item, active: item.value === currentPage ? true : false}
        })
        setPagination(newSetOfPage)
    }

    const pageButtons = pagination.map(item => {
        return (
            <PageButton 
                key={item.value} 
                item={item} 
                next={nextSetOfPage} 
                back={backSetOfPage}
                setCurrentPage={setCurrentPage}/>
        )
    })

    return (
        <div className="container pagination">
            {pageButtons}
        </div>
    )
}