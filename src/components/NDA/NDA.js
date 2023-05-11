import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FormattedDate, FormattedTime, FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import { Waypoint } from 'react-waypoint';
import UAParser from 'ua-parser-js';

import Link from 'next/link';

import { queryCache } from 'react-query';

import {
  Formik,
  Form,
} from 'formik';

import NDABody from './NDABody';
import Button from '../Clickable/Button';
import AnchorButton from '../Clickable/AnchorButton';
import Footer from '../Footer/Footer';
import LinkedInButton from '../LinkedInButton/LinkedInButton';
import SignatureHolder from '../SignatureHolder/SignatureHolder';
import UserActionBanner from '../UserActionBanner/UserActionBanner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import SimpleDialog from '../Dialog/SimpleDialog';
import UserActionsDropdown from '../UserActionsDropdown/UserActionsDropdown';
import Avatar from '../Avatar/Avatar';

import { extractCompanyNameFromText } from './NDAComposer';

import getFullNameFromUser from './getFullNameFromUser';
import {
  getClientOrigin,
  serializeOAuthState,
  timeout,
} from '../../util';

import NdaifyService from '../../services/NdaifyService';

import loggerClient from '../../db/loggerClient';

import HideImg from './images/hide.svg';

// Initial NDA is publicly viewable and if the viewer is not logged in, we
// assume they are the recipient
const isPublicViewer = (nda, user) => !user;
const isNdaRecipient = (nda, user) => nda.recipientId === user?.userId
|| nda.recipientEmail.toLowerCase() === user?.metadata.linkedInProfile.emailAddress.toLowerCase();
const isNdaOwner = (nda, user) => nda.ownerId === user?.userId;
// const isNdaParty = (nda, user) => isNdaRecipient(nda, user) || isNdaOwner(nda, user);

const HideIcon = styled(HideImg)`
  color: var(--ndaify-fg);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NDADocumentContainer = styled.div`
  padding: 1pc;
  padding-top: 2pc;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;
  flex: 1;
  flex-direction: column;
  margin-top: 3pc;
  box-sizing: border-box;
`;

const NDAContainer = styled.div`
  width: 100%;
`;

const NDAWrapper = styled.div`
  margin-bottom: 5pc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SigRow = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3pc;

  @media screen and (min-width: 992px) {
    align-items: stretch;
    flex-direction: row;
    height: auto;
  }
`;

const PartyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-width: 400px;
  flex: 1;
  align-items: flex-start;

  :first-of-type {
    margin-bottom: 3pc;
  }

  @media screen and (min-width: 992px) {
    align-items: flex-start;
    padding-left: 3pc;
    padding-right: 3pc;
    max-width: auto;

    :first-of-type {
      padding-left: 0;
      margin-bottom: 0;
    }

    :nth-of-type(2) {
      padding-right: 0;
    }
  }
`;

const NDAPartyName = styled.span`
  font-size: 16px;
  margin-top: 1pc;
  color: var(--ndaify-fg);
  font-weight: 200;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const NDAPartyOrganization = styled.span`
  font-size: 16px;
  line-height: 28px;
  color: var(--ndaify-fg);
  font-weight: 200;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const NDASignedDate = styled.span`
  font-size: 12px;
  color: var(--ndaify-fg);
  line-height: 28px;
  font-weight: 200;

  @media screen and (min-width: 992px) {
    font-size: 16px;
  }
`;

const NDASenderDisclaimer = styled.span`
  font-size: 12px;
  color: var(--ndaify-accents-6);
  margin-top: 8px;
  line-heitgh: 20px;
`;

const AttachmentSectionContainer = styled.div``;

const AttachmentTitle = styled.div`
  font-size: 28px;
  font-weight: 200;
  margin: 0;
  color: var(--ndaify-fg);
  margin-bottom: 2pc;

  @media screen and (min-width: 992px) {
    font-size: 32px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 2pc;
`;

const HideIconWrapper = styled.div`
  margin-left: 0;
  margin-right: 1pc;

  svg {
    width: 20px;
  }

  @media screen and (min-width: 992px) {
    margin-left: -46px;
    margin-right: 1pc;

    svg {
      width: 28px;
    }
  }
`;

const DocumentUrl = styled.a`
  color: var(--ndaify-accents-6);
  font-size: 20px;
  word-wrap: break-word;
  font-weight: 200;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const DescriptionTitle = styled.div`
  font-weight: 200;
  color: var(--ndaify-fg);
  font-size: 20px;
  margin: 0;
  margin-bottom: 2pc;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const AttachmentMessage = styled.div`
  margin: 0;
  font-size: 20px;
  font-weight: 200;
  ${(props) => (props.warning ? 'color: var(--ndaify-accents-danger);' : 'color: var(--ndaify-accents-success);')}

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const ActionButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 2pc;
  padding-bottom: 0;
  box-sizing: border-box;
  position: sticky;
  top: 0;
`;

const ActionButtonBackground = styled.div`
  ${(props) => (props.isScrolledBeyondActions ? 'background-color: rgba(0, 0, 0, .3);' : 'color: transparent;')}
  padding: 1pc;
  border-radius: var(--ndaify-accents-radius-1);
  transition: background-color 1s ease;
  display: flex;

  > button {
    margin-left: 18px;
  }

  > button:first-of-type {
    margin-left: 0;
  }
`;

