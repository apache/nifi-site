---
title: Apache NiFi Release Guidelines
---

# Apache NiFi Release Guidelines

The purpose of this document is to capture and describe the steps involved in producing
an official release of Apache NiFi.  It is written specifically to someone acting in the
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
    - [Apache Guide to publish Maven Artifacts][apache-guide-publish-maven]

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
  - The RM validate the proposed release and stages the source code, Maven artifacts, and distributable files for a
  Release Candidate (RC).
  - The RM initiates a vote on the RC by the NiFi community.
  - If the NiFi community rejects the RC, the issues noted are resolved and another RC is generated.
  - If the NiFi community accepts the RC, the staged source code, artifacts, and distribution files are moved to the
  appropriately locations for public release.

## Variable reference substitutions

Throughout this guide, references must be made to names and values that will vary from release to release.  For clarity
those variable values have been written like Bash variable references.  When a term like
"```/tmp/src/nifi-${NIFI_VERSION}```" is seen in an instruction or email template it should be replaced with
"```/tmp/src/nifi-0.7.0```" when working the release of "Apache NiFi 0.7.0".

 * Subtitutions used in tasks and email templates
    <pre>
    Reference            Example value       Description
    =========            ==============      ===========
    ${BRANCH}            0.7.0-SNAPSHOT      the development branch on which the release is based.
    ${NIFI_VERSION}      0.7.0               the version currently in development on the release branch.
    ${NEXT_VERSION}      0.7.1-SNAPSHOT      the future version for development on the release branch.
    ${JIRA_TICKET}       NIFI-2112           the JIRA ticket created by the release manager for the release tasks.
    ${RC}                2                   the Release Candidate index start at 1 for the first release candidate.
    ${RC_TAG_COMMIT_ID}                      the 40 byte commit ID of the RC tag created during the Maven release process.
    ${STAGING_REPO_ID}   orgapachenifi-1088  the temporate repository ID where staged artifacts have been placed.
    ${RM_USERID}         johndoe             the Apache account ID of Release Manager.
    ${RELEASE_TAG}       rel/nifi-0.7.0      the Git repository tag for the source code as released.
    ${VOTE_THREAD_URL}   [0.7.0 vote thread][070-rc2-vote]   the URL for the Apache Pony Mail archive of the release vote thread.
    </pre>

    _To be practical but avoid confusion with future release details, these example values reflect the previous release
NiFi 0.7.0 RC2 release details._

## What to validate and how to validate a release

The following is a list of the sorts of things that will be validated and are the basics to check
when evaluating a release for a vote.

  - Are the LICENSE and NOTICE files present in the source root and complete?
    - Specifically look in the ```nifi-${NIFI_VERSION}-sources-release.zip``` artifact and ensure these files are
    present at the root of the archive.
  - Evaluate the sources and dependencies.
    - Does the overall LICENSE and NOTICE appear correct?
    - Do all licenses fit within the ASF approved licenses?
    - Here is an example path to a sources artifact that has been prepared but not released:  
      `https://repository.apache.org/content/repositories/${STAGING_REPO_ID}/org/apache/nifi/nifi/${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip`
  - Is there a README available that explains how to build the application and to execute it?
    - Look in the *-sources.zip artifact root for the readme.
  - Are the signatures and hashes correct for the source release?
    - Validate the hashes of the sources artifact do in fact match:
      `https://repository.apache.org/content/repositories/${STAGING_REPO_ID}/org/apache/nifi/nifi/${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip.md5`
      `https://repository.apache.org/content/repositories/${STAGING_REPO_ID}/org/apache/nifi/nifi/${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip.sha1`
    - Validate the signature of the source artifact.  Here is an example path:
      `https://repository.apache.org/content/repositories/${STAGING_REPO_ID}/org/apache/nifi/nifi/${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip.asc`
    - Need a quick reminder on how to [verify a signature][apache-signature-verify]?
  - Do all sources have necessary headers?
    - Unzip the sources file into a directory and execute `mvn install -Pcontrib-check`
  - Are there no unexpected binary files in the release?
    - The only thing we'd expect would be potentially test resources files.
  - Does the app (if appropriate) execute and function as expected?

