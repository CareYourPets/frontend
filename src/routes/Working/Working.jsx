import React from 'react';
import Drawer from 'components/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
  getCareTakerRole,
  createCareTakerType,
  deleteCareTakerType
} from 'utils/work.service';
import { useUser } from 'contexts/UserContext';
import { Button } from '@material-ui/core';
import { CARE_TAKER_FULL_TIMER, CARE_TAKER_PART_TIMER } from 'utils/roleUtil';
import WorkingDates from './WorkingDates';

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
  }
}));

const Working = () => {
  const classes = useStyles();
  const {
    user: { email }
  } = useUser();
  const [type, setType] = React.useState(null);

  const getEmployeeRoleWorkingDays = async () => {
    try {
      const data = await getCareTakerRole({ email });
      const { type } = data[0][0];
      setType(type);
    } catch {
      setType(type);
    }
  };

  React.useEffect(() => {
    getEmployeeRoleWorkingDays();
    // eslint-disable-next-line
  }, []);

  const createType = async type => {
    try {
      await createCareTakerType({ type });
      await getEmployeeRoleWorkingDays();
    } catch {
      setType(type);
    }
  };

  const deleteType = async type => {
    try {
      await deleteCareTakerType({ type });
      await getEmployeeRoleWorkingDays();
    } catch {
      setType(type);
    }
  };

  return (
    <Drawer>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container className={classes.spacer}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h7">
                Working (
                {type === CARE_TAKER_FULL_TIMER
                  ? 'Full Time'
                  : type === CARE_TAKER_PART_TIMER
                  ? 'Part Time'
                  : 'Unspecified'}
                )
              </Typography>
            </Grid>
          </Grid>
          {type === null || type === undefined ? (
            <div>
              <Grid container justify="center" className={classes.spacer}>
                <Typography component="h1" variant="h7">
                  Are you full time or part time?
                </Typography>
              </Grid>
              <Grid container className={classes.spacer}>
                <Grid item xs={6}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => createType(CARE_TAKER_FULL_TIMER)}
                  >
                    Full Time
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => createType(CARE_TAKER_PART_TIMER)}
                  >
                    Part Time
                  </Button>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div>
              <Grid container justify="flex-end" className={classes.spacer}>
                <Button
                  type="button"
                  variant="contained"
                  color="default"
                  onClick={() => deleteType(type)}
                >
                  Delete
                </Button>
              </Grid>
              <Grid container className={classes.spacer}>
                <Grid item xs={12}>
                  <WorkingDates type={type} />
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </Container>
    </Drawer>
  );
};

export default Working;