const DisclaimerTitle = styled.div`
  font-weight: 200;
  font-size: 20px;
  margin: 0;
  color: var(--ndaify-fg);
  margin-bottom: 2pc;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const BoldText = styled.span`
  font-weight: 700;
  color: var(--ndaify-fg);
`;

const NDADisclaimerWrapper = styled.div`
  width: 100%;
  max-width: 576px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const DisclaimerBody = styled.div`
  font-size: 20px;
  line-height: 28px;
  margin: 0;
  margin-bottom: 4pc;
  font-weight: 200;
  color: var(--ndaify-fg);

  @media screen and (min-width: 992px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const DialogButton = styled(Button)``;

const DialogFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: 1pc;
`;

const DialogTitle = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 16px;
  color: var(--ndaify-fg);
`;

const DialogText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
  line-height: 24px;
  padding-bottom: 16px;
  color
  : var(--ndaify-fg);
`;

const DetailsRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1pc;
`;

const DetailsTitle = styled.div`
  font-size: 16px;
  color: var(--ndaify-accents-6);
  width: 100%;
  line-height: 32px;
`;

const DetailsText = styled.div`
  display: block;
  font-size: 20px;
  color: var(--ndaify-fg);
  font-weight: 200;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const NDAReadMoreContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 4pc;