This list is reflected in the Release Vote and Release Helper Guide emails that are sent once the release has been
staged in the Git and Nexus repositories.

## The Release Process

The release process includes steps to be performed by the Release Manager as well as the
Apache NiFi developer community.

### Step 1. Configure the build environment (RM and community)

1. Follow the steps outlined in the [Quickstart Guide][nifi-quickstart-guide] to prepare the development system.
1. Confirm that the local Git workspace is configured with an origin remote pointing to the RM's personal fork of the
NiFi source and an "ASF" remote pointing to the Apache Git Repository for NiFi.
    ```
    $ git remote -v
    asf	https://git-wip-us.apache.org/repos/asf/nifi.git (fetch)
    asf	https://git-wip-us.apache.org/repos/asf/nifi.git (push)
    origin	https://github.com/${RM_USERID}/nifi.git (fetch)
    origin	https://github.com/${RM_USERID}/nifi.git (push)
    ```
    Additional remotes will not cause a problem if these two are correct.  Other configurations are perfectly
    acceptable but the appropriate adjustments to the steps in this guide must be made by the release manager.
1. Confirm that source code can be checked out for the branch being released.
    ```
    git checkout ${BRANCH}
    ```
1. Confirm that the entire application builds correctly in the build environment.

### Step 2. Prepare and stage the release (RM)

1. Create a JIRA ticket for the release tasks for version ${NIFI\_VERSION}.  
    ___The resulting JIRA ticket number is referred to as ${JIRA\_TICKET} in this guide.___
1. Create the next version in JIRA, if it doesn't already exist, so work can continue towards that release.
1. Create meaningful release notes for this version if not already created.  [Enter them here][nifi-release-notes] on
the NiFi wiki.
1. Create a new branch off 'master' named after the JIRA ticket.
    ```bash
    $ git checkout -b NIFI-${JIRA_TICKET}-RC${RC} ${BRANCH}
    ```
1. Verify that Maven has sufficient heap space to perform the build tasks.  Some plugins and parts of the build
consumes a surprisingly large amount of space.   
 - These settings have been shown to work for Java 8 for NiFi version 1.x and later.
   ```bash
    $ export MAVEN_OPTS="-Xms1024m -Xmx3076m"
   ```
 - And these work for Java 7 for NiFi version 0.x.
    ```
    $ export MAVEN_OPTS="-Xms1024m -Xmx3076m -XX:MaxPermSize=256m"
    ```
1. Ensure your settings.xml has been updated to include a `signed_release` profile and a `<server>` entry for
"repository.apache.org" as shown below. [Steps to configure and encrypt Maven passwords][sonatype-maven-password].
There are  other ways to ensure your PGP key is available for signing as well.  
    ```XML
        <profile>
            <id>signed_release</id>
            <properties>
                <mavenExecutorId>forked-path</mavenExecutorId>
                <gpg.keyname>${RM_USERID}@apache.org</gpg.keyname>
                <gpg.passphrase>GPG passphrase</gpg.passphrase>
            </properties>
        </profile>

        <servers>
            <server>
                <id>repository.apache.org</id>
                <username>${RM_USERID}</username>
                <password>ENCRYPTED PASSWORD HERE</password>
            </server>
        </servers>
    ```
1. Ensure the the full application builds and all tests work by executing a parallel (multi-threaded) build.
    ```
    $ mvn -T 2.5C clean install
    ```
