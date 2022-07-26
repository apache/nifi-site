---
title: Apache NiFi Release Guidelines
containerEnabled: true
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
 * **Committer** - within the Apache NiFi community, [committers][apache-glossary-committer] have gained the privilege to commit changes to the Apache NiFi codebase.

## High level flow of a release

  - The Apache NiFi community is constantly contributing to JIRA tickets assigned to the next release.
  - At some point the number of tickets open/remaining for the next release begins to approach zero.
  - A member of the community suggests a release and initiates a discussion.
  - Someone volunteers to perform the Release Manager (RM) role for the release.  (This can be a committer but Apache
  guides indicate a preference for a PMC member.)
  - The RM validates the proposed release and stages the source code, Maven artifacts, and distributable files for a
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

 * Substitutions used in tasks and email templates
    <pre>
    Reference            Example value       Description
    =========            ==============      ===========
    ${BRANCH}            main                the development branch on which the release is based.
    ${NIFI_VERSION}      0.7.0               the version currently in development on the release branch.
    ${NEXT_VERSION}      0.8.0-SNAPSHOT      the future version for development on the release branch.
    ${JIRA_TICKET}       NIFI-2112           the JIRA ticket created by the release manager for the release tasks.
    ${RC}                2                   the Release Candidate index start at 1 for the first release candidate.
    ${RC_TAG_COMMIT_ID}                      the 40 byte commit ID of the RC tag created during the Maven release process.
    ${STAGING_REPO_ID}   orgapachenifi-1088  the temporary repository ID where staged artifacts have been placed.
    ${RM_USERID}         johndoe             the Apache account ID of Release Manager.
    ${RELEASE_TAG}       rel/nifi-0.7.0      the Git repository tag for the source code as released.
    ${VOTE_THREAD_URL}   [0.7.0 vote thread][070-rc2-vote]   the URL for the Apache Pony Mail archive of the release vote thread.
    </pre>

    _To be practical but avoid confusion with future release details, these example values reflect the previous release
NiFi 0.7.0 RC2 release details._

NOTE: The next version should be the next minor version if the release is based on a major version development branch (e.g main
or 0.x). The next version should be the next incremental version if the release is based on a minor version development branch (e.g
support/nifi-1.1.x or support/nifi-0.7.4). If this is the first incremental release (e.g. 1.2.1) for a minor release line the support
branch may need to be created.

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
      `https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip`
  - Is there a README available that explains how to build the application and to execute it?
    - Look in the *-sources.zip artifact root for the readme.
  - Are the signatures and hashes correct for the source release?
    - Validate the hashes of the sources artifact do in fact match:
      `https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip.sha256`
      `https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip.sha512`
    - Validate the signature of the source artifact.  Here is an example path:
      `https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip.asc`
    - Need a quick reminder on how to [verify a signature][apache-signature-verify]?
  - Do all sources have necessary headers?
    - Unzip the sources file into a directory and execute `mvn install -Pcontrib-check,include-grpc`
    - You can avoid 'include-grpc' if you're building on a system that doesn't support it.
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
    asf	https://gitbox.apache.org/repos/asf/nifi.git (fetch)
    asf	https://gitbox.apache.org/repos/asf/nifi.git (push)
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
1. Create a new branch off 'main' named after the JIRA ticket.
    ```bash
    $ git checkout -b ${JIRA_TICKET}-RC${RC} ${BRANCH}
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
    $ mvn -T 2.5C clean install -Pinclude-grpc
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
    $ mvn install -Pcontrib-check,include-grpc
    ```
1. Verify and update if necessary to ensure Docker version information points to the next release version.  For instance, set correct release versions in various Dockerfile files found in the codebase.  There are approximately 5 to update as of version 1.16.

### Step 3. Perform the release (RM)

