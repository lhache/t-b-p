import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Translate from 'react-translate-component'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Slide from '@material-ui/core/Slide';
import FilterIcon from '@material-ui/icons/FilterList';
import Fab from '@material-ui/core/Fab';
import { Flex, Box } from '@ghostgroup/grid-styled'

import Ages from '../connected/Ages'
import Categories from '../connected/Categories'

const styles = {
    fab: {
        backgroundColor: '#00cce2',
        position: 'fixed',
        bottom: '12px',
        right: '12px',
        zIndex: 10
    },
    appBar: {
      position: 'fixed',
      top: 'auto'
    },
    flex: {
      flex: 1,
    },
  };

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Filter extends React.Component {

    state = {
        open: false
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
            <Fab color="primary" aria-label="filter" onClick={() => this.handleClickOpen()} style={ styles.fab }>
                <Translate content="filters.title" component="p" />
            </Fab>
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
              <Fab color="secondary" aria-label="filter" onClick={() => this.handleClose()} style={ styles.fab }>
                  <CheckIcon />
              </Fab>
              <Box width={ 1 } mt={ 4 }>
                  <List>
                      <ListItem>
                          <Ages />
                      </ListItem>
                      <Divider />
                      <ListItem>
                          <Categories />
                      </ListItem>
                  </List>
              </Box>
            </Dialog>
        </div>
      );
    }
  }

  export default withStyles(styles)(Filter);
