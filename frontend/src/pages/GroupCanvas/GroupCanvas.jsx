import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {CanvasArea, Canvas, PageContainer,
  ToolSection, AddPostDialog} from './GroupCanvas.styles';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {fabric} from 'fabric';
import FabricService from '../../services/fabric.service';

function GroupCanvas({auth}) {
  const [canvas, setCanvas] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    setCanvas(FabricService.initCanvas());
  }, []);

  useEffect(() => {
    if (!canvas) return;

    if (deleteMode) {
      stopAnimations();
    } else {
      canvas.getObjects().map((object) => {
        shakeAnimation(object);
      });
    }
  }, [deleteMode]);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleAddPost = () => {
    const username = auth.user.username;
    const fabricPost = FabricService.createPost(title, message, username);

    canvas.add(fabricPost);
    setOpenAddModal(false);
  };

  const handleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const stopAnimations = () => {
    fabric.runningAnimations.cancelAll();
  };

  const shakeAnimation = (fabricPost) => {
    fabricPost.animate('top', '+=30', {
      duration: 1000,
      onChange: canvas.renderAll.bind(canvas),
      easing: fabric.util.ease.easeOutBounce,
      onComplete: () => {
        console.log(deleteMode);
        if (deleteMode) {
          shakeAnimation(fabricPost);
        }
      },
    });
  };

  return (
    <PageContainer>
      <CanvasArea>
        <Canvas id="canvas"></Canvas>
        <ToolSection>
          <Fab color="primary" onClick={handleOpenAddModal}>
            <AddIcon />
          </Fab>
          <Fab color="primary" onClick={handleDeleteMode}>
            { deleteMode ? <CloseIcon /> : <DeleteIcon /> }
          </Fab>
        </ToolSection>
      </CanvasArea>
      <AddPostDialog
        onClose={handleCloseAddModal}
        open={openAddModal}
      >
        <DialogTitle id="simple-dialog-title">
          Create New Post
        </DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Title" fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}/>
          <TextField margin="dense" label="Message" fullWidth variant="standard"
            multiline
            rows={4}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button onClick={handleAddPost}>Add Post!</Button>
        </DialogActions>
      </AddPostDialog>
    </PageContainer>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(GroupCanvas);
