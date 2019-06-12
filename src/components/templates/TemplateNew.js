import React, { useEffect } from "react";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));
//Compoment - TemplateNew
const TemplateNew = props => {
  //Styles
  const classes = useStyles();
  //States
  const [values, setValues] = React.useState({
    name: "",
    template: ""
  });
  //Effect
  useEffect(() => {
    console.log("Kana New");
  }, [props.addTemplate]);
  //Text field handle Change
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  //Form handle submit
  const handleSubmit = event => {
    event.preventDefault();
    props.addTemplate(values);
    props.loadHome();
  };
  //Back button action.
  const templateHome = () => {
    props.loadHome();
  };
  return (
    <div>
      {" "}
      <Grid container direction="row" justify="space-between">
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              return templateHome();
            }}
          >
            Back
          </Button>
        </Grid>
      </Grid>
      <FormControl component="fieldset" className={classes.formControl}>
        <form
          onSubmit={handleSubmit}
          className={classes.container}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-name"
            label="Name"
            placeholder="Template name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            fullWidth
            margin="normal"
          />

          <TextField
            id="standard-multiline-static"
            label="Template"
            placeholder="Template"
            multiline
            rows="4"
            defaultValue={values.template}
            onChange={handleChange("template")}
            className={classes.textField}
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Save Template
          </Button>
        </form>
      </FormControl>
    </div>
  );
};

export default TemplateNew;
