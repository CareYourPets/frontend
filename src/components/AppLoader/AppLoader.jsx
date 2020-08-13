import React from 'react';
import { css } from '@emotion/core';
import BounceLoader from 'react-spinners/BounceLoader';

const override = css`
  display: flex;
  margin: 100px auto;
  border-color: red;
`;

const AppLoader = () => {
  return (
    <BounceLoader css={override} size={150} color={'#123abc'} loading={true} />
  );
};

export default AppLoader;
