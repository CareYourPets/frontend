import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DescriptionIcon from '@material-ui/icons/Description';
import { useUser } from 'contexts/UserContext';
import { PET_OWNER, CARE_TAKER } from 'utils/roleUtil';
import Container from '@material-ui/core/Container';
import Drawer from 'components/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BIDS,
  PROFILE,
  PETS,
  SEARCH,
  WORKING,
  CATEGORY
} from 'constants/routes';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RestoreIcon from '@material-ui/icons/Restore';
import SearchIcon from '@material-ui/icons/Search';
import PetsIcon from '@material-ui/icons/Pets';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2)
  },
  spacer: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {},
  card: {
    margin: theme.spacing(2),
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: '5px',
    minHeight: '300px'
  },
  clickable: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  }
}));

const DashboardCard = ({ text, icon, to }) => {
  const classes = useStyles();
  return (
    <Grid item md={5} xs={12} className={classes.card}>
      <Link
        to={to}
        style={{ textDecoration: 'none' }}
        className={classes.clickable}
      >
        {icon}
        <Typography component="h1" variant="h5">
          {text}
        </Typography>
      </Link>
    </Grid>
  );
};

const Dashboard = () => {
  const classes = useStyles();
  const {
    user: { role }
  } = useUser();
  const CareTakerDrawerItems = [
    {
      icon: <DescriptionIcon />,
      text: 'Bid',
      to: BIDS
    },
    {
      icon: <AccountCircleIcon />,
      text: 'Profile',
      to: PROFILE
    },
    {
      icon: <RestoreIcon />,
      text: 'Working',
      to: WORKING
    }
  ];
  const PetOwnerDrawerItems = [
    {
      icon: <SearchIcon />,
      text: 'Search',
      to: SEARCH
    },
    {
      icon: <DescriptionIcon />,
      text: 'Bid',
      to: BIDS
    },
    {
      icon: <AccountCircleIcon />,
      text: 'Profile',
      to: PROFILE
    },
    {
      icon: <PetsIcon />,
      text: 'Pets',
      to: PETS
    }
  ];
  const AdministratorDrawerItems = [
    {
      icon: <AccountCircleIcon />,
      text: 'Profile',
      to: PROFILE
    },
    {
      icon: <PetsIcon />,
      text: 'Pet Categories',
      to: CATEGORY
    }
  ];

  return (
    <Drawer>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container className={classes.spacer}>
            {role === PET_OWNER
              ? PetOwnerDrawerItems.map((item, i) => (
                  <DashboardCard key={i} {...item} />
                ))
              : role === CARE_TAKER
              ? CareTakerDrawerItems.map((item, i) => (
                  <DashboardCard key={i} {...item} />
                ))
              : AdministratorDrawerItems.map((item, i) => (
                  <DashboardCard key={i} {...item} />
                ))}
          </Grid>
        </div>
      </Container>
    </Drawer>
  );
};

export default Dashboard;
