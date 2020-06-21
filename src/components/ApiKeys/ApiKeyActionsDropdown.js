import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  Menu as ReachMenu,
  MenuList as ReachMenuList,
  MenuButton as ReachMenuButton,
  MenuItem as ReachMenuItem,
} from '@reach/menu-button';

import More from './images/more.svg';

const MoreIcon = styled(More)`
  color: var(--ndaify-fg);
`;

const NavigationListItemButton = styled(ReachMenuButton)`
  display: block;
  margin: 0;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  font-family: inherit;
  text-decoration: none;
  background-color: transparent;
  color: var(--ndaify-fg);
  cursor: pointer;
  transition: none;
  font-size: 20px;
  border: 0;
          
  :focus {
    background: rgba(255, 255, 255, 0.1);
    outline: -webkit-focus-ring-color auto 0px;
    outline-offset: 0px;
  }

  :visited {
    color: var(--ndaify-fg);
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const MoreOptionsButton = styled(NavigationListItemButton)`
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    width: 24px;
  }
`;

const MoreOptionsMenuList = styled(ReachMenuList)`
  // FIXME(jmurzy) reach-ui does not provide a way to set className on the data-reach-menu element.
  // We should probably report this as a bug rather than polluting the global scope with magic
  body:not(&) {
    [data-reach-menu],
    [data-reach-menu-popover] {
      display: block;
      position: absolute;
      z-index: 1;
    }

    [data-reach-menu][hidden],
    [data-reach-menu-popover][hidden] {
      display: none;
    }
  }

  display: block;
  white-space: nowrap;
  outline: none;
  padding: 12px 0;

  min-width: 200px;

  margin: 0;
  padding: 0;

  margin-top: 8px;
  border-radius: var(--ndaify-button-radius);
  overflow: hidden;

  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
  box-shadow: 0 10px 20px 0 rgba(255,255,255,0.15);
  z-index: 10000;

  [data-reach-menu-item] {
    display: block;
    user-select: none;
  }
  
  [data-reach-menu-item] {
    cursor: pointer;

    display: block;

    color: inherit;
    font-size: 16px;
    line-height: 24px;
    text-decoration: initial;
    padding: 6px 12px;
    text-align: center;
  }

  [data-reach-menu-item][data-selected] {
    background-color: #FAFAFA;
    color: #000000;
    outline: none;
  }
`;

const ApiKeyActionsDropdown = ({ apiKey, onDeleteClick }) => (
  <ReachMenu>
    {(/* { isExpanded } */) => (
      <>
        <MoreOptionsButton id="api-key-more-options">
          <MoreIcon aria-hidden />
        </MoreOptionsButton>
        <MoreOptionsMenuList>
          <ReachMenuItem onSelect={() => onDeleteClick(apiKey)}>
            <FormattedMessage
              id="api-key-actions-dropdown-delete-key"
              defaultMessage="Delete Key"
            />
          </ReachMenuItem>
        </MoreOptionsMenuList>
      </>
    )}
  </ReachMenu>
);

export default ApiKeyActionsDropdown;
