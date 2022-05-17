import { useState } from 'react';
import { css } from '@emotion/react';
import GridLoader from 'react-spinners/GridLoader';

const Loader = ({ loading }) => {
  let [color, setColor] = useState('#417d7a');
  return <GridLoader color={color} loading={loading} size={150} />;
};
export default Loader;
