import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { fetchPetCategories } from 'utils/profile.service';
import {
  createPetCategories,
  deletePetCategories,
  updatePetCategories
} from 'utils/pet.service';
import InputAdornment from '@material-ui/core/InputAdornment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Drawer from 'components/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

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

const Category = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState({
    category: '',
    basePrice: 0
  });

  const [categories, setCategories] = React.useState([]);

  const editCategory = category => {
    setCategories({
      ...categories,
      [category]: { ...categories[category], isEdit: true }
    });
  };

  const saveCategory = async category => {
    try {
      await updatePetCategories({
        category: categories[category].category,
        currentCategory: category,
        basePrice: categories[category].base_price
      });
      setCategories({
        ...categories,
        [category]: { ...categories[category], isEdit: false }
      });
      await fetchCategories();
    } catch {
      setCategories(categories);
    }
  };

  const changeCategoryPrice = (category, base_price) => {
    setCategories({
      ...categories,
      [category]: { ...categories[category], base_price }
    });
  };

  const changeCategoryName = (category, categoryName) => {
    setCategories({
      ...categories,
      [category]: { ...categories[category], category: categoryName }
    });
  };

  const deleteCategory = async category => {
    try {
      await deletePetCategories({ category });
      await fetchCategories();
    } catch {
      setCategories(categories);
    }
  };

  const addCategory = async () => {
    try {
      await createPetCategories(newCategory);
      setOpen(false);
      setNewCategory({ category: '', basePrice: 0 });
      await fetchCategories();
    } catch {
      setOpen(true);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await fetchPetCategories();
      const reducedData = data.reduce((prev, item) => {
        const isEdit = false;
        return { ...prev, [item.category]: { ...item, isEdit } };
      }, {});
      setCategories(reducedData);
    } catch {
      setCategories(categories);
    }
  };

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
        Add New Category
      </Typography>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Typography component="p" variant="h6">
            Pet Category
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Pet Category"
            variant="outlined"
            fullWidth
            value={newCategory.category}
            onChange={e =>
              setNewCategory({ ...newCategory, category: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Typography component="p" variant="h6">
            Base Rate
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="outlined-basic"
            label="Base Price"
            variant="outlined"
            defaultValue={newCategory.basePrice}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
            onChange={e =>
              setNewCategory({ ...newCategory, basePrice: e.target.value })
            }
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
    <Drawer>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container className={classes.spacer}>
            <Grid container className={classes.spacer}>
              <Grid item xs={3}>
                <Typography component="h1" variant="h7">
                  Basic Rate
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
            {Object.keys(categories).map(category => (
              <Grid container className={classes.spacer} key={category}>
                <Grid item xs={3}>
                  {categories[category].isEdit === true ? (
                    <TextField
                      id="outlined-basic"
                      label="Price"
                      variant="outlined"
                      defaultValue={categories[category].category}
                      fullWidth
                      onChange={e =>
                        changeCategoryName(category, e.target.value)
                      }
                    />
                  ) : (
                    <Typography component="p" variant="h6">
                      {categories[category].category}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={7}>
                  {categories[category].isEdit === true ? (
                    <TextField
                      id="outlined-basic"
                      label="Price"
                      variant="outlined"
                      defaultValue={categories[category].base_price}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        )
                      }}
                      onChange={e =>
                        changeCategoryPrice(category, e.target.value)
                      }
                    />
                  ) : (
                    <Typography component="p" variant="h6">
                      ${parseFloat(categories[category].base_price).toFixed(2)}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={2}>
                  {categories[category].isEdit === true ? (
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={() => saveCategory(category)}
                    >
                      <SaveIcon />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={() => editCategory(category)}
                    >
                      <EditIcon />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="contained"
                    color="default"
                    onClick={() => deleteCategory(category)}
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </Drawer>
  );
};

export default Category;
