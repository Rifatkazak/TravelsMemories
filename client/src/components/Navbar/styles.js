import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    display: 'flex',
    marginLeft:"2rem",
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  headingText: {
    paddingTop:"5px"
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  avatar:{
    height:"100%",
    borderRadius:0,
  },
  mainLogo:{
    color: "#a1a1a1",
    justifyContent:"left",
    '&:hover':{
      background:"transparent"
    }
  },
  grow:{
    display:"flex",
    flexGrow:1
  },
}));