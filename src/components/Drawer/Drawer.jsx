import React from 'react';
import { getRole } from 'utils/auth.service';
import { PET_OWNER, CARE_TAKER } from 'utils/roleUtil';
import PetOwnerDrawer from './PetOwnerDrawer';
import CareTakerDrawer from './CareTakerDrawer';

const Drawer = ({ children }) => {
  const role = getRole();

  if (role === PET_OWNER) {
    return <PetOwnerDrawer>{children}</PetOwnerDrawer>;
  } else if (role === CARE_TAKER) {
    return <CareTakerDrawer>{children}</CareTakerDrawer>;
  } else {
    return <div />;
  }
};

export default Drawer;
