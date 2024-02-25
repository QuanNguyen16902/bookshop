import React, { useState } from 'react';
import { Modal, ModalDialog } from 'react-bootstrap';

const WarningModal: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <h2>Warning</h2>
      <p>{message}</p>
      <input onClick={onClose} value='Close'/>
    </Modal>
  );
};

const QuantityControl: React.FC<{ bookId: any }> = ({ bookId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const handleMinusClick = () => {
    const quantityInput = document.getElementById(`quantity${bookId}`) as HTMLInputElement;
    let newQuantity = parseInt(quantityInput.value) - 1;

    if (newQuantity > 0) {
      quantityInput.value = newQuantity.toString();
    } else {
      setWarningMessage('Minimum quantity is 1');
      // alert('Minimum quantity is 1');
      setIsOpen(true);
    }
  };

  const handlePlusClick = () => {
    const quantityInput = document.getElementById(`quantity${bookId}`) as HTMLInputElement;
    let newQuantity = parseInt(quantityInput.value) + 1;

    if (newQuantity <= 5) {
      quantityInput.value = newQuantity.toString();
    } else {
      setWarningMessage('Maximum quantity is 5');
      // alert('Maximum quantity is 5');
      setIsOpen(true);
    }
  };

  return (
    <div>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link linkMinus" onClick={handleMinusClick}>
              <b>-</b>
            </button>
          </li>
          <li className="page-item">
            <input
              type="text"
              id={`quantity${bookId}`}
              className="form-control text-center"
              style={{ width: '55px' }}
              value="1"
              readOnly
            />
          </li>
          <li className="page-item">
            <button className="page-link linkPlus"   onClick={handlePlusClick}>
              <b>+</b>
            </button>
          </li>
        </ul>
      </nav>
      <WarningModal message={warningMessage} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default QuantityControl;
