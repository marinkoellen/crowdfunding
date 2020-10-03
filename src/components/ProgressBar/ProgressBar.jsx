import React from "react";

const ProgressBar = (props) => {
  const {completed } = props;
  var backCol;

  if (completed > 100){
    backCol = "#d1dcff"
  } else {
    backCol = "#ffd1dc"
  }

  

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    maxWidth: '100%',
    backgroundColor: backCol,
    borderRadius: 'inherit',
    textAlign: 'right'
  }


  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={ containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;