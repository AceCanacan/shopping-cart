// File: src/components/checkout.jsx
import React, { useState } from 'react';
import { Button, Table, Modal, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cart, clearCart, onClose }) => {
  const [show, setShow] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const filteredCart = cart.filter(item => item.quantity > 0);
  const total = filteredCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePay = async () => {
    setProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShow(true);
      clearCart();
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
    
  };

  const handleClose = () => {
    setShow(false);
    navigate('/');
  };

  return (
    <>
      <h2 className="my-4">Checkout</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {filteredCart.length === 0 ? (
        <Alert variant="info">Your cart is empty. Please add items to proceed.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredCart.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <img src={item.images[0]} alt={item.title} style={{ width: '50px', marginRight: '10px' }} />
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <h4>Total Payment: ${total.toFixed(2)}</h4>
      <div className="d-flex justify-content-between my-3">
        <Button variant="secondary" onClick={() => navigate('/')}>
          Cancel
        </Button>
        <Button variant="success" onClick={handlePay} disabled={processing || filteredCart.length === 0}>
          {processing ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Pay'}
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your payment was successful!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Checkout;
