import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import getConfig from 'next/config';

import {
  Formik,
  Form,
} from 'formik';

import Router from 'next/router';

import loggerClient from '../../db/loggerClient';

import NDABody from './NDABody';
import Button from '../Clickable/Button';
import AnchorButton from '../Clickable/AnchorButton';
import Footer from '../Footer/Footer';
import SignatureHolder from '../SignatureHolder/SignatureHolder';
import UserActionBanner from '../UserActionBanner/UserActionBanner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FieldErrorMessage from '../ErrorMessage/FieldErrorMessage';

import * as sessionStorage from '../../lib/sessionStorage';
import { timeout, scrollToTop } from '../../util';
import fillInNdaBlanks from '../../utils/fillInNdaBlanks';

import HideImg from './images/hide.svg';

import getFullNameFromUser from './getFullNameFromUser';

import NdaifyService from '../../services/NdaifyService';

const { publicRuntimeConfig: { NDAIFY_SOLICIT_PAYMENTS } } = getConfig();

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

const NDASenderDisclaimer = styled.span`
  font-size: 12px;
  color: var(--ndaify-accents-6);
  margin-top: 8px;
  line-heitgh: 20px;
`;

const AttachmentSectionContainer = styled.div`
`;

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

const DisclaimerTitle = styled.h4`
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

export const extractCompanyNameFromText = (text, personName) => {
  if (!text || !personName) {
    return null;
  }
  const lowerCaseText = text.toLowerCase();
  const lowerCasePersonName = personName.toLowerCase();

  if (lowerCaseText === lowerCasePersonName) {
    return null;
  }

  if (lowerCaseText.startsWith(`${lowerCasePersonName},`)) {
    const [, ...parts] = text.split(',');
    return parts.join().trim();
  }

  return text;
};

const NDAComposer = ({ ndaTemplate, user, nda }) => {
  const [expandedBody, setExpandedBody] = useState(false);

  const handleDiscardButtonClick = () => {
    Router.replace('/').then(scrollToTop);

    sessionStorage.clear();
  };
  const onDiscardButtonClick = useCallback(handleDiscardButtonClick, []);

  const handleSubmit = async (
    values,
    {
      setStatus,
    },
  ) => {
    // clear all error messages before retrying
    setStatus();

    const ndaifyService = new NdaifyService();

    if (!expandedBody) {
      setStatus({ errorMessage: 'Please expand the NDA to read all terms' });
      return;
    }

    try {
      const ndaPayload = {
        ...nda,
        metadata: {
          ...nda.metadata,
          ndaParamaters: {
            ...values,
          },
        },
      };

      sessionStorage.setItem('nda', ndaPayload);

      // Pretend like we are doing some work before moving to next step
      // This is much better UX than just navigating away from the form
      await timeout(1000);

      if (NDAIFY_SOLICIT_PAYMENTS === 'on') {
        Router.replace('/nda/pay').then(scrollToTop);
      } else {
        const response = await ndaifyService.createNda(ndaPayload);

        Router.replace('/nda/sent/[ndaId]', `/nda/sent/${response.nda.ndaId}`).then(scrollToTop);
      }
    } catch (error) {
      loggerClient.error(error);
      setStatus({ errorMessage: error.message });
    }
  };
  const onSubmit = useCallback(handleSubmit, [expandedBody, nda]);

  const handleFormValidate = (values) => {
    const errors = {};

    const fieldNames = Object.keys(values);

    // check for blank-ness one at a time
    for (let ii = 0; ii < fieldNames.length; ii += 1) {
      const fieldName = fieldNames[ii];
      const value = values[fieldName];

      if (!value) {
        errors[fieldName] = 'You must fill in the blanks in the NDA';
        break;
      }
    }

    return errors;
  };
  const onFormValidate = useCallback(handleFormValidate, []);

  const ownerFullName = getFullNameFromUser(user);

  const variables = {
    // eslint-disable-next-line no-template-curly-in-string
    '${proposingParty}': ownerFullName,
    // eslint-disable-next-line no-template-curly-in-string
    '${consentingParty}': nda.metadata.recipientFullName,
  };

  const initialValues = fillInNdaBlanks(ndaTemplate.data.blanks, variables);

  const { recipientFullName } = nda.metadata;

  return (
    <Container>
      <UserActionBanner
        user={user}
        actionButton={() => (
          <Button
            compact
            color="var(--ndaify-accents-danger)"
            onClick={onDiscardButtonClick}
          >
            Discard
          </Button>
        )}
      />

      <Formik
        initialValues={initialValues}
        validate={onFormValidate}
        validateOnChange={false}
        validateOnBlur={Object.keys(initialValues).length > 1}
        onSubmit={onSubmit}
      >
        {({
          values, status, setStatus, isSubmitting,
        }) => {
          const ownerCompanyName = extractCompanyNameFromText(
            values.proposingParty,
            ownerFullName,
          );
          const recipientCompanyName = extractCompanyNameFromText(
            values.consentingParty, nda.metadata.recipientName,
          );

          const fieldKeys = Object.keys(values);

          return (
            <Form>
              <NDADocumentContainer>
                <NDAContainer>
                  <NDAWrapper>

                    <NDADisclaimerWrapper>
                      <DisclaimerTitle>
                        <BoldText>Almost done.</BoldText>
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
                        <BoldText>{recipientFullName}</BoldText>
                        {' '}
                        are agreeing to terms of an NDA to
                        {' '}
                        <BoldText>protect all parties and materials disclosed</BoldText>
                        .
                      </DisclaimerBody>
                    </NDADisclaimerWrapper>

                    <NDABody
                      editable
                      expanded={expandedBody}
                      ndaTemplate={ndaTemplate}
                      nda={{
                        ...nda,
                        owner: user,
                      }}
                    />

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
                                setExpandedBody(true);
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
                    status ? (
                      <ErrorMessage style={{ marginBottom: '3pc' }}>
                        {status.errorMessage}
                      </ErrorMessage>
                    ) : null
                  }

                  {
                    fieldKeys.map((fieldKey) => (
                      <FieldErrorMessage
                        key={fieldKey}
                        style={{ marginBottom: '3pc' }}
                        name={fieldKey}
                        component="div"
                      />
                    ))
                  }

                  <SigRow>
                    <PartyWrapper>
                      <SignatureHolder />
                      <NDAPartyName>{nda.metadata.recipientName}</NDAPartyName>
                      <NDAPartyOrganization>{recipientCompanyName}</NDAPartyOrganization>
                    </PartyWrapper>
                    <PartyWrapper>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        style={{ backgroundColor: 'var(--ndaify-accents-success)' }}
                        spin={isSubmitting}
                      >
                        Sign
                      </Button>
                      <NDAPartyName>{ownerFullName}</NDAPartyName>
                      <NDAPartyOrganization>{ownerCompanyName}</NDAPartyOrganization>
                      <NDASenderDisclaimer>
                        I,
                        {' '}
                        {ownerFullName}
                        , certify that I have read the contract,
                        {' '}
                        and understand that clicking &#39;Sign&#39;
                        {' '}
                        constitutes a legally binding signature.
                      </NDASenderDisclaimer>
                    </PartyWrapper>
                  </SigRow>

                  <AttachmentSectionContainer>
                    <AttachmentTitle>Attachments</AttachmentTitle>
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
                      Recipient does not have access to your link unless they accept the
                      terms of the NDA.
                    </DescriptionTitle>
                  </AttachmentSectionContainer>

                  <Footer withLogo />
                </NDAContainer>
              </NDADocumentContainer>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default NDAComposer;
