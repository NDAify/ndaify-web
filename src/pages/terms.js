import React, { useMemo } from 'react';
import grayMatter from 'gray-matter';
import { useIntl, defineMessage } from 'react-intl';

import { PageTitle, PageDescription } from '../components/Head/Head';
import LegalPolicyImpl from '../components/LegalPolicy/LegalPolicy';

const LEGAL_TEXT = `---
title: Terms of Use
lastUpdatedAt: June 15, 2019
---

IMPORTANT NOTICE: THIS AGREEMENT CONTAINS A BINDING ARBITRATION PROVISION AND CLASS ACTION WAIVER. IT AFFECTS YOUR LEGAL RIGHTS AS DETAILED IN THE ARBITRATION AND CLASS ACTION WAIVER SECTION BELOW. PLEASE READ CAREFULLY.

# ACCEPTANCE OF THESE TERMS
Welcome to Ndaify. These Terms of Service (“Terms”) are a legal agreement between you and Ndaify and its corporate affiliates, subsidiaries, and divisions as may change from time to time (collectively, “Ndaify,” “we,” “us,” and “our”). These Terms govern your access to, use of, and participation in the services, websites, software, and mobile or other applications offered by or through Ndaify (collectively, the “Service”). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. By accessing or using the Service you, your heirs, assigns, and successors (collectively, “you”) are indicating that you have read, understand, and agree to be bound by these Terms. If you do not agree to these Terms, then you must stop accessing or using the Service.

# MODIFICATIONS
We may revise these Terms from time to time to reflect changes to the Service, our users’ needs, our business priorities, or changes in laws and regulations. The most current version will always be on this page. If the revision, in our sole discretion, is material under applicable law, we will notify you via posting to our website. Except as set forth in the Arbitration and Class Action Waiver section below, by continuing to access or use the Service after those revisions become effective, you agree to be bound by the revised Terms. The Terms were most recently updated on the effective date listed at the top of this page.

# ADDITIONAL TERMS AND POLICIES
Please review our Privacy Policy, incorporated herein by reference, for information and notices concerning our collection and use of your information. Please review all policies that govern your use of the Service.

# ELIGIBILITY AND SCOPE
These Terms apply to all who access the Service (“Users”).

You may use the Service only if you can form a binding contract with us, and only in compliance with these Terms and all applicable local, state, national, and international laws, rules, and regulations.

You represent that you are over the age of thirteen (13) years old in the United States, sixteen (16) years old in the European Union, or fourteen (14) years old if you live in Spain or South Korea) (the “Minimum Age”). If you are over the Minimum Age, but under the legal age of majority, your parent or legal guardian must consent to these Terms and all other applicable policies, and affirm that they accept these Terms on behalf of, and bear all legal and financial responsibility and liability for the actions of, any child between the Minimum Age and majority, and expressly ratify and confirm any acts of any such child and all users of the account.

If you’re agreeing to these Terms on behalf of an organization or entity, you represent and warrant that you are authorized to agree to these Terms on that organization or entity’s behalf and bind them to these Terms (in which case, the references to “you” and “your” in these Terms, except for in this sentence, refer to that organization or entity). If we have previously prohibited you from accessing or using the Service, you are not permitted to access or use the Service.

# ACCOUNT REGISTRATION AND USE
You may be required to register for a password-protected account (“Account”) to use parts of the Service. You must provide accurate, current, and complete information during the registration and at all other times when you use the Service, and to update information to keep it accurate, current, and complete.

You are solely responsible for safeguarding your Account password. We encourage you to use a “strong” Account password (that is a minimum of eight characters and that is not among the 10,000 most common passwords). You are solely responsible for all activity that occurs on your Account, and we may assume that any communications we receive under your Account have been made by you. You must notify us immediately of any breach of security or unauthorized use of your Account. We will not be liable and you may be liable for losses, damages, liability, expenses, and lawyers’ fees incurred by us or a third party arising from someone else using your Account due to your conduct regardless of whether you have notified us of such unauthorized use. You understand and agree that we may require you to provide information that may be used to confirm your identity and help ensure the security of your Account.

# RULES AND PROHIBITIONS
You may not use the Service to and you represent and warrant that any User Content (as defined below) that you post does not:

- violate any law or to promote any illegal activities, including, but not limited to the submission of inappropriate or unlawful content to or through the Service;

- obtain or attempt to obtain unauthorized access to the Service or to our servers, systems, network, or data; scrape, access in violation of these Terms, monitor, index, frame, link, copy, or search (or attempt to do so) the Service by any means (automated or non-automated) other than through currently available, published interfaces that we provide (and only pursuant to these Terms) (crawling the Service is permissible in accordance with these Terms, but scraping the Service without our prior written consent is expressly prohibited);

- use another person’s Account, impersonate any person or entity; or forge or manipulate headers or identifiers to disguise the origin of any content transmitted through the Service;

- interfere with or disrupt the Service or servers, systems or networks connected to the Services in any way;

- in any way violate any copyrights, trade secrets, or other rights of any third party, including privacy or publicity rights;

- spam anyone;

- collect, harvest, or publish any personally identifiable information, including, but not limited to, names or other account information, from the Service;

- conduct any commercial solicitation purposes without our written permission;

- make available viruses or any other computer code, files, programs or content designed to interrupt, destroy or limit the functionality of the Services, data, or affect other users;

- engage in conduct or post User Content that is libelous, defamatory, abusive, threatening, harassing, hateful, obscene, offensive, humiliating to other people (publicly or otherwise), or otherwise violates any law or right of any third party;

- degrade or discriminate against others on the basis of gender, race, class, ethnicity, national origin, religion, sexual preference, disability, or any other sensitive classification;

- share other people's private or personally identifiable information without their express authorization and permission;

- undertake any activity or engage in any conduct that is inconsistent with the business or purpose of the Service;

- probe, scan, or test the vulnerability of any system or network or breach or circumvent any security or authentication measures we may use to prevent or restrict access to the Service or use of the Service or the content therein; or

- attempt to indirectly undertake any of the foregoing.

# USER CONTENT
Areas of the Service allow you to submit, post, upload, publish, submit, transfer, link, display, or otherwise make available (hereinafter, “post”) information, text, graphics, photograph, audio, video, postings, reviews, designs, inventions, or other materials (“User Content”) that may or may not be viewable by other Users. User Content must comply with these Terms. You retain ownership of all intellectual property rights you have in the User Content you post on the Service.

By posting User Content on or through the Service, you grant us a worldwide, irrevocable, perpetual, non-exclusive, transferable, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display, distribute, and otherwise exploit such User Content in any format or medium now known or developed in the future, in order to provide the Service, subject to applicable law and our Privacy Policy. Your User Content will not be used for publicity, advertising, or any public statements without your prior consent. The license granted to us shall survive termination of the Service or your Account. Notwithstanding the User Content license and for avoidance of doubt, our use and retention of your personal data, including any that is contained in User Content, shall also be governed by and comply with our Privacy Policy. You represent, warrant and agree that you have the necessary rights to grant us the license described in this Section for any User Content that you post.

You agree that this license includes the right for other Users with permitted access to your User Content to use your User Content in conjunction with participation in the Service and as permitted through the functionality of the Service.

Your User Content will be viewable by other Users of the Service. You should only provide User Content that you are comfortable sharing with others under these Terms. We take no responsibility and assume no liability for any User Content that you or any other User or third-party posts. You shall be solely responsible for your own User Content and the consequences of posting or publishing it, and you agree that we are only acting as a passive conduit for your online distribution and publication of your User Content.

We reserve the right in our sole discretion to remove or disable access to any User Content from the Service, suspend or terminate your account at any time, or pursue any other remedy or relief available under equity or law if you post any User Content that violates these Terms or we consider to be objectionable for any reason. You agree that we may proofread, summarize, or otherwise edit and/or withdraw your User Content (but does not assume the obligation), and you understand it remains your sole responsibility to monitor your User Content and ensure that such edited content is accurate and consistent with your representations and warranties in these Terms.

We reserve the right to access, read, preserve, and disclose any information as we reasonably believe is necessary to (i) satisfy any applicable law, regulation, legal process, or governmental request, (ii) enforce the Terms, including investigation of potential violations hereof, (iii) detect, prevent, or otherwise address fraud, security, or technical issues, (iv) respond to user support requests, or (v) protect the rights, property or safety of the Ndaify, its users and the public.

Ndaify hosts a wide array of legal forms and agreements that are uploaded by the many legal experts in our network. While we always aim to ensure that our forms and templates are accurate and up-to-date, we ultimately do not control the content uploaded by our Users. It is your responsibility to check any documents for accuracy and ensure they are fit for purpose. While many of our forms and agreements may be deployed as is, you should consult a legal professional depending on your specific facts and circumstances. Ndaify is not a law firm, does not provide legal services or advice, and does not provide legal representation.

You understand that we do not control, and are not responsible for, User Content, and that by using the Service, you may be exposed to User Content from other Users that is offensive, indecent, inaccurate, misleading, or otherwise objectionable. Please also note that User Content may contain typographical or other inadvertent errors or inaccuracies.

# NDAIFY’S LICENSE TO YOU
Subject to your compliance with these Terms, Ndaify grants you a limited, non-exclusive, non-assignable, non-sub-licensable, revocable, license to use the Service as it is provided to you and reproduce and display User Content and content published by Ndaify (collectively, “Collective Content”) for your personal and professional use and only in connection with your access to and participation in the Service and only in a manner that complies with all legal requirements that apply to you or your use of the Service, including those relating to data security and data privacy, such as those specified in the Privacy Policy. We may revoke this license at any time, in our sole discretion. Upon such revocation, you must promptly destroy all materials downloaded or otherwise obtained from the Service, as well as all copies of such materials, whether made in accordance with these Terms or otherwise.

You will not use, copy, adapt, modify, prepare derivative works based upon, distribute, license, sell, transfer, publicly display, publicly perform, transmit, stream, broadcast, or otherwise exploit the Service or Collective Content, except as expressly permitted in these Terms. The Service and Collective Content are provided to you AS IS. If you download or print a copy of the Service or Collective Content for personal use, you must retain all copyright and other proprietary notices contained thereon. No licenses or rights are granted to you by implication or otherwise under any intellectual property rights owned or controlled by Ndaify or its licensors, except for the licenses and rights expressly granted in these Terms.

While we strive to create the most user-friendly and collaborative experience possible, all aspects of the Service are subject to change or elimination at our sole discretion.

# ACCOUNT SUSPENSION OR TERMINATION
We may, in our discretion, with or without cause, with or without prior notice and at any time, decide to limit, block, suspend, deactivate, or cancel your Account in whole or in part. If we exercise our discretion under these Terms to do so, any or all of the following can occur with or without prior notice or explanation to you: (a) your Account will be deactivated or suspended, your password will be disabled, and you will not be able to access the Service or your User Content, or receive assistance from our support teams; and (b) if appropriate in our sole discretion, we may communicate to other Users that your Account has been terminated, blocked, suspended, deactivated, or cancelled, and why this action has been taken. You may cancel your use of the Service and/or terminate your Account at any time by emailing our support team ([support@ndaify.com](mailto:support@ndaify.com)). Please note that if your Account is cancelled, we do not have an obligation to delete or return to you any User Content you have posted to the Service unless otherwise required under applicable law.

# PROPRIETARY RIGHTS
All right, title, and interest in and to the Service (excluding your User Content), are and will remain the exclusive property of Ndaify and its licensors. All materials therein, including, without limitation, software, images, text, graphics, illustrations, logos, patents, trademarks, service marks, copyrights, photographs, audio, videos, music, and all intellectual property rights related thereto, are the exclusive property of Ndaify and its licensors (including other Users who post User Content to the Service). The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. You acknowledge that the Service has been developed, compiled, prepared, revised, selected, and arranged by Ndaify and others through the application of methods and standards of judgment developed and applied through the expenditure of substantial time, effort, and money and constitute valuable intellectual property. Except as explicitly provided herein, nothing in these Terms gives you a right to use the Ndaify name or any of the Ndaify trademarks, logos, domain names and other distinctive brand features. Any other trademarks, service marks, logos, trade names and any other proprietary designations are the trademarks or registered trademarks of their respective owners.

Any feedback, comments, questions, or suggestions (collectively, “Feedback”) you may provide regarding the Service is entirely voluntary and we will be free to use such feedback, comments or suggestions without any obligation to you. By sending us any Feedback, you further (i) agree that we are under no obligation of confidentiality, express or implied, with respect to the Feedback; (ii) acknowledge that we may have something similar to the Feedback already under consideration or in development; (iii) grant us an irrevocable, non- exclusive, royalty-free, perpetual, worldwide license to use, modify, prepare derivative works, publish, distribute, and sublicense the Feedback; and (iv) irrevocably waive, and cause to be waived, against Ndaify and its Users any claims and assertions of any moral rights contained in such Feedback. These provisions regarding Feedback shall survive any termination of your Account or the Service.

# DMCA NOTICE
It is our policy to respond to alleged infringement notices that comply with the Digital Millennium Copyright Act of 1998 (“DMCA”). If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible via the Service, please notify our copyright agent. For your complaint to be valid under the DMCA, you must provide the following information in writing:

- An electronic or physical signature of a person authorized to act on behalf of the copyright owner.

- Identification of the copyrighted work that you claim has been infringed.

- Identification of the material that is claimed to be infringing and where it is located on the Service

- Information reasonably sufficient to permit us to contact you, such as your address, telephone number, and email address.

- A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or law.

- A statement, made under penalty of perjury, that the above information is accurate, and that you are the copyright owner or are authorized to act on behalf of the owner.

The above information must be submitted to the following copyright agent: [support@ndaify.com](mailto:support@ndaify.com)

UNDER FEDERAL LAW, IF YOU KNOWINGLY MISREPRESENT THAT ONLINE MATERIAL IS INFRINGING, YOU MAY BE SUBJECT TO CRIMINAL PROSECUTION FOR PERJURY AND CIVIL PENALTIES, INCLUDING MONETARY DAMAGES, COURT COSTS, AND ATTORNEYS' FEES.

Please note that this procedure is exclusively for notifying Ndaify and its affiliates that your copyrighted material has been infringed. The preceding requirements are intended to comply with Ndaify’s rights and obligations under the DMCA, including 17 U.S.C. §512(c), but do not constitute legal advice. It may be advisable to contact an attorney regarding your rights and obligations under the DMCA and other applicable laws. In accordance with the DMCA and other applicable law, we have adopted a policy of, in appropriate circumstances and at our sole discretion, terminating the Account or access of Users who are deemed to be infringers or repeat infringers.

# WARRANTIES AND DISCLAIMERS
Your access to and use of the Service or any User Content is at your own risk. You understand and agree that the Service is provided to you on an “AS IS” and “AS AVAILABLE” basis. Without limiting the foregoing, NDAIFY AND ITS AFFILIATES AND SUBSIDIARIES, AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS DISCLAIM ANY WARRANTIES, EXPRESS OR IMPLIED, OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT, OR NON-INFRINGEMENT. We make no warranty and disclaim all responsibility and liability for the completeness, accuracy, availability, timeliness, security, or reliability of the Service or any content thereon. We will not be responsible or liable for any harm to your computer system, loss of data, or other harm that results from your access to or use of the Service, or any User Content. You also agree that Ndaify has no responsibility or liability for its deletion of, or the failure to store, retain, or transmit, any User Content and other communications maintained by the Service. We make no warranty that the Service will meet your requirements or be available on an uninterrupted, secure, or error-free basis. No advice or information, whether oral or written, obtained from Ndaify or through the Service, will create any warranty not expressly made herein.

YOU ARE SOLELY RESPONSIBLE FOR ALL OF YOUR COMMUNICATIONS AND INTERACTIONS WITH OTHER USERS OF THE SERVICE AND WITH OTHER PERSONS WITH WHOM YOU COMMUNICATE OR INTERACT AS A RESULT OF YOUR USE OF THE SERVICE. YOU UNDERSTAND THAT WE DO NOT MAKE ANY ATTEMPT TO VERIFY THE STATEMENTS OF USERS OF THE SERVICE. WE MAKE NO REPRESENTATIONS OR WARRANTIES AS TO THE CONDUCT OF USERS OF THE SERVICE OR THEIR COMPATIBILITY WITH ANY CURRENT OR FUTURE USERS OF THE SERVICE. YOU AGREE TO TAKE REASONABLE PRECAUTIONS IN ALL COMMUNICATIONS AND INTERACTIONS WITH OTHER USERS OF THE SERVICE AND WITH OTHER PERSONS WITH WHOM YOU COMMUNICATE OR INTERACT AS A RESULT OF YOUR USE OF THE SERVICE, PARTICULARLY IF YOU DECIDE TO MEET OFFLINE OR IN PERSON. WE EXPLICITLY DISCLAIM ALL LIABILITY FOR ANY ACT OR OMISSION OF ANY USERS OR THIRD PARTIES.

The Service is controlled and operated from its facilities in the United States. We make no representations that the Service is appropriate or available for use in other locations. Those who access or use the Service from other jurisdictions do so at their own volition and are entirely responsible for compliance with all applicable United States and local laws and regulations, including but not limited to export and import regulations. You may not use the Service if you are a resident of a country embargoed by the United States, or are a foreign person or entity blocked or denied by the United States government. Unless otherwise explicitly stated, all materials found on the Service are solely directed to individuals, companies, or other entities located in the United States.

# LIMITATION OF LIABILITY
TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NDAIFY AND ITS AFFILIATES AND SUBSIDIARIES, AND THEIR RESPECTIVE OFFICERS, EMPLOYEES, AGENTS, PARTNERS AND LICENSORS WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOOD-WILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (i) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (ii) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE, INCLUDING WITHOUT LIMITATION, ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF OTHER USERS OR THIRD PARTIES; (iii) ANY CONTENT OBTAINED FROM THE SERVICE; AND (iv) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE) OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.

THE LIMITATION OF LIABILITY DESCRIBED ABOVE SHALL APPLY FULLY TO RESIDENTS OF NEW JERSEY.

Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages, so the limitations above may not apply to you.

# INDEMNIFICATION
TO THE FULL EXTENT PERMITTED BY LAW, YOU AGREE TO RELEASE, DEFEND, INDEMNIFY, AND HOLD Ndaify AND ITS AFFILIATES AND SUBSIDIARIES, AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES AND AGENTS, HARMLESS FROM AND AGAINST ANY CLAIMS, LIABILITIES, DAMAGES, LOSSES, AND EXPENSES, INCLUDING WITHOUT LIMITATION REASONABLE LEGAL AND ACCOUNTING FEES, ARISING OUT OF OR IN ANY WAY CONNECTED WITH (A) YOUR ACCESS TO OR USE OF THE SERVICE OR YOUR VIOLATION OF THESE TERMS; (B) YOUR USER CONTENT OR THE COLLECTIVE CONTENT; AND (C) YOUR INTERACTION WITH ANY USER.

If you are a California resident, you hereby waive California Civil Code §1542, which says: "A general release does not extend to claims which the creditor does not know or suspect to exist in his favor at the time of executing the release, which if known by him must have materially affected his settlement with the debtor." This release includes the criminal acts of others. If you are not a California resident, you waive your rights under any statute or common law principle similar to Section 1542 that governs your rights in the jurisdiction of your residence.

# ARBITRATION AND CLASS ACTION WAIVER
PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.

You and Ndaify agree that these Terms affect interstate commerce and that the Federal Arbitration Act governs the interpretation and enforcement of these arbitration provisions.

This Section is intended to be interpreted broadly and governs any and all disputes between us, including but not limited to claims arising out of or relating to any aspect of the relationship between us, whether based in contract, tort, statute, fraud, misrepresentation or any other legal theory; claims that arose before these Terms or any prior agreement (including, but not limited to, claims related to your use of the Service); and claims that may arise after the termination of these Terms or agreement to arbitrate. The only disputes excluded from this broad prohibition are the litigation of certain intellectual property and small court claims, as provided below.

By agreeing to these Terms, you agree to resolve any and all disputes with us as follows:

Initial Dispute Resolution: Most disputes can be resolved without resort to litigation. You can reach our support team at [support@ndaify.com](mailto:support@ndaify.com). Except for intellectual property and small claims court claims, the parties agree to use their best efforts to settle any dispute, claim, question, or disagreement directly through consultation with our support department, and good faith negotiations shall be a condition to either party initiating a lawsuit or arbitration.

Binding Arbitration: If the parties do not reach an agreed-upon solution within a period of thirty (30) days from the time informal dispute resolution is initiated under the Initial Dispute Resolution provision above, then either party may initiate binding arbitration as the sole means to resolve claims, subject to the terms set forth below. Specifically, all claims arising out of or relating to these Terms (including the Terms’ or Privacy Policy's formation, performance, and breach), the parties' relationship with each other, and/or your use of the Service shall be finally settled by binding arbitration administered by JAMS in accordance with the JAMS Streamlined Arbitration Procedure Rules for claims that do not exceed $250,000 and the JAMS Comprehensive Arbitration Rules and Procedures for claims exceeding $250,000 in effect at the time the arbitration is initiated, excluding any rules or procedures governing or permitting class actions. The arbitrator, and not any federal, state, or local court or agency, shall have exclusive authority to resolve all disputes arising out of or relating to the interpretation, applicability, enforceability, or formation of these Terms or the Privacy Policy, including but not limited to any claim that all or any part of these Terms or Privacy Policy is void or voidable, whether a claim is subject to arbitration, or the question of waiver by litigation conduct. The arbitrator shall be empowered to grant whatever relief would be available in a court under law or in equity. The arbitrator's award shall be written and shall be binding on the parties and may be entered as a judgment in any court of competent jurisdiction. To start an arbitration, you must do the following: (a) write a Demand for Arbitration that includes a description of the claim and the amount of damages you seek to recover (you may find a copy of a Demand for Arbitration at www.jamsadr.com); (b) send three copies of the Demand for Arbitration, plus the appropriate filing fee, to JAMS, 160 W. Santa Clara Street, Suite 1600, San Jose, California 95113; and (c) send one copy of the Demand for Arbitration to Ndaify’s headquarters.

You will be required to pay $250 to initiate an arbitration against us. If the arbitrator finds the arbitration to be non-frivolous, Ndaify will pay all other fees invoiced by JAMS, including filing fees and arbitrator and hearing expenses. You are responsible for your own attorneys' fees unless the arbitration rules and/or applicable law provide otherwise.

The parties understand that, absent this mandatory arbitration provision, they would have the right to sue in court and have a jury trial. They further understand that, in some instances, the costs of arbitration could exceed the costs of litigation and the right to discovery may be more limited in arbitration than in court.

If you are a resident of the United States, arbitration may take place in the county where you reside at the time of filing. For individuals residing outside the United States, arbitration shall be initiated in the State of California, United States of America. You and Ndaify further agree to submit to the personal jurisdiction of any federal or state court in Santa Clara County, California in order to compel arbitration, to stay proceedings pending arbitration, or to confirm, modify, vacate, or enter judgment on the award entered by the arbitrator.

Class Action Waiver: The parties further agree that the arbitration shall be conducted in their individual capacities only and not as a class action or other representative action, and the parties expressly waive their right to file a class action or seek relief on a class basis. YOU AND Ndaify AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. If any court or arbitrator determines that the class action waiver set forth in this paragraph is void or unenforceable for any reason or that an arbitration can proceed on a class basis, then the arbitration provisions set forth above shall be deemed null and void in their entirety and the parties shall be deemed to have not agreed to arbitrate disputes.

Exception: Litigation of Intellectual Property and Small Claims Court Claims: Notwithstanding the parties' decision to resolve all disputes through arbitration, either party may bring enforcement actions, validity determinations or claims arising from or relating to theft, piracy or unauthorized use of intellectual property in state or federal court or in the U.S. Patent and Trademark Office to protect its intellectual property rights ("intellectual property rights" means patents, copyrights, moral rights, trademarks, and trade secrets, but not privacy or publicity rights). Either party may also seek relief in a small claims court for disputes or claims within the scope of that court's jurisdiction.

30-Day Right to Opt Out: You have the right to opt out and not be bound by the arbitration and class action waiver provisions set forth above by sending (from the email address you used to register for your account) written notice of your decision to opt out to [support@ndaify.com](mailto:support@ndaify.com) with the subject line, "ARBITRATION AND CLASS ACTION WAIVER OPT-OUT." The notice must be sent within thirty (30) days of your first use of the Service or the effective date of the first set of Terms containing an Arbitration and Class Action Waiver section, whichever is later; otherwise, you shall be bound to arbitrate disputes in accordance with the terms of these paragraphs. If you opt out of these arbitration provisions, we also will not be bound by them.

Changes to This Section: Ndaify will provide thirty (30) days’ notice of any changes to this section by posting on the Service, sending you a message, or otherwise notifying you when you are logged into your account. Amendments will become effective thirty (30) days after they are posted on the Service or sent to you.

Changes to this section will otherwise apply prospectively only to claims arising after the thirtieth (30th) day. If a court or arbitrator decides that this subsection on "Changes to This Section" is not enforceable or valid, then this subsection shall be severed from the section entitled “Arbitration and Class Action Waiver,” and the court or arbitrator shall apply the first Arbitration and Class Action Waiver section in existence after you began using the Service.

Survival: This Arbitration and Class Action Waiver section shall survive any termination of your account or the Service.

# GENERAL
Governing Law. You agree that: (i) the Service shall be deemed solely based in California; and (ii) the Service shall be deemed a passive one that does not give rise to personal jurisdiction over Ndaify, either specific or general, in jurisdictions other than California. These Terms shall be governed in all respects by the internal substantive laws of the State of California, without regard to its conflict of laws principles. The application of the United Nations Convention on Contracts for the International Sale of Goods is expressly excluded. Except for claims that must be arbitrated pursuant to the Arbitration and Class Action Waiver section, any claim or dispute arising in connection with the Service shall be decided exclusively by a court of competent jurisdiction located in Santa Clara County, California, and you consent to the personal jurisdiction of and venue in such courts and waive any and all jurisdictional and venue defenses or objections otherwise available.

Entire Agreement. These Terms, together with the Privacy Policy and any other legal notices, amendments, and additional agreements or policies published on the Service, shall constitute the entire agreement between us concerning the Service. Except as set forth in the Arbitration and Class Action Waiver section, if any provision of these Terms is deemed invalid by a court of competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of these Terms, which shall remain in full force and effect. These Terms supersede and replace any prior agreements between you and Ndaify regarding the Service.

Section Headings. The section headings in these Terms are for convenience only and have no legal or contractual effect.

Waiver. No waiver of any term of this Agreement shall be deemed a further or continuing waiver of such term or any other term, and our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.

Force Majeure. Neither Ndaify nor you shall be liable to the other for any delay or failure in performance under the Terms arising out of a cause beyond its control and without its fault or negligence. Such causes may include but are not limited to fires, floods, earthquakes, strikes, unavailability of necessary utilities, blackouts, acts of God, acts of declared or undeclared war, acts of regulatory agencies, or national disasters.

No Third-Party Beneficiaries. You agree that, except as otherwise expressly provided in these Terms, there shall be no third-party beneficiaries to these Terms.

Transferability and Assignability. These Terms, and any rights and licenses granted hereunder, may not be transferred or assigned by you, but may be assigned by Ndaify without restriction. Any attempted transfer or assignment in violation hereof shall be null and void. These Terms bind and inure to the benefit of each party and the party’s successors and permitted assigns.

Notices. We may deliver notice to you by email, posting a notice on the Service, or any other method we choose and such notice will be effective on dispatch.

Contact us. Please contact us at [support@ndaify.com](mailto:support@ndaify.com) with any questions regarding these Terms.`;

const termsText = defineMessage({
  id: 'terms-legal-md',
  defaultMessage: LEGAL_TEXT,
});

const Terms = () => {
  const intl = useIntl();

  const legalTemplate = useMemo(
    () => grayMatter(intl.formatMessage(termsText), { language: 'yaml' }),
    [intl],
  );

  return (
    <>
      <PageTitle prepend="Terms of Use – " />
      <PageDescription />

      <LegalPolicyImpl legalTemplate={legalTemplate} />
    </>
  );
};

export default Terms;
