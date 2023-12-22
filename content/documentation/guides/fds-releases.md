---
title: Flow Design System Releases
---

# Apache {{< project-label >}} Flow Design System Releases

The purpose of this document is to capture and describe the steps involved in producing
an official release of Apache NiFi Flow Design System.  It is written specifically to someone acting in the
capacity of a [Release Manager][apache-release-manager] (RM).  

## The objective

Our aim is to produce an official Apache release from an existing release branch.  

## Background Material

  - These documents are necessary for all committers to be familiar with
    - [Apache License V2.0][apache-license]
    - [Apache Legal License/Resolved][apache-legal-resolve]
    - [Apache How-to Apply License][apache-license-apply]

  - These documents are necessary for someone acting as the RM
    - [Apache Encryption Software / ECCN Info][apache-encryption]
    - [Apache Release Policy][apache-release-policy]
    - [Apache Release Guide][apache-release-guide]

  - These documents are helpful for general environmental setup to perform releases
    - [Apache PGP Info][apache-pgp]
    - [Apache Release Signing][apache-release-signing]

## Terms

 * **Release Manager** (RM) - the Apache NiFi PMC Member or Committer acting as [Release Manager][apache-release-manager]
 for a particular release of Apache NiFi.
 * **Release Candidate** (RC) - an iteration of the release process that is proposed for a vote by the Apache NiFi
 Community.
 * **Community** - the [community][apache-glossary-community] of people with an interest
 in the improvement and advancement of Apache NiFi, including end-users, developers, evangelists, and advisers.
 * **PMC** - within the Apache NiFi community, members of the [PMC][apache-glossary-pmc] oversee the ongoing project.
 * **Committer** - with the Apache NiFi community, [committers][apache-glossary-committer]
 have gain the privilege to commit changes to the Apache NiFi codebase.

## High level flow of a release

  - The Apache NiFi community is constantly contributing to JIRA tickets assigned to the next release.
  - At some point the number of tickets open/remaining for the next release begins to approach zero.
  - A member of the community suggests a release and initiates a discussion.
  - Someone volunteers to perform the Release Manager (RM) role for the release.  (This can be a committer but Apache
  guides indicate a preference for a PMC member.)
  - The RM validate the proposed release and stages the source code for a
  Release Candidate (RC).
  - The RM initiates a vote on the RC by the NiFi community.
  - If the NiFi community rejects the RC, the issues noted are resolved and another RC is generated.
  - If the NiFi community accepts the RC, the staged source code, artifacts, and distribution files are moved to the
  appropriately locations for public release.

## Variable reference substitutions

Throughout this guide, references must be made to names and values that will vary from release to release.  For clarity
those variable values have been written like Bash variable references.  When a term like
"```/tmp/src/nifi-fds-${NIFI_FDS_VERSION}```" is seen in an instruction or email template it should be replaced with
"```/tmp/src/nifi-fds-0.1.0```" when working the release of "Apache NiFi Flow Design System 0.1.0".

 * Substitutions used in tasks and email templates
    <pre>
    Reference            Example value       Description
    =========            ==============      ===========
    ${BRANCH}            main                the development branch on which the release is based.
    ${NIFI_FDS_VERSION}  0.1.0               the version currently in development on the release branch.
    ${NEXT_VERSION}      0.2.0-SNAPSHOT      the future version for development on the release branch.
    ${JIRA_TICKET}       NIFI-2112           the JIRA ticket created by the release manager for the release tasks.
    ${RC}                2                   the Release Candidate index start at 1 for the first release candidate.
    ${RC_TAG_COMMIT_ID}                      the 40 byte commit ID of the RC tag created during the release process.
    ${RM_USERID}         johndoe             the Apache account ID of Release Manager.
    ${RELEASE_TAG}       rel/nifi-0.7.0      the Git repository tag for the source code as released.
    ${VOTE_THREAD_URL}   [0.1.0 vote thread][010-rc3-vote]   the URL for the Apache Pony Mail archive of the release vote thread.
    </pre>

    _To be practical but avoid confusion with future release details, these example values reflect the previous release
