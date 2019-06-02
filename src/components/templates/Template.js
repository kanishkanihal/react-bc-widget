import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import TableHeadColored from "../core/TableHeadColored";
import TablePaginationActions from "../core/TablePaginationActions";

import TemplateNew from "./TemplateNew";
import TemplateEdit from "./TemplateEdit";

const styles = theme => ({
  root: {}
});
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});
const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);
/////////////////////////////////
let counter = 0;
let createData = (name, template) => {
  counter += 1;
  return { id: counter, name, template };
};
const rowsx = [
  createData("Ice cream sandwich", 237, 9.0),
  createData("Ice Coffie", 287, 8.0),
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 3.7),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0)
];
////////////////////////////
const Template = props => {
  //States
  const [mode, setMode] = useState(0);
  const [rows, setRows] = useState([]);
  const [id, setId] = useState(0);
  const [formData, setFormData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //Paginations action.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //Paginations action.
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  //Event on clicking "New Template" button.
  const templateNew = () => {
    setMode(1);
  };
  //Event on clicking a "Delete" link.
  const templateDelete = id => {
    deleteTemplate(id);
  };
  //Event on clicking a "Edit" link.
  const templateEdit = id => {
    setMode(2);
    setId(id);
    setFormData(rows.find(row => row.id === id));
  };

  //Action on clicking "New Template" button.
  const addTemplate = value => {
    rows.push(createData(value.name, value.template));
    setRows(rows);
  };
  //Action on clicking a "Delete" link.
  const deleteTemplate = value => {
    let objIndex = rows.findIndex(obj => obj.id === value);
    rows.splice(objIndex, 1);
    setRows([...rows]);
  };
  //Action on clicking a "edit" link.
  const editTemplate = value => {
    let objIndex = rows.findIndex(obj => obj.id === value.id);
    rows[objIndex] = value;
    setMode(0);
    setRows(rowsx.sort((a, b) => (a.calories < b.calories ? -1 : 1)));
  };
  //Action on typing on "Search Template" area.
  const searchTemplate = event => {
    if (event.target.value.length > 2) {
      var filterString = new RegExp(event.target.value, "g");

      let filters = [];
      rows.map(row => {
        if (filterString.test(row.name)) {
          filters.push(row);
        }
      });
      setRows(filters);
    } else {
      setRows([...rowsx]);
    }
  };
  //Action on clicking a "Back" link.
  const loadHome = () => {
    setMode(0);
  };
  const { classes } = props;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {
    // Update the document title using the browser API
    debugger;
    setRows([...rowsx]);
  });

  if (mode === 0) {
    return (
      <div>
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                templateNew();
              }}
            >
              New Template
            </Button>
          </Grid>
          <Grid item>
            {" "}
            <TextField
              id="standard-search"
              label="Search Template"
              type="search"
              className={classes.textField}
              margin="dense"
              onChange={searchTemplate}
            />
          </Grid>
        </Grid>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableHeadColored>Name</TableHeadColored>
                  <TableHeadColored align="right">Template</TableHeadColored>
                  <TableHeadColored align="right">Action</TableHeadColored>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.template}</TableCell>
                      <TableCell align="right">
                        <Link
                          className={classes.link}
                          onClick={() => {
                            templateEdit(row.id);
                          }}
                        >
                          Edit
                        </Link>
                        |
                        <Link
                          className={classes.link}
                          onClick={() => {
                            templateDelete(row.id);
                          }}
                        >
                          Delete
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      native: true
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </div>
    );
  } else if (mode === 1) {
    return (
      <TemplateNew
        loadHome={loadHome.bind(this)}
        addTemplate={addTemplate.bind(this)}
      />
    );
  } else if (mode === 2) {
    console.log(props.editRow);
    debugger;
    return (
      <TemplateEdit
        loadHome={loadHome.bind(this)}
        formData={formData}
        id={id}
        editTemplate={editTemplate.bind(this)}
      />
    );
  }
};
Template.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Template);
