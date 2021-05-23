import { makeStyles } from '@material-ui/core/styles';
import { Autorenew } from '@material-ui/icons';


export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  paper: {
    padding: "2",
    maxWidth: 1000,
    maxHeight: 0,
    minHeight: 0,
    flexGrow: 1,
    backgroundColor: theme.palette.error.light,
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


