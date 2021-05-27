import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: '100',
    maxHeight:'50',
    margin: 'auto',
    padding: 100,
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
    maxHeight:'5px',
    padding: "10px"
  },
}));
