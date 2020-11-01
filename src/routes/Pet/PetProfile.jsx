import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { updatePetInfo, deletePetInfo } from 'utils/pet.service';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2)
  },
  spacer: {
    marginTop: theme.spacing(2)
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const PetProfile = ({
  category,
  diet,
  name,
  needs,
  categories,
  fetchPetOwnerPets
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [petInfo, setPetInfo] = React.useState({
    category,
    diet,
    needs
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const savePet = async () => {
    try {
      await updatePetInfo({
        ...petInfo,
        currentName: name,
        name
      });
      await fetchPetOwnerPets();
      setIsEdit(false);
    } catch {
      setIsEdit(true);
    }
  };

  const editPet = () => {
    setIsEdit(true);
  };

  const deletePet = async () => {
    try {
      await deletePetInfo({ name });
      setIsEdit(false);
      await fetchPetOwnerPets();
    } catch {
      setIsEdit(true);
    }
  };

  return (
    <div className={classes.paper}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={3}>
              <Typography component="p" variant="h6">
                <PetsIcon /> {name}
              </Typography>
            </Grid>
            <Grid item xs={9}></Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid container justify="flex-end">
              {isEdit === true ? (
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={savePet}
                >
                  <SaveIcon />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={editPet}
                >
                  <EditIcon />
                </Button>
              )}
              <Button
                type="button"
                variant="contained"
                color="default"
                onClick={deletePet}
              >
                <DeleteIcon />
              </Button>
            </Grid>
            <Grid container className={classes.spacer}>
              <Grid item xs={3}>
                <Typography component="p" variant="h6">
                  Diet
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEdit ? (
                  <TextField
                    id="outlined-basic"
                    label="Diet"
                    variant="outlined"
                    defaultValue={petInfo.diet}
                    fullWidth
                    onChange={e =>
                      setPetInfo({ ...petInfo, diet: e.target.value })
                    }
                  />
                ) : (
                  <Typography component="p" variant="h6">
                    {petInfo.diet}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container className={classes.spacer}>
              <Grid item xs={3}>
                <Typography component="p" variant="h6">
                  Needs
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEdit ? (
                  <TextField
                    id="outlined-basic"
                    label="Needs"
                    variant="outlined"
                    defaultValue={petInfo.needs}
                    fullWidth
                    onChange={e =>
                      setPetInfo({ ...petInfo, needs: e.target.value })
                    }
                  />
                ) : (
                  <Typography component="p" variant="h6">
                    {petInfo.needs}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container className={classes.spacer}>
              <Grid item xs={3}>
                <Typography component="p" variant="h6">
                  Category
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEdit ? (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={petInfo.category}
                      onChange={e =>
                        setPetInfo({ ...petInfo, category: e.target.value })
                      }
                      label="Gender"
                    >
                      {categories.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Typography component="p" variant="h6">
                    {petInfo.category}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PetProfile;