NiFi Flow Design System 0.1.0 RC2 release details._

NOTE: The next version should be the next minor version if the release is based on a major version development branch (e.g main
or 0.x). The next version should be the next incremental version if the release is based on a minor version development branch (e.g
support/nifi-fds-1.1.x or support/nifi-fds-0.7.4). If this is the first incremental release (e.g. 1.2.1) for a minor release line the support
branch may need to be created.

## What to validate and how to validate a release

The following is a list of the sorts of things that will be validated and are the basics to check when evaluating a release for a vote.

  - Are the LICENSE and NOTICE files present in the source root and complete?
    - Specifically look in the ```nifi-fds-${NIFI_FDS_VERSION}-sources-release.zip``` artifact and ensure these files are present at the root of the archive.
  - Evaluate the sources and dependencies.
    - Does the overall LICENSE and NOTICE appear correct?
    - Do all licenses fit within the ASF approved licenses?
  - Is there a README available that explains how to build the application and to execute it?
    - Look in the *-sources.zip artifact root for the readme.
  - Are the signatures and hashes correct for the source release?
    - Need a quick reminder on how to [verify a signature][apache-signature-verify]?
  - Do all sources have necessary headers?
  - Are there no unexpected binary files in the release?
    - The only thing we'd expect would be potentially test resources files.
  - Does the app (if appropriate) execute and function as expected?

This list is reflected in the Release Vote and Release Helper Guide emails that are sent once the release has been
staged in the Git and Nexus repositories.

## The Release Process

The release process includes steps to be performed by the Release Manager as well as the
Apache NiFi Flow Design System developer community.

### Step 1. Configure the build environment (RM and community)

1. Confirm that the local Git workspace is configured with an origin remote pointing to the RM's personal fork of the
NiFi source and an "ASF" remote pointing to the Apache Git Repository for NiFi.
    ```
    $ git remote -v
    asf	https://gitbox.apache.org/repos/asf/nifi-fds.git (fetch)
    asf	https://gitbox.apache.org/repos/asf/nifi-fds.git (push)
    origin	https://github.com/${RM_USERID}/nifi-fds.git (fetch)
    origin	https://github.com/${RM_USERID}/nifi-fds.git (push)
    ```
    Additional remotes will not cause a problem if these two are correct.  Other configurations are perfectly
    acceptable but the appropriate adjustments to the steps in this guide must be made by the release manager.
1. Confirm that source code can be checked out for the branch being released.
    ```
    git checkout ${BRANCH}
    ```
1. Confirm that the entire application builds correctly in the build environment.

### Step 2. Prepare and stage the release (RM)

1. Create a JIRA ticket for the release tasks for version ${NIFI\_FDS\_VERSION}.  
    ___The resulting JIRA ticket number is referred to as ${JIRA\_TICKET} in this guide.___
1. Create the next version in JIRA, if it doesn't already exist, so work can continue towards that release.
1. Create meaningful release notes for this version if not already created.  [Enter them here][nifi-release-notes] on
the NiFi wiki.
1. Create a new branch off 'main' named after the JIRA ticket.
    ```bash
    $ git checkout -b NIFI-FDS-${NIFI_FDS_VERSION}-RC${RC} ${BRANCH}
    ```
1. Ensure the the full application builds and all tests work by executing a build.
    ```
    $ npm run clean:install
    ```