`;

const NDAReadMoreText = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  color: var(--ndaify-fg);

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const NDAHeader = ({ nda, user }) => {
  const ownerFullName = getFullNameFromUser(nda.owner);

  if (nda.metadata.status === 'declined') {
    return (
      <>
        {
          isPublicViewer(nda, user) || isNdaRecipient(nda, user) ? (
            <NDADisclaimerWrapper>
              <DisclaimerTitle>
                <FormattedMessage
                  id="nda-recipient-declined-description"
                  defaultMessage="{declinedParty} to sign this NDA."
                  values={{
                    declinedParty: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-recipient-declined-description-declined-party"
                          defaultMessage="You declined {ownerFullName}'s request"
                          values={{
                            ownerFullName,
                          }}
                        />
                      </BoldText>
                    ),
                  }}
                />
              </DisclaimerTitle>
            </NDADisclaimerWrapper>
          ) : (
            <NDADisclaimerWrapper>
              <DisclaimerTitle>
                <FormattedMessage
                  id="nda-sender-declined-description"
                  defaultMessage="{declinedParty} to sign this NDA."
                  values={{
                    declinedParty: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-sender-declined-description-declined-party"
                          defaultMessage="{recipientFullName} declined your request"
                          values={{
                            recipientFullName: nda.metadata.recipientFullName,
                          }}
                        />
                      </BoldText>
                    ),
                  }}
                />
              </DisclaimerTitle>
            </NDADisclaimerWrapper>
          )
        }
      </>
    );
  }

  if (nda.metadata.status === 'revoked') {
    return (
      <>
        {
          isPublicViewer(nda, user) || isNdaRecipient(nda, user) ? (
            <NDADisclaimerWrapper>
              <DisclaimerTitle>
                <FormattedMessage
                  id="nda-recipient-revoked-description"
                  defaultMessage="{revokedParty} You can no longer accept it."
                  values={{
                    revokedParty: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-recipient-revoked-description-revoked-party"
                          defaultMessage="{ownerFullName} revoked this NDA."
                          values={{
                            ownerFullName,
                          }}
                        />
                      </BoldText>
                    ),
                  }}
                />
              </DisclaimerTitle>
            </NDADisclaimerWrapper>
          ) : (
            <NDADisclaimerWrapper>
              <DisclaimerTitle>
                <FormattedMessage
                  id="nda-sender-revoked-description"
                  defaultMessage="{revokedParty}{recipientFullName} can no longer accept it."
                  values={{
                    revokedParty: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-sender-revoked-description-revoked-party"
                          defaultMessage="You revoked this NDA. "
                        />
                      </BoldText>
                    ),
                    recipientFullName: nda.metadata.recipientFullName,
                  }}
                />
              </DisclaimerTitle>
            </NDADisclaimerWrapper>
          )
        }
      </>
    );
  }

  if (nda.metadata.status === 'signed') {
    return (
      <>
        {
          isPublicViewer(nda, user) || isNdaRecipient(nda, user) ? (
            <NDADisclaimerWrapper>
              <DisclaimerBody>
                <FormattedMessage
                  id="nda-recipient-signed-description"
                  defaultMessage="{receivingParty} and {disclosingParty} have agreed to terms of the following NDA {condition}."
                  values={{
                    receivingParty: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-recipient-signed-description-disclosing-party"
                          defaultMessage="You"
                        />
                      </BoldText>
                    ),
                    disclosingParty: (
                      <BoldText>{ownerFullName}</BoldText>
                    ),
                    condition: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-recipient-signed-description-condition"
                          defaultMessage="to protect all parties and materials disclosed"
                        />
                      </BoldText>
                    ),
                  }}
                />
              </DisclaimerBody>
            </NDADisclaimerWrapper>
          ) : (
            <NDADisclaimerWrapper>
              <DisclaimerBody>
                <FormattedMessage
                  id="nda-sender-signed-description"
                  defaultMessage="{disclosingParty} and {receivingParty} have agreed to terms of the following NDA {condition}."
                  values={{
                    receivingParty: (
                      <BoldText>{nda.metadata.recipientFullName}</BoldText>
                    ),
                    disclosingParty: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-sender-signed-description-disclosing-party"
                          defaultMessage="You"
                        />
                      </BoldText>
                    ),
                    condition: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-sender-signed-description-condition"
                          defaultMessage="to protect all parties and materials disclosed"
                        />
                      </BoldText>
                    ),
                  }}
                />
              </DisclaimerBody>
            </NDADisclaimerWrapper>
          )
        }
      </>
    );
  }

  // pending
  return (
    <>
      {
        isPublicViewer(nda, user) || isNdaRecipient(nda, user) ? (
          <>
            <NDADisclaimerWrapper>
              <DisclaimerTitle>
                <FormattedMessage
                  id="nda-recipient-pending-description-title"
                  defaultMessage="{disclosingParty} has requested your signature."
                  values={{
                    disclosingParty: (
                      <BoldText>{ownerFullName}</BoldText>
                    ),
                  }}
                />
              </DisclaimerTitle>
            </NDADisclaimerWrapper>

            <NDADisclaimerWrapper>
              <DisclaimerBody>
                <FormattedMessage
                  id="nda-recipient-pending-description-text"
                  defaultMessage="By signing, both {recipient} and {ownerFullName} are agreeing to terms of an NDA to {ndaConditions}."
                  values={{
                    recipient: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-recipient-pending-description-recipient"
                          defaultMessage="you"
                        />
                      </BoldText>
                    ),
                    ownerFullName: (
                      <BoldText>
                        {ownerFullName}
                      </BoldText>
                    ),
                    ndaConditions: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-recipient-pending-description-nda-conditions"
                          defaultMessage="protect all parties and materials disclosed"
                        />
                      </BoldText>
                    ),
                  }}
                />
              </DisclaimerBody>
            </NDADisclaimerWrapper>
          </>
        ) : (
          <>
            <NDADisclaimerWrapper>
              <DisclaimerTitle>
                <BoldText>
                  <FormattedMessage
                    id="nda-sender-pending-description-title"
                    defaultMessage="Awaiting {receivingParty} to sign."
                    values={{
                      receivingParty: (
                        <BoldText>{nda.metadata.recipientFullName}</BoldText>
                      ),
                    }}
                  />
                </BoldText>
              </DisclaimerTitle>
            </NDADisclaimerWrapper>

            <NDADisclaimerWrapper>
              <DisclaimerBody>
                <FormattedMessage
                  id="nda-sender-pending-description-text"
                  defaultMessage="By signing, both {sender} and {recipientFullName} are agreeing to terms of an NDA to {ndaConditions}."
                  values={{
                    sender: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-sender-pending-description-sender"
                          defaultMessage="you"
                        />
                      </BoldText>
                    ),
                    recipientFullName: (
                      <BoldText>
                        {nda.metadata.recipientFullName}
                      </BoldText>
                    ),
                    ndaConditions: (
                      <BoldText>
                        <FormattedMessage
                          id="nda-sender-pending-description-nda-conditions"
                          defaultMessage="protect all parties and materials disclosed"
                        />
                      </BoldText>
                    ),
                  }}
                />
              </DisclaimerBody>
            </NDADisclaimerWrapper>
          </>
        )
      }
    </>
  );
};

const DetailsDialog = ({ nda, setDetailDialogOpen }) => {
  const ownerFullName = getFullNameFromUser(nda.owner);
  const ownerEmail = nda.owner.metadata.linkedInProfile.emailAddress;
  const [ownerIp] = nda.metadata.ownerFingerprint.xForwardedFor.split(',');
  const ownerUserAgent = new UAParser(
    nda.metadata.ownerFingerprint.xForwardedForUserAgent,
  ).getBrowser();

  const recipientFullName = getFullNameFromUser(nda.recipient);
  const recipientEmail = nda.recipient.metadata.linkedInProfile.emailAddress;
  const [recipientIp] = nda.metadata.recipientFingerprint.xForwardedFor.split(',');
  const recipientUserAgent = new UAParser(
    nda.metadata.recipientFingerprint.xForwardedForUserAgent,
  ).getBrowser();

  return (
    <>
      <DialogTitle>
        <FormattedMessage
          id="nda-details-dialog-title"
          defaultMessage="Details"
        />
      </DialogTitle>
      <DetailsRow>
        <DetailsTitle>
          <FormattedMessage
            id="nda-details-dialog-sender-title"
            defaultMessage="Sender"
          />
        </DetailsTitle>
        <DetailsText>{`${ownerFullName} <${ownerEmail}>`}</DetailsText>
        <DetailsText>{ownerIp}</DetailsText>
        <DetailsText>
          {ownerUserAgent.name}
          {' '}
          {ownerUserAgent.version}
        </DetailsText>
      </DetailsRow>

      <DetailsRow>
        <DetailsTitle>
          <FormattedMessage
            id="nda-details-dialog-recipient-title"
            defaultMessage="Recipient"
          />
        </DetailsTitle>
        <DetailsText>{`${recipientFullName} <${recipientEmail}>`}</DetailsText>
        <DetailsText>{recipientIp}</DetailsText>
        <DetailsText>
          {recipientUserAgent.name}
          {' '}
          {recipientUserAgent.version}
        </DetailsText>
      </DetailsRow>

      <DetailsRow>
        <DetailsTitle>
          <FormattedMessage
            id="nda-details-dialog-delivered-title"
            defaultMessage="Delivered"
          />
        </DetailsTitle>
        <DetailsText>
          <FormattedTime
            year="numeric"
            month="long"
            day="numeric"
            value={nda.createdAt}
          />
        </DetailsText>
      </DetailsRow>

      <DetailsRow>
        <DetailsTitle>
          <FormattedMessage
            id="nda-details-dialog-action-title"
            defaultMessage="Action"
          />
        </DetailsTitle>
        <DetailsText>
          <FormattedMessage
            id="nda-details-dialog-signed-on-title"
            defaultMessage="Signed on"
          />
          {' '}
          <FormattedTime
            year="numeric"
            month="long"
            day="numeric"
            value={nda.updatedAt}
          />
        </DetailsText>
      </DetailsRow>

      <DetailsRow>
        <DetailsTitle>
          <FormattedMessage
            id="nda-details-dialog-nda-version-title"
            defaultMessage="NDA Version"
          />
        </DetailsTitle>
        <DetailsText>{nda.metadata.ndaTemplateId}</DetailsText>
      </DetailsRow>

      <DialogFooter>
        <DialogButton
          outline
          disabled={false}
          onClick={() => {
            setDetailDialogOpen(false);
          }}
        >
          <FormattedMessage
            id="nda-details-dialog-dismiss-title"
            defaultMessage="Dismiss"
          />
        </DialogButton>
      </DialogFooter>
    </>
  );
};

const NDAActions = ({ nda, user, isScrolledBeyondActions }) => {
  const toast = useAlert();

  const [isDeclineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [isDeclining, setDeclining] = useState(false);

  const [isRevokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [isRevoking, setRevoking] = useState(false);

  const [isResendDialogOpen, setResendDialogOpen] = useState(false);
  const [isResending, setResending] = useState(false);

  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false);

  const handleDeclineNda = async () => {
    setDeclining(true);

    try {
      const ndaifyService = new NdaifyService();
      await ndaifyService.declineNda(nda.ndaId);

      await queryCache.invalidateQueries(['nda', nda.ndaId]);

      setDeclineDialogOpen(false);

      toast.show('Successfully declined NDA');
    } catch (error) {
      loggerClient.error(error);
      toast.show('Failed to decline NDA');
    } finally {
      setDeclining(false);
    }
  };
  const onDeclineNda = useCallback(handleDeclineNda, [nda, toast]);

  const handleResendNda = async () => {
    setResending(true);

    try {
      const ndaifyService = new NdaifyService();
      await ndaifyService.resendNda(nda.ndaId);

      await queryCache.invalidateQueries(['nda', nda.ndaId]);

      setResendDialogOpen(false);

      toast.show('Successfully resent NDA');
    } catch (error) {
      loggerClient.error(error);
      toast.show('Failed to resend NDA');
    } finally {
      setResending(false);
    }
  };
  const onResendNda = useCallback(handleResendNda, [nda.ndaId, toast]);

  const handleRevokeNda = async () => {
    setRevoking(true);

    try {
      const ndaifyService = new NdaifyService();
      await ndaifyService.revokeNda(nda.ndaId);

      await queryCache.invalidateQueries(['nda', nda.ndaId]);

      setRevokeDialogOpen(false);

      toast.show('Successfully revoked NDA');
    } catch (error) {
      loggerClient.error(error);
      toast.show('Failed to revoke NDA');
    } finally {
      setRevoking(false);
    }
  };
  const onRevokeNda = useCallback(handleRevokeNda, [nda.ndaId, toast]);

  const handleDeclineClick = async () => {
    setDeclineDialogOpen(true);
  };
  const onDeclineClick = useCallback(handleDeclineClick, []);

  const handleRevokeClick = async () => {
    setRevokeDialogOpen(true);
  };
  const onRevokeClick = useCallback(handleRevokeClick, []);

  const handleResendClick = async () => {
    setResendDialogOpen(true);
  };
  const onResendClick = useCallback(handleResendClick, []);

  // const handleDownlaodClick = async () => {
  //   toast.show('Starting download...');
  // };
  // const onDownloadClick = useCallback(handleDownlaodClick, [toast]);

  const handleDetailClick = async () => {
    setDetailDialogOpen(true);
  };
  const onDetailClick = useCallback(handleDetailClick, []);

  const ownerFullName = getFullNameFromUser(nda.owner);
  const maybeRecipientFullName = nda.recipient ? getFullNameFromUser(nda.recipient) : null;

  return (
    <>
      {
        nda.metadata.status === 'signed' ? (
          <ActionButtonWrapper>
            <ActionButtonBackground isScrolledBeyondActions={isScrolledBeyondActions}>
              <Button
                compact
                color="var(--ndaify-accents-info)"
                onClick={onDetailClick}
              >
                <FormattedMessage
                  id="nda-actions-details-button"
                  defaultMessage="Details"
                />
              </Button>

              {/* <Button
                compact
                color="var(--ndaify-accents-info)"
                onClick={onDownloadClick}
              >
                Download
              </Button> */}
            </ActionButtonBackground>
          </ActionButtonWrapper>
        ) : null
      }

      {
        (
          nda.metadata.status === 'pending'
          && isNdaOwner(nda, user)
        ) ? (
          <ActionButtonWrapper>
            <ActionButtonBackground isScrolledBeyondActions={isScrolledBeyondActions}>
              <Button
                compact
                color="var(--ndaify-accents-info)"
                onClick={onResendClick}
              >
                <FormattedMessage
                  id="nda-actions-resend-button"
                  defaultMessage="Resend"
                />
              </Button>
              <Button
                compact
                color="var(--ndaify-accents-danger)"
                onClick={onRevokeClick}
              >
                <FormattedMessage
                  id="nda-actions-revoke-button"
                  defaultMessage="Revoke"
                />
              </Button>
            </ActionButtonBackground>
          </ActionButtonWrapper>
          ) : null
      }

      {
        (
          nda.metadata.status === 'pending'
          && (isPublicViewer(nda, user) || isNdaRecipient(nda, user))
        ) ? (
          <ActionButtonWrapper>
            <ActionButtonBackground isScrolledBeyondActions={isScrolledBeyondActions}>
              <Button
                compact
                color="var(--ndaify-accents-danger)"
                onClick={onDeclineClick}
              >
                <FormattedMessage
                  id="nda-actions-decline-button"
                  defaultMessage="Decline"
                />
              </Button>
            </ActionButtonBackground>
          </ActionButtonWrapper>
          ) : null
      }

      <SimpleDialog show={isDetailDialogOpen}>
        <DetailsDialog nda={nda} setDetailDialogOpen={setDetailDialogOpen} />
      </SimpleDialog>

      <SimpleDialog show={isDeclineDialogOpen}>
        <DialogTitle>
          <FormattedMessage
            id="nda-actions-decline-dialog-title"
            defaultMessage="Are you sure you want to decline?"
          />
        </DialogTitle>
        <DialogText>
          <FormattedMessage
            id="nda-actions-decline-dialog-body"
            defaultMessage="This action cannot be undone. {disclosingParty} will be notified that you declined their request."
            values={{
              disclosingParty: ownerFullName,
            }}
          />
        </DialogText>
        <DialogFooter>
          <DialogButton
            outline
            disabled={isDeclining}
            onClick={() => {
              setDeclineDialogOpen(false);
            }}
          >
            <FormattedMessage
              id="nda-actions-dialog-cancel-button"
              defaultMessage="Cancel"
            />
          </DialogButton>

          <DialogButton
            compact
            color="var(--ndaify-accents-danger)"
            disabled={isDeclining}
            spin={isDeclining}
            onClick={onDeclineNda}
          >
            <FormattedMessage
              id="nda-actions-dialog-decline-button"
              defaultMessage="Decline"
            />
          </DialogButton>
        </DialogFooter>
      </SimpleDialog>

      <SimpleDialog show={isRevokeDialogOpen}>
        <DialogTitle>
          <FormattedMessage
            id="nda-actions-revoke-dialog-title"
            defaultMessage="Are you sure you want to revoke?"
          />
        </DialogTitle>
        <DialogText>
          <FormattedMessage
            id="nda-actions-revoke-dialog-body"
            defaultMessage="This action cannot be undone. {receivingParty} will be notified that you revoked this NDA."
            values={{
              receivingParty: maybeRecipientFullName || (
                <FormattedMessage
                  id="nda-actions-revoke-recipient-text"
                  defaultMessage="The recipient"
                />
              ),
            }}
          />
        </DialogText>
        <DialogFooter>
          <DialogButton
            outline
            disabled={isRevoking}
            onClick={() => {
              setRevokeDialogOpen(false);
            }}
          >
            <FormattedMessage
              id="nda-actions-dialog-cancel-button"
              defaultMessage="Cancel"
            />
          </DialogButton>

          <DialogButton
            compact
            color="var(--ndaify-accents-danger)"
            disabled={isRevoking}
            spin={isRevoking}
            onClick={onRevokeNda}
          >
            <FormattedMessage
              id="nda-actions-dialog-revoke-button"
              defaultMessage="Revoke"
            />
          </DialogButton>
        </DialogFooter>
      </SimpleDialog>

      <SimpleDialog show={isResendDialogOpen}>
        <DialogTitle>
          <FormattedMessage
            id="nda-actions-resend-dialog-title"
            defaultMessage="Are you sure you want to resend this to {receivingParty}?"
            values={{
              receivingParty: maybeRecipientFullName || (
                <FormattedMessage
                  id="nda-actions-resend-recipient-text"
                  defaultMessage="the recipient"
                />
              ),
            }}
          />
        </DialogTitle>
        <DialogFooter>
          <DialogButton
            outline
            disabled={isResending}
            onClick={() => {
              setResendDialogOpen(false);
            }}
          >
            <FormattedMessage
              id="nda-actions-dialog-cancel-button"
              defaultMessage="Cancel"
            />
          </DialogButton>

          <DialogButton
            compact
            color="var(--ndaify-accents-danger)"
            disabled={isResending}
            spin={isResending}
            onClick={onResendNda}
          >
            <FormattedMessage
              id="nda-actions-dialog-resend-button"
              defaultMessage="Resend"
            />
          </DialogButton>
        </DialogFooter>
      </SimpleDialog>
    </>
  );
};

const NDAAttachments = ({ nda, user }) => {
  if (nda.metadata.status === 'declined') {
    return (
      <>
        {
          isPublicViewer(nda, user) || isNdaRecipient(nda, user) ? (
            <AttachmentSectionContainer>
              <AttachmentTitle>
                <FormattedMessage
                  id="nda-attachment-title"
                  defaultMessage="Attachment"
                />
              </AttachmentTitle>
              <AttachmentMessage warning>
                <FormattedMessage
                  id="nda-attachment-declined-recipient-text"
                  defaultMessage="You declined to view the enclosed attachments."
                />
              </AttachmentMessage>
            </AttachmentSectionContainer>
          ) : (
            <AttachmentSectionContainer>
              <AttachmentTitle>
                <FormattedMessage
                  id="nda-attachment-title"
                  defaultMessage="Attachment"
                />
              </AttachmentTitle>
              <LinkWrapper>
                <HideIconWrapper>
                  <HideIcon />
                </HideIconWrapper>
                <DocumentUrl
                  href={nda.metadata.secretLinks[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {nda.metadata.secretLinks[0]}
                </DocumentUrl>
              </LinkWrapper>
              <DescriptionTitle>
                <FormattedMessage
                  id="nda-attachment-declined-sender-text"
                  defaultMessage="Recipient declined your request to sign and is not give access to above attachments."
                />
              </DescriptionTitle>
            </AttachmentSectionContainer>
          )
        }
      </>
    );
  }

  if (nda.metadata.status === 'revoked') {
    return (
      <>
        {
          isPublicViewer(nda, user) || isNdaRecipient(nda, user) ? (
            <AttachmentSectionContainer>
              <AttachmentTitle>
                <FormattedMessage
                  id="nda-attachment-title"
                  defaultMessage="Attachment"
                />
              </AttachmentTitle>
              <AttachmentMessage warning>
                <FormattedMessage
                  id="nda-attachment-revoked-recipient-text"
                  defaultMessage="The sender revoked the NDA. No attachments can be accesed."
                />
              </AttachmentMessage>
            </AttachmentSectionContainer>
          ) : (
            <AttachmentSectionContainer>
              <AttachmentTitle>
                <FormattedMessage
                  id="nda-attachment-title"
                  defaultMessage="Attachment"
                />
              </AttachmentTitle>
              <LinkWrapper>
                <HideIconWrapper>
                  <HideIcon />
                </HideIconWrapper>
                <DocumentUrl
                  href={nda.metadata.secretLinks[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {nda.metadata.secretLinks[0]}
                </DocumentUrl>
              </LinkWrapper>
              <DescriptionTitle>
                <FormattedMessage
                  id="nda-attachment-revoked-sender-text"
                  defaultMessage="You revoked the NDA before the recipient was given access to above attachments."
                />
              </DescriptionTitle>
            </AttachmentSectionContainer>
          )
        }
      </>
    );
  }

  if (nda.metadata.status === 'signed') {
    return (
      <AttachmentSectionContainer>
        <AttachmentTitle>
          <FormattedMessage
            id="nda-attachment-title"
            defaultMessage="Attachment"
          />
        </AttachmentTitle>
        <LinkWrapper>
          <HideIconWrapper>
            <HideIcon />
          </HideIconWrapper>
          <DocumentUrl
            href={nda.metadata.secretLinks[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {nda.metadata.secretLinks[0]}
          </DocumentUrl>
        </LinkWrapper>
      </AttachmentSectionContainer>
    );
  }

  // pending
  return (
    <>
      {
        isPublicViewer(nda, user) || isNdaRecipient(nda, user) ? (
          <AttachmentSectionContainer>
            <AttachmentTitle>
              <FormattedMessage
                id="nda-attachment-title"
                defaultMessage="Attachment"
              />
            </AttachmentTitle>
            <AttachmentMessage>
              <FormattedMessage
                id="nda-attachment-pending-recipient-text"
                defaultMessage="You need to accept to view attachments."
              />
            </AttachmentMessage>
          </AttachmentSectionContainer>
        ) : (
          <AttachmentSectionContainer>
            <AttachmentTitle>
              <FormattedMessage
                id="nda-attachment-title"
                defaultMessage="Attachment"
              />
            </AttachmentTitle>
            <LinkWrapper>
              <HideIconWrapper>
                <HideIcon />
              </HideIconWrapper>
              <DocumentUrl
                href={nda.metadata.secretLinks[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {nda.metadata.secretLinks[0]}
              </DocumentUrl>
            </LinkWrapper>
            <DescriptionTitle>
              <FormattedMessage
                id="nda-attachment-pending-sender-text"
                defaultMessage="Recipient does not have access to your link unless they accept the terms of the NDA."
              />
            </DescriptionTitle>
          </AttachmentSectionContainer>
        )
      }
    </>
  );
};

const NDASigPads = ({ nda, user, isSubmitting }) => {
  const ownerFullName = getFullNameFromUser(nda.owner);

  const ownerCompanyName = extractCompanyNameFromText(
    nda.metadata.ndaParamaters.proposingParty,
    ownerFullName,
  );
  const recipientCompanyName = extractCompanyNameFromText(
    nda.metadata.ndaParamaters.consentingParty,
    nda.metadata.recipientFullName,
  );

  if (nda.metadata.status === 'declined') {
    return (
      <SigRow>
        <PartyWrapper>
          <SignatureHolder />
          <NDAPartyName>{nda.metadata.recipientFullName}</NDAPartyName>
          {
            recipientCompanyName ? (
              <NDAPartyOrganization>{recipientCompanyName}</NDAPartyOrganization>
            ) : null
          }
        </PartyWrapper>

        <PartyWrapper>
          <SignatureHolder fullName={ownerFullName} />
          <NDAPartyName>{ownerFullName}</NDAPartyName>
          {
            ownerCompanyName ? (
              <NDAPartyOrganization>{ownerCompanyName}</NDAPartyOrganization>
            ) : null
          }
          <NDASignedDate>
            <FormattedDate
              year="numeric"
              month="long"
              day="numeric"
              value={nda.createdAt}
            />
          </NDASignedDate>
        </PartyWrapper>
      </SigRow>
    );
  }

  if (nda.metadata.status === 'revoked') {
    return (
      <SigRow>
        <PartyWrapper>
          <SignatureHolder />
          <NDAPartyName>{nda.metadata.recipientFullName}</NDAPartyName>
          {
            recipientCompanyName ? (
              <NDAPartyOrganization>{recipientCompanyName}</NDAPartyOrganization>
            ) : null
          }
        </PartyWrapper>

        <PartyWrapper>
          <SignatureHolder />
          <NDAPartyName>{ownerFullName}</NDAPartyName>
          {
            ownerCompanyName ? (
              <NDAPartyOrganization>{ownerCompanyName}</NDAPartyOrganization>
            ) : null
          }
          <NDASignedDate>
            <FormattedDate
              year="numeric"
              month="long"
              day="numeric"
              value={nda.createdAt}
            />
          </NDASignedDate>
        </PartyWrapper>
      </SigRow>
    );
  }

  if (nda.metadata.status === 'signed') {
    return (
      <SigRow>
        <PartyWrapper>
          <SignatureHolder fullName={nda.metadata.recipientFullName} />
          <NDAPartyName>{nda.metadata.recipientFullName}</NDAPartyName>
          {
            recipientCompanyName ? (
              <NDAPartyOrganization>{recipientCompanyName}</NDAPartyOrganization>
            ) : null
          }
        </PartyWrapper>

        <PartyWrapper>
          <SignatureHolder fullName={ownerFullName} />
          <NDAPartyName>{ownerFullName}</NDAPartyName>
          {
            ownerCompanyName ? (
              <NDAPartyOrganization>{ownerCompanyName}</NDAPartyOrganization>
            ) : null
          }
          <NDASignedDate>
            <FormattedDate
              year="numeric"
              month="long"
              day="numeric"
              value={nda.createdAt}
            />
          </NDASignedDate>
        </PartyWrapper>
      </SigRow>
    );
  }

  // pending
  return (
    <>
      {
        isPublicViewer(nda, user) || isNdaRecipient(nda, user) ? (
          <SigRow>
            <PartyWrapper>
              <LinkedInButton
                type="submit"
                disabled={isSubmitting}
                spin={isSubmitting}
              >
                <FormattedMessage
                  id="nda-linkedin-button"
                  defaultMessage="Review and Sign with LinkedIn"
                />
              </LinkedInButton>
              <NDAPartyName>{nda.metadata.recipientFullName}</NDAPartyName>
              {
                recipientCompanyName ? (
                  <NDAPartyOrganization>{recipientCompanyName}</NDAPartyOrganization>
                ) : null
              }
              <NDASenderDisclaimer>
                {`I, ${nda.metadata.recipientFullName}, certify that I have read the contract, and understand that clicking 'Sign' constitutes a legally binding signature.`}
              </NDASenderDisclaimer>
            </PartyWrapper>

            <PartyWrapper>
              <SignatureHolder fullName={ownerFullName} />
              <NDAPartyName>{ownerFullName}</NDAPartyName>
              {
                ownerCompanyName ? (
                  <NDAPartyOrganization>{ownerCompanyName}</NDAPartyOrganization>
                ) : null
              }
              <NDASignedDate>
                <FormattedDate
                  year="numeric"
                  month="long"
                  day="numeric"
                  value={nda.createdAt}
                />
              </NDASignedDate>
            </PartyWrapper>
          </SigRow>
        ) : (
          <SigRow>
            <PartyWrapper>
              <SignatureHolder />
              <NDAPartyName>{nda.metadata.recipientFullName}</NDAPartyName>
              {
                recipientCompanyName ? (
                  <NDAPartyOrganization>{recipientCompanyName}</NDAPartyOrganization>
                ) : null
              }
            </PartyWrapper>
            <PartyWrapper>
              <SignatureHolder fullName={ownerFullName} />
              <NDAPartyName>{ownerFullName}</NDAPartyName>
              {
                ownerCompanyName ? (
                  <NDAPartyOrganization>{ownerCompanyName}</NDAPartyOrganization>
                ) : null
              }
              <NDASignedDate>
                <FormattedDate
                  year="numeric"
                  month="long"
                  day="numeric"
                  value={nda.createdAt}
                />
              </NDASignedDate>
            </PartyWrapper>
          </SigRow>
        )
      }
    </>
  );
};

const NDA = ({ ndaTemplate, nda, user }) => {
  const [expandedBody, setExpandedBody] = useState(false);

  const router = useRouter();
  const handleSubmit = (
    values,
    {
      setStatus,
      setSubmitting,
    },
  ) => {
    setStatus();

    if (!expandedBody) {
      setStatus({ errorMessage: 'Please expand the NDA to read all terms' });
      setSubmitting(false);
      return;
    }

    try {
      const CALLBACK_URL_LINKEDIN = `${getClientOrigin()}/sessions/linkedin/callback`;
      const oAuthState = serializeOAuthState({
        redirectUrl: `/nda/${nda.ndaId}`,
        // If there is an error during the login phase, redirect the errors properly
        redirectOnErrorUrl: `/nda/${nda.ndaId}`,
        actions: [{
          fn: 'sign',
          args: [
            nda.ndaId,
          ],
        }],
      });
      window.location.replace(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${CALLBACK_URL_LINKEDIN}&state=${oAuthState}&scope=${process.env.LINKEDIN_CLIENT_SCOPES}`);
    } catch (error) {
      loggerClient.error(error);
      setStatus({ errorMessage: error.message });
    } finally {
      // Keep the spinner running during the transition to LinkedIn oAuth
      // This is much better UX than spinner flickering momentarily before
      // we navigate away
      timeout(5000).then(() => setSubmitting(false));
    }
  };
  const onSubmit = useCallback(handleSubmit, [expandedBody]);

  const [isScrolledBeyondActions, setIsScrolledBeyondActions] = useState(false);

  if (user && !nda) {
    return (
      <Container>
        <UserActionBanner
          user={user}
          actionButton={() => (
            <>
              <Link passHref href="/dashboard/[dashboardType]" as="/dashboard/incoming">
                <ButtonAnchor
                  outline
                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                >
                  <Avatar user={user} />

                  <span>
                    <FormattedMessage
                      id="user-action-banner-label-inbox"
                      defaultMessage="Inbox"
                    />
                  </span>
                </ButtonAnchor>
              </Link>

              <UserActionsDropdown user={user} />
            </>
          )}
        />

        <ErrorMessage style={{ marginTop: '3pc' }}>
          You are not authorized to view this NDA.
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <UserActionBanner
        user={user}
        actionButton={() => (
          <>
            <Link passHref href="/dashboard/[dashboardType]" as="/dashboard/incoming">
              <ButtonAnchor
                outline
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              >
                <Avatar user={user} />

                <span>
                  <FormattedMessage
                    id="user-action-banner-label-inbox"
                    defaultMessage="Inbox"
                  />
                </span>
              </ButtonAnchor>
            </Link>

            <UserActionsDropdown user={user} />
          </>
        )}
      />

      <Waypoint
        onEnter={() => setIsScrolledBeyondActions(false)}
        onLeave={() => setIsScrolledBeyondActions(true)}
        onPositionChange={(props) => {
          // Handle case where the page is refreshed while scrolled past waypoint
          if (props.currentPosition !== Waypoint.inside) {
            setIsScrolledBeyondActions(true);
          }
        }}
      />

      <NDAActions user={user} nda={nda} isScrolledBeyondActions={isScrolledBeyondActions} />

      <Formik
        initialValues={{}}
        onSubmit={onSubmit}
      >
        {({ status, isSubmitting, setStatus }) => (
          <Form>
            <NDADocumentContainer>
              <NDAContainer>
                <NDAWrapper>

                  <NDAHeader user={user} nda={nda} />
                  <NDABody ndaTemplate={ndaTemplate} nda={nda} expanded={expandedBody} />

                  {
                    expandedBody === false ? (
                      <NDAReadMoreContainer>
                        <NDAReadMoreText>
                          <FormattedMessage
                            id="nda-expand-text"
                            defaultMessage="To read all terms, {clickHereText}."
                            values={{
                              clickHereText: (
                                <AnchorButton
                                  type="button"
                                  onClick={() => {
                                    setStatus();
                                    setExpandedBody(true);
                                  }}
                                >
                                  <FormattedMessage
                                    id="nda-description-expand-click-here-button-text"
                                    defaultMessage="click here"
                                  />
                                </AnchorButton>
                              ),
                            }}
                          />
                        </NDAReadMoreText>
                      </NDAReadMoreContainer>
                    ) : null
                  }

                </NDAWrapper>

                {
                  router.query.errorMessage ? (
                    <ErrorMessage style={{ marginBottom: '3pc' }}>
                      {router.query.errorMessage}
                    </ErrorMessage>
                  ) : null
                }

                {
                  status ? (
                    <ErrorMessage style={{ marginBottom: '3pc' }}>
                      {status.errorMessage}
                    </ErrorMessage>
                  ) : null
                }

                <NDASigPads user={user} nda={nda} isSubmitting={isSubmitting} />

                <NDAAttachments user={user} nda={nda} />

                <Footer withLogo />
              </NDAContainer>
            </NDADocumentContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NDA;
