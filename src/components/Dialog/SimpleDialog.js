import React from 'react';
import NProgress from 'nprogress';
import styled from 'styled-components';

import {
  DialogOverlay as ReachDialogOverlay,
  DialogContent as ReachDialogContent,
} from '@reach/dialog';

import {
  animated, useTransition,
} from 'react-spring';

const AnimatedDialogOverlay = animated(styled(ReachDialogOverlay)`
  background: hsla(0, 0%, 0%, var(--ndaify-portal-opacity));
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
`);

const AnimatedDialogContent = animated(styled(ReachDialogContent)`
  width: 80vw;
  margin: 10vh auto;
  padding-top: 36px;
  padding-bottom: 24px;
  padding-right: 36px;
  padding-left: 36px;
  outline: none;
  background: var(--ndaify-bg);
  border: 1px solid var(--ndaify-accents-4);
  box-shadow: 0 20px 100px -20px rgba(50,50,93,0.25), 0 -18px 60px -10px rgba(0,0,0,0.02);
  border-radius: var(--ndaify-accents-radius-2);

  @media only screen and (min-width: 768px) {
    width: 60vw;
  }

  @media only screen and (min-width: 992px) {
    width: 50vw;
  }

  @media only screen and (min-width: 1200px) {
    width: 40vw;
  }
`);

const SimpleDialog = (props) => {
  const transitions = useTransition(props.show, null, {
    from: { opacity: 0, transform: `translate3d(0px, -5px, 0px)` },
    enter: { opacity: 1, transform: `translate3d(0px, 0px, 0px)` },
    leave: { opacity: 0, transform: `translate3d(0px, -5px, 0px)` },
    onStart: (item, key) => {
      if (
        process.browser
        && key === 'enter'
        && !NProgress.isStarted()
      ) {
        NProgress.done(true)
      }
    },
  });

  return transitions.map((transition) =>
  transition.item && (
      <AnimatedDialogOverlay
        style={{
          opacity: transition.props.opacity,
        }}
      >
        <AnimatedDialogContent
          aria-label="Dialog"
          style={{
            transform: transition.props.transform,
          }}
        >
          {props.children}
        </AnimatedDialogContent>
      </AnimatedDialogOverlay>
    )
  );
};

export default SimpleDialog;