1. Startup and test the application with from the root source folder.  After a few seconds, NiFi should be up and
running at [http://localhost:8080/nifi](http://localhost:8080/nifi).
    ```
    $ cd nifi-assembly/target/nifi-${NIFI_VERSION}-bin/nifi-${NIFI_VERSION}
    $ bin/nifi.sh start
    ```
1. Evaluate and ensure the appropriate license headers are present on all source files.
1. Ensure LICENSE and NOTICE files are complete and accurate. (Developers should always be keeping these up to date as
    they go along adding source and modifying dependencies to keep this burden manageable.)
1. Build the project with the `contrib-check` profile enabled to validate contribution expectations and find any
problems that must be addressed before proceeding.  
    ```
    $ mvn install -Pcontrib-check
    ```

### Step 3. Perform the release (RM)

1. Now its time to have maven prepare the release with this command.
    ```
    $ mvn --batch-mode release:prepare \
        -Psigned_release \
        -DscmCommentPrefix="NIFI-${JIRA_TICKET}-RC${RC}" \
        -Dtag="nifi-${NIFI_VERSION}-RC${RC}" \
        -DreleaseVersion="${NIFI_VERSION}" \
        -DdevelopmentVersion="${NEXT_VERSION}" \
        -Darguments="-DskipTests"
    ```
1. Review the release preparation results.  If problems are found `$ mvn release:rollback` will reset the changes, or
it may be necessary to run `$ mvn release:clean` to get the project to a state where it can be rebuilt.

1. If the preparation without problems, it is time to perform the release and deploy artifacts to staging.
    ```
    $ mvn release:perform
        -Psigned_release \
        -DscmCommentPrefix="${JIRA_TICKET}-RC${RC}"
        -Darguments="-DskipTests"
    ```
    When this completes the artifacts have been released to the Apache Nexus staging repository, a local release branch
    has been created and there should the staging repository ID returned in a log entry like this.

    ```
    [INFO]  * Closing staging repository with ID "orgapachenifi-1088"
    ```
    ___This staging repository ID is referred to by ${STAGING_REPO_ID} in this release guide.___

1. Browse to the Apache [Staging Repository][apache-staging-repositories] and
login with your Apache committer credentials and you should see the newly created staging repository listed.  If you
click on that you can inspect the various staged artifacts.

1. Validate that all the various aspects of the staged artifacts appear correct
    - Download the sources.  Do they compile cleanly?  If the result is a build does it execute?
    - Validate the hashes match.
    - Validate that the sources contain no unexpected binaries.
    - Validate the signature for the build and hashes.
    - Validate the LICENSE/NOTICE/Headers.  
    - Validate that the README is present and provides sufficient information to build and if necessary execute.

1. The validated artifacts all look good then push the branch to origin release branch to the ASF repository.
    ```
    $ git push asf NIFI-${JIRA_TICKET}-RC${RC}
    ```
    ___From this branch, the ${RC_TAG_COMMIT_ID} will be the 40 byte commit hash with the comment NIFI-${JIRA_TICKET}-RC${RC} prepare release nifi-${NIFI_VERSION}-RC${RC}___

1. Create the signature and hashes for the source release and convenience binary files.
    1. ASCII armored GPG signatures (`--digest-algo=SHA512` select the SHA512 hash algorithm). [Configure GPG to always prefer stronger hashes](https://www.apache.org/dev/openpgp.html#key-gen-avoid-sha1).
        ```
        $ gpg -a -b --digest-algo=SHA512 nifi-${NIFI_VERSION}-source-release.zip  # produces nifi-${NIFI_VERSION}-source-release.zip.asc
        $ gpg -a -b --digest-algo=SHA512 nifi-${NIFI_VERSION}-bin.tar.gz          # produces nifi-${NIFI_VERSION}-bin.tar.gz.asc
        $ gpg -a -b --digest-algo=SHA512 nifi-${NIFI_VERSION}-bin.zip             # produces nifi-${NIFI_VERSION}-bin.zip.asc
        ```
    1. Generate md5 hash summaries.
        ```
        $ md5sum nifi-${NIFI_VERSION}-source-release.zip | cut -d" " -f1 > nifi-${NIFI_VERSION}-source-release.zip.md5
        $ md5sum nifi-${NIFI_VERSION}-bin.tar.gz | cut -d" " -f1 > nifi-${NIFI_VERSION}-bin.tar.gz.md5
        $ md5sum nifi-${NIFI_VERSION}-bin.zip | cut -d" " -f1 > nifi-${NIFI_VERSION}-bin.zip.md5
        ```
    1. Generate SHA1 hash summaries.
        ```
        $ sha1sum nifi-${NIFI_VERSION}-source-release.zip | cut -d" " -f1 >  nifi-${RELEASAE}-source-release.zip.sha1
        $ sha1sum nifi-${NIFI_VERSION}-bin.tar.gz | cut -d" " -f1 >  nifi-${RELEASAE}-bin.tar.gz.sha1
        $ sha1sum nifi-${NIFI_VERSION}-bin.zip | cut -d" " -f1 >  nifi-${RELEASAE}-bin.zip.sha1
        ```
    1. Generate SHA256 hash summaries.
        ```
        $ shasum -a 256 nifi-${NIFI_VERSION}-source-release.zip | cut -d" " -f1 >  nifi-${NIFI_VERSION}-source-release.zip.sha256
        $ shasum -a 256 nifi-${NIFI_VERSION}-bin.tar.gz | cut -d" " -f1 >  nifi-${NIFI_VERSION}-bin.tar.gz.sha256
        $ shasum -a 256 nifi-${NIFI_VERSION}-bin.zip | cut -d" " -f1 >  nifi-${NIFI_VERSION}-bin.zip.sha256
        ```

1. For reviewing of the release candidate, commit the source release and convenience binaries files along with their
hashes and signatures to `https://dist.apache.org/repos/dist/dev/nifi-${NIFI_VERSION}`.

### Step 4. Error recovery (RM)

If anything isn't correct about the staged artifacts you can drop the staged repo from repository.apache.org and delete
the local tag in git.  If you also delete the local branch and clear your local maven repository under org/apache/nifi
then it is as if the release never happened.  Before doing that though try to figure out what went wrong so the Release
Guide can be updated or corrected if necessary.

So, as has been described here you can test the release process until you get it right.  The `mvn versions:set` and
`mvn versions:commit` commands can come in handy to help do this so you can set versions to something clearly release
test related.

### Step 5. Release Vote (RM and community)

After the release source and artifacts are staged in the repositories it's time for the RM to send a release vote to the
NiFi community.  

Once the release vote is called for, members of the NiFi developer community have 72 hours to evaluate the RC and
cast their vote by replying to the "[VOTE] Release ..." email sent by the RM.

_NOTE:  The release vote is majority rule vote that must include at least 3 binding +1 votes Apache NiFi PMC members
and more positive than negative binding votes._

1. RM sends a vote request email to the NiFi Developers Mailing List.
    - TO: `dev@nifi.apache.org`
    - FROM: `${RM_USERID}@apache.org`
    - SUBJECT: `[VOTE] Release Apache NiFi ${NIFI_VERSION}`
    ```
    Hello,

    I am pleased to be calling this vote for the source release of Apache NiFi nifi-${NIFI_VERSION}.

    The source zip, including signatures, digests, etc. can be found at:
    https://repository.apache.org/content/repositories/orgapachenifi-nnnn

    The Git tag is nifi-${NIFI_VERSION}-RC${RC}
    The Git commit ID is ${RC_TAG_COMMIT_ID}
    https://git-wip-us.apache.org/repos/asf?p=nifi.git;a=commit;h=${RC_TAG_COMMIT_ID}

    Checksums of nifi-x.y.z-source-release.zip:
    MD5: <32-BYTE-MD5SUM-HASH>
    SHA1: <40-BYTE-SHA1SUM-HASH>

    Release artifacts are signed with the following key:
    https://people.apache.org/keys/committer/${RM_USERID}.asc

    KEYS file available here:
    https://dist.apache.org/repos/dist/release/nifi/KEYS

    8 issues were closed/resolved for this release:
    https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12316020&version=12329307

    Release note highlights can be found here:
    https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version${NIFI_VERSION}

    The vote will be open for 72 hours.
    Please download the release candidate and evaluate the necessary items including checking hashes, signatures, build
    from source, and test.  The please vote:

    [ ] +1 Release this package as nifi-${NIFI_VERSION}
    [ ] +0 no opinion
    [ ] -1 Do not release this package because because...
    ```

1. RM sends the following helper email to the NiFi Developers Mailing List.
    - TO: `dev@nifi.apache.org`
    - FROM: `${RM_USERID}@apache.org`
    - SUBJECT: `Apache NiFi ${NIFI_VERSION} RC${RC} Release Helper Guide`
    ```
    Hello Apache NiFi community,

    Please find the associated guidance to help those interested in validating/verifying the release so they can vote.

    # Download latest KEYS file:
    https://dist.apache.org/repos/dist/dev/nifi/KEYS

    # Import keys file:
    gpg --import KEYS

    # [optional] Clear out local maven artifact repository

    # Pull down nifi-${NIFI_VERSION} source release artifacts for review:

    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip.asc
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip.md5
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip.sha1
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip.sha256

    # Verify the signature
    gpg --verify nifi-${NIFI_VERSION}-source-release.zip.asc

    # Verify the hashes (md5, sha1, sha256) match the source and what was provided in the vote email thread
    md5sum nifi-${NIFI_VERSION}-source-release.zip
    sha1sum nifi-${NIFI_VERSION}-source-release.zip
    sha256sum nifi-${NIFI_VERSION}-source-release.zip

    # Unzip nifi-${NIFI_VERSION}-source-release.zip

    # Verify the build works including release audit tool (RAT) checks
    cd nifi-${NIFI_VERSION}
    mvn clean install -Pcontrib-check

    # Verify the contents contain a good README, NOTICE, and LICENSE.

    # Verify the git commit ID is correct

    # Verify the RC was branched off the correct git commit ID

    # Look at the resulting convenience binary as found in nifi-assembly/target

    # Make sure the README, NOTICE, and LICENSE are present and correct

    # Run the resulting convenience binary and make sure it works as expected

    # Send a response to the vote thread indicating a +1, 0, -1 based on your findings.

    Thank you for your time and effort to validate the release!
    ```    

1. Developers in the community review the release candiate and reply to the vote email with their vote.
1. After 72 hours if
    - at least 3 binding (PMC members) cast +1 votes, and
    - the positive binding votes out number any negative binding votes

   the vote passes and the release candidate is officially released. If the vote does not pass, corrections are made
   on the release branch and a new release candidate is put forward for a new vote.

1. RM sends vote result email.
    - TO: `dev@nifi.apache.org`
    - FROM: `${RM_USERID}@apache.org`
    - SUBJECT: `[RESULT][VOTE] Release Apache NiFi ${NIFI_VERSION}`
    ```
    Apache NiFi Community,

    I am pleased to announce that the ${NIFI_VERSION} release of Apache NiFi passes with
        X +1 (binding) votes
        Y -1 (binding) votes
        0 0 votes
        0 -1 votes

    Thanks to all who helped make this release possible.

    Here is the PMC vote thread: ${VOTE_THREAD_URL}
    ```

### Step 6. Finalize the Release

After the vote is complete and the release is approved, these steps complete the release process.

[comment]: <> (some of these steps need further detail and/or examples)

1. Move convenience binaries and related artifacts from dist/dev to dist/release:  
    ```
    $ svn move -m "NIFI-${JIRA_TICKET}" https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION} https://dist.apache.org/repos/dist/release/nifi/${NIFI_VERSION}
    ```
1. In repository.apache.org go to the staging repository and select `release` and follow the instructions on the site.

1. Merge the release branch into master.
    ```
    $ git push asf NIFI-${JIRA_TICKET}
    ```
1. Update the NiFi website to point to the new download(s).  Remove older release artifacts from download page (leave
the current release and the previous one).  For the release just previous to this new one change the links to point to
the archive location.  See current page as an example of the needed URL changes.  In addition to updating the download
page as described delete artifacts other than the current/new release from the dist/nifi SVN storage.  They are already
in the archive location so no need to do anything else.

1. Update the [Migration Guide][nifi-migration-guide] on the Wiki.

1. Update the NiFi Web Page to indicate NEWS of the release as appropriate

1. If the release is on the latest development line, update the NiFi website documentation pages to match the release.
    1. From a nifi.tar.gz collect the docs/html/* files and svn commit them to https://svn.apache.org/repos/asf/nifi/site/trunk/docs/nifi-docs/html/
    1. From a nifi.tar.gz collect the nifi-framework-nar.nar/META-INF/bundled-dependencies/nifi-web-api.war/docs/rest-api/* files and svn commit them to https://svn.apache.org/repos/asf/nifi/site/trunk/docs/nifi-docs/rest-api/
    1. Run an instance of nifi
    1. Copy nifi/work/docs/components/* and svn commit to https://svn.apache.org/repos/asf/nifi/site/trunk/docs/nifi-docs/components/
    1. wget http://localhost:8080/nifi-docs/documentation and svn commit to https://svn.apache.org/repos/asf/nifi/site/trunk/docs/nifi-docs/index.html

1. In Jira mark the release version as 'Released' and 'Archived' through 'version' management in the 'administration' console.

1. Create a proper signed tag of the released codebase based on the RC Tag created during the Maven release process.
   ```
   $ git tag -s rel/nifi-${NIFI_VERSION} -m "${JIRA_TICKET} signed release tag for approved release of NiFi ${NIFI_VERSION}" ${RC_TAG_COMMIT_ID}
   ```
   For instructions on setting up to sign your tag see [here][git-sign-tag-instructs].      

1. Push the release tag to the official ASF repository.
   ```
   $ git push asf rel/nifi-${NIFI_VERSION} rel/nifi-${NIFI_VERSION}
   ```

1. Update the release notes with the final date of the release.

1. After the release has been complete for 24 hours send the release announcement.
  + See [here][apache-release-announce] for an understanding of why you need to wait 24 hours
  + The announcement should addressed as follows.
    - TO: `announce@apache.org`, `dev@nifi.apache.org`
    - REPLY-TO: `dev@nifi.apache.org`
    - FROM: ${RM_USERID}@apache.org
  + The subject should include `[ANNOUNCE] Apache NiFi x.y.z release`.
  + The text should be based on the template included below.
    ```
    Hello

    The Apache NiFi team would like to announce the release of Apache NiFi ${NIFI_VERSION}.

    Apache NiFi is an easy to use, powerful, and reliable system to process and distribute
    data.  Apache NiFi was made for dataflow.  It supports highly configurable directed graphs
    of data routing, transformation, and system mediation logic.

    More details on Apache NiFi can be found here:
    https://nifi.apache.org/

    The release artifacts can be downloaded from here:
    https://nifi.apache.org/download.html

    Maven artifacts have been made available here:
    https://repository.apache.org/content/repositories/releases/org/apache/nifi/

    Issues closed/resolved for this list can be found here:
    https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12316020&version=12329373

    Release note highlights can be found here:
    https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version${NIFI_VERSION}

    Thank you
    The Apache NiFi team
    ```

[nifi-quickstart-guide]: https://nifi.apache.org/quickstart.html
[nifi-release-notes]: https://cwiki.apache.org/confluence/display/NIFI/Release+Notes
[nifi-migration-guide]: https://cwiki.apache.org/confluence/display/NIFI/Migration+Guidance

[apache-encryption]: https://www.apache.org/licenses/exports/
[apache-glossary-committer]: https://www.apache.org/foundation/glossary.html#Committer
[apache-glossary-community]: https://www.apache.org/foundation/glossary.html#Community
[apache-glossary-pmc]: https://www.apache.org/foundation/glossary.html#PMC
[apache-guide-publish-maven]: https://www.apache.org/dev/publishing-maven-artifacts.html
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
[apache-staging-repositories]: https://repository.apache.org/#stagingRepositories

[git-sign-tag-instructs]: http://gitready.com/advanced/2014/11/02/gpg-sign-releases.html
[sonatype-maven-password]: http://blog.sonatype.com/2009/10/maven-tips-and-tricks-encrypting-passwords

[070-rc2-vote]: https://lists.apache.org/thread.html/8b111ce611238af8b71b95039c299ae0a1ec063ea77f83aa34e6a2bd@%3Cdev.nifi.apache.org%3E
