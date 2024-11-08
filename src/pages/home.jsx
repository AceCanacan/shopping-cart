// File: src/components/screen.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/productlist';
import Cart from '../components/cart';

const Screen = ({ cart, addToCart, updateQuantity }) => {
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <ProductList addToCart={addToCart} />
        </Col>
        <Col md={4}>
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            onCheckout={navigateToCheckout}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Screen;
