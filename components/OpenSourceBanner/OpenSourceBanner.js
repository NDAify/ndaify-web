import React from "react";
import styled from "styled-components";

const BannerLink = styled.a`
  background-color: #edd9a3;
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const BannerText = styled.span`
  color: #424657;
  font-weight: 200;
  text-align: center;
`;

const OpenSourceBanner = props => {
  return (
    <BannerLink
      href="https://github.com/juliaqiuxy/ndaify-frontend"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        alt=""
        style={{
          width: "20px",
          marginLeft: "14px",
          marginRight: "8px"
        }}
        src="/static/githubLogo.svg"
      />
      <BannerText>
        {"NDAify is open source. Send a pull request on GitHub."}
      </BannerText>
    </BannerLink>
  );
};

export default OpenSourceBanner;
