import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { Component } from "react";
import "./NameDialog.scss";

export class NameDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        className="dialog"
        style={{ width: "100%" }}
      >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoComplete="off"
            margin="dense"
            id="name"
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <button onClick={this.props.handleDialogClose} className="cencel">
            CANCEL
          </button>
          <button
            onClick={() => this.props.onCreate(this.state.value)}
            className="create"
          >
            CREATE
          </button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NameDialog;
