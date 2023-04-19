import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";

const AmountButtons = ({ amount, increase, decrease }) => {
  return (
    <Wrapper>
      <div className="btn-container">
        <div className="amount-btns">
          <button className="amount-btn" onClick={decrease}>
            <FaMinus />
          </button>
          <h2 className="amount">{amount}</h2>
          <button className="amount-btn" onClick={increase}>
            <FaPlus />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .amount-btns {
    display: grid;
    width: 140px;
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
  }
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default AmountButtons;
