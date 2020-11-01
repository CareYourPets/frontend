import React from 'react';
import Drawer from 'components/Drawer';
import { fetchPets } from 'utils/pet.service';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { fetchPetCategories } from 'utils/profile.service';
import PetProfile from './PetProfile';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(10)
  },
  spacer: {
    marginTop: theme.spacing(5)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Pets = () => {
  const classes = useStyles();
  const [pets, setPets] = React.useState({});
  const [categories, setCategories] = React.useState([]);

  const fetchPetOwnerPets = async () => {
    try {
      const data = await fetchPets();
      const reducedData = data.reduce((prev, pet) => {
        return { ...prev, [pet.name]: { ...pet } };
      }, {});
      setPets(reducedData);
    } catch {
      setPets(pets);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await fetchPetCategories();
      const petCategories = data.map(item => item.category);
      setCategories(petCategories);
    } catch {
      setCategories(categories);
    }
  };

  React.useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    fetchPetOwnerPets();
    // eslint-disable-next-line
  }, []);

  return (
    <Drawer>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container className={classes.spacer}>
            <Grid item xs={3}>
              <Typography component="h1" variant="h7">
                Your Pets
              </Typography>
            </Grid>
          </Grid>
          {Object.keys(pets).map((pet, i) => (
            <PetProfile
              fetchPetOwnerPets={fetchPetOwnerPets}
              categories={categories}
              {...pets[pet]}
              key={i}
            />
          ))}
        </div>
      </Container>
    </Drawer>
  );
};

export default Pets;
