import React from 'react';
import { PET_OWNER, CARE_TAKER } from 'utils/roleUtil';
import { useUser } from 'contexts/UserContext';
import PetOwnerDrawer from './PetOwnerDrawer';
import CareTakerDrawer from './CareTakerDrawer';

const Drawer = ({ children }) => {
  const {
    user: { role }
  } = useUser();
  if (role === PET_OWNER) {
    return <PetOwnerDrawer>{children}</PetOwnerDrawer>;
  } else if (role === CARE_TAKER) {
    return <CareTakerDrawer>{children}</CareTakerDrawer>;
  } else {
    return <div />;
  }
};

export default Drawer;
