import React, { Fragment, useCallback, useState } from 'react';
import styled from 'styled-components';
import { FormattedDate } from 'react-intl';
import { FadingCircle as Spinner } from 'better-react-spinkit';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';

import {
  Formik,
  Form,
} from 'formik';

import NDABody from './NDABody';
import Button from '../Clickable/Button';
import Footer from '../Footer/Footer';
import LinkedInButton from '../LinkedInButton/LinkedInButton';
import SignatureHolder from '../SignatureHolder/SignatureHolder';
import UserActionBanner from '../UserActionBanner/UserActionBanner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ButtonAnchor from '../Clickable/ButtonAnchor';
import { extractCompanyNameFromText } from './NDAComposer';

import { Link, Router } from '../../routes';

import getFullNameFromUser from './getFullNameFromUser';
import { getClientOrigin, serializeOAuthState, timeout } from '../../util';

import { API } from '../../api';

const { publicRuntimeConfig: { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SCOPES } } = getConfig();

// Initial NDA is publicly viewable and if the viewer is not logged in, we
// assume they are the recepient
const isPublicViewer = (nda, user) => !user;
const isNdaRecepient = (nda, user) => nda.recepientId === user?.userId
|| nda.recipientEmail === user?.metadata.linkedInProfile.emailAddress;
const isNdaOwner = (nda, user) => nda.ownerId === user?.userId;
const isNdaParty = (nda, user) => isNdaRecepient(nda, user) || isNdaOwner(nda, user);

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
  margin-bottom: 3pc;

  @media screen and (min-width: 992px) {
    flex-direction: row;
    height: auto;
  }
`;

const PartyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  flex: 1;
  align-items: center;

  :first-of-type {
    margin-bottom: 3pc;
  }

  @media screen and (min-width: 992px) {
    align-items: flex-start;
    padding-left: 3pc;
    padding-right: 3pc;

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
  color: #ffffff;
  font-weight: 200;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const NDAPartyOrganization = styled.span`
  font-size: 16px;
  line-height: 28px;
  color: #ffffff;
  font-weight: 200;

  @media screen and (min-width: 992px) {
    font-size: 20px;
  }
`;

const NDASignedDate = styled.span`
  font-size: 12px;
  color: #ffffff;
  line-height: 28px;
  font-weight: 200;

  @media screen and (min-width: 992px) {
    font-size: 16px;
  }
`;

const NDASenderDisclaimer = styled.span`
  font-size: 12px;
  color: #aaaaaa;
  margin-top: 8px;
  line-heitgh: 20px;
`;

const AttachmentSectionContainer = styled.div``;

const AttachmentTitle = styled.h4`
  font-size: 28px;
  font-weight: 200;
  margin: 0;
  color: #ffffff;
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

const HideIcon = styled.img`
  width: 20px;
  margin-left: 0;
  margin-right: 1pc;

  @media screen and (min-width: 992px) {
    width: 28px;
    margin-left: -46px;
    margin-right: 1pc;
  }
`;

const DocumentUrl = styled.h4`
  color: #aaaaaa;
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
  color: #ffffff;
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
  ${props => (props.declined ? 'color: #dc564a;' : 'color: #4ac09a;')}

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const DeclineButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 2pc;
  padding-bottom: 0;
  box-sizing: border-box;
`;

const DisclaimerTitle = styled.h4`
  font-weight: 200;
  font-size: 20px;
  margin: 0;
  color: #ffffff;
  margin-bottom: 2pc;

  @media screen and (min-width: 992px) {
    font-size: 24px;
  }
`;

const BoldText = styled.span`
  font-weight: 700;
  color: #ffffff;
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
  color: #ffffff;

  @media screen and (min-width: 992px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const NDAHeader = ({ nda, user }) => {

  if (nda.metadata.status === 'declined') {
    return (
      <Fragment>
        {
          isPublicViewer(nda, user) || isNdaRecepient(nda, user) ? (
            <NDADisclaimerWrapper>
              <DisclaimerTitle>
                <BoldText>
                  {`You declined ${getFullNameFromUser(nda.owner)}'s request`}
                </BoldText>
                {' '}
                to sign this NDA
              </DisclaimerTitle>
            </NDADisclaimerWrapper>
          ) : null
        }
      </Fragment>
    );
  }

  return (
    <Fragment>
      {
        isPublicViewer(nda, user) || isNdaRecepient(nda, user) ? (
          <NDADisclaimerWrapper>
            <DisclaimerTitle>
              <BoldText>{getFullNameFromUser(nda.owner)}</BoldText>
              {' '}
              has requested your signature
            </DisclaimerTitle>
          </NDADisclaimerWrapper>
        ) : null
      }

      {
        isPublicViewer(nda, user) || isNdaRecepient(nda, user) ? (
          <NDADisclaimerWrapper>
            <DisclaimerBody>
              By signing, both
              {' '}
              <BoldText>you</BoldText>
              {' '}
              and
              {' '}
              <BoldText>{getFullNameFromUser(nda.owner)}</BoldText>
              {' '}
              are agreeing to terms of an NDA to
              {' '}
              <BoldText>protect all parties and materials disclosed</BoldText>
              .
            </DisclaimerBody>
          </NDADisclaimerWrapper>
        ) : null
      }

      {
        isNdaOwner(nda, user) ? (
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
        ) : null
      }

      {
        isNdaOwner(nda, user) ? (
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
              <BoldText>protect all parties and materials disclosed</BoldText>
              .
            </DisclaimerBody>
          </NDADisclaimerWrapper>
        ) : null
      }
    </Fragment>
  );
};

