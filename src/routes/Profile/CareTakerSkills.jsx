import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import {
  fetchCareTakerSkills,
  updateCareTakerSkills,
  fetchPetCategories,
  createPetCategories,
  deletePetCategories
} from 'utils/profile.service';
import InputAdornment from '@material-ui/core/InputAdornment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Modal from '@material-ui/core/Modal';

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

const CareTakerSkill = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [newSkill, setNewSkill] = React.useState({ category: '', price: 0 });

  const [categories, setCategories] = React.useState([]);
  const [skills, setSkills] = React.useState({});

  const fetchSkills = async () => {
    try {
      const data = await fetchCareTakerSkills();
      const reducedData = data.reduce((prev, skill) => {
        const isEdit = false;
        return { ...prev, [skill.category]: { ...skill, isEdit } };
      }, {});
      setSkills(reducedData);
    } catch {
      setSkills(skills);
    }
  };

  const editPrice = skill => {
    setSkills({ ...skills, [skill]: { ...skills[skill], isEdit: true } });
  };

  const savePrice = async skill => {
    try {
      await updateCareTakerSkills(skills[skill]);
      setSkills({ ...skills, [skill]: { ...skills[skill], isEdit: false } });
      await fetchSkills();
    } catch {
      setSkills(skills);
    }
  };

  const changePrice = (skill, price) => {
    setSkills({ ...skills, [skill]: { ...skills[skill], price } });
  };

  const deleteCategory = async category => {
    try {
      await deletePetCategories({ category });
      await fetchSkills();
    } catch {
      setSkills(skills);
    }
  };

  const addCategory = async () => {
    try {
      await createPetCategories(newSkill);
      setOpen(false);
      setNewSkill({ category: '', price: 0 });
      await fetchSkills();
    } catch {
      setOpen(true);
    }
  };

  const fetchCategories = async () => {
    try {
      const rawCategories = await fetchPetCategories();
      const updatedCategories = [];
      rawCategories.forEach((item, _) => {
        updatedCategories.push(item.category);
        return;
      });
      setCategories(updatedCategories);
    } catch {
      setCategories(categories);
    }
  };

  React.useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.model}>
      <Typography component="h1" variant="h5">
        Add New Rate
      </Typography>
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
              value={newSkill.category}
              onChange={e =>
                setNewSkill({ ...newSkill, category: e.target.value })
              }
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
            Rate
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            defaultValue={newSkill.price}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
            onChange={e => setNewSkill({ ...newSkill, price: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container justify="flex-end" className={classes.spacer}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={addCategory}
        >
          Create
        </Button>
      </Grid>
    </div>
  );

  return (
    <div className={classes.paper}>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Typography component="h1" variant="h5">
            Rate (Per Day)
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      {Object.keys(skills).map(skill => (
        <Grid container className={classes.spacer} key={skill}>
          <Grid item xs={3}>
            <Typography component="p" variant="h6">
              {skill}
            </Typography>
          </Grid>
          <Grid item xs={7}>
            {skills[skill].isEdit === true ? (
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                defaultValue={skills[skill].price}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
                onChange={e => changePrice(skill, e.target.value)}
              />
            ) : (
              <Typography component="p" variant="h6">
                ${skills[skill].price}
              </Typography>
            )}
          </Grid>
          <Grid item xs={2}>
            {skills[skill].isEdit === true ? (
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() => savePrice(skill)}
              >
                <SaveIcon />
              </Button>
            ) : (
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => editPrice(skill)}
              >
                <EditIcon />
              </Button>
            )}
            <Button
              type="button"
              variant="contained"
              color="default"
              onClick={() => deleteCategory(skill)}
            >
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default CareTakerSkill;
