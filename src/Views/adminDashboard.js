import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import FileUpload from '@mui/icons-material/FileUpload';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EvtIcon from '@mui/icons-material/DynamicFeed';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import UserIcon from '@mui/icons-material/Person3';
import UpdIcon from '@mui/icons-material/Update';
import DelIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/CalendarToday';
import ViewIcon from '@mui/icons-material/Visibility';
import DashboardIcon from '@mui/icons-material/Speed';
import MailIcon from '@mui/icons-material/Mail';
import SandwichIcon from '@mui/icons-material/MenuRounded';
import Popup from './uploadPopup';
import UpdatePopup from './updatePopup';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const style = makeStyles({
  titleItemRight: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    top: '50%',
    right: '0.5%',
    height: 40,
    float: 'right',
    position: 'relative',
    transform: 'translateY(10%)',
  },
  titleItemLeft: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    top: '30%',
    left: '0.5%',
    height: 40,
    float: 'left',
    position: 'relative',
    transform: 'translateY(10%)',
  },
  rowButton: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    top: '0%',
    left: '0%',
    height: 30,
    float: 'left',
    position: 'relative',
    transform: 'translateY(10%)',
  },
});

// const [state, setState] = useState({
//   top: false,
//   left: false,
//   bottom: false,
//   right: false,
// });

export default function AdminDashboard() {
  const [openUpdPopup, setOpenUpdPopup] = React.useState(false);

  // const handleClickUpd = () => {
  //   setOpenUpdPopup(true);
  // };

  // const handleClose = () => {
  //   setOpenUpdPopup(false);
  // };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Post Title', width: 260 },
    { field: 'description', headerName: 'Post Description', width: 350 },
    {
      field: 'update action',
      headerName: 'Update Action',
      type: 'number',
      width: 180,
      renderCell: (cellValues) => {
        const classes = style();
        return (
          <Button
            variant="contained"
            startIcon={<UpdIcon />}
            className={classes.rowButton}
            onClick={() => {
              setOpenUpdPopup(true);
            }}
          >
            <b>Post Update</b>
          </Button>
        );
      },
    },
    {
      field: 'delete action',
      headerName: 'Delete Action',
      type: 'number',
      width: 160,
      renderCell: (cellValues) => {
        const classes = style();
        return (
          <Button
            variant="contained"
            startIcon={<DelIcon />}
            className={classes.rowButton}
            onClick={() => {
              postDelete(cellValues.row.id);
            }}
          >
            <b>Delete</b>
          </Button>
        );
      },
    },
  ];

  const [openPopup, setOpenPopup] = React.useState(false);
  const [state, setState] = React.useState({ left: false });
  const history = useHistory();
  const [username, setUsername] = React.useState();
  const [rows, setRows] = React.useState([]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    setUsername(localStorage.getItem('user'));
    if (token == null) {
      history.push('/AdminLogin');
    }
    fetchData(token);
  }, []);

  async function fetchData(token) {
    await axios
      .get('http://127.0.0.1:8000/api/posts', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response?.status === 200) {
          console.log(response.data.data);
          setRows(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const postDelete = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        if (response?.status === 200) {
          console.log(response);
          alert('Post Deleted!');
          fetchData(localStorage.getItem('token'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signout = () => {
    console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          `User ${username !== null ? ': ' + username : ''}`,
          'Events Portal',
          'Application Portal',
          'Blog Post View',

          <a href="../BlogPostPortal">Blog Post View</a>,
          <a href="../AdminFormView">Application Form View</a>,
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? (
                  <UserIcon />
                ) : index === 1 ? (
                  <EvtIcon />
                ) : index === 2 ? (
                  <DashboardIcon />
                ) : index === 3 ? (
                  <EventIcon />
                ) : (
                  <ViewIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Sign Out'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={signout}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <LogoutIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const classes = style();

  return (
    <div>
      <Button
        sx={{ fontWeight: 'bold' }}
        variant="contained"
        endIcon={<FileUpload />}
        className={classes.titleItemRight}
        onClick={() => {
          setOpenPopup(true);
        }}
      >
        Blog Post Upload
      </Button>

      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}></Popup>
      <UpdatePopup
        openUpdPopup={openUpdPopup}
        setOpenUpdPopup={setOpenUpdPopup}
      ></UpdatePopup>

      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            variant="contained"
            startIcon={<SandwichIcon />}
            className={classes.titleItemLeft}
            onClick={toggleDrawer(anchor, true)}
          >
            Menu
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
      <h1 align="center">Admin Dashboard</h1>
      <div
        style={{
          height: 380,
          width: '88%',
          paddingTop: 90,
          paddingLeft: 70,
          paddingRight: 90,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}
