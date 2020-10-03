import React from "react";
import { Link } from "react-router-dom";

function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}


function DateTag(props) {
    let display_toggle;
    const {date } = props;
    var current_date = formatDate(new Date());
    const diffInMs   =  Math.abs(new Date(date) - new Date(current_date))
    const diffInDays = Math.round( diffInMs / (1000 * 60 * 60 * 24),2);
    
  if (diffInDays > 5 ){
    display_toggle = "inline";
  } else {
    display_toggle = "none";
  } 

 return (
     <div style={{display:display_toggle}} className="date-tag">
         Closing Soon!{diffInDays} days to go!
   </div>



 );
}

export default DateTag;
