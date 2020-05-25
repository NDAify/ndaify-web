import React, { useMemo } from 'react';

import styled from 'styled-components';
import ReactMarkdown from 'react-markdown/with-html';
import GitHubSlugger from 'github-slugger';

import Footer from '../Footer/Footer';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DocumentContainer = styled.div`
  padding: 1pc;
  padding-top: 2pc;
  display: flex;
  justify-content: center;
  max-width: 768px;
  width: 100%;
  flex: 1;
  flex-direction: column;
  margin-top: 3pc;
  box-sizing: border-box;

  ul {
    list-style-type: decimal;
  }
  
  ol ol,
  ul ul {
    list-style-type: lower-alpha;
  }
  
  ol ol ol,
  ul ul ul {
    list-style-type: lower-roman;
  }
  
  ol ol ol ol,
  ul ul ul ul {
    list-style-type: upper-alpha;
  }
  
  ol ol ol ol ol,
  ul ul ul ul ul {
    list-style-type: upper-roman;
  }

  ol li,
  ul li {
    color: var(--ndaify-fg);
  }

  ol li p,
  ul li p {
    margin: 0;
    padding: 0;
    line-height: 30px;
  }

  @media screen and (min-width: 992px) {
    ol li p,
    ul li p {
      line-height: 35px;
    }
  }

  a {
    color: var(--ndaify-fg);
  }

  a:visited {
    color: var(--ndaify-fg);
  }
`;

const Title = styled.h1`
  margin: 0;
  color: var(--ndaify-fg);
  font-weight: 400;
  margin-bottom: 3pc;
  font-size: 28px;
  align-self: center;
`;

const NDASectionH6 = styled.span`
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1pc;
  display: block;
  color: var(--ndaify-fg);

  @media screen and (min-width: 992px) {
    font-size: 18px;
  }
`;
const NDASectionH5 = styled(NDASectionH6)``;
const NDASectionH4 = styled(NDASectionH5)``;
const NDASectionH3 = styled(NDASectionH4)`
  font-size: 18px;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;
const NDASectionH2 = styled(NDASectionH3)`
  font-size: 20px;

  @media screen and (min-width: 992px) {
    font-size: 22px;
  }
`;
const NDASectionH1 = styled(NDASectionH2)`
  font-size: 22px;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const LongText = styled.p`
  font-size: 16px;
  font-weight: 200;
  margin-top: 1pc;
  line-height: 28px;
  color: var(--ndaify-fg);

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const createRenderers = () => {
  const slugger = new GitHubSlugger();

  const flatten = (text, child) => (typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text));

  const Heading = (props) => {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, '');
    const slug = encodeURIComponent(slugger.slug(text));

    const Header = [
      null,
      NDASectionH1,
      NDASectionH2,
      NDASectionH3,
      NDASectionH4,
      NDASectionH5,
      NDASectionH6,
    ][props.level];

    return (
      <Header id={slug}>
        {props.children}
      </Header>
    );
  };

  const Paragraph = ({ children }) => (
    <LongText>
      {children}
    </LongText>
  );

  return {
    heading: Heading,
    paragraph: Paragraph,
  };
};

/* eslint-disable max-len */
const LegalPolicy = ({ legalTemplate }) => {
  const markdownRenderers = useMemo(
    () => createRenderers(), [],
  );

  return (
    <Container>
      <DocumentContainer>
        <Title>{legalTemplate.data.title}</Title>
        <LongText>
          Last updated:
          {' '}
          {legalTemplate.data.lastUpdatedAt}
        </LongText>

        <ReactMarkdown
          source={legalTemplate.content}
          renderers={markdownRenderers}
          linkTarget={(url) => (!url.includes('#') ? '_blank' : null)}
          parserOptions={{ commonmark: true }}
        />

        <Footer withLogo />
      </DocumentContainer>
    </Container>
  );
};
/* eslint-enable */

export default LegalPolicy;
