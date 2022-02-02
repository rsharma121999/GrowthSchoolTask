import React from 'react';
import './SidebarStyles.css';

export default function Sidebar(props) {
  return (
    <div className="sidebar">
      {props.imageData && (
        <div className="image-section">
          {props.imageData.map((image, index) => {
            return (
              <div
                className={
                  image.url === props.selectedImage ? 'images active' : 'images'
                }
                onClick={() => props.setImageURL(image.url)}
                key={index}
              >
                <img src={image.url} alt={image.name} />
                <p>{image.name}</p>
              </div>
            );
          })}
        </div>
      )}
      <div className="footer">
        <button onClick={props.changeSelectedImage} className="select-button">
          Select Image
        </button>
      </div>
    </div>
  );
}
