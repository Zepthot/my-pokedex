// import libraries
import React from "react";
// import components

// import assets
import Duskskull from "../../assets/images/Duskskull.gif";
// import css
import "../../assets/styles/error.scss";
/*
Error component
*/

function Error() {
  return (
    <div className='contain'>
      <img src={Duskskull} alt='duskskull animated' />
      <p className='contain__text'>
        <span aria-hidden='true'>Error Missing No</span>Error Missing No
        <span aria-hidden='true'>Error Missing No</span>
      </p>
    </div>
  );
}
// Export to call it up
export default Error;
