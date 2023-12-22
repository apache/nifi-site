---
title: NAR Maven Plugin Releases
---

# Apache {{< project-label >}} NAR Maven Plugin Releases

The purpose of this document is to capture and describe the steps involved in producing
an official release of Apache NiFi NAR Maven Plugin. It is written specifically to someone acting in the
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

This guide is written to be generic for any release. As such, where string literals, code snippets,
or parameter/argument values are used, placeholders will be used for values that are specific for each release.

 * Substitutions used in tasks and email templates
    | Reference                 | Example value                                | Description                                                                                                                                                        |
    |---------------------------|----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | ${BRANCH}                 | main                                         | the development branch on which the release is based                                                                                                               |
    | ${VERSION}                | 1.5.1                                        | the version being released (typically based off dropping the "-SNAPSHOT" suffix for the current development branch that is being released to mark a stable version |
    | ${NEXT_VERSION}           | 1.5.2-SNAPSHOT                               | the next development version that will being after the release is completed. Typically the next bugfix version with the "-SNAPSHOT" suffix                         |
    | ${JIRA_TICKET}            | NIFI-11688                                   | the JIRA ticket created by the release manager for the release tasks.                                                                                              |
    | ${JIRA_VERSION_URL}       | [jira version page][jira-version-url]        | the link to the version in Jira that corresponds to this release and contains all the tickets                                                                      |
    | ${JIRA_RELEASE_NOTES_URL} | [jira release notes][jira-release-notes-url] | the link to the JIRA auto-generated release notes based on the Jira version                                                                                        |
    | ${RC}                     | 1                                            | the Release Candidate index start at 1 for the first release candidate.                                                                                            |
    | ${RC_TAG_COMMIT_ID}       | 39fc959426ea405df6360969b55ae2adad47e1aa     | the 40 byte commit ID of the RC tag created during the Maven release process.                                                                                      |
    | ${STAGING_REPO_ID}        | orgapachenifi-1229                           | the temporary Apache Nexus repository ID where staged artifacts have been placed                                                                                   |
    | ${RM_USERID}              | johndoe                                      | the Apache account ID of Release Manager.                                                                                                                          |
    | ${RELEASE_TAG}            | rel/nifi-nar-maven-plugin-1.5.1              | the Git repository tag for the source code as released.                                                                                                            |
    | ${VOTE_THREAD_URL}        | [1.5.1 vote thread][151-rc1-vote]            | the URL for the Apache Pony Mail archive of the release vote thread.                                                                                               |

    _To be practical but avoid confusion with future release details, these example values reflect the previous release
NiFi NAR Maven Plugin 1.5.1 RC1 release details._

    _NOTE: The next version should be the next hotfix version since NAR Maven Plugin is released infrequently and releases are
mostly bugfix releases._

## What to validate and how to validate a release

The following is a list of the sorts of things that will be validated and are the basics to check
when evaluating a release for a vote.

  - Verify the contents contain a good README, NOTICE, and LICENSE.
  - Verify the git commit ID is correct
  - Verify the RC was branched off the correct git commit ID
  - Verify that NiFi can build NARs correctly using the plugin:
    - Update NiFi's root pom to use version 1.5.1 of the plugin: https://github.com/apache/nifi/blob/main/pom.xml#L101
    - Perform a build of NiFi, optionally clear out local .m2 repo mvn clean install
    - Ensure that NiFi starts and loads all processors, controller services, and reporting tasks
    - Spot check a few NARs to ensure they include META-INF/docs/extension-manifest.xml
      - cp NIFI_HOME/lib/nifi-xyz-bundle.nar /tmp
      - cd /tmp unzip nifi-xyz-bundle.nar
      - cat META-INF/docs/extension-manifest.xml

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
    asf	https://gitbox.apache.org/repos/asf/nifi-maven.git (fetch)
    asf	https://gitbox.apache.org/repos/asf/nifi-maven.git (push)
    origin	https://github.com/${RM_USERID}/nifi-maven.git (fetch)
    origin	https://github.com/${RM_USERID}/nifi-maven.git (push)
    ```
    Additional remotes will not cause a problem if these two are correct.  Other configurations are perfectly
    acceptable but the appropriate adjustments to the steps in this guide must be made by the release manager.
1. Confirm that source code can be checked out for the branch being released.
    ```
    git checkout ${BRANCH}
    ```
1. Confirm that the entire application builds correctly in the build environment.

### Step 2. Prepare and stage the release (RM)

1. Create a JIRA ticket for the release tasks for version ${VERSION}.  
    ___The resulting JIRA ticket number is referred to as ${JIRA\_TICKET} in this guide.___
1. Create the next version in JIRA, if it doesn't already exist, so work can continue towards that release.
1. Create meaningful release notes for this version if not already created. [Enter them here][nifi-release-notes] on
the NiFi wiki. A good starting point is reviewing the Jira generated release notes from the
[NiFi Versions management page](https://issues.apache.org/jira/projects/NIFI?selectedItem=com.atlassian.jira.jira-projects-plugin%3Arelease-page&status=unreleased)
or this JQL filter: project = NIFI and fixVersion = ${VERSION}
1. Create a new branch off 'main' named after the JIRA ticket.
    ```bash
    $ git checkout -b ${JIRA_TICKET}-RC${RC} ${BRANCH}
    ```
1. Verify that Maven has sufficient heap space to perform the build tasks. Some plugins and parts of the build
consumes a surprisingly large amount of space. These settings have been shown to work for Java 8 for NiFi NAR Maven Plugin version 1.5.1 and later.
    ```bash
    $ export MAVEN_OPTS="-Xms1024m -Xmx3076m"
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
                <gpg.passphrase>ENCRYPTED_GPG_PASSPHRASE_HERE</gpg.passphrase>
            </properties>
        </profile>

        <servers>
            <server>
                <id>repository.apache.org</id>
                <username>${RM_USERID}</username>
                <password>ENCRYPTED_PASSWORD_HERE</password>
            </server>
        </servers>
    ```
_NOTE: `gpg` will be invoked during this step, which will need to prompt you for a password.  From the command line, use
`export GPG_TTY=$(tty)` to allow `gpg` to prompt you._

_NOTE: It is not mandatory but it is advised to sign all commits created during the release. Since the commits are created
automatically, the best way is to enable gpg sign for all commits: `git config commit.gpgsign true`_

1. Ensure the the full application builds and all tests work by executing a parallel (multi-threaded) build.
Checkstyle is part of the build, there is no need to explicitly trigger it.
    ```
    $ mvn -T 2.5C clean install
    ```
2. Ensure that `nifi-nar-maven-plugin-${VERSION}.jar` is present in the target directory.
3. Evaluate and ensure the appropriate license headers are present on all source files.
4. Ensure LICENSE and NOTICE files are complete and accurate. (Developers should always be keeping these up to date as
    they go along adding source and modifying dependencies to keep this burden manageable.)
5. Go through the steps described in "What to validate and how to validate a release" section

### Step 3. Perform the release (RM)

1. Use the Maven Release Plugin to prepare the release with this command.
    ```
    $ mvn --batch-mode release:prepare \
        -Psigned_release \
        -DscmCommentPrefix="${JIRA_TICKET}-RC${RC} " \
        -Dtag="nifi-nar-maven-plugin-${VERSION}-RC${RC}" \
        -DreleaseVersion="${VERSION}" \
        -DdevelopmentVersion="${NEXT_VERSION}" \
        -Darguments="-DskipTests"
    ```
2. Review the release preparation results.  If problems are found `$ mvn release:rollback` will reset the changes, or
it may be necessary to run `$ mvn release:clean` to get the project to a state where it can be rebuilt.

3. If the release preparation completed without problems, perform the release and deploy artifacts to staging.
    ```
    $ mvn release:perform \
        -Psigned_release \
        -DscmCommentPrefix="${JIRA_TICKET}-RC${RC} " \
        -Darguments="-DskipTests"
    ```
    When this completes the artifacts have been released to the Apache Nexus staging repository at https://repository.apache.org. 
    and there should the staging repository ID returned in a log entry like this:
    ```
    [INFO]  * Closing staging repository with ID "orgapachenifi-1229"
    ```
    ___This staging repository ID is referred to by ${STAGING_REPO_ID} in this release guide.___
    ___Example staging repo url: https://repository.apache.org/content/repositories/orgapachenifi-1229/org/apache/nifi/nifi-nar-maven-plugin/1.5.1/___

4. Browse to the Apache [Staging Repository][apache-staging-repositories] and
login with your Apache committer credentials and you should see the newly created staging repository listed.  If you
click on that you can inspect the various staged artifacts.

5. Validate that all the various aspects of the staged artifacts appear correct
    - Download the source-release and signature at the following URL. Do they compile cleanly?
       `wget https://repository.apache.org/content/repositories/orgapachenifi-1229/org/apache/nifi/nifi-nar-maven-plugin/${VERSION}/nifi-nar-maven-plugin-${VERSION}-source-release.zip`
       `wget https://repository.apache.org/content/repositories/orgapachenifi-1229/org/apache/nifi/nifi-nar-maven-plugin/${VERSION}/nifi-nar-maven-plugin-${VERSION}-source-release.zip.asc`
    - Validate the signature and hashes. [Verifying a release signature](https://nifi.apache.org/gpg.html#verifying-a-release-signature).
    - Validate that the sources contain no unexpected binaries.
    - Validate the LICENSE/NOTICE/Headers.  
    - Validate that the README is present and provides sufficient information to build and if necessary execute.

6. If the validated artifacts all look good then push the local git branch and tag to the ASF repository.
    ```
    $ git push asf ${JIRA_TICKET}-RC${RC}
    $ git push asf nifi-nar-maven-plugin-${VERSION}-RC${RC}  # Note this tag is created as part of the maven release plugin
    ```
    ___From this branch, the ${RC_TAG_COMMIT_ID} will be the 40 byte commit hash with the comment: ${JIRA_TICKET}-RC${RC} prepare release nifi-${NIFI_VERSION}-RC${RC}___

7. Create the signature and hashes for the source-release. During the vote process we only use the source-release, so we only need that file. 
    1. ASCII armored GPG signatures (`--digest-algo=SHA512` select the SHA512 hash algorithm). [Configure GPG to always prefer stronger hashes](https://www.apache.org/dev/openpgp.html#key-gen-avoid-sha1).
    Technically you can include the .asc file from the release build, but our practice is to generate the .asc file locally again. (based on the downloaded .zip)
        ```
        $ gpg -a -b --digest-algo=SHA512 nifi-nar-maven-plugin-${VERSION}-source-release.zip
        ```
    2. Generate SHA256 and SHA512 hash summaries. The automation only creates the sha1 and md5 hashes. However we use sha256 and sha512 hashes during the
    vote process that we need to generate locally:
        ```
        $ shasum -a 256 nifi-nar-maven-plugin-1.5.1-source-release.zip | cut -d" " -f1 > nifi-nar-maven-plugin-${VERSION}-source-release.zip.sha256
        $ shasum -a 512 nifi-nar-maven-plugin-1.5.1-source-release.zip | cut -d" " -f1 > nifi-nar-maven-plugin-${VERSION}-source-release.zip.sha512
        ```

8. For reviewing of the release candidate, commit the source release and convenience binaries files along with their
hashes and signatures to `https://dist.apache.org/repos/dist/dev/nifi/nifi-nar-maven-plugin-${VERSION}`. There should be in total 4 files (1 source-release.zip, 1 signature, 1 sha256, 1 sha512).
```
svn checkout https://dist.apache.org/repos/dist/dev/nifi dist-dev-nifi
 
cd dist-dev-nifi/
 
mkdir nifi-nar-maven-plugin-${VERSION}
# Add source release to nifi-nar-maven-plugin-${VERSION}, along with their corresponding signature and hash files
 
svn update
svn add nifi-nar-maven-plugin-${VERSION}
svn commit -m "${JIRA_TICKET} Staging artifacts for nifi-nar-maven-plugin-${VERSION}-RC${RC}" nifi-nar-maven-plugin-${VERSION}
```

### Step 4. Error recovery (RM)

If anything isn't correct about the staged artifacts you can drop the staged repo from repository.apache.org and delete
the local tag in git.  If you also delete the local branch and clear your local maven repository under org/apache/nifi
then it is as if the release never happened.  Before doing that though try to figure out what went wrong so the Release
Guide can be updated or corrected if necessary.

So, as has been described here you can test the release process until you get it right.  The `mvn versions:set` and
`mvn versions:commit` commands can come in handy to help do this so you can set versions to something clearly release
test related.

### Step 5. Release Vote (RM and community)

After the release source and artifacts are staged in the repositories, the RM sends a release vote to the community.

Once the release vote is called for, members of the NiFi developer community have 72 hours to evaluate the RC and
cast their vote by replying to the "[VOTE] Release ..." email sent by the RM.

_NOTE:  The release vote is majority rule vote that must include at least 3 binding +1 votes Apache NiFi PMC members
and more positive than negative binding votes._

1. RM sends a vote request email to the NiFi Developers Mailing List.
    - TO: `dev@nifi.apache.org`
    - FROM: `${RM_USERID}@apache.org`
    - SUBJECT: `[VOTE] Release Apache NiFi NAR Maven Plugin ${VERSION}`
    ```
    Hello Apache NiFi Community,

    I am pleased to be calling this vote for the source release of Apache NiFi NAR Maven Plugin ${VERSION}

    The source being voted upon, including signatures, digests, etc. can be found at:
    https://dist.apache.org/repos/dist/dev/nifi/nifi-nar-maven-plugin-${VERSION}/

    A helpful reminder on how the release candidate verification process works:
    https://cwiki.apache.org/confluence/display/NIFI/How+to+help+verify+an+Apache+NiFi+NAR+Maven+Plugin+release+candidate

    The Git tag is nifi-nar-maven-plugin-${VERSION}-rc${VERSION}
    The Git commit ID is ${RC_TAG_COMMIT_ID}
    https://gitbox.apache.org/repos/asf?p=nifi-maven.git;a=commit;h=${RC_TAG_COMMIT_ID}

    Checksums of nifi-nar-maven-plugin-${VERSION}-source-release.zip:
    SHA256: <64-CHAR-SHA256SUM-HASH>
    SHA512: <128-CHAR-SHA512SUM-HASH>

    Release artifacts are signed with the following key:
    https://people.apache.org/keys/committer/${RM_USERID}.asc

    KEYS file available here:
    https://dist.apache.org/repos/dist/release/nifi/KEYS

    3 issues were closed/resolved for this release:
    ${JIRA_RELEASE_NOTES_URL}

    Release note highlights can be found here:
    https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-NiFiNARMavenPluginVersion${VERSION}

    The vote will be open for 72 hours. Please download the release
    candidate and evaluate the necessary items including checking hashes,
    signatures, build from source, and test. Then please vote:

    [ ] +1 Release this package as nifi-nar-maven-plugin-${VERSION}
    [ ] +0 no opinion
    [ ] -1 Do not release this package because ...
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
    - SUBJECT: `[RESULT][VOTE] Release Apache NiFi NAR Maven Plugin ${VERSION}`
    ```
    Apache NiFi Community,

    I am pleased to announce that the ${VERSION} release of Apache NiFi NAR Maven Plugin passes with
        X +1 (binding) votes
        Y +1 (non-binding) votes
        0 0 votes
        0 -1 votes

    Thanks to all who helped make this release possible.

    Here is the PMC vote thread: ${VOTE_THREAD_URL}
    ```

### Step 6. Finalize the Release

After the vote is complete and the release is approved, these steps complete the release process.

1. Move convenience binaries and related artifacts from dist/dev to dist/release:  
 _NOTE: the release branch requires PMC access_
    ```
    $ svn move -m "${JIRA_TICKET}" https://dist.apache.org/repos/dist/dev/nifi/nifi-nar-maven-plugin-${VERSION} https://dist.apache.org/repos/dist/release/nifi/nifi-nar-maven-plugin-${VERSION}
    ```
1. At https://repository.apache.org, login with your Apache ID credentials, go to Staging Repositories, select Release and follow the instructions on the site.

1. Merge the release branch into main. (this will result in a merge commit)
    ```
    $ git checkout main
    $ git merge --no-ff ${JIRA_TICKET}-RC${RC}
    $ git push asf main
    ```

1. Delete the previous version release artifacts from the dist/release repo. Confirm the artifacts you deleted are present in apache archive where ASF keeps all releases forever http://archive.apache.org/dist/nifi/
    ```
    $ svn delete -m "${JIRA_TICKET} Removing old release dir" https://dist.apache.org/repos/dist/release/nifi/nifi-nar-maven-plugin-${OLD_VERSION}
    ```

1. In Jira, mark the ${JIRA_TICKET} resolved. All tickets for the Jira release version should now be resolved or closed. Mark the release version for ${VERSION} as 'Released' using the NiFi Versions management page.
This may also be a good time to create a Jira version for the next planned release of ${NEXT_VERSION} (usually the next hotfix version in case of NAR Maven Plugin).

1. Ensure the release artifacts are successfully mirrored to the archive, specifically https://archive.apache.org/dist/nifi/nifi-nar-maven-plugin-${VERSION}.jar.  
This convenience binary file will be used as a dependency in NiFi and will be mirrored to Maven Central.  If there were any 
issues with the above listed file not being available, it may be necessary to reach out to the ASF Infra team. This step might take a long time (even an overnight) so
it can be skipped.

1. Create a proper signed tag of the released codebase based on the RC Tag created during the Maven release process.  
_NOTE: `gpg` will be invoked during this step, which will need to prompt you for a password.  From the command line, use
`export GPG_TTY=$(tty)` to allow `gpg` to prompt you._
   ```
   $ git tag -s rel/nifi-nar-maven-plugin-${VERSION} -m "${JIRA_TICKET} signed release tag for approved release of NiFi NAR Maven Plugin ${VERSION}" ${RC_TAG_COMMIT_ID}
   ```
   For instructions on setting up to sign your tag see [here][git-sign-tag-instructs].      

1. Push the release tag to the official ASF repository.
   ```
   $ git push asf rel/nifi-nar-maven-plugin-${VERSION}
   ```

1. Update the release notes with the final date of the release.

1. After the release has been complete for an hour send the release announcement.
  + See [here][apache-release-announce] for an understanding of why you need to wait
  + The email must be in pure-text format otherwise the email sent to the announce list will be rejected. If you are using Gmail, just click the "vertical 3 spots" icon, and choose "pure text".
  + The announcement should addressed as follows.
    - TO: `announce@apache.org`, `dev@nifi.apache.org`
    - REPLY-TO: `dev@nifi.apache.org`
    - FROM: `${RM_USERID}@apache.org` (this is crucial announce list doesn't accept addresses outside of apache.org)
    - SUBJECT: `[ANNOUNCE] Apache NiFi NAR Maven Plugin ${VERSION} release`.
    ```
    Hello

    The Apache NiFi team would like to announce the release of Apache NiFi NAR Maven Plugin ${VERSION}.

    Apache NiFi is an easy to use, powerful, and reliable system to process and distribute
    data. Apache NiFi was made for dataflow. It supports highly configurable directed graphs
    of data routing, transformation, and system mediation logic.

    Nar Maven Plugin is a release artifact used for supporting the NiFi classloader isolation model.

    More details on Apache NiFi can be found here:
    https://nifi.apache.org/

    The release artifacts can be downloaded from here:
    https://repository.apache.org/content/groups/public/org/apache/nifi/nifi-nar-maven-plugin/${VERSION}/

    Maven artifacts have been made available and mirrored as per normal ASF artifact processes.

    Issues closed/resolved for this list can be found here:
    ${JIRA_RELEASE_NOTES_URL}

    Release note highlights can be found here:
    https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-NiFiNARMavenPluginVersion${VERSION}

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

[jira-version-url]: https://issues.apache.org/jira/projects/NIFI/versions/12353009
[jira-release-notes-url]: https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12316020&version=12353009

[151-rc1-vote]: https://lists.apache.org/thread/vrr3ndjh2wd9f4c8slb82232yglbfysd
