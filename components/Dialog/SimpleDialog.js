import React from 'react';
import NProgress from 'nprogress';
import styled from 'styled-components';

import {
  DialogOverlay as ReachDialogOverlay,
  DialogContent as ReachDialogContent,
} from '@reach/dialog';

import { Transition } from 'react-spring/renderprops.cjs';

const DialogOverlay = styled(ReachDialogOverlay)`
  background: hsla(0, 0%, 0%, 0.8);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
`;

const DialogContent = styled(ReachDialogContent)`
  width: 80vw;
  margin: 10vh auto;
  padding-top: 36px;
  padding-bottom: 24px;
  padding-right: 36px;
  padding-left: 36px;
  outline: none;
  background: #383B49;
  border: 1px solid #424657;
  box-shadow: 0 20px 100px -20px rgba(50,50,93,0.25), 0 -18px 60px -10px rgba(0,0,0,0.02);
  border-radius: 8px;

  @media only screen and (min-width: 768px) {
    width: 60vw;
  }

  @media only screen and (min-width: 992px) {
    width: 50vw;
  }

  @media only screen and (min-width: 1200px) {
    width: 40vw;
  }
`;

const SimpleDialog = (props) => (
  <Transition
    items={props.show}
    from={{ opacity: 0, y: -5 }}
    enter={{ opacity: 1, y: 0 }}
    leave={{}}
    onStart={(item) => {
      // skip the initial event when the Transition mounts
      if (item) {
        NProgress.start();
      }
    }}
    onRest={() => NProgress.done()}
  >
    {
      ((show) => show && (({ y, opacity }) => (
        <DialogOverlay
          style={{
            opacity,
          }}
        >
          <DialogContent
            aria-label="Confirmation Dialog"
            style={{
              transform: `translate3d(0px, ${y}px, 0px)`,
            }}
          >
            {props.children}
          </DialogContent>
        </DialogOverlay>
      )))
    }
  </Transition>
);

export default SimpleDialog;
