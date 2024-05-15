import "./TeamWallPopup.css"

import React from "react";


export function TWPopup(props) {

    return (props.trigger) ? (
        <div>
            <div className="popup">
                <div className="popup-inner">
                    {props.children}
                </div>
            </div>
        </div>
    ) : ""
}