const NDAActions = ({ nda, user }) => {
  const toast = useAlert();

  const [isDeclining, setDeclining] = useState(false);

  const handleDeclineClick = async () => {
    setDeclining(true);

    try {
      const api = new API();
      await api.declineNda(nda.ndaId);

      Router.replaceRoute('nda', { ndaId: nda.ndaId });

      toast.show('Successfully declined NDA');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.show('Failed to decline NDA');
    } finally {
      setDeclining(false);
    }
  };
  const onDeclineClick = useCallback(handleDeclineClick);

  return (
    <Fragment>
      {
        isNdaOwner(nda, user) ? (
          <DeclineButtonWrapper>
            <Button compact color="#7254B7">Resend</Button>
            <Button compact color="#dc564a">Revoke</Button>
          </DeclineButtonWrapper>
        ) : null
      }

      {
        (
          nda.metadata.status !== 'declined'
          && (isPublicViewer(nda, user) || isNdaRecepient(nda, user))
        ) ? (
          <DeclineButtonWrapper>
            <Button
              compact
              color="#dc564a"
              onClick={onDeclineClick}
            >
              {
                isDeclining ? (
                  <Spinner color="#FFFFFF" size={14} />
                ) : 'Decline'
              }
            </Button>
          </DeclineButtonWrapper>
          ) : null
      }
    </Fragment>
  );
};

const NDAAttachments = ({ nda, user }) => {
  if (nda.metadata.status === 'declined') {
    return (
      <AttachmentSectionContainer>
        <AttachmentTitle>Attachments</AttachmentTitle>
        <AttachmentMessage declined>
          You declined to view the enclosed attachments.
        </AttachmentMessage>
      </AttachmentSectionContainer>
    );
  }

  return (
    <Fragment>
      {
        isNdaOwner(nda, user) ? (
          <AttachmentSectionContainer>
            <AttachmentTitle>Attachments</AttachmentTitle>
            <LinkWrapper>
              <HideIcon src="/static/hideIcon.svg" alt="hidded icon" />
              <DocumentUrl>{nda.metadata.secretLinks[0]}</DocumentUrl>
            </LinkWrapper>
            <DescriptionTitle>
              Recipient does not have access to your link unless he accepts the
              terms of the NDA.
            </DescriptionTitle>
          </AttachmentSectionContainer>
        ) : null
      }

      {
        isPublicViewer(nda, user) || isNdaRecepient(nda, user) ? (
          <AttachmentSectionContainer>
            <AttachmentTitle>Attachments</AttachmentTitle>
            <AttachmentMessage>
              You need to accept to view attachments.
            </AttachmentMessage>
          </AttachmentSectionContainer>
        ) : null
      }
    </Fragment>
  );
};

const NDASigPads = ({ nda, user, isSubmitting }) => {
  const ownerFullName = getFullNameFromUser(nda.owner);

  const ownerCompanyName = extractCompanyNameFromText(
    nda.metadata.ndaParamaters.disclosingParty,
    ownerFullName,
  );
  const recipientCompanyName = extractCompanyNameFromText(
    nda.metadata.ndaParamaters.receivingParty,
    nda.metadata.recipientFullName,
  );

  if (nda.metadata.status === 'declined') {
    return (
      <SigRow>
        <PartyWrapper>
          <SignatureHolder name={null} />
          <NDAPartyName>{nda.metadata.recipientFullName}</NDAPartyName>
          {
            recipientCompanyName ? (
              <NDAPartyOrganization>{recipientCompanyName}</NDAPartyOrganization>
            ) : null
          }
        </PartyWrapper>

        <PartyWrapper>
          <SignatureHolder name={ownerFullName} />
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

  return (
    <SigRow>
      {
        isPublicViewer(nda, user) || isNdaRecepient(nda, user) ? (
          <PartyWrapper>
            <LinkedInButton
              type="submit"
              disabled={isSubmitting}
            >
              {
                isSubmitting ? (
                  <Spinner color="#FFFFFF" size={14} />
                ) : 'Sign with LinkedIn'
              }
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
        ) : null
      }

      {
        isNdaOwner(nda, user) ? (
          <PartyWrapper>
            <SignatureHolder name={null} />
            <NDAPartyName>{nda.metadata.recipientFullName}</NDAPartyName>
            {
              recipientCompanyName ? (
                <NDAPartyOrganization>{recipientCompanyName}</NDAPartyOrganization>
              ) : null
            }
          </PartyWrapper>
        ) : null
      }

      <PartyWrapper>
        <SignatureHolder name={ownerFullName} />
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
};


const NDA = ({ user, nda }) => {
  const router = useRouter();
  const handleSubmit = (
    values,
    {
      setStatus,
      setSubmitting,
    },
  ) => {
    setStatus();

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
      // eslint-disable-next-line no-console
      console.error(error);
      setStatus({ errorMessage: error.message });
    } finally {
      // Keep the spinner running during the transition to LinkedIn oAuth
      // This is much better UX than spinner flickering momentarily before
      // we navigate away
      timeout(5000).then(() => setSubmitting(false));
    }
  };
  const onSubmit = useCallback(handleSubmit, []);

  if (user && !isNdaParty(nda, user)) {
    return (
      <Container>
        You are not a party.
      </Container>
    );
  }

  return (
    <Container>
      <UserActionBanner
        user={user}
        actionButton={() => (
          <Link route="/dashboard/incoming">
            <ButtonAnchor outline>
              Dashboard
            </ButtonAnchor>
          </Link>
        )}
      />

      <NDAActions user={user} nda={nda} />

      <Formik
        initialValues={{}}
        onSubmit={onSubmit}
      >
        {({ status, isSubmitting }) => (
          <Form>
            <NDADocumentContainer>
              <NDAContainer>
                <NDAWrapper>

                  <NDAHeader user={user} nda={nda} />
                  <NDABody nda={nda} />

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
