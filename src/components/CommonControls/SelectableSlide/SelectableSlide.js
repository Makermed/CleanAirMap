import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { 
  ImageList,
  ImageListItem
} from '@material-ui/core';
import { IconTextItem } from 'components';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    overflow: 'hidden',
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
  imageList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    height: 124,
    overflowY: 'hidden',
    backgroundColor: theme.palette.background.default
  },
});

class SelectableSlide extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { items, selected_item } = this.props;
    
    if (items.length > 0) {
      let selected = [];
      items.forEach((item, index) => {
        if (item.name === selected_item.name) {
          selected[index] = true;
        } else {
          selected[index] = false;
        }
        
      })
      this.setState({selected: selected});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected_item.id !== prevProps.selected_item.id) {
      const { items, selected_item } = this.props;
    
      if (items.length > 0) {
        let selected = [];
        items.forEach((item, index) => {
          if (item.name === selected_item.name) {
            selected[index] = true;
          } else {
            selected[index] = false;
          }
          
        })
        this.setState({selected: selected});
      }
    }
  }

  handleClick = (item) => () => {
    const { items, onItemSelected } = this.props;
    // console.log("Item clicked ", item);
    let selected = [];
    onItemSelected(item);

    items.forEach((it, index) => {
      if (it.name === item.name) {
        selected[index] = true;
      } else {
        selected[index] = false
      }
    })
    this.setState({selected: selected});
  }

  render() {
    const { classes, items, width, readOnly } = this.props;
    const { selected } = this.state;
    // console.log("Selected ", selected, items);
    var itemSelected = [];
    if (selected.length === 0) {
      if (items.length > 0) {
        items.forEach((item, index) => {
          if (index === 0) {
            itemSelected[index] = true;
          } else {
            itemSelected[index] = false;
          }
        })
      }      
    } else {
      itemSelected = selected.slice();
    }

    // IconItem icon size : 80
    let catheight = 124;
    let cols = width / 104;
    if (items.length < cols) {
      cols = items.length;
      catheight = 104;
    }

    // console.log("selectable slide :", width, cols);

    return (
      <div className={classes.root}>
        <ImageList className={classes.imageList} cols={cols} style={{height: catheight}}>
          {items.map((item, index) => (
            <ImageListItem key={item.image}>
              <div onClick={readOnly === undefined ? this.handleClick(item) : null}>
                <IconTextItem 
                  title={item.name}
                  image={item.image}
                  selected={itemSelected[index]}
                />
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }
}

SelectableSlide.propTypes = {
  classes: PropTypes.object,
  readOnly: PropTypes.any,
  width: PropTypes.number,
  items: PropTypes.array,
  onSelected: PropTypes.func
};

export default withStyles(styles)(SelectableSlide);
