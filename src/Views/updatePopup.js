import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  Box,
  Stack,
} from '@mui/material';
import ActionButton from '../Controls/ActionButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const style = makeStyles({
  titleItemRight: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    top: '50%',
    right: '0%',
    height: 40,
    float: 'right',
    position: 'relative',
    //transform: 'translateY(10%)',
  },
  uploadBtn: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    top: '10%',
    left: '30%',
    width: 300,
    height: 40,
    float: 'left',
    position: 'relative',
  },
});

export default function Popup(props) {
  const { openUpdPopup, setOpenUpdPopup } = props;

  const handleClose = () => {
    setOpenUpdPopup(false);
  };

  const classes = style();

  return (
    <Dialog open={openUpdPopup} maxWidth="md">
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ p: 1, height: 40, width: 860 }}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          sx={{ p: 0, height: 40, width: 830 }}
        >
          <DialogTitle>Blog Post Update</DialogTitle>
        </Box>
        <ActionButton color="secondary" onClick={handleClose}>
          <CloseIcon />
        </ActionButton>
      </Box>

      <DialogContent dividers>
        <Stack direction="row" alignItems="center" spacing={0}>
          {/* <Button
            variant="contained"
            component="label"
            className={classes.uploadBtn}
            startIcon={<ImageUpload />}
            onChange={onSelectFile}
          >
            Upload Images
            <input hidden accept="image/*" multiple type="file" />
          </Button> */}
        </Stack>
        <TextField
          autoFocus
          margin="dense"
          id="id"
          label="Id of the blog post"
          fullWidth
          variant="outlined"
          color="warning"
          disabled="true"
        />
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title of the blog post"
          fullWidth
          variant="outlined"
          color="warning"
          disabled="true"
        />
        {/* <ImageList sx={{ width: { selectWidth }, height: { selectHeight } }}>
          <ImageListItem key="Subheader" cols={2} rows={3}>
            <ListSubheader component="div" spacing={0}>
              Image Preview
            </ListSubheader>
          </ImageListItem>
          {selectedImages.map((item, index) => (
            <ImageListItem key={item}>
              <img
                src={item}
                srcSet={item}
                alt={item}
                loading="lazy"
                height="300"
                width="300"
              />
              <ImageListItemBar
                title={`Image: ${index + 1}`}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`Delete image ${item}`}
                    onClick={() => deleteHandler(item)}
                  >
                    <DeleteButton />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList> */}
        <DialogContentText>
          <br></br>To update the blog post information of this website, please
          enter the description.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description of the blog post"
          fullWidth
          variant="outlined"
          color="warning"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        {/* <Button
          className={classes.titleItemRight}
          //onClick={openPopup}
         // onClick={handleSubmit}
          variant="contained"
        >
          <b>Upload</b>
        </Button> */}
      </DialogActions>
      <Button
        className={classes.titleItemRight}
        onClick={handleClose}
        variant="contained"
      >
        <b>Update</b>
      </Button>
    </Dialog>
  );
}
