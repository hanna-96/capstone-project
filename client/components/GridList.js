import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 200,
  },
}));
  const tileData = [
    {
      img: "https://www.theflavorbender.com/wp-content/uploads/2015/10/Witch-Heart-Halloween-Cocktail-The-Flavor-Bender-Featured-Image-SQ-3-500x375.jpg",
      title: 'Image',
      cols: 1,
    },
    {
        img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        title: 'Image1',
        cols: 2,
      },
      {
        img: "https://i.pinimg.com/originals/86/cd/2d/86cd2d17121e4f9d43c7e5587029d4dd.jpg",
        title: 'Image2',
        cols: 1,
      },
      {
        img: "https://d194ip2226q57d.cloudfront.net/images/Mezcal-Sour_Tequila-and-Mezcal_By-Brandon-Alms.original.jpg",
        title: 'Image3',
        cols: 1,
      },
  ];
 
export default function ImageGridList() {
  const classes = useStyles();
  return (
    <div className={classes.root}  align ="center">
      <GridList cellHeight={100} className={classes.gridList} cols={3} spacing = {2}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
