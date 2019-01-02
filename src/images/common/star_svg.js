import React from "react"

const StarIcon = (props) => {
  const {className} = props
  return (
      <svg className={className} viewBox="0 0 169 171">
        <path
            d="M140 166c-9,7 -35,-17 -53,-25 -17,10 -41,36 -51,29 -10,-7 4,-40 6,-61 -14,-14 -45,-30 -42,-42 3,-11 38,-8 57,-13 8,-18 13,-53 25,-54 13,-1 20,35 30,52 19,3 53,-3 57,9 3,11 -26,30 -39,45 4,20 19,52 10,60z"/>
      </svg>
  )
}
export default StarIcon