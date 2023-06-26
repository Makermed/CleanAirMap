import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '12px',
    alignItems: 'center',
    padding: theme.spacing(0),
    display: 'flex',
    flexBasis: 640,
    backgroundColor: theme.palette.background.main
  },
  icon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    borderRadius: '12px',    
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
    backgroundColor: theme.palette.background.main
  }
}));

const SearchInput = props => {
  const { className, open, searchKey, onChange, onSearch, onCancel } = props;

  const classes = useStyles();

  return (
    <Paper className={clsx(classes.root, className)}>
      {open && 
        <SearchIcon className={classes.icon} onClick={onSearch} />
      }
      {!open &&
        <ArrowBackIosIcon className={classes.icon} onClick={onCancel} />
      }
      {open &&
        <Input
          className={classes.input}
          disableUnderline
          value={searchKey}
          onChange={open ? onChange : null}
          onKeyPress={open ? onSearch : null}
        />
      }
      {!open &&
        <Input
          disable
          className={classes.input}
          value={searchKey}
          disableUnderline
        />
        }
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  searchKey: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onCancel: PropTypes.func
};

export default SearchInput;
