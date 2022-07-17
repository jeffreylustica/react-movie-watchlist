import React from "react";
import Main from "./pages/Main"
import Watchlist from "./pages/Watchlist";
import {Routes, Route} from "react-router-dom"

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
        </div>
    )
}