1. Now its time to have maven prepare the release with this command.  
_NOTE: `gpg` will be invoked during this step, which will need to prompt you for a password.  From the command line, use
`export GPG_TTY=$(tty)` to allow `gpg` to prompt you._
    ```
    $ mvn --batch-mode release:prepare \
        -Psigned_release,include-grpc \
        -DscmCommentPrefix="${JIRA_TICKET}-RC${RC} " \
        -Dtag="nifi-${NIFI_VERSION}-RC${RC}" \
        -DreleaseVersion="${NIFI_VERSION}" \
        -DdevelopmentVersion="${NEXT_VERSION}" \
        -Darguments="-DskipTests"
    ```
1. Review the release preparation results.  If problems are found `$ mvn release:rollback` will reset the changes, or
it may be necessary to run `$ mvn release:clean` to get the project to a state where it can be rebuilt.

1. If the preparation without problems, it is time to perform the release and deploy artifacts to staging.
    ```
    $ mvn release:perform \
        -Psigned_release,include-grpc \
        -DscmCommentPrefix="${JIRA_TICKET}-RC${RC} " \
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
    - Download the sources and signature at the following URL. Do they compile cleanly?  If the result is a build does it execute?  We download the sources and signature from the nexus artifacts so that these sources and signature match what we put in dist and thus all signatures and such match.  If you pull the sources from your local build it will differ and can create confusion during RC validation.  These are the first two primary artifacts you need for the voting (the sources and the signature).  You'll gather other artifacts and signatures and generate hashes below.
       `wget https://repository.apache.org/service/local/repositories/orgapachenifi-nnnn/content/org/apache/nifi/nifi/${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip`
       `wget https://repository.apache.org/service/local/repositories/orgapachenifi-nnnn/content/org/apache/nifi/nifi/${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip.asc`
    - Validate the hashes match.
    - Validate that the sources contain no unexpected binaries.
    - Validate the signature for the build and hashes. [Verifying a release signature](https://nifi.apache.org/gpg.html#verifying-a-release-signature).
    - Validate the LICENSE/NOTICE/Headers.  
    - Validate that the README is present and provides sufficient information to build and if necessary execute.

1. The validated artifacts all look good then push the branch to origin release branch to the ASF repository.
    ```
    $ git push asf ${JIRA_TICKET}-RC${RC}
    ```
    ___From this branch, the ${RC_TAG_COMMIT_ID} will be the 40 byte commit hash with the comment ${JIRA_TICKET}-RC${RC} prepare release nifi-${NIFI_VERSION}-RC${RC}___

1. Push the tag created by the release:prepare step to the ASF repository.
    ```
    git push asf nifi-${NIFI_VERSION}-RC${RC}
    ```
1. Create the signature and hashes for the source release and convenience binary files.  You take the source release and signature from steps above.  You grab the other conveniece binaries from your local build directories.
    1. ASCII armored GPG signatures (`--digest-algo=SHA512` select the SHA512 hash algorithm). [Configure GPG to always prefer stronger hashes](https://www.apache.org/dev/openpgp.html#key-gen-avoid-sha1).
        ```
        $ gpg -a -b --digest-algo=SHA512 nifi-${NIFI_VERSION}-bin.tar.gz          # produces nifi-${NIFI_VERSION}-bin.tar.gz.asc
        $ gpg -a -b --digest-algo=SHA512 nifi-${NIFI_VERSION}-bin.zip             # produces nifi-${NIFI_VERSION}-bin.zip.asc
        $ gpg -a -b --digest-algo=SHA512 nifi-toolkit-${NIFI_VERSION}-bin.zip     # produces nifi-toolkit-${NIFI_VERSION}-bin.zip.asc
        $ gpg -a -b --digest-algo=SHA512 nifi-toolkit-${NIFI_VERSION}-bin.tar.gz  # produces nifi-toolkit-${NIFI_VERSION}-bin.tar.gz.asc
        ```
    1. Generate SHA256 hash summaries.
        ```
        $ shasum -a 256 nifi-${NIFI_VERSION}-source-release.zip | cut -d" " -f1 >  nifi-${NIFI_VERSION}-source-release.zip.sha256
        $ shasum -a 256 nifi-${NIFI_VERSION}-bin.tar.gz | cut -d" " -f1 >  nifi-${NIFI_VERSION}-bin.tar.gz.sha256
        $ shasum -a 256 nifi-${NIFI_VERSION}-bin.zip | cut -d" " -f1 >  nifi-${NIFI_VERSION}-bin.zip.sha256
        $ shasum -a 256 nifi-toolkit-${NIFI_VERSION}-bin.zip | cut -d" " -f1 >  nifi-toolkit-${NIFI_VERSION}-bin.zip.sha256
        $ shasum -a 256 nifi-toolkit-${NIFI_VERSION}-bin.tar.gz | cut -d" " -f1 >  nifi-toolkit-${NIFI_VERSION}-bin.tar.gz.sha256
        ```
    1. Generate SHA512 hash summaries.
        ```
        $ shasum -a 512 nifi-${NIFI_VERSION}-source-release.zip | cut -d" " -f1 >  nifi-${NIFI_VERSION}-source-release.zip.sha512
        $ shasum -a 512 nifi-${NIFI_VERSION}-bin.tar.gz | cut -d" " -f1 >  nifi-${NIFI_VERSION}-bin.tar.gz.sha512
        $ shasum -a 512 nifi-${NIFI_VERSION}-bin.zip | cut -d" " -f1 >  nifi-${NIFI_VERSION}-bin.zip.sha512
        $ shasum -a 512 nifi-toolkit-${NIFI_VERSION}-bin.zip | cut -d" " -f1 >  nifi-toolkit-${NIFI_VERSION}-bin.zip.sha512
        $ shasum -a 512 nifi-toolkit-${NIFI_VERSION}-bin.tar.gz | cut -d" " -f1 >  nifi-toolkit-${NIFI_VERSION}-bin.tar.gz.sha512
        ```

1. For reviewing of the release candidate, commit the source release and convenience binaries files along with their
hashes and signatures to `https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}`. There should be in total 20 files (5 primary artifacts, 5 signatures, 5 sha256, 5 sha512).

### Step 4. Error recovery (RM)

If anything isn't correct about the staged artifacts you can drop the staged repo from repository.apache.org and delete
the local tag in git.  If you also delete the local branch and clear your local maven repository under org/apache/nifi
then it is as if the release never happened.  Before doing that though try to figure out what went wrong so the Release
Guide can be updated or corrected if necessary.

So, as has been described here you can test the release process until you get it right.  The `mvn versions:set -Pinclude-grpc` and
`mvn versions:commit -Pinclude-grpc` commands can come in handy to help do this so you can set versions to something clearly release
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

    The source being voted upon and the convenience binaries can be found at:
    https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}/

    A helpful reminder on how the release candidate verification process works:
    https://cwiki.apache.org/confluence/display/NIFI/How+to+help+verify+an+Apache+NiFi+release+candidate

    The Git tag is nifi-${NIFI_VERSION}-RC${RC}
    The Git commit ID is ${RC_TAG_COMMIT_ID}
    https://gitbox.apache.org/repos/asf?p=nifi.git;a=commit;h=${RC_TAG_COMMIT_ID}

    Checksums of nifi-x.y.z-source-release.zip:
    SHA256: <64-CHAR-SHA256SUM-HASH>
    SHA512: <128-CHAR-SHA512SUM-HASH>

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
    from source, and test. Then please vote:

    [ ] +1 Release this package as nifi-${NIFI_VERSION}
    [ ] +0 no opinion
    [ ] -1 Do not release this package because...
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
    - SUBJECT: `[RESULT][VOTE] Release Apache NiFi ${NIFI_VERSION}`
    ```
    Apache NiFi Community,

    I am pleased to announce that the ${NIFI_VERSION} release of Apache NiFi passes with
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

1. Move convenience binaries and related artifacts from dist/dev to dist/release:  
    ```
    $ svn move -m "${JIRA_TICKET}" https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION} https://dist.apache.org/repos/dist/release/nifi/${NIFI_VERSION}
    ```
1. In repository.apache.org go to the staging repository and select `release` and follow the instructions on the site.

1. Merge the release branch into main. (this will result in a merge commit)
    ```
    $ git checkout main
    $ git merge --no-ff ${JIRA_TICKET}-RC${RC}
    $ git push asf main
    ```

1. Update Docker version information to point to the next release.  For instance, if the next version applied by Maven is 1.3.0-SNAPSHOT, these values should be updated to 1.3.0. This currently consists of three files:
    * [nifi-docker/dockerhub/Dockerfile, Line 25][dockerhub-version],
    * [nifi-docker/dockerhub/DockerImage.txt, Line 16][dockerimage-version] and
    * [nifi-docker/docker-compose/docker-compose.yml, Line 25][dockercompose-version].
    
1. Commit and push the dockerhub module updates to the ASF repository:
    ```
    git commit -m "${JIRA_TICKET} Updated dockerhub module for next release"
    git push asf main
    ```

1. Remove artifacts other than the current/new release from the dist/SVN storage https://dist.apache.org/repos/dist/release/nifi/ Confirm the artifacts you deleted are present in apache archive where ASF keeps all releases forever http://archive.apache.org/dist/nifi/

1. Update the [Migration Guide][nifi-migration-guide] on the Wiki.

1. Update the NiFi website to point to the new downloads.

    1. Update the following website configuration variables in [config.toml](https://github.com/apache/nifi-site/blob/main/config.toml)
        1. Set `currentProjectVersion` to the new released version
        2. Set `currentProjectVersionReleased` to the date of release publication
        3. Set `previousProjectVersion` to the previous released version
        4. Set `previousProjectVersionReleased` to the date of release publication for the previous version
        
1. If the release is on the latest development line, update the NiFi website documentation pages to match the release. See [Website Publishing](https://cwiki.apache.org/confluence/display/NIFI/Website+Publishing) on the project wiki for updating generated documentation.

1. In JIRA mark the release version as 'Released' and 'Archived' through 'version' management in the 'administration' console.

1. Ensure the release artifacts are successfully mirrored to the archive, specifically https://archive.apache.org/dist/nifi/${NIFI_VERSION}/nifi-${NIFI_VERSION}-bin.tar.gz.  
This convenience binary file is the basis for our [Docker build][docker-build] and is needed in place before the released tag is pushed to the repository.  If there were any 
issues with the above listed file not being available, it may be necessary to reach out to the ASF Infra team to adjust file size limits to accommodate larger artifacts.  
_NOTE: The [Docker build][docker-build] is triggered by pushing the signed tag in the next step. The release artifacts must be present
in the archive before continuing._

1. Create a proper signed tag of the released codebase based on the RC Tag created during the Maven release process.  
_NOTE: `gpg` will be invoked during this step, which will need to prompt you for a password.  From the command line, use
`export GPG_TTY=$(tty)` to allow `gpg` to prompt you._
   ```
   $ git tag -s rel/nifi-${NIFI_VERSION} -m "${JIRA_TICKET} Signed release tag for approved release of NiFi ${NIFI_VERSION}" ${RC_TAG_COMMIT_ID}
   ```
   For instructions on setting up to sign your tag see [here][git-sign-tag-instructs].      

1. Push the release tag to the official ASF repository.
   ```
   $ git push asf rel/nifi-${NIFI_VERSION}
   ```

1. Verify that the Docker build began at the [Build Status][docker-build-status] page.  If the build does not take place soon after the release tag was pushed, it may be necessary to contact ASF Infra to ask for assistance and the job to be triggered again.

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

    Maven artifacts have been made available and mirrored as per normal ASF artifact processes.

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

[dockerhub-version]: https://github.com/apache/nifi/blob/main/nifi-docker/dockerhub/Dockerfile#L24
[dockerimage-version]: https://github.com/apache/nifi/blob/main/nifi-docker/dockerhub/DockerImage.txt#L16
[dockercompose-version]: https://github.com/apache/nifi/blob/main/nifi-docker/docker-compose/docker-compose.yml#L25
[docker-build]: https://hub.docker.com/r/apache/nifi
[docker-build-status]: https://hub.docker.com/r/apache/nifi/builds/

[070-rc2-vote]: https://lists.apache.org/thread.html/8b111ce611238af8b71b95039c299ae0a1ec063ea77f83aa34e6a2bd@%3Cdev.nifi.apache.org%3E
