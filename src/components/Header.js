import React from "react";
import {Link} from "react-router-dom"

export default function Header({textMain, linkSecondary, textSecondary}) {
    return (
        <div className="header">
            <div className="container container-header">
                <h1 className="link-main">{textMain}</h1>
                <Link to={linkSecondary} className="link link-second">
                    <span className="link-secondary">{textSecondary}</span>
                </Link>
            </div>
        </div>
    )
}