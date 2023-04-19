import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <Wrapper>
      <PageHero title="About" />

      <section className="section-about page-100 section section-center">
        <img src={aboutImg} alt="" />

        <article>
          <div className="title">
            <h4>About</h4>
            <div className="underline"></div>
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eaque
            debitis nobis perferendis sunt aperiam, sequi unde at, quasi
            explicabo hic repudiandae corporis facilis, consequatur molestiae
            temporibus ea! Eum, eaque!
          </p>
        </article>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .section-about {
    display: grid;
    gap: 4rem;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
    margin-bottom: 3rem;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    .section-about {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
export default AboutPage;
