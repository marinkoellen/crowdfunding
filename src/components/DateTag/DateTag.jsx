import React from "react";



function formatDate(string) {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(string).toLocaleDateString([], options);
}


function DateTag(props) {
  let display_toggle;
  let closed;

  const { diffInDays } = props;

  if (diffInDays < 10) {
    display_toggle = "inline";
  } else {
    display_toggle = "none";
  }

  if (diffInDays < 1) {
    closed = true;
  } else {
    closed = false;
  }


  return (
    <div>
      {!closed && (<div style={{ display: display_toggle }} className="date-tag">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Closing Soon! &nbsp; {diffInDays} days to go!
      </div>)}

      {closed && (<div style={{ display: display_toggle }} className="date-tag">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Project past closure date!
      </div>)}

    </div>
  );
}

export default DateTag;
