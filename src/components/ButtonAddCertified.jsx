import React from 'react'
import { Link } from 'react-router-dom';

function ButtonAddCertified() {
  return (
    <div>
      <Link
        to={{ pathname: `/certified/register`,}}
      >
      <button className="button App--Certified-Footer">
          +
      </button>
      </Link>
    </div>
  )
}

export default ButtonAddCertified
