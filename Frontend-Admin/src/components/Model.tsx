// Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (price: number) => void;
  currentPrice: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, currentPrice }) => {
  const [inputValue, setInputValue] = React.useState<string>(currentPrice.toString());

  const handleConfirm = () => {
    const price = parseFloat(inputValue);
    if (!isNaN(price) && price >= 0) {
      onConfirm(price); // Call the onConfirm function with the new price
      onClose(); // Close the modal
    } else {
      alert("Please enter a valid price.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Review Price</h2>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter New Price"
        />
        <div className="modal-buttons">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
