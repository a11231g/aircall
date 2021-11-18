import React from "react";
import CallDetails from "../components/details/index.jsx";


const Details = (props) => {
    return <CallDetails match={props.match} history={props.history} />
}

export default Details