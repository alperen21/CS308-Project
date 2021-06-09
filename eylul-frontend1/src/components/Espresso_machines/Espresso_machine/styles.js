import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: '50',
    maxHeight:'50',
    margin: 'auto',
  },
  media: {
    height: 128,
    paddingTop: '70%', // 16:9
    maxWidth:'70%',
    maxHeight:'70%',
    margin: 'auto',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  custom:{
    color:"red"
  },
  old_price:{
    textDecorationLine:'line-through'

  }
}));
