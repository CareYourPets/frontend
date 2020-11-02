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
import DescriptionIcon from '@material-ui/icons/Description';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Moment from 'react-moment';
import 'moment-timezone';
import { updateBid, deleteBid } from 'utils/bid.service';
import { useUser } from 'contexts/UserContext';
import moment from 'moment';
import { MOMENT_TIME_FORMAT } from 'constants/time';
import { PET_OWNER, CARE_TAKER } from 'utils/roleUtil';
import CheckIcon from '@material-ui/icons/Check';

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
  secondaryHeading: {}
}));

const BidInfo = ({
  amount,
  care_taker_email,
  end_date,
  is_accepted,
  payment_mode,
  pet_name,
  pet_owner_email,
  review,
  review_date,
  start_date,
  transaction_date,
  transportation_mode,
  fetchAllBids,
  rating
}) => {
  const classes = useStyles();
  const { user } = useUser();
  const transportationModes = [
    'PET_OWNER_DELIVER',
    'CARE_TAKER_PICK_UP',
    'TRANSFER_THROUGH_PCS'
  ];
  const paymentMode = ['CASH', 'CREDIT'];
  const [expanded, setExpanded] = React.useState(false);
  const [bidInfo, setBidInfo] = React.useState({
    amount,
    careTakerEmail: care_taker_email,
    endDate: end_date,
    isAccepted: is_accepted,
    paymentMode: payment_mode,
    petName: pet_name,
    petOwnerEmail: pet_owner_email,
    review,
    reviewDate: review_date,
    startDate: start_date,
    transactionDate: transaction_date,
    transportationMode: transportation_mode,
    rating: rating
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const saveBid = async () => {
    try {
      await updateBid({
        ...bidInfo,
        reviewDate:
          bidInfo.review === null
            ? null
            : moment(Date.now()).format(MOMENT_TIME_FORMAT)
      });
      await fetchAllBids();
      setIsEdit(false);
    } catch {
      setIsEdit(true);
    }
  };

  const editBid = () => {
    setIsEdit(true);
  };

  const cancelBid = async () => {
    try {
      await deleteBid({ ...bidInfo, petOwnerEmail: user.email });
      setIsEdit(false);
      await fetchAllBids();
    } catch {
      setIsEdit(true);
    }
  };

  const acceptBid = async () => {
    try {
      await updateBid({
        ...bidInfo,
        isAccepted: true,
        transactionDate: moment(Date.now()).format(MOMENT_TIME_FORMAT)
      });
      await fetchAllBids();
      setIsEdit(false);
    } catch {
      return;
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
            <Grid item xs={4}>
              <Typography component="p" variant="h6">
                <DescriptionIcon /> Pet: {bidInfo.petName}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Grid container justify="flex-end">
                <Typography component="p" variant="h6">
                  {bidInfo.isAccepted ? 'Accepted' : 'Pending'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Typography component="p" variant="h6">
                CareTaker: {bidInfo.careTakerEmail}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Grid container justify="flex-end">
                <Typography component="p" variant="h6">
                  Start Date:
                  <Moment format="YYYY/MM/DD">{bidInfo.startDate}</Moment> End
                  Date:
                  <Moment format="YYYY/MM/DD">{bidInfo.endDate}</Moment>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {user.role === PET_OWNER ? (
              bidInfo.isAccepted ? (
                <div />
              ) : (
                <Grid container justify="flex-end">
                  {isEdit === true ? (
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={saveBid}
                    >
                      <SaveIcon />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={editBid}
                    >
                      <EditIcon />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="contained"
                    color="default"
                    onClick={cancelBid}
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
              )
            ) : user.role === CARE_TAKER ? (
              <Grid container justify="flex-end">
                {bidInfo.isAccepted ? (
                  <div />
                ) : (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={acceptBid}
                  >
                    <CheckIcon />
                  </Button>
                )}
              </Grid>
            ) : (
              <div />
            )}

            <Grid container className={classes.spacer}>
              <Grid item xs={3}>
                <Typography component="p" variant="h6">
                  Transportation Mode
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEdit ? (
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Transportation Mode
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={bidInfo.transportationMode}
                      onChange={e =>
                        setBidInfo({
                          ...bidInfo,
                          transportationMode: e.target.value
                        })
                      }
                      label="Transportation Mode"
                    >
                      {transportationModes.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Typography component="p" variant="h6">
                    {bidInfo.transportationMode}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container className={classes.spacer}>
              <Grid item xs={3}>
                <Typography component="p" variant="h6">
                  Review
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEdit ? (
                  <TextField
                    id="outlined-basic"
                    label="Review"
                    variant="outlined"
                    defaultValue={bidInfo.review}
                    fullWidth
                    onChange={e =>
                      setBidInfo({ ...bidInfo, review: e.target.value })
                    }
                  />
                ) : (
                  <Typography component="p" variant="h6">
                    {bidInfo.review}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container className={classes.spacer}>
              <Grid item xs={3}>
                <Typography component="p" variant="h6">
                  Rating
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
                      Rating
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={bidInfo.rating}
                      onChange={e =>
                        setBidInfo({ ...bidInfo, rating: e.target.value })
                      }
                      label="Payment Mode"
                    >
                      {[0, 1, 2, 3, 4, 5].map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Typography component="p" variant="h6">
                    {bidInfo.rating}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container className={classes.spacer}>
              <Grid item xs={3}>
                <Typography component="p" variant="h6">
                  Payment Mode
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
                      Payment Mode
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={bidInfo.paymentMode}
                      onChange={e =>
                        setBidInfo({ ...bidInfo, paymentMode: e.target.value })
                      }
                      label="Payment Mode"
                    >
                      {paymentMode.map(item => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Typography component="p" variant="h6">
                    {bidInfo.paymentMode}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container className={classes.spacer}>
              <Grid item xs={3}>
                <Typography component="p" variant="h6">
                  Amount
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEdit ? (
                  <TextField
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    defaultValue={bidInfo.amount}
                    fullWidth
                    onChange={e =>
                      setBidInfo({ ...bidInfo, amount: e.target.value })
                    }
                  />
                ) : (
                  <Typography component="p" variant="h6">
                    {bidInfo.amount}
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

export default BidInfo;
