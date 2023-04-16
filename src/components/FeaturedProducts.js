import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  const {
    products_loading: loading,
    products_error: error,
    featured_products: products,
  } = useProductsContext();

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Wrapper>
      <div className="section section-center">
        <div className="title">
          <h3>Featured Products</h3>
          <div className="underline"></div>
        </div>

        <div className="featured">
          {products.slice(0, 3).map((product) => {
            const { id } = product;
            return <Product key={id} {...product} />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
