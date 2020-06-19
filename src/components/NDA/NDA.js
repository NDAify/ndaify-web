import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FormattedDate, FormattedTime, FormattedMessage } from 'react-intl';
import getConfig from 'next/config';
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

const { publicRuntimeConfig: { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SCOPES } } = getConfig();

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

const AttachmentTitle = styled.h4`
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

const DescriptionTitle = styled.h4`
  font-weight: 200;
  color: var(--ndaify-fg);
  font-size: 20px;
  margin: 0;
  margin-bottom: 2pc;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const AttachmentMessage = styled.h4`
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

const DisclaimerTitle = styled.h4`
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

const DisclaimerBody = styled.h4`
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

const NDAReadMoreText = styled.h4`
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
                <BoldText>
                  {`You declined ${ownerFullName}'s request`}
                </BoldText>
                {' '}
                to sign this NDA.
              </DisclaimerTitle>
            </NDADisclaimerWrapper>
          ) : (
            <NDADisclaimerWrapper>
              <DisclaimerTitle>
                <BoldText>
                  {`${nda.metadata.recipientFullName} declined your request`}
                </BoldText>
                {' '}
                to sign this NDA.
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
                <BoldText>
                  {`${nda.metadata.recipientFullName} revoked this NDA.`}
                </BoldText>
                {' '}
                You can no longer accept it.
              </DisclaimerTitle>
            </NDADisclaimerWrapper>
          ) : (
            <NDADisclaimerWrapper>
              <DisclaimerTitle>
                <BoldText>
                  You revoked this NDA.
                </BoldText>
                {' '}
                {`${nda.metadata.recipientFullName} can no longer accept it.`}
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
                <BoldText>You</BoldText>
                {' '}
                and
                {' '}
                <BoldText>{ownerFullName}</BoldText>
                {' '}
                have agreed to terms of the following NDA
                {' '}
                <BoldText>to protect all parties and materials disclosed.</BoldText>
              </DisclaimerBody>
            </NDADisclaimerWrapper>
          ) : (
            <NDADisclaimerWrapper>
              <DisclaimerBody>
                <BoldText>You</BoldText>
                {' '}
                and
                {' '}
                <BoldText>{nda.metadata.recipientFullName}</BoldText>
                {' '}
                have agreed to terms of the following NDA
                {' '}
                <BoldText>to protect all parties and materials disclosed.</BoldText>
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
                <BoldText>{ownerFullName}</BoldText>
                {' '}
                has requested your signature.
              </DisclaimerTitle>
            </NDADisclaimerWrapper>

            <NDADisclaimerWrapper>
              <DisclaimerBody>
                By signing, both
                {' '}
                <BoldText>you</BoldText>
                {' '}
                and
                {' '}
                <BoldText>{ownerFullName}</BoldText>
                {' '}
                are agreeing to terms of an NDA to
                {' '}
                <BoldText>protect all parties and materials disclosed.</BoldText>
              </DisclaimerBody>
            </NDADisclaimerWrapper>
          </>
        ) : (
          <>
            <NDADisclaimerWrapper>
              <DisclaimerTitle>
                <BoldText>
                  Awaiting
                  {' '}
                  {nda.metadata.recipientFullName}
                  {' '}
                  to sign
                </BoldText>
              </DisclaimerTitle>
            </NDADisclaimerWrapper>

            <NDADisclaimerWrapper>
              <DisclaimerBody>
                By signing, both
                {' '}
                <BoldText>you</BoldText>
                {' '}
                and
                {' '}
                <BoldText>{nda.metadata.recipientFullName}</BoldText>
                {' '}
                are agreeing to terms of an NDA to
                {' '}
                <BoldText>protect all parties and materials disclosed.</BoldText>
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
        Details
      </DialogTitle>
      <DetailsRow>
        <DetailsTitle>Sender</DetailsTitle>
        <DetailsText>{`${ownerFullName} <${ownerEmail}>`}</DetailsText>
        <DetailsText>{ownerIp}</DetailsText>
        <DetailsText>
          {ownerUserAgent.name}
          {' '}
          {ownerUserAgent.version}
        </DetailsText>
      </DetailsRow>

      <DetailsRow>
        <DetailsTitle>Recipient</DetailsTitle>
        <DetailsText>{`${recipientFullName} <${recipientEmail}>`}</DetailsText>
        <DetailsText>{recipientIp}</DetailsText>
        <DetailsText>
          {recipientUserAgent.name}
          {' '}
          {recipientUserAgent.version}
        </DetailsText>
      </DetailsRow>

      <DetailsRow>
        <DetailsTitle>Delivered</DetailsTitle>
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
        <DetailsTitle>Action</DetailsTitle>
        <DetailsText>
          Signed on
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
        <DetailsTitle>NDA Version</DetailsTitle>
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
          Dismiss
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

      await queryCache.refetchQueries(['nda', nda.ndaId]);

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

      await queryCache.refetchQueries(['nda', nda.ndaId]);

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

      await queryCache.refetchQueries(['nda', nda.ndaId]);

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

  const handleDownlaodClick = async () => {
    toast.show('Starting download...');
  };
  const onDownloadClick = useCallback(handleDownlaodClick, [toast]);

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
                Details
              </Button>

              <Button
                compact
                color="var(--ndaify-accents-info)"
                onClick={onDownloadClick}
              >
                Download
              </Button>
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
                Resend
              </Button>
              <Button
                compact
                color="var(--ndaify-accents-danger)"
                onClick={onRevokeClick}
              >
                Revoke
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
                Decline
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
          Are you sure you want to decline?
        </DialogTitle>
        <DialogText>
          This action cannot be undone.
          {' '}
          {ownerFullName}
          {' '}
          will be notified that you declined their request.
        </DialogText>
        <DialogFooter>
          <DialogButton
            outline
            disabled={isDeclining}
            onClick={() => {
              setDeclineDialogOpen(false);
            }}
          >
            Cancel
          </DialogButton>

          <DialogButton
            compact
            color="var(--ndaify-accents-danger)"
            disabled={isDeclining}
            spin={isDeclining}
            onClick={onDeclineNda}
          >
            Decline
          </DialogButton>
        </DialogFooter>
      </SimpleDialog>

      <SimpleDialog show={isRevokeDialogOpen}>
        <DialogTitle>
          Are you sure you want to revoke?
        </DialogTitle>
        <DialogText>
          This action cannot be undone.
          {' '}
          {maybeRecipientFullName || 'The recipient'}
          {' '}
          will be notified that you revoked this NDA.
        </DialogText>
        <DialogFooter>
          <DialogButton
            outline
            disabled={isRevoking}
            onClick={() => {
              setRevokeDialogOpen(false);
            }}
          >
            Cancel
          </DialogButton>

          <DialogButton
            compact
            color="var(--ndaify-accents-danger)"
            disabled={isRevoking}
            spin={isRevoking}
            onClick={onRevokeNda}
          >
            Revoke
          </DialogButton>
        </DialogFooter>
      </SimpleDialog>

      <SimpleDialog show={isResendDialogOpen}>
        <DialogTitle>
          Are you sure you want to resend this to
          {' '}
          {maybeRecipientFullName || 'the recipient'}
          ?
        </DialogTitle>
        <DialogFooter>
          <DialogButton
            outline
            disabled={isResending}
            onClick={() => {
              setResendDialogOpen(false);
            }}
          >
            Cancel
          </DialogButton>

          <DialogButton
            compact
            color="var(--ndaify-accents-danger)"
            disabled={isResending}
            spin={isResending}
            onClick={onResendNda}
          >
            Resend
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
              <AttachmentTitle>Attachments</AttachmentTitle>
              <AttachmentMessage warning>
                You declined to view the enclosed attachments.
              </AttachmentMessage>
            </AttachmentSectionContainer>
          ) : (
            <AttachmentSectionContainer>
              <AttachmentTitle>Attachments</AttachmentTitle>
              <LinkWrapper>
                <HideIconWrapper>
                  <HideIcon />
                </HideIconWrapper>
                <DocumentUrl
                  href={nda.metadata.secretLinks[0]}
                  target="_blank"
                >
                  {nda.metadata.secretLinks[0]}
                </DocumentUrl>
              </LinkWrapper>
              <DescriptionTitle>
                Recipient declined your request to sign and is not give access to above attachments.
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
              <AttachmentTitle>Attachments</AttachmentTitle>
              <AttachmentMessage warning>
                The sender revoked the NDA. No attachments can be accesed.
              </AttachmentMessage>
            </AttachmentSectionContainer>
          ) : (
            <AttachmentSectionContainer>
              <AttachmentTitle>Attachments</AttachmentTitle>
              <LinkWrapper>
                <HideIconWrapper>
                  <HideIcon />
                </HideIconWrapper>
                <DocumentUrl
                  href={nda.metadata.secretLinks[0]}
                  target="_blank"
                >
                  {nda.metadata.secretLinks[0]}
                </DocumentUrl>
              </LinkWrapper>
              <DescriptionTitle>
                You revoked the NDA before the recipient was given access to above attachments.
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
        <AttachmentTitle>Attachments</AttachmentTitle>
        <LinkWrapper>
          <HideIconWrapper>
            <HideIcon />
          </HideIconWrapper>
          <DocumentUrl
            href={nda.metadata.secretLinks[0]}
            target="_blank"
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
            <AttachmentTitle>Attachments</AttachmentTitle>
            <AttachmentMessage>
              You need to accept to view attachments.
            </AttachmentMessage>
          </AttachmentSectionContainer>
        ) : (
          <AttachmentSectionContainer>
            <AttachmentTitle>Attachments</AttachmentTitle>
            <LinkWrapper>
              <HideIconWrapper>
                <HideIcon />
              </HideIconWrapper>
              <DocumentUrl
                href={nda.metadata.secretLinks[0]}
                target="_blank"
              >
                {nda.metadata.secretLinks[0]}
              </DocumentUrl>
            </LinkWrapper>
            <DescriptionTitle>
              Recipient does not have access to your link unless they accept the
              terms of the NDA.
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
                Sign with LinkedIn
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
      window.location.replace(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${CALLBACK_URL_LINKEDIN}&state=${oAuthState}&scope=${LINKEDIN_CLIENT_SCOPES}`);
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
                      id="user-action-banner-label-dashboard"
                      defaultMessage="Dashboard"
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
                    id="user-action-banner-label-dashboard"
                    defaultMessage="Dashboard"
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
                          To read all terms,
                          {' '}
                          <AnchorButton
                            type="button"
                            onClick={() => {
                              setStatus();
                              setExpandedBody(!expandedBody);
                            }}
                          >
                            click here
                          </AnchorButton>
                          .
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
