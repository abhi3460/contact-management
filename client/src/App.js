import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useFormik } from "formik";

import {
  addContact,
  deteteContactById,
  fetchAllContacts,
  findContactById,
  updateContactById,
} from "./api/contact.service";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "30px",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addIcon: {
    color: "white",
    marginRight: "5px",
  },
  w85: {
    width: "85%",
  },
  w100: {
    width: "100%",
  },
  icon: {
    cursor: "pointer",
  },
}));

function App() {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchAllContacts("")
      .then((data) => {
        setContacts(data.contacts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchContactByEmail = (searchValue) => {
    if (searchValue !== "") {
      fetchAllContacts(searchValue)
        .then((data) => {
          setContacts(data.contacts);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length > 15) {
      errors.username = "Must be 15 characters or less";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length > 15) {
      errors.password = "Must be 15 characters or less";
    }

    if (!values.confPass) {
      errors.confPass = "Required";
    } else if (values.password !== values.confPass) {
      errors.confPass = "Must match password";
    }

    if (!values.phone) {
      errors.phone = "Required";
    } else if (values.phone.length > 15) {
      errors.phone = "Must be 15 characters or less";
    }

    if (!values.address) {
      errors.address = "Required";
    } else if (values.address.length > 100) {
      errors.address = "Must be 100 characters or less";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confPass: "",
      phone: "",
      address: "",
    },
    validate: validate,
    onSubmit: (values) => {
      addContact(values)
        .then((data) => {
          console.log(data);
          // Check for array
          if (Array.isArray(data.contacts)) {
            setContacts(data.contacts);
          } else {
            setContacts([data.contacts]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setOpen(false);
    },
  });

  const addToFav = (data) => {
    data.isFav = true;
    updateContactById(data)
      .then((data) => {
        // Check for array
        if (Array.isArray(data.contacts)) {
          setContacts(data.contacts);
        } else {
          setContacts([data.contacts]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFromFav = (data) => {
    data.isFav = false;
    updateContactById(data)
      .then((data2) => {
        // Check for array
        if (Array.isArray(data2.contacts)) {
          setContacts(data2.contacts);
        } else {
          setContacts([data2.contacts]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>Contact Management</h1>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              <AddCircleIcon className={classes.addIcon} /> New Contact
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add New Contact</DialogTitle>
              <DialogContent>
                <form
                  onSubmit={formik.handleSubmit}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="text"
                        id="first-name"
                        name="firstName"
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        label="First Name"
                        variant="outlined"
                        className={classes.w100}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="text"
                        id="last-name"
                        name="lastName"
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                        }
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        label="Last Name"
                        variant="outlined"
                        className={classes.w100}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="email"
                        id="email"
                        name="email"
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        label="Email Address"
                        variant="outlined"
                        className={classes.w100}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="text"
                        id="username"
                        name="username"
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username && formik.errors.username
                        }
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        label="Username"
                        variant="outlined"
                        className={classes.w100}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="password"
                        id="password"
                        name="password"
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        label="Password"
                        variant="outlined"
                        className={classes.w100}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="password"
                        id="confirm-pass"
                        name="confPass"
                        error={
                          formik.touched.confPass &&
                          Boolean(formik.errors.confPass)
                        }
                        helperText={
                          formik.touched.confPass && formik.errors.confPass
                        }
                        onChange={formik.handleChange}
                        value={formik.values.confPass}
                        label="Confirm Password"
                        variant="outlined"
                        className={classes.w100}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="number"
                        id="phone"
                        name="phone"
                        error={
                          formik.touched.phone && Boolean(formik.errors.phone)
                        }
                        helperText={formik.touched.phone && formik.errors.phone}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        label="Phone Number"
                        variant="outlined"
                        className={classes.w100}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="text"
                        id="address"
                        name="address"
                        error={
                          formik.touched.address &&
                          Boolean(formik.errors.address)
                        }
                        helperText={
                          formik.touched.address && formik.errors.address
                        }
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        label="Address"
                        multiline
                        variant="outlined"
                        className={classes.w100}
                      />
                    </Grid>
                  </Grid>

                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} style={{ flexDirection: "column" }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item className={classes.w85}>
                <TextField
                  id="outlined-basic"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  label="Search By Email ID"
                  variant="outlined"
                  className={classes.w100}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={searchContactByEmail(searchText)}
                >
                  <SearchIcon />
                </Button>
              </Grid>
            </Grid>
            <div className={classes.w100}>
              <Paper className={classes.paper} style={{ marginTop: "20px" }}>
                <List className={classes.w100}>
                  {contacts.length === 0 && (
                    <h3 style={{ textAlign: "center" }}>No Contacts Found!</h3>
                  )}
                  {contacts.length !== 0 &&
                    contacts.map((value, index) => {
                      const labelId = `checkbox-list-secondary-label-${index}`;
                      return (
                        <ListItem key={index}>
                          <ListItemText
                            id={labelId}
                            primary={value.firstName + "" + value.lastName}
                          />
                          <ListItemSecondaryAction>
                            {!value.isFav && (
                              <StarBorderIcon
                                className={classes.icon}
                                onClick={(e) => addToFav(value)}
                              />
                            )}
                            {value.isFav && (
                              <StarIcon
                                className={classes.icon}
                                style={{ color: "#FDCC0D" }}
                                onClick={(e) => removeFromFav(value)}
                              />
                            )}
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                </List>
              </Paper>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <List className={classes.w100}>
              {contacts.length === 0 && (
                <h3 style={{ textAlign: "center" }}>No Contacts Found!</h3>
              )}
              {contacts.length !== 0 &&
                contacts.map((value, index) => {
                  if (value.isFav) {
                    const labelId = `checkbox-list-secondary-label-${index}`;
                    return (
                      <ListItem key={index}>
                        <ListItemText
                          id={labelId}
                          primary={value.firstName + "" + value.lastName}
                        />
                        <ListItemSecondaryAction>
                          {!value.isFav && (
                            <StarBorderIcon
                              className={classes.icon}
                              onClick={(e) => addToFav(value)}
                            />
                          )}
                          {value.isFav && (
                            <StarIcon
                              className={classes.icon}
                              style={{ color: "#FDCC0D" }}
                              onClick={(e) => removeFromFav(value)}
                            />
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  } else {
                    return (
                      <h3 key={index} style={{ textAlign: "center" }}>
                        No Contacts Found!
                      </h3>
                    );
                  }
                })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
