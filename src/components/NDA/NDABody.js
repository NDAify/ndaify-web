import React, { useMemo } from 'react';
import GitHubSlugger from 'github-slugger';

import { FormattedDate } from 'react-intl';
import styled from 'styled-components';
import { Field as FormikField } from 'formik';

import ReactMarkdown from 'react-markdown/with-html';

import ContentEditableInput from '../Input/ContentEditableInput';

import nowISO8601 from '../../utils/nowISO8601';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  height: 800px;
  overflow: hidden;

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    content: "";
    background: linear-gradient(to top, rgb(var(--ndaify-bg)) 0%, rgba(var(--ndaify-bg), 0) 100%);
    pointer-events:none; 
  }

  ${(props) => (props.expanded ? `
    height: auto;

    :after {
      display: none;
    }
  ` : '')}
`;

const BoldText = styled.span`
  font-weight: 700;
  color: var(--ndaify-fg);
`;

const NDATitleContainer = styled.div`
  text-align: center;
  width: 100%;
`;

const NDATitleFlexContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NDATitle = styled.h1`
  font-size: 28px;
  margin: 0;
  margin-bottom: 4pc;
  font-weight: 200;
  color: var(--ndaify-fg);
  max-width: 70%;

  @media screen and (min-width: 992px) {
    font-size: 32px;
    max-width: 60%;
  }
`;

const NDASectionContainer = styled.div`
  width: 100%;

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

const NDASectionBodyText = styled.span`
  font-size: 16px;
  color: var(--ndaify-fg);

  @media screen and (min-width: 992px) {
    font-size: 20px;
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

const createRenderers = ({ editable, ndaParamaters }) => {
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

  const InlineCode = (props) => (
    editable ? (
      <FormikField
        as={ContentEditableInput}
        name={props.value}
      />
    ) : (
      <BoldText>{ndaParamaters && ndaParamaters[props.value]}</BoldText>
    )
  );

  return {
    inlineCode: InlineCode,
    heading: Heading,
    paragraph: Paragraph,
  };
};

const NDA = ({
  ndaTemplate, nda, editable, expanded,
}) => {
  const createdAt = nda.createdAt || nowISO8601();

  const markdownRenderers = useMemo(() => createRenderers({
    editable,
    ndaParamaters: nda.metadata.ndaParamaters,
  }), [editable, nda.metadata.ndaParamaters]);

  return (
    <Container expanded={expanded}>
      <NDATitleContainer>
        <NDATitleFlexContainer>
          <NDATitle>
            <span>{ndaTemplate.data.title}</span>
          </NDATitle>
        </NDATitleFlexContainer>
      </NDATitleContainer>

      <NDASectionContainer>
        <NDASectionH3
          style={{ display: 'inline-block' }}
        >
          This Agreement
        </NDASectionH3>
        <NDASectionBodyText style={{ display: 'inline' }}>
          {' '}
          is made on
          {' '}
          <FormattedDate
            year="numeric"
            month="long"
            day="numeric"
            value={createdAt}
          />
          .
        </NDASectionBodyText>
      </NDASectionContainer>

      <NDASectionContainer>
        <ReactMarkdown
          source={ndaTemplate.content}
          renderers={markdownRenderers}
          linkTarget={(url) => (!url.includes('#') ? '_blank' : null)}
          parserOptions={{ commonmark: true }}
        />

      </NDASectionContainer>
    </Container>
  );
};

export default NDA;
