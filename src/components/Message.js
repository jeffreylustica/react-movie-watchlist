import React from "react";

export default function Message({children}) {
    return (
        <div className="display-message container">
            {children}
        </div>
    )
}