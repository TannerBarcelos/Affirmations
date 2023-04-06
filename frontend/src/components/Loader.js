import React, { useState } from 'react'
import GridLoader from 'react-spinners/GridLoader'

const Loader = ( { loading } ) => {
  let [color] = useState( '#417d7a' )
  return <GridLoader color={color} loading={loading} size={150} />
}
export default Loader
