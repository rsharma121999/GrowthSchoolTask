import React, { useState } from 'react';
import './EditingToolsStyles.css';
import TextEditing from './TextEditing';
import * as htmlToImage from 'html-to-image';

export default function EditingTools(props) {
  const [selectedText, setSelectedText] = useState('Text 1');

  function addTextField() {
    if (!props.selectedImage) {
      alert('Please Select Image First!');
      return;
    }
    let arr = [...props.textFields];
    arr.push({
      value: '',
      diffX: 0,
      diffY: 0,
      styles: {
        fontSize: '',
        color: '',
        WebkitTextStrokeWidth: '',
        WebkitTextStrokeColor: '',
      },
      isDragging: false,
    });
    props.setTextsFields([...arr]);
  }

  function downloadimage() {
    if (!props.selectedImage) {
      alert('Please Select Image First!');
      return;
    }
    htmlToImage
      .toJpeg(document.getElementById('EDITEDIMAGESTODOWNLOAD'), {
        quality: 1,
        backgroundColor: '#fff',
        canvasHeight: 900,
        canvasWidth: 900,
      })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = `${new Date()}new-image.jpeg`;
        link.href = dataUrl;
        link.click();
      });
  }

  function removeTextField() {
    let arr = [...props.textFields];
    arr.pop();
    props.setTextsFields([...arr]);
  }

  function handleTextChange(e, index) {
    let arr = [...props.textFields];
    arr[index]['value'] = e.target.value;
    props.setTextsFields([...arr]);
  }

  return (
    <div className="editorTools">
      <div className="text-fields">
        {props.textFields.length < 4 ? (
          <button className="edit-btn" onClick={addTextField}>
            Add Text Field
          </button>
        ) : (
          ''
        )}
        {props.textFields.map((txt, index) => {
          return (
            <div key={index} className="text-inputs">
              <p>{`Text ${index + 1}`}</p>
              <input
                className="txt"
                value={txt.value}
                onChange={e => handleTextChange(e, index)}
                name={`Text${index + 1}`}
              />
            </div>
          );
        })}
        {props.textFields.length > 0 ? (
          <button className="edit-btn" onClick={removeTextField}>
            Remove Text Field
          </button>
        ) : (
          ''
        )}
      </div>
      <p style={{ color: 'white', textAlign: 'center' }}>
        To drag a text, single click and move on desired location and then
        double click to stop dragging
      </p>
      <div className="text-selector">
        {props.textFields.map((txt, index) => {
          return (
            <h2
              key={index}
              className={`Text ${index + 1}` === selectedText ? 'active' : ''}
              onClick={() => setSelectedText(`Text ${index + 1}`)}
            >
              {`Text ${index + 1}`}
            </h2>
          );
        })}
      </div>
      {props.textFields.length > 0 && (
        <div>
          {selectedText === 'Text 1' && (
            <TextEditing
              index={0}
              textFields={props.textFields}
              setTextsFields={props.setTextsFields}
            />
          )}
          {selectedText === 'Text 2' && (
            <TextEditing
              index={1}
              textFields={props.textFields}
              setTextsFields={props.setTextsFields}
            />
          )}
          {selectedText === 'Text 3' && (
            <TextEditing
              index={2}
              textFields={props.textFields}
              setTextsFields={props.setTextsFields}
            />
          )}
          {selectedText === 'Text 4' && (
            <TextEditing
              index={3}
              textFields={props.textFields}
              setTextsFields={props.setTextsFields}
            />
          )}
        </div>
      )}

      <div onClick={downloadimage} className="download-btn">
        Download Image
      </div>
    </div>
  );
}
