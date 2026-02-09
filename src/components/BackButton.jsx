import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function BackButton() {
  const handleBack = () => {
    window.history.back(); // This will navigate back in the browser history
  };

  return (
    <div className="fixed top-3 left-12 flex items-center cursor-pointer" onClick={handleBack}>
      <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-blue-300 hover:text-blue-700" />
      
    </div>
  );
}

export default BackButton;