1. Startup and test the demo application from the target source folder.  After a few seconds, NiFi FDS should be up and
running at [http://localhost:8080](http://localhost:8080).
    ```
    $ cd target/frontend-working-directory
    $ npm start
    ```
1. Evaluate and ensure the appropriate license headers are present on all source files.
1. Ensure LICENSE and NOTICE files are complete and accurate. (Developers should always be keeping these up to date as
    they go along adding source and modifying dependencies to keep this burden manageable.)
1. Verify that no vulnerabilities exist in any javascript module dependencies (requires npm 6+).
    ```
    $ npm audit
    ```

### Step 3. Perform the release (RM)

1. Now it's time to prepare the release. Manually update the version number in 
    * root package.json
    * root package-lock.json
    * src/platform/core/package.json

1. Zip up the source.
    ```
    $ git archive --format=zip --prefix=nifi-fds-${NIFI_FDS_VERSION}/ NIFI-FDS-${NIFI_FDS_VERSION}-RC${RC} > nifi-fds-0.2.0-source-release.zip
    ```
1. Create the tag.
    ```
    $ git tag NIFI-FDS-${NIFI_FDS_VERSION}-RC${RC}
    ```
1. Push the release branch to the ASF repository.
    ```
    $ git push asf NIFI-FDS-${NIFI_FDS_VERSION}-RC${RC} --tags
    ```
    ___From this branch, the ${RC_TAG_COMMIT_ID} will be the 40 byte commit hash with the comment NIFI-FDS-${NIFI_FDS_VERSION}-RC${RC} prepare release nifi-fds-${NIFI_FDS_VERSION}-RC${RC}___

1. Create the signature and hashes for the source release.
    1. ASCII armored GPG signatures (`--digest-algo=SHA512` select the SHA512 hash algorithm). [Configure GPG to always prefer stronger hashes](https://www.apache.org/dev/openpgp.html#key-gen-avoid-sha1).
        ```
        $ gpg -a -b --digest-algo=SHA512 nifi-fds-${NIFI_FDS_VERSION}-source-release.zip  # produces nifi-fds-${NIFI_FDS_VERSION}-source-release.zip.asc
        ```
    1. Generate SHA256 hash summaries.
        ```
        $ shasum -a 256 nifi-fds-${NIFI_FDS_VERSION}-source-release.zip | cut -d" " -f1 >  nifi-fds-${NIFI_FDS_VERSION}-source-release.zip.sha256
        ```
    1. Generate SHA512 hash summaries.
        ```
        $ shasum -a 512 nifi-fds-${NIFI_FDS_VERSION}-source-release.zip | cut -d" " -f1 >  nifi-fds-${NIFI_FDS_VERSION}-source-release.zip.sha512
        ```

1. Commit the source release along with their hashes and signatures to `https://dist.apache.org/repos/dist/dev/nifi/nifi-fds/nifi-fds-${NIFI_FDS_VERSION}`.
    1. Checkout the Apache dist dev svn repo locally using your Apache credentials
        ```
        $ svn checkout https://dist.apache.org/repos/dist/dev/nifi
        ```
    1. Create the directory for nifi-fds-${NIFI_FDS_VERSION}.
    1. Copy the zipped source release and its corresponding signatures and hashes into the new directory.
    1. Add the commit.
        ```
        $ svn add ./nifi-fds-${NIFI_FDS_VERSION}/*
        ```
    1. Stage the artifacts by committing to svn.
        ```
        $ svn commit -m 'Staging artifacts for nifi-fds-${NIFI_FDS_VERSION}'
        ```

### Step 4. Error recovery (RM)

If anything isn't correct about the staged artifacts you can delete
the local tag in git.  If you also delete the local branch then it is as if the release never happened.  Before doing that though try to figure out what went wrong so the Release
Guide can be updated or corrected if necessary.

### Step 5. Release Vote (RM and community)

After the release source is staged in the repositories it's time for the RM to send a release vote to the
NiFi community.  

Once the release vote is called for, members of the NiFi FDS developer community have 72 hours to evaluate the RC and
cast their vote by replying to the "[VOTE] Release ..." email sent by the RM.

_NOTE:  The release vote is majority rule vote that must include at least 3 binding +1 votes Apache NiFi PMC members
and more positive than negative binding votes._

1. RM sends a vote request email to the NiFi Developers Mailing List.
    - TO: `dev@nifi.apache.org`
    - FROM: `${RM_USERID}@apache.org`
    - SUBJECT: `[VOTE] Release Apache NiFi Flow Design System ${NIFI_FDS_VERSION}`
    ```
    Hello,

    I am pleased to be calling this vote for the source release of Apache NiFi Flow Design System nifi-fds-${NIFI_FDS_VERSION}.

    The source zip, including signatures, etc. can be found at:
    https://dist.apache.org/repos/dist/dev/nifi/nifi-fds/nifi-fds-${NIFI_FDS_VERSION}

    The Git tag is nifi-${NIFI_FDS_VERSION}-RC${RC}
    The Git commit ID is ${RC_TAG_COMMIT_ID}
    https://gitbox.apache.org/repos/asf?p=nifi-fds.git;a=commit;h=${RC_TAG_COMMIT_ID}

    Checksums of nifi-fds-x.y.z-source-release.zip:
    SHA1: <40-BYTE-SHA1SUM-HASH>
    SHA256: <64-CHAR-SHA256SUM-HASH>
    SHA512: <128-CHAR-SHA512SUM-HASH>

    Release artifacts are signed with the following key:
    https://people.apache.org/keys/committer/${RM_USERID}.asc

    KEYS file available here:
    https://dist.apache.org/repos/dist/release/nifi/KEYS

    8 issues were closed/resolved for this release:
    https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12316020&version=12329307

    Release note highlights can be found here:
    https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version${NIFI_FDS_VERSION}

    The vote will be open for 72 hours.
    Please download the release candidate and evaluate the necessary items including checking hashes, signatures, build
    from source, and test.  The please vote:

    [ ] +1 Release this package as nifi-fds-${NIFI_FDS_VERSION}
    [ ] +0 no opinion
    [ ] -1 Do not release this package because...
    ```

1. RM sends the following helper email to the NiFi Developers Mailing List.
    - TO: `dev@nifi.apache.org`
    - FROM: `${RM_USERID}@apache.org`
    - SUBJECT: `Apache NiFi ${NIFI_FDS_VERSION} RC${RC} Release Helper Guide`
    ```
    Hello Apache NiFi community,

    Please find the associated guidance to help those interested in validating/verifying the release so they can vote.

    # Download latest KEYS file:
    https://dist.apache.org/repos/dist/dev/nifi/KEYS

    # Import keys file:
    gpg --import KEYS

    # Pull down nifi-fds-${NIFI_FDS_VERSION} source release artifacts for review:
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-fds/nifi-fds-${NIFI_FDS_VERSION}/nifi-fds-${NIFI_FDS_VERSION}-source-release.zip
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-fds/nifi-fds-${NIFI_FDS_VERSION}/nifi-fds-${NIFI_FDS_VERSION}-source-release.zip.asc
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-fds/nifi-fds-${NIFI_FDS_VERSION}/nifi-fds-${NIFI_FDS_VERSION}-source-release.zip.sha1
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-fds/nifi-fds-${NIFI_FDS_VERSION}/nifi-fds-${NIFI_FDS_VERSION}-source-release.zip.sha256
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-fds/nifi-fds-${NIFI_FDS_VERSION}/nifi-fds-${NIFI_FDS_VERSION}-source-release.zip.sha512

    # Verify the signature
    gpg --verify nifi-fds-${NIFI_FDS_VERSION}-source-release.zip.asc
   
    # Verify the hashes (sha1, sha256, sha512) match the source and what was provided in the vote email thread
    sha1sum nifi-fds-${NIFI_FDS_VERSION}-source-release.zip
    sha256sum nifi-fds-${NIFI_FDS_VERSION}-source-release.zip
    sha512sum nifi-fds-${NIFI_FDS_VERSION}-source-release.zip
   
    # Unzip nifi-fds-${NIFI_FDS_VERSION}-source-release.zip
   
    # Verify the build works
    cd nifi-fds-${NIFI_FDS_VERSION}
    npm run clean:install
   
    # Verify the contents contain a good README, NOTICE, and LICENSE.
   
    # Verify the git commit ID is correct
   
    # Verify the RC was branched off the correct git commit ID
   
    # Run the demo-app and make sure it works as expected
    cd target/frontend-working-directory
    npm run watch
   
    # Make sure the README, NOTICE, and LICENSE are present and correct 
    cd node_modules/@nifi-fds/core
   
    # Send a response to the vote thread indicating a +1, 0, -1 based on your findings.
   
    Thank you for your time and effort to validate the release!
    ```    

1. Developers in the community review the release candidate and reply to the vote email with their vote.
1. After 72 hours if
    - at least 3 binding (PMC members) cast +1 votes, and
    - the positive binding votes out number any negative binding votes

   the vote passes and the release candidate is officially released. If the vote does not pass, corrections are made
   on the release branch and a new release candidate is put forward for a new vote.

1. RM sends vote result email.
    - TO: `dev@nifi.apache.org`
    - FROM: `${RM_USERID}@apache.org`
    - SUBJECT: `[RESULT][VOTE] Release Apache NiFi Flow Design System ${NIFI_FDS_VERSION}`
    ```
    Apache NiFi Community,

    I am pleased to announce that the ${NIFI_FDS_VERSION} release of Apache NiFi Flow Design System passes with
        X +1 (binding) votes
        Y +1 (non-binding) votes
        0 0 votes
        0 -1 votes

    Thanks to all who helped make this release possible.

    Here is the PMC vote thread: ${VOTE_THREAD_URL}
    ```

### Step 6. Finalize the Release

After the vote is complete and the release is approved, these steps complete the release process.

[comment]: <> (some of these steps need further detail and/or examples)

1. Move the source code and related artifacts from dist/dev to dist/release:  
    ```
    $ svn move -m "NIFI-FDS-${NIFI_FDS_VERSION}" https://dist.apache.org/repos/dist/dev/nifi/nifi-fds/nifi-fds-${NIFI_FDS_VERSION} https://dist.apache.org/repos/dist/release/nifi/nifi-fds/nifi-fds-${NIFI_FDS_VERSION}
    ```
1. Manually update the version number to the next snapshot
    ```bash
    $ git checkout NIFI-FDS-${NIFI_FDS_VERSION}-RC${RC}
    ```
    Update the version number to the next `${NIFI_FDS_VERSION}-SNAPSHOT` in
      * root package.json
      * root package-lock.json
      * src/platform/core/package.json  
    ```bash
    $ git add -A .
    $ git commit -m 'NIFI-FDS-${NIFI_FDS_VERSION} finalize RC${RC}'
    ```
1. Merge the release branch into main.
    ```
    $ git checkout main
    $ git merge --no-ff NIFI-FDS-${NIFI_FDS_VERSION}-RC${RC}
    $ git push asf main
    ```
1. Publish to the npm registry
    ```
    $ cd nifi-fds/target/frontend-working-directory/platform/core
    $ cp -f ../../README.md ./README.md
    $ npm login
    $ npm publish
    ```
1. Deploy the gh-pages demo

    First, switch to gh-pages branch:

    ```
    $   git remote update
    $   git checkout gh-pages
    $   git reset --hard asf/gh-pages
    ``` 
    
    Next, simulate npm install of @nifi-fds/core:

    ```
    $   rm -rf ./node_modules/
    $   mv ./target/frontend-working-directory/node_modules/ ./
    $   rm -rf ./webapp/
    $   mv ./target/frontend-working-directory/webapp/ ./
    ```
    
    Next, update the bundles, index.html, and README for the github.io page:
    
    ```  
    $   cp ./target/frontend-working-directory/fds-demo.* .
    $   cp -f ./target/frontend-working-directory/index.html ./index.html
    $   cp -f ./target/frontend-working-directory/README.md ./README.md
    ```
    
    Next, start the demo:
    
    ```  
    $   ./node_modules/http-server/bin/http-server
    ```
    
    Now, test that the demo application runs with the latest updates by visiting http://127.0.0.1:8080.
    
    Next, edit the index.html and change the base href to `<base href="/nifi-fds/">`:
    
    ```  
    $   nano ./index.html
    ```
    
    and change the base href to `<base href="/nifi-fds/">`.
        
    Finally, commit and push the changes:
    
    ```
    $   git add -A .
    $   git commit -m 'NIFI-FDS-${NIFI_FDS_VERSION} gh-pages update demo application to run NiFi FDS ${NIFI_FDS_VERSION}'
    $   git push asf gh-pages:gh-pages
    ```

1. Update the NiFi Web Page to indicate NEWS of the release as appropriate

1. In JIRA resolve the NIFI-FDS-${JIRA_TICKET} and then mark the release version as 'Released' and 'Archived' through 'version' management in the 'administration' console. Then create a new version name for the next NiFi FDS release.

1. Create a proper signed tag of the released codebase based on the RC Tag created during the release process.
   ```
   $ git tag -s rel/nifi-fds-${NIFI_FDS_VERSION} -m "NIFI-FDS-${JIRA_TICKET} signed release tag for approved release of NiFi Flow Design System ${NIFI_FDS_VERSION}" ${RC_TAG_COMMIT_ID}
   ```
   For instructions on setting up to sign your tag see [here][git-sign-tag-instructs].      

1. Push the release tag to the official ASF repository.
   ```
   $ git push asf rel/nifi-fds-${NIFI_FDS_VERSION}
   ```

1. Update the release notes with the final date of the release.

1. After the release has been complete for 24 hours send the release announcement.
  + See [here][apache-release-announce] for an understanding of why you need to wait 24 hours
  + The announcement should addressed as follows.
    - TO: `announce@apache.org`, `dev@nifi.apache.org`
    - REPLY-TO: `dev@nifi.apache.org`
    - FROM: ${RM_USERID}@apache.org
  + The subject should include `[ANNOUNCE] Apache NiFi Flow Design System x.y.z release`.
  + The text should be based on the template included below.
    ```
    Hello

    The Apache NiFi team would like to announce the release of Apache NiFi Flow Design System ${NIFI_FDS_VERSION}.

    Apache NiFi Flow Design System is an atomic reusable platform for providing a consistent set of UI/UX components for open source friendly web applications to consume.

    More details on Apache NiFi Flow Design System can be found here:
    https://nifi.apache.org/fds.html

    Issues closed/resolved for this list can be found here:
    https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=${NIFI_FDS_PROJECT_ID}&version=${NIFI_FDS_VERSION_ID}

    Release note highlights can be found here:
    https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version${NIFI_FDS_VERSION}

    Thank you
    The Apache NiFi team
    ```

[nifi-release-notes]: https://cwiki.apache.org/confluence/display/NIFI/Release+Notes
[nifi-migration-guide]: https://cwiki.apache.org/confluence/display/NIFI/Migration+Guidance

[apache-encryption]: https://www.apache.org/licenses/exports/
[apache-glossary-committer]: https://www.apache.org/foundation/glossary.html#Committer
[apache-glossary-community]: https://www.apache.org/foundation/glossary.html#Community
[apache-glossary-pmc]: https://www.apache.org/foundation/glossary.html#PMC
[apache-legal-resolve]: https://www.apache.org/legal/resolved.html
[apache-license]: https://apache.org/licenses/LICENSE-2.0
[apache-license-apply]: https://www.apache.org/dev/apply-license.html
[apache-pgp]: https://www.apache.org/dev/openpgp.html
[apache-release-announce]: https://www.apache.org/dev/release.html#release-announcements
[apache-release-guide]: https://www.apache.org/dev/release-publishing
[apache-release-manager]: https://www.apache.org/dev/release-publishing.html#release_manager
[apache-release-policy]: https://www.apache.org/dev/release.html
[apache-release-signing]: http://www.apache.org/dev/release-signing.html
[apache-signature-verify]: https://www.apache.org/dev/release-signing.html#verifying-signature

[git-sign-tag-instructs]: http://gitready.com/advanced/2014/11/02/gpg-sign-releases.html

[010-rc3-vote]: https://lists.apache.org/thread.html/07156f3a773841ba1e27f2c89bb5fd57698cb5e3eae000c12bb593b5@%3Cdev.nifi.apache.org%3E
