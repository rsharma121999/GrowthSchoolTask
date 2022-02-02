
import React, { useRef } from 'react';
import './TextEditingStyles.css';

export default function TextEditing(props) {
  let fontSizeRef = useRef();
  let strokeSizeRef = useRef();

  function handleTextColorChange(e) {
    let arr = [...props.textFields];
    arr[props.index]['styles'] = {
      ...arr[props.index]['styles'],
      color: e.target.value,
    };
    props.setTextsFields([...arr]);
  }

  function handleStrokeColorChange(e) {
    let arr = [...props.textFields];
    arr[props.index]['styles'] = {
      ...arr[props.index]['styles'],
      WebkitTextStrokeColor: e.target.value,
    };
    props.setTextsFields([...arr]);
  }

  function handleFontSizeChange() {
    let value = fontSizeRef.current.value;
    let arr = [...props.textFields];
    arr[props.index]['styles'] = {
      ...arr[props.index]['styles'],
      fontSize: `${value}px`,
    };
    props.setTextsFields([...arr]);
  }

  function handleStrokeSizeChange() {
    let value = strokeSizeRef.current.value;
    let arr = [...props.textFields];
    arr[props.index]['styles'] = {
      ...arr[props.index]['styles'],
      WebkitTextStrokeWidth: `${value}px`,
    };
    props.setTextsFields([...arr]);
  }

  return (
    <div className="text-styles">
      <div className="inputs">
        <h2>Font Size(px)</h2>
        <input ref={fontSizeRef} className="size-input" type="number" />
        <button onClick={handleFontSizeChange}>Set</button>
      </div>
      <div className="inputs">
        <h2>Font Color</h2>
        <input type="color" onChange={e => handleTextColorChange(e)} />
      </div>
      <div className="inputs">
        <h2>Stroke(px)</h2>
        <input ref={strokeSizeRef} className="size-input" type="number" />
        <button onClick={handleStrokeSizeChange}>Set</button>
      </div>
      <div className="inputs">
        <h2>Font Color</h2>
        <input type="color" onChange={e => handleStrokeColorChange(e)} />
      </div>
    </div>
  );
}
