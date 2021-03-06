import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';

export const PageContainer = styled.div`
`;

export const CanvasArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Canvas = styled.canvas`
`;

export const BreadcrumbSection = styled.div`
  position: absolute;
  left: 5%;
  top: 5%;

  background-color: whitesmoke;
  padding: 15px;
  border-radius: 30px;
`;

export const ToolSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  position: absolute;
  left: 93%;

  background-color: whitesmoke;
  padding: 15px;
  border-radius: 30px;
`;

export const AddPostDialog = styled(Dialog)`
  & > .MuiDialog-container > .MuiPaper-root {
    width: 1200px;
    margin: 0 auto;
  }
`;

export const ErrorContainer = styled.div`
  margin-top: 10px;
  color: red;
`;
