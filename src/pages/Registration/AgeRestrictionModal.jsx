import { Button, Modal } from "flowbite-react";
import Registration from "./registration";
import { useState } from "react";

const AgeRestrictionModal = ({
  openAgeRestrictionModal,
  setOpenAgeRestrictionModal,
  setOpenLoginModal,
}) => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const modalCloseHandler = () => {
    setOpenLoginModal(true);
    setOpenAgeRestrictionModal(false);
  };
  const handleAccept = () => {
    setOpenRegisterModal(true);
    setOpenAgeRestrictionModal(false);
  };

  return (
    <>
      {/* <Button onClick={() => setOpenAgeRestrictionModal(true)}>
        Toggle modal
      </Button> */}
      <Modal
        show={openAgeRestrictionModal}
        // onClose={() => setOpenAgeRestrictionModal(false)}
        onClose={() => modalCloseHandler()}
        size="6xl"
      >
        <Modal.Header>Terms of Use</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="container mx-auto my-0">
              <p className="pb-4">
                The AI oasis website located at AI oasis.com is a copyrighted
                work belonging to LustyGPT LTD. Certain features of the Site may
                be subject to additional guidelines, terms, or rules, which will
                be posted on the Site in connection with such features. All such
                additional terms, guidelines, and rules are incorporated by
                reference into these Terms.
              </p>
              <p className="pb-4">
                These Terms of Use describe the legally binding terms and
                conditions that oversee your use of the Site. BY LOGGING INTO
                THE SITE, YOU ARE BEING COMPLIANT THAT THESE TERMS and you
                represent that you have the authority and capacity to enter into
                these Terms. YOU SHOULD BE AT LEAST 18 YEARS OF AGE TO ACCESS
                THE SITE. IF YOU DISAGREE WITH ALL OF THE PROVISIONS OF THESE
                TERMS, DO NOT LOG INTO AND/OR USE THE SITE.
              </p>
              <p className="pb-4">
                These terms require the use of arbitration Section 10.2 on an
                individual basis to resolve disputes and also limit the remedies
                available to you in the event of a dispute.
              </p>
              <h2 className="text-xl font-medium pb-3">Access to the Site</h2>
              <p className="pb-4">
                Subject to these Terms. We grant you a non-transferable,
                non-exclusive, revocable, limited license to access the Site
                solely for your own personal, noncommercial use.
              </p>
              <p className="pb-4">
                We reserve the right to change, suspend, or cease the Site with
                or without notice to you. You approved that We will not be held
                liable to you or any third party for any change, interruption,
                or termination of the Site or any part.
              </p>
              <p className="pb-4">
                No Support or Maintenance. You agree that we will have no
                obligation to provide you with any support in connection with
                the Site.
              </p>
              <p className="pb-4">
                Excluding any User Content that you may provide, you are aware
                that all the intellectual property rights, including copyrights,
                patents, trademarks, and trade secrets, in the Site and its
                content are owned by We or We’s suppliers. Note that these Terms
                and access to the Site do not give you any rights, title or
                interest in or to any intellectual property rights, except for
                the limited access rights expressed in Section 2.1. We and its
                suppliers reserve all rights not granted in these Terms.
              </p>
              <h2 className="text-xl font-medium pb-3">Subscription Terms</h2>
              <p className="pb-4">
                Welcome to our subscription service (hereinafter referred to as
                the "Service"). This service is provided by AI oasis
                (hereinafter referred to as "we" or "the Company"). By using or
                subscribing to our service, you agree to comply with these
                Subscription Terms (hereinafter referred to as the "Terms").
              </p>
              <p className="pb-4">
                We will provide you with subscription-based services, including
                exclusive user quotas. The specific service offerings and fees
                may change at any time and will be updated through notifications
                via email or on our website.
              </p>
              <p className="pb-4">
                Subscription fees, payment methods, and payment cycles are
                detailed on the pricing page. Accounts with overdue payments
                will have their paid services temporarily suspended. All
                subscription fees are non-refundable unless required by law or
                at our sole discretion. You can cancel your subscription at any
                time. Upon cancellation, we will continue to provide services
                until the end of the current subscription period, but no refunds
                will be issued for fees already paid.
              </p>
              <p className="pb-4">
                We also reserve the right to unilaterally terminate or suspend
                your service in the following circumstances:
              </p>
              <div className="terms_list_item pb-4">
                <ul className="pl-5">
                  <li>Violation of these Terms</li>
                  <li>Non-payment of subscription fees</li>
                </ul>
              </div>
              <p className="pb-4">
                We will make every effort to provide high-quality services, but
                we do not make any express or implied warranties regarding the
                availability, accuracy, or completeness of the service.
              </p>
              <h2 className="text-xl font-medium pb-3">User Content</h2>
              <p className="pb-4">
                User Content. "User Content" means any and all information and
                content that a user submits to the Site. You are exclusively
                responsible for your User Content. You bear all risks associated
                with the use of your User Content. You hereby certify that your
                User Content does not violate our Acceptable Use Policy. You may
                not represent or imply to others that your User Content is in
                any way provided, sponsored or endorsed by We. Because you alone
                are responsible for your User Content, you may expose yourself
                to liability. We are not obliged to back up any User Content
                that you post; also, your User Content may be deleted at any
                time without prior notice to you. You are solely responsible for
                making your own backup copies of your User Content if you
                desire.
              </p>
              <p className="pb-4">
                This kind of content is not acceptable on our site
              </p>
              <div className="terms_list_item pb-4">
                <ul className="pl-5">
                  <li>Heavy gore</li>
                  <li>Bestiality</li>
                  <li>Sexual violence</li>
                </ul>
              </div>
              <p className="pb-4">
                Acceptable Use Policy. The following terms constitute our
                "Acceptable Use Policy": You agree not to use the Site to
                collect, upload, transmit, display, or distribute any User
                Content (i) that violates any third-party right or any
                intellectual property or proprietary right; (ii) that is
                unlawful, harassing, abusive, tortious, threatening, harmful,
                invasive of another’s privacy, defamatory, false, intentionally
                misleading, trade libellous, pornographic involving minors,
                patently offensive, promotes racism, bigotry, hatred, or
                physical harm of any kind against any group or individual; (iii)
                that is harmful to minors in any way; or (iv) that is in
                violation of any law, regulation, or obligations or restrictions
                imposed by any third party.
              </p>
              <p className="pb-4">
                In addition, you agree not to: (i) upload, transmit, or
                distribute to or through the Site any software intended to
                damage or alter a computer system or data; (ii) send through the
                Site unsolicited or unauthorized advertising, promotional
                materials, junk mail, spam, chain letters, pyramid schemes, or
                any other form of duplicative or unsolicited messages; (iii) use
                the Site to harvest, collect, gather or assemble information or
                data regarding other users without their consent; (iv) interfere
                with, disrupt, or create an undue burden on servers or networks
                connected to the Site, or violate the regulations, policies or
                procedures of such networks; (v) attempt to gain unauthorized
                access to the Site, whether through password mining or any other
                means; (vi) harass or interfere with any other user’s use and
                enjoyment of the Site; or (vi) use software or automated agents
                or scripts to produce multiple accounts on the Site, or to
                generate automated searches, requests, or queries to the Site.
              </p>
              <p className="pb-4">
                We reserve the right to review any User Content, and to
                investigate and/or take appropriate action against you in our
                sole discretion if you violate the Acceptable Use Policy or any
                other provision of these Terms or otherwise create liability for
                us or any other person. Such action may include removing or
                modifying your User Content, terminating your Account in
                accordance with Section 8, and/or reporting you to law
                enforcement authorities. If you provide We with any feedback or
                suggestions regarding the Site, you hereby assign to We all
                rights in such Feedback and agree that We shall have the right
                to use and fully exploit such Feedback and related information
                in any manner it believes appropriate. We will treat any
                Feedback you provide to Us as non-confidential and
                non-proprietary. You agree to indemnify and hold We and its
                officers, employees, and agents harmless, including costs and
                attorneys’ fees, from any claim or demand made by any third
                party due to or arising out of (a) your use of the Site, (b)
                your violation of these Terms, (c) your violation of applicable
                laws or regulations or (d) your User Content. We reserve the
                right to assume the exclusive defence and control of any matter
                for which you are required to indemnify us, and you agree to
                cooperate with our defence of these claims. You agree not to
                settle any matter without the prior written consent of We. We
                will use reasonable efforts to notify you of any such claim,
                action or proceeding upon becoming aware of it.
              </p>
              <h2 className="text-xl font-medium pb-3">Other Users</h2>
              <p className="pb-4">
                Other Users. Each Site user is solely responsible for any of its
                own User Content. Because we do not control User Content, you
                acknowledge and agree that we are not responsible for any User
                Content, whether provided by you or by others. You agree that We
                will not be responsible for any loss or damage incurred as the
                result of any such interactions. If there is a dispute between
                you and any Site user, we are under no obligation to become
                involved. You hereby release and forever discharge the Us and
                our officers, employees, agents, successors, and assigns from,
                and hereby waive and relinquish, every past, present and future
                dispute, claim, controversy, demand, right, obligation,
                liability, action and cause of action of every kind and nature,
                that has arisen or arises directly or indirectly out of, or that
                relates directly or indirectly to, the Site. If you are a
                California resident, you hereby waive California civil code
                section 1542 in connection with the foregoing, which states: "A
                general release does not extend to claims which the creditor
                does not know or suspect to exist in his or her favour at the
                time of executing the release, which if known by him or she must
                have materially affected his or her settlement with the debtor."
              </p>
              <p className="pb-4">
                Cookies and Web Beacons. Like any other website, AI oasis uses
                ‘cookies’. These cookies are used to store information including
                visitors’ preferences, and the pages on the website that the
                visitor accessed or visited. The information is used to optimize
                the users’ experience by customizing our web page content based
                on visitors’ browser type and/or other information.
              </p>
              <h2 className="text-xl font-medium pb-3">Disclaimers</h2>
              <p className="pb-4">
                The site is provided on an "as-is" and "as-available" basis, and
                We and our suppliers expressly disclaim any warranties and
                conditions of any kind, whether express, implied, or statutory,
                including all warranties or conditions of merchantability,
                fitness for a particular purpose, title, quiet enjoyment,
                accuracy, or non-infringement. We and our suppliers do not
                guarantee that the site will meet your requirements, will be
                available on an uninterrupted, timely, secure, or error-free
                basis, or will be accurate, reliable, free of viruses or other
                harmful code, complete, legal, or safe. If applicable law
                requires any warranties concerning the site, all such warranties
                are limited in duration to ninety (90) days from the date of
                first use.
              </p>
              <p className="pb-4">
                Some jurisdictions do not allow the exclusion of implied
                warranties, so the above exclusion may not apply to you. Some
                jurisdictions do not allow limitations on how long an implied
                warranty lasts, so the above limitation may not apply to you.
              </p>
              <h2 className="text-xl font-medium pb-3">
                Limitation on Liability
              </h2>
              <p className="pb-4">
                To the maximum extent permitted by law, in no event shall We or
                our suppliers be liable to you or any third party for any lost
                profits, lost data, costs of procurement of substitute products,
                or any indirect, consequential, exemplary, incidental, special
                or punitive damages arising from or relating to these terms or
                your use of, or incapability to use the site even if We has been
                advised of the possibility of such damages. Access to and use of
                the site is at your own discretion and risk, and you will be
                solely responsible for any damage to your device or computer
                system, or loss of data resulting therefrom.
              </p>
              <p className="pb-4">
                To the maximum extent permitted by law, notwithstanding anything
                to the contrary contained herein, our liability to you for any
                damages arising from or related to this agreement, will at all
                times be limited to a maximum of fifty U.S. dollars (u.s. $50).
                The existence of more than one claim will not enlarge this
                limit. You agree that our suppliers will have no liability of
                any kind arising from or relating to this agreement.
              </p>
              <p className="pb-4">
                Some jurisdictions do not allow the limitation or exclusion of
                liability for incidental or consequential damages, so the above
                limitation or exclusion may not apply to you. Term and
                Termination. Subject to this Section, these Terms will remain in
                full force and effect while you use the Site. We may suspend or
                terminate your rights to use the Site at any time for any reason
                at our sole discretion, including for any use of the Site in
                violation of these Terms. Upon termination of your rights under
                these Terms, your Account and right to access and use the Site
                will terminate immediately. You understand that any termination
                of your Account may involve the deletion of your User Content
                associated with your Account from our live databases. We will
                not have any liability whatsoever to you for any termination of
                your rights under these Terms. Even after your rights under
                these Terms are terminated, the following provisions of these
                Terms will remain in effect: Sections 2 through 2.5, Section 3
                and Sections 4 through 10.
              </p>
              <p className="pb-4">
                Indemnity. You will defend, indemnify, and hold harmless us, our
                affiliates, and our personnel, from and against any claims,
                losses, and expenses (including attorneys’ fees) arising from or
                relating to your use of the Services, including your Content,
                products or services you develop or offer in connection with the
                Services, and your breach of these Terms or violation of
                applicable law.
              </p>
              <p className="pb-4">
                Disclaimer. THE SERVICES ARE PROVIDED “AS IS.” EXCEPT TO THE
                EXTENT PROHIBITED BY LAW, WE AND OUR AFFILIATES AND LICENSORS
                MAKE NO WARRANTIES (EXPRESS, IMPLIED, STATUTORY OR OTHERWISE)
                WITH RESPECT TO THE SERVICES, AND DISCLAIM ALL WARRANTIES
                INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, SATISFACTORY QUALITY,
                NON-INFRINGEMENT, AND QUIET ENJOYMENT, AND ANY WARRANTIES
                ARISING OUT OF ANY COURSE OF DEALING OR TRADE USAGE. WE DO NOT
                WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ACCURATE OR
                ERROR FREE, OR THAT ANY CONTENT WILL BE SECURE OR NOT LOST OR
                ALTERED.
              </p>
              <h2 className="text-xl font-medium pb-3">Copyright Policy.</h2>
              <p className="pb-4">
                We respect the intellectual property of others and ask that
                users of our Site do the same. In connection with our Site, we
                have adopted and implemented a policy respecting copyright law
                that provides for the removal of any infringing materials and
                for the termination of users of our online Site who are repeated
                infringers of intellectual property rights, including
                copyrights. If you believe that one of our users is, through the
                use of our Site, unlawfully infringing the copyright(s) in a
                work, and wish to have the allegedly infringing material
                removed, the following information in the form of a written
                notification (pursuant to 17 U.S.C. § 512(c)) must be provided
                to our Designated Copyright Agent:
              </p>
              <div className="terms_list_item pb-4">
                <ul className="pl-5">
                  <li>your physical or electronic signature;</li>
                  <li>
                    identification of the copyrighted work(s) that you claim to
                    have been infringed;
                  </li>
                  <li>
                    identification of the material on our services that you
                    claim is infringing and that you request us to remove;
                  </li>
                  <li>
                    sufficient information to permit us to locate such material;
                  </li>
                  <li>your address, telephone number, and e-mail address;</li>
                  <li>
                    a statement that you have a good faith belief that use of
                    the objectionable material is not authorized by the
                    copyright owner, its agent, or under the law; and
                  </li>
                  <li>
                    a statement that the information in the notification is
                    accurate, and under penalty of perjury, that you are either
                    the owner of the copyright that has allegedly been infringed
                    or that you are authorized to act on behalf of the copyright
                    owner.
                  </li>
                </ul>
              </div>
              <p className="pb-4">
                Please note that pursuant to 17 U.S.C. § 512(f), any
                misrepresentation of material fact in a written notification
                automatically subjects the complaining party to liability for
                any damages, costs and attorney’s fees incurred by us in
                connection with the written notification and allegation of
                copyright infringement.
              </p>
              <h2 className="text-xl font-medium pb-3">General</h2>
              <p className="pb-4">
                These Terms are subject to occasional revision, and if we make
                any substantial changes, we may notify you by sending you an
                e-mail to the last e-mail address you provided to us and/or by
                prominently posting notice of the changes on our Site. You are
                responsible for providing us with your most current e-mail
                address. In the event that the last e-mail address that you have
                provided us is not valid, our dispatch of the e-mail containing
                such notice will nonetheless constitute effective notice of the
                changes described in the notice. Any changes to these Terms will
                be effective upon the earliest of thirty (30) calendar days
                following our dispatch of an e-mail notice to you or thirty (30)
                calendar days following our posting of notice of the changes on
                our Site. These changes will be effective immediately for new
                users of our Site. Continued use of our Site following notice of
                such changes shall indicate your acknowledgement of such changes
                and agreement to be bound by the terms and conditions of such
                changes. Dispute Resolution. Please read this Arbitration
                Agreement carefully. It is part of your contract with We and
                affects your rights. It contains procedures for MANDATORY
                BINDING ARBITRATION AND A className ACTION WAIVER. Applicability
                of Arbitration Agreement. All claims and disputes in connection
                with the Terms or the use of any product or service provided by
                the We that cannot be resolved informally or in small claims
                court shall be resolved by binding arbitration on an individual
                basis under the terms of this Arbitration Agreement. Unless
                otherwise agreed to, all arbitration proceedings shall be held
                in English. This Arbitration Agreement applies to you and the
                We, and to any subsidiaries, affiliates, agents, employees,
                predecessors in interest, successors, and assigns, as well as
                all authorized or unauthorized users or beneficiaries of
                services or goods provided under the Terms.
              </p>
              <p className="pb-4">
                Notice Requirement and Informal Dispute Resolution. Before
                either party may seek arbitration, the party must first send to
                the other party a written Notice of Dispute describing the
                nature and basis of the claim or dispute and the requested
                relief. A Notice to the We should be sent to our contact email.
                After the Notice is received, you and the We may attempt to
                resolve the claim or dispute informally. If you and the We do
                not resolve the claim or dispute within thirty (30) days after
                the Notice is received, either party may begin an arbitration
                proceeding. The amount of any settlement offer made by any party
                may not be disclosed to the arbitrator until after the
                arbitrator has determined the amount of the award to which
                either party is entitled.
              </p>
              <p className="pb-4">
                Arbitration Rules. Arbitration shall be initiated through the
                American Arbitration Association, an established alternative
                dispute resolution provider that offers arbitration as set forth
                in this section. If AAA is not available to arbitrate, the
                parties shall agree to select an alternative ADR Provider. The
                rules of the ADR Provider shall govern all aspects of the
                arbitration except to the extent such rules are in conflict with
                the Terms. The AAA Consumer Arbitration Rules governing the
                arbitration are available online at adr.org or by calling the
                AAA at 1-800-778-7879. The arbitration shall be conducted by a
                single, neutral arbitrator. Any claims or disputes where the
                total amount of the award sought is less than Ten Thousand U.S.
                Dollars (US $10,000.00) may be resolved through binding
                non-appearance-based arbitration, at the option of the party
                seeking relief. For claims or disputes where the total amount of
                the award sought is Ten Thousand U.S. Dollars (US $10,000.00) or
                more, the right to a hearing will be determined by the
                Arbitration Rules. Any hearing will be held in a location within
                100 miles of your residence unless you reside outside of the
                United States, and unless the parties agree otherwise. If you
                reside outside of the U.S., the arbitrator shall give the
                parties reasonable notice of the date, time and place of any
                oral hearings. Any judgment on the award rendered by the
                arbitrator may be entered in any court of competent
                jurisdiction. If the arbitrator grants you an award that is
                greater than the last settlement offer that the We made to you
                prior to the initiation of arbitration, the We will pay you the
                greater of the award or $2,500.00. Each party shall bear its own
                costs and disbursements arising out of the arbitration and shall
                pay an equal share of the fees and costs of the ADR Provider.
                Additional Rules for Non-Appearance Based Arbitration. If
                non-appearance-based arbitration is elected, the arbitration
                shall be conducted by telephone, online and/or based solely on
                written submissions; the specific manner shall be chosen by the
                party initiating the arbitration. The arbitration shall not
                involve any personal appearance by the parties or witnesses
                unless otherwise agreed by the parties.
              </p>
              <p className="pb-4">
                Time Limits. If you or the We pursue arbitration, the
                arbitration action must be initiated and/or demanded within the
                statute of limitations and within any deadline imposed under the
                AAA Rules for the pertinent claim.
              </p>
              <p className="pb-4">
                Authority of Arbitrator. If arbitration is initiated, the
                arbitrator will decide the rights and liabilities of you and the
                We, and the dispute will not be consolidated with any other
                matters or joined with any other cases or parties. The
                arbitrator shall have the authority to grant motions dispositive
                of all or part of any claim. The arbitrator shall have the
                authority to award monetary damages, and to grant any
                non-monetary remedy or relief available to an individual under
                applicable law, the AAA Rules, and the Terms. The arbitrator
                shall issue a written award and statement of decision describing
                the essential findings and conclusions on which the award is
                based. The arbitrator has the same authority to award relief on
                an individual basis that a judge in a court of law would have.
                The award of the arbitrator is final and binding upon you and
                the We.
              </p>
              <p className="pb-4">
                Waiver of Jury Trial. THE PARTIES HEREBY WAIVE THEIR
                CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A
                TRIAL IN FRONT OF A JUDGE OR A JURY, instead electing that all
                claims and disputes shall be resolved by arbitration under this
                Arbitration Agreement. Arbitration procedures are typically more
                limited, more efficient and less expensive than rules applicable
                in a court and are subject to very limited review by a court. In
                the event, any litigation should arise between you and the We in
                any state or federal court in a suit to vacate or enforce an
                arbitration award or otherwise, YOU AND THE We WAIVE ALL RIGHTS
                TO A JURY TRIAL, instead electing that the dispute be resolved
                by a judge.
              </p>
              <p className="pb-4">
                Waiver of className or Consolidated Actions. All claims and
                disputes within the scope of this arbitration agreement must be
                arbitrated or litigated on an individual basis and not on a
                className basis, and claims of more than one customer or user
                cannot be arbitrated or litigated jointly or consolidated with
                those of any other customer or user. Confidentiality. All
                aspects of the arbitration proceeding shall be strictly
                confidential. The parties agree to maintain confidentiality
                unless otherwise required by law. This paragraph shall not
                prevent a party from submitting to a court of law any
                information necessary to enforce this Agreement, to enforce an
                arbitration award, or to seek injunctive or equitable relief.
              </p>
              <p className="pb-4">
                Severability. If any part or parts of this Arbitration Agreement
                are found under the law to be invalid or unenforceable by a
                court of competent jurisdiction, then such specific part or
                parts shall be of no force and effect and shall be severed and
                the remainder of the Agreement shall continue in full force and
                effect. Right to Waive. Any or all of the rights and limitations
                set forth in this Arbitration Agreement may be waived by the
                party against whom the claim is asserted. Such waiver shall not
                waive or affect any other portion of this Arbitration Agreement.
                Survival of Agreement. This Arbitration Agreement will survive
                the termination of your relationship with We.
              </p>
              <p className="pb-4">
                Small Claims Court. Nonetheless the foregoing, either you or the
                We may bring an individual action in small claims court.
              </p>
              <p className="pb-4">
                Emergency Equitable Relief. Anyhow the foregoing, either party
                may seek emergency equitable relief before a state or federal
                court in order to maintain the status quo pending arbitration. A
                request for interim measures shall not be deemed a waiver of any
                other rights or obligations under this Arbitration Agreement.
              </p>
              <p className="pb-4">
                Claims Not Subject to Arbitration. Notwithstanding the
                foregoing, claims of defamation, violation of the Computer Fraud
                and Abuse Act, and infringement or misappropriation of the other
                party’s patent, copyright, trademark or trade secrets shall not
                be subject to this Arbitration Agreement.
              </p>
              <p className="pb-4">
                In any circumstances where the foregoing Arbitration Agreement
                permits the parties to litigate in court, the parties hereby
                agree to submit to the personal jurisdiction of the courts
                located within Netherlands County, California, for such
                purposes. The Site may be subject to U.S. export control laws
                and may be subject to export or import regulations in other
                countries. You agree not to export, re-export, or transfer,
                directly or indirectly, any U.S. technical data acquired from
                We, or any products utilizing such data, in violation of the
                United States export laws or regulations.
              </p>
              <p className="pb-4">
                Electronic Communications. The communications between you and We
                use electronic means, whether you use the Site or send us
                emails, or whether We post notices on the Site or communicate
                with you via email. For contractual purposes, you (a) consent to
                receive communications from We in an electronic form; and (b)
                agree that all terms and conditions, agreements, notices,
                disclosures, and other communications that We provide to you
                electronically satisfy any legal obligation that such
                communications would satisfy if it were in a hard copy writing.
              </p>
              <p className="pb-4">
                Entire Terms. These Terms constitute the entire agreement
                between you and us regarding the use of the Site. Our failure to
                exercise or enforce any right or provision of these Terms shall
                not operate as a waiver of such right or provision. The section
                titles in these Terms are for convenience only and have no legal
                or contractual effect. The word "including" means "including
                without limitation". If any provision of these Terms is held to
                be invalid or unenforceable, the other provisions of these Terms
                will be unimpaired and the invalid or unenforceable provision
                will be deemed modified so that it is valid and enforceable to
                the maximum extent permitted by law. Your relationship to We is
                that of an independent contractor, and neither party is an agent
                or partner of the other. These Terms, and your rights and
                obligations herein, may not be assigned, subcontracted,
                delegated, or otherwise transferred by you without We’s prior
                written consent, and any attempted assignment, subcontract,
                delegation, or transfer in violation of the foregoing will be
                null and void. We may freely assign these Terms. The terms and
                conditions set forth in these Terms shall be binding upon
                assignees.
              </p>
              <p className="pb-4">
                Your Privacy. Please read our Privacy Policy.
                Copyright/Trademark Information. Copyright ©. All rights
                reserved. All trademarks, logos and service marks displayed on
                the Site are our property or the property of other third
                parties. You are not permitted to use these Marks without our
                prior written consent or the consent of such third party which
                may own the Marks.
              </p>
              <h2 className="text-xl font-medium pb-3">Contact Information</h2>
              <p className="pb-4">Email: Support@aioasis.com</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="create_character_btn"
            onClick={() => handleAccept()}
          >
            I accept
          </Button>
          <Button color="gray" onClick={() => modalCloseHandler()}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>

      {/* registration start*/}
      <Registration
        openRegisterModal={openRegisterModal}
        setOpenRegisterModal={setOpenRegisterModal}
        setOpenLoginModal={setOpenLoginModal}
      />
      {/* registration ends*/}
    </>
  );
};

export default AgeRestrictionModal;
