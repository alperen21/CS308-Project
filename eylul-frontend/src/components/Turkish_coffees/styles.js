import { makeStyles } from '@material-ui/core/styles';
import { Autorenew } from '@material-ui/icons';


export default makeStyles((theme) => ({
  toolbar: {display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 8px',
  ...theme.mixins.toolbar,
},
  paper: {
    padding: theme.spacing(3),
    maxWidth: 100,
    flexGrow: 1,
    backgroundColor: theme.palette.default,
  },
  content: {
    maxWidth: 1300,
    backgroundColor: theme.palette.error.light,
    padding: theme.spacing(3),
    margin: 50,
  },
  root: {
    flexGrow: 1,
  },
}));


