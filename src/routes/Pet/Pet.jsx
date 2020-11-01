import React from 'react';
import Drawer from 'components/Drawer';
import { fetchPets } from 'utils/pet.service';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { fetchPetCategories } from 'utils/profile.service';
import { createPetInfo } from 'utils/pet.service';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import PetProfile from './PetProfile';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },
  spacer: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  model: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    outline: 'None'
  }
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const Pets = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [pets, setPets] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [newPet, setNewPet] = React.useState({
    category: '',
    name: '',
    diet: '',
    needs: ''
  });

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addPets = async () => {
    try {
      await createPetInfo(newPet);
      setNewPet({
        category: '',
        name: '',
        diet: '',
        needs: ''
      });
      setOpen(false);
      await fetchPetOwnerPets();
    } catch {
      setOpen(true);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.model}>
      <Typography component="h1" variant="h5">
        Add Your Pet
      </Typography>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Typography component="p" variant="h6">
            Name
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            defaultValue={newPet.name}
            fullWidth
            onChange={e => setNewPet({ ...newPet, name: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Typography component="p" variant="h6">
            Pet Category
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={newPet.category}
              onChange={e => setNewPet({ ...newPet, category: e.target.value })}
              label="Category"
            >
              {categories.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Typography component="p" variant="h6">
            Diet
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Diet"
            variant="outlined"
            defaultValue={newPet.diet}
            fullWidth
            onChange={e => setNewPet({ ...newPet, diet: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Typography component="p" variant="h6">
            Needs
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Needs"
            variant="outlined"
            defaultValue={newPet.needs}
            fullWidth
            onChange={e => setNewPet({ ...newPet, needs: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container justify="flex-end" className={classes.spacer}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={addPets}
        >
          Create
        </Button>
      </Grid>
    </div>
  );

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
            <Grid item xs={9}>
              <Grid container justify="flex-end">
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Add
                </Button>
              </Grid>
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Container>
    </Drawer>
  );
};

export default Pets;
