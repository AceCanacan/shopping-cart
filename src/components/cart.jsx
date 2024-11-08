// File: src/components/cart.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';

const Cart = ({ cart, updateQuantity }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const filteredCart = cart.filter(item => item.quantity > 0);
  const total = filteredCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      setItemToRemove(item);
      setShowModal(true);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const confirmRemoval = () => {
    if (itemToRemove) {
      updateQuantity(itemToRemove.id, 0);
      setItemToRemove(null);
      setShowModal(false);
    }
  };

  const cancelRemoval = () => {
    setItemToRemove(null);
    setShowModal(false);
  };

  return (
    <Container>
      <h2 className="my-4">Cart</h2>
      {filteredCart.length === 0 ? (
        <p>Your cart is empty.</p>
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
                <td>
                  <Form.Control
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={e =>
                      handleQuantityChange(item, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {filteredCart.length > 0 && <h4>Total: ${total.toFixed(2)}</h4>}
      <div className="d-flex justify-content-between my-3">
        <Button variant="secondary" onClick={() => navigate('/')}>
          Back
        </Button>
        {filteredCart.length > 0 ? (
          <Link to="/checkout" style={{ textDecoration: 'none' }}>
            <Button variant="primary">
              Checkout
            </Button>
          </Link>
        ) : (
          <Button variant="primary" disabled>
            Checkout
          </Button>
        )}
      </div>
      <Modal show={showModal} onHide={cancelRemoval}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemToRemove && (
            <p>
              Are you sure you want to remove{' '}
              <strong>{itemToRemove.title}</strong> from your cart?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelRemoval}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemoval}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;
