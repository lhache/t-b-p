import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Translate from 'react-translate-component'
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import FilterIcon from 'material-ui-icons/FilterList'

import Ages from '../connected/Ages'
import Categories from '../connected/Categories'

const styles = {
    button: {
        backgroundColor: '#00cce2',
        position: 'fixed',
        bottom: '12px',
        right: '12px',
        zIndex: 10
    },
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
  };
  
  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class Filter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        };
    }
  
    handleClickOpen() {
      this.setState({ open: true });
    };
  
    handleClose() {
      this.setState({ open: false });
    };
  
    render() {
      const { classes } = this.props;
      return (
        <div>
            <Button fab color="primary" aria-label="filter" onClick={() => this.handleClickOpen()} style={ styles.button }>
                <Translate content="filters.title" component="p" />
            </Button>
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={() => this.handleClose()}
            transition={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                
                <Typography type="title" color="inherit" className={classes.flex}>
                  Filter
                </Typography>
                <IconButton color="inherit" onClick={() => this.handleClose()} aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <List>
                <ListItem>
                    <Ages />
                </ListItem>
                <Divider />
                <ListItem>
                    <Categories />
                </ListItem>
            </List>
          </Dialog>
        </div>
      );
    }
  }
  
  export default withStyles(styles)(Filter);