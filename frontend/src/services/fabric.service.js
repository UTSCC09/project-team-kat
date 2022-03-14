import {fabric} from 'fabric';

const AUTHOR_OFFSET = 65;
const DESC_OFFSET = 80;
const CONTENT_EXTRA_HEIGHT = 55;

const FabricService = {
  initCanvas: () => {
    return new fabric.Canvas('canvas', {
      height: window.innerHeight - 100,
      width: window.innerWidth,
      backgroundColor: 'pink',
    });
  },
  createPost: (title, message, author) => {
    const titleObj = new fabric.Textbox(title, {
      name: 'title',
      width: 280,
      left: 18,
      top: 60,
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Helvetica',
      fill: '#000000',
      splitByGrapheme: true,
    });

    const authorObj = new fabric.Textbox(author, {
      name: 'author',
      width: 300,
      left: 18,
      top: titleObj.getScaledHeight() + AUTHOR_OFFSET,
      fontSize: 13,
      fontFamily: 'Helvetica',
      fill: '#555555',
      splitByGrapheme: true,
    });

    const messageObj = new fabric.Textbox(message, {
      name: 'message',
      width: 300,
      left: 18,
      top: authorObj.getScaledHeight() + titleObj.getScaledHeight() +
        DESC_OFFSET,
      fontSize: 15,
      fontFamily: 'Helvetica',
      fill: '#000000',
      splitByGrapheme: true,
    });


    const contentObj = new fabric.Rect({
      name: 'content',
      top: 40,
      width: 330,
      height: titleObj.getScaledHeight() + authorObj.getScaledHeight() +
        messageObj.getScaledHeight() + CONTENT_EXTRA_HEIGHT,
      fill: '#F4D74B',
      rx: 20,
      ry: 20,
      strokeWidth: 2,
      stroke: 'black',
    });

    const groupOptions = {
      name: 'post',
      left: 600,
      top: 600,
      hasControls: false,
      transparentCorners: false,
      cornerSize: 7,
      title: title,
      message: message,
      author: author,
      subTargetCheck: true,
    };

    return new fabric.Group([contentObj, titleObj, authorObj, messageObj],
        groupOptions);
  },
};

export default FabricService;
