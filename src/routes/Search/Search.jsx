import React from 'react';
import Drawer from 'components/Drawer';
import { fetchCareTakers } from 'utils/bid.service';
import { fetchPets } from 'utils/pet.service';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CareTakerProfile from './CareTakerProfile';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  spacer: {
    marginTop: theme.spacing(2)
  }
}));

const Search = () => {
  const classes = useStyles();
  const [slide, setSlide] = React.useState(0);
  const [isByLocation, setIsByLocation] = React.useState(false);
  const [careTakers, setCareTakers] = React.useState([]);
  const [pets, setPets] = React.useState([]);

  const searchCareTakers = async () => {
    try {
      const data = await fetchCareTakers({ isByLocation });
      setCareTakers(data);
    } catch {
      setCareTakers(careTakers);
    }
  };

  const fetchPetOwnerPets = async () => {
    try {
      const data = await fetchPets();
      const names = [];
      data.forEach((item, _) => {
        names.push({ name: item.name, category: item.category });
        return;
      });
      setPets(names);
    } catch {
      setPets(pets);
    }
  };

  React.useEffect(() => {
    searchCareTakers();
    // eslint-disable-next-line
  }, [isByLocation]);

  React.useEffect(() => {
    fetchPetOwnerPets();
    // eslint-disable-next-line
  }, []);

  return (
    <Drawer>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container justify="center" className={classes.spacer}>
            <Typography component="h1" variant="h7">
              Swipe To Find Your CareTaker <TouchAppIcon />
            </Typography>
          </Grid>
          <Grid container justify="center" className={classes.spacer}>
            <Typography component="h1" variant="h6">
              {careTakers.length} Results
            </Typography>
          </Grid>
          <Grid container justify="center" className={classes.spacer}>
            <Typography component="h1" variant="h6">
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isByLocation}
                        onChange={() => setIsByLocation(!isByLocation)}
                        name="isByLocation"
                      />
                    }
                    label="Check for care takers near you"
                  />
                </FormGroup>
              </FormControl>
            </Typography>
          </Grid>
          <CareTakerProfile {...careTakers[slide]} pets={pets} />
          <Grid container>
            <Grid item xs={6}>
              <Button
                type="button"
                variant="contained"
                color="default"
                fullWidth
                onClick={() => setSlide(slide === 0 ? 0 : slide - 1)}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={() =>
                  setSlide(slide === careTakers.length - 1 ? slide : slide + 1)
                }
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Drawer>
  );
};

export default Search;
