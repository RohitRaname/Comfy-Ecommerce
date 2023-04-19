import React, { useEffect } from "react";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

// product page component render
const SingleProductPage = () => {
  const { id } = useParams();
  // const history= useHistory()
  const Navigate = useNavigate();

  // will be update by state
  const {
    fetchSingleProduct,
    single_product,
    single_product_loading: loading,
    single_product_error: error,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);

  useEffect(() => {
    if (error) setTimeout(() => Navigate("/"), 3000);
  }, [error]);

  if (loading) return <Loading />;
  if (error) return <Error error="There was an error." />;

  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    colors,
    images,
  } = single_product;

  console.log('single_product',single_product)

  return (
    <Wrapper>
      <PageHero title="Products" product={name} />
      <section className="section section-center page">
        <Link to="/products" className="btn">Back To Products</Link>
        <div className="product-center">
          <ProductImages images={images} />
          <div className="content">
            <h3>{name}</h3>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice( price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available: </span>
              <span>{stock > 0 ? "In Stock" : "Out of srock"}</span>
            </p>
            <p className="info">
              <span>SKU: </span>
              <span>{sku}</span>
            </p>
            <p className="info">
              <span>Brand: </span>
              <span>{company}</span>
            </p>

            <hr />
            {stock > 0 && <AddToCart product={single_product}/>}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
