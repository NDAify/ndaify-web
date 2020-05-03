import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

import Button from '../Clickable/Button';
import Anchor from '../Clickable/Anchor';
import donutImg from './images/donut.png';
import coffeeImg from './images/coffee.png';
import pizzaImg from './images/pizza.png';
import saladImg from './images/salad.png';
import ramenImg from './images/ramen.png';

export const DOLLAR_IN_CENTS = 100;

const AMOUNT_OPTIONS = [
  {
    label: '$2',
    labelIcon: donutImg,
    value: 2 * DOLLAR_IN_CENTS,
    id: 'donut',
  },
  {
    label: '$4',
    labelIcon: pizzaImg,
    value: 4 * DOLLAR_IN_CENTS,
    id: 'pizza',
  },
  {
    label: '$5',
    labelIcon: coffeeImg,
    value: 5 * DOLLAR_IN_CENTS,
    id: 'coffee',
  },
  {
    label: '$10',
    labelIcon: saladImg,
    value: 10 * DOLLAR_IN_CENTS,
    id: 'salad',
  },
  {
    label: '$15',
    labelIcon: ramenImg,
    value: 15 * DOLLAR_IN_CENTS,
    id: 'ramen',
  },
];

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Disclaimer = styled.div`
  color: #aaaaaa;
  font-weight: 200;
  font-size: 12px;
  align-self: flex-end;
  margin-bottom: 12px;
`;

const ButtonGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1pc;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledButton = styled(Button)`
  background-color: purple;
  background-color: #ffffff; 
  color: #aaaaaa;
  margin-bottom: 6px;

  :last-of-type {
    margin-bottom: 0;
  }

  ${(props) => (props.isActive ? 'background-color: #39d494; color: #ffffff;' : '')}

  img {
    width: 24px;
    margin-right: 6px;
  }

  @media screen and (min-width: 768px) {
    margin-left: 1pc;
    margin-bottom: 0;

    :first-of-type {
      margin-left: 0;
    }
  }
`;

const DescriptionContainer = styled.div`
  color: #ffffff;
  font-size: 24px;
  font-weight: 200;
`;

const Description = ({ activeOption }) => {
  if (activeOption.id === 'donut') {
    return (
      <DescriptionContainer>
        Oh those
        {' '}
        <Anchor
          href="https://www.bobsdonutssf.com/menu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bob’s donuts
        </Anchor>
        {' '}
        though.
      </DescriptionContainer>
    );
  }

  if (activeOption.id === 'pizza') {
    return (
      <DescriptionContainer>
        <Anchor
          href="http://www.goldenboypizza.com/sanfrancisco.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          Golden Boy
        </Anchor>
        {' '}
        for the drunk me.
      </DescriptionContainer>
    );
  }

  if (activeOption.id === 'coffee') {
    return (
      <DescriptionContainer>
        <Anchor
          href="https://www.andytownsf.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Andytown
        </Anchor>
        &apos;s Snowy Plover, promise me you&apos;ll try it!
      </DescriptionContainer>
    );
  }

  if (activeOption.id === 'salad') {
    return (
      <DescriptionContainer>
        Those diet days! Can&apos;t say no to
        {' '}
        <Anchor
          href="https://www.sweetgreen.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          sweetgreen
        </Anchor>
        .
      </DescriptionContainer>
    );
  }

  if (activeOption.id === 'ramen') {
    return (
      <DescriptionContainer>
        Woah! I’m now officially
        {' '}
        <Anchor
          href="https://www.mensho.tokyo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ramen
        </Anchor>
        {' '}
        profitable.
      </DescriptionContainer>
    );
  }

  return null;
};

const ButtonGroup = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(props);

  const { innerRef } = props;

  const handleClick = (value) => {
    helpers.setValue(value);
  };
  const onClick = useCallback(handleClick, []);

  const isActive = (opt) => opt.value === field.value;
  const activeOption = AMOUNT_OPTIONS.find(isActive);

  return (
    <Container>
      <Disclaimer>
        *Prices based on San Francisco cost of living
      </Disclaimer>
      <ButtonGroupContainer
        ref={innerRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        onBlur={() => { }}
      >
        {
          AMOUNT_OPTIONS.map((opt) => (
            <StyledButton
              type="button"
              isActive={isActive(opt)}
              key={opt.value}
              onClick={() => onClick(opt.value)}
            >
              {
                opt.labelIcon ? (
                  <img src={opt.labelIcon} alt="" />
                ) : null
              }
              {opt.label}
            </StyledButton>
          ))
        }
      </ButtonGroupContainer>
      <Description activeOption={activeOption} />
    </Container>
  );
};

export default ButtonGroup;
