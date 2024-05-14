import React from "react";
import './CalendarPopup.css'

export function CalPopup(props) {

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