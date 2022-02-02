import React, { useRef } from 'react';
import './MainStyles.css';

export default function MainFiles(props) {
  const text = useRef();

  function dragStart(e, index) {
    let arr = [...props.textFields];
    arr[index]['diffX'] =
      e.screenX - e.currentTarget.getBoundingClientRect().left;
    arr[index]['diffY'] =
      e.screenY - e.currentTarget.getBoundingClientRect().top;
    arr[index]['isDragging'] = true;
    props.setTextsFields(arr);
  }

  function dragging(e, index) {
    let arr = [...props.textFields];
    if (arr[index]['isDragging']) {
      let left = e.screenX - arr[index]['diffX'];
      let top = e.screenY - arr[index]['diffY'];

      arr[index]['styles'] = { ...arr[index]['styles'], left: left, top: top };

      props.setTextsFields([...arr]);
    }
  }

  function dragEnd(index) {
    let arr = [...props.textFields];
    arr[index]['isDragging'] = false;
    props.setTextsFields(arr);
  }

  return (
    <div className="main-screen">
      <div
        ref={props.editedImage}
        id={'EDITEDIMAGESTODOWNLOAD'}
        className="image-editor"
      >
        {props.selectedImage === null ? (
          'Please Select An Image'
        ) : (
          <img src={props.selectedImage} alt="editImage" />
        )}
        {props.textFields.map((txt, index) => {
          return (
            <div
              ref={text}
              key={index}
              draggable="true"
              style={txt.styles}
              className={'draggable-text'}
              onClick={e => dragStart(e, index)}
              onMouseMove={e => dragging(e, index)}
              onDoubleClick={() => dragEnd(index)}
            >
              {txt.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
