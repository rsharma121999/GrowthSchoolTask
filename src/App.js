import React, { useState, useEffect, useRef } from 'react';
import EditingTools from './components/Editingtools/EditingTools';
import MainFiles from './components/Main/MainFile';
import Sidebar from './components/Sidebar/Sidebar';

const field = [];

export default function App() {
  const [imageData, setImageData] = useState(null);
  const [textFields, setTextsFields] = useState(field);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const editedImage = useRef();

  useEffect(() => {
    console.log('TEXT FIELDS', textFields);
  }, [textFields]);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(data => {
        console.log(data.data.memes);
        setImageData([...data.data.memes]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function setImageURL(url) {
    setSelectedImageURL(url);
  }

  function changeSelectedImage() {
    setSelectedImage(selectedImageURL);
  }

  return (
    <div>
      <Sidebar
        imageData={imageData}
        selectedImage={selectedImage}
        selectedImageURL={selectedImageURL}
        setSelectedImage={setSelectedImage}
        setImageURL={setImageURL}
        changeSelectedImage={changeSelectedImage}
      />
      <MainFiles
        editedImage={editedImage}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        textFields={textFields}
        setTextsFields={setTextsFields}
        selectedImage={selectedImage}
      />
      <EditingTools
        textFields={textFields}
        editedImage={editedImage}
        selectedImage={selectedImage}
        setTextsFields={setTextsFields}
      />
    </div>
  );
}
