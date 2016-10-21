---
title: Apache NiFi Release Guidelines
---

# Apache NiFi Release Guidelines

The purpose of this document is to capture and describe the steps involved in producing 
an official release of Apache NiFi.  It is written specifically to someone acting in the
capacity of a [Release Manager][release-manager] (RM).  

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

## The objective

Our aim is to produce an official Apache release.  

## What to validate and how to Validate a release

The following is a list of the sorts of things that will be validated and are the basics to check
when evaluating a release for a vote.

  - Are LICENSE and NOTICE file present in the source root and complete?
    - Specifically look in the *-sources.zip artifact and ensure these items are present at the root of the archive.
  - Evaluate the sources and dependencies.  Does the overall LICENSE and NOTICE appear correct?  Do all licenses fit within the ASF approved licenses?
    - Here is an example path to a sources artifact that has been prepared but not released:  
      `https://repository.apache.org/service/local/repositories/orgapachenifi-1011/content/org/apache/nifi/nifi/0.0.1/nifi-0.0.1-source-release.zip`
  - Is there a README available that explains how to build the application and to execute it?
    - Look in the *-sources.zip artifact root for the readme.
  - Are the signatures and hashes correct for the source release?
    - Validate the hashes of the sources artifact do in fact match:
      `https://repository.apache.org/service/local/repositories/orgapachenifi-1011/content/org/apache/nifi/nifi/0.0.1/nifi-0.0.1-source-release.zip.md5`
      `https://repository.apache.org/service/local/repositories/orgapachenifi-1011/content/org/apache/nifi/nifi/0.0.1/nifi-0.0.1-source-release.zip.sha1`
    - Validate the signature of the source artifact.  Here is an example path:
      `https://repository.apache.org/service/local/repositories/orgapachenifi-1011/content/org/apache/nifi/nifi/0.0.1/nifi-0.0.1-source-release.zip.asc`
    - Need a quick reminder on how to [verify a signature](http://www.apache.org/dev/release-signing.html#verifying-signature)?
  - Do all sources have necessary headers?
    - Unzip the sources file into a directory and execute `mvn install -Pcontrib-check`
  - Are there no unexpected binary files in the release?
    - The only thing we'd expect would be potentially test resources files.
  - Does the app (if appropriate) execute and function as expected?
  
## The flow of a release (an outline)
  - The community is contributing to a series of JIRA tickets assigned to the next release
  - The number of tickets open/remaining for that next release approaches zero
  - A member of the community suggests a release and initiates a discussion
  - Someone volunteers to be an RM for the release (can be a committer but apache guides indicate preference is a PMC member)
  - A release candidate is put together and a vote sent to the team.
  - If the NiFi community rejects the vote the issues noted are resolved and another RC is generated
  - If the NiFi community accepts the vote then the release is 'releasable' and can be placed into the appropriate 
    'dist' location, maven artifacts released from staging.
    
 
## The mechanics of the release

### A. Configure your environment
  
1. Follow the steps outlined in the [Quickstart Guide][quickstart-guide] to prepare the development system.
1. *Confirm that you can*
    1. *checkout the branch that is being released, and*
    1. *build the entire application.*
    
### A. Preparation to release

1. Create a JIRA ticket for the release tasks for version x.y.z, and use that ticket number for the commit messages.  For 
example we'll consider NIFI-nnnn as our ticket to release version x.y.z.
1. Create the next version in JIRA, if it doesn't already exist, so work can continue towards that release.
1. Create meaningful release notes for this version if not already created.  [Enter them here][release-notes] on the NiFi wiki. 
1. Create a new branch off 'master' named after the JIRA ticket.
    ```bash
    $ git checkout -b NIFI-<JIRA TICKET #>-RC<Candidate #> master
    ```
1. Verify that Maven has sufficient heap space to perform the build tasks.  Some plugins and parts of the build 
consumes a surprisingly large amount of space.  These settings have been shown to work.
    ```bash
    $ export MAVEN_OPTS="-Xms1024m -Xmx3076m -XX:MaxPermSize=256m"
    ```
1. Ensure your settings.xml has been updated to include a `signed_release` profile and a `<server>` entry for 
"repository.apache.org" as shown below.  There are other ways to ensure your PGP key is available for signing as well.  
    ```XML
        <profile>
            <id>signed_release</id>
            <properties>
                <mavenExecutorId>forked-path</mavenExecutorId>
                <gpg.keyname>username@apache.org</gpg.keyname>
                <gpg.passphrase>your GPG passphrase</gpg.passphrase>
            </properties>
        </profile>

        <servers>
            <server>
                <id>repository.apache.org</id>
                <username>YOUR USER NAME HERE</username>
                <password>YOUR MAVEN ENCRYPTED PASSWORD HERE</password>
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
    $ cd nifi-assembly/target/nifi-x.y.z
    $ bin/nifi.sh start
    ```
1. Evaluate and ensure the appropriate license headers are present on all source files.
1. Ensure LICENSE and NOTICE files are complete and accurate. (Developers should always be keeping these up to date as 
    they go along adding source and modifying dependencies to keep this burden manageable.)
1. Build the project with the ```contrib-check``` profile enabled to validate contribution expectations and find any 
problems that must be addressed before proceeding.  
    ```
    $ mvn install -Pcontrib-check
    ```
       

## Perform the release

1. Now its time to have maven prepare the release with this command.
    ```
    $ mvn --batch-mode release:prepare \
        -Psigned_release \
        -DscmCommentPrefix="NIFI-${RELEASE_TICKET}-RC${RC}" \
        -Dtag="nifi-${NIFI_VERSION}-RC${RC}" \
        -DreleaseVersion="${NIFI_VERSION}" \
        -DdevelopmentVersion="${NEXT_VERSION}" \
        -Darguments="-DskipTests"
    ```
1. Review the release preparation results.  If problems are found `$ mvn release:rollback` will reset the changes, or it may be necessary to run 
        `$ mvn release:clean` to get the project to a state where it can be rebuilt.

1. If the preparation without problems, it is time to perform the release and deploy artifacts to staging.
    ```
    $ mvn release:perform 
        -Psigned_release \
        -DscmCommentPrefix="NIFI-270-RC1"
        -Darguments="-DskipTests"
    ```
    When this completes the artifacts have been released to the Apache Nexus staging repository, a local release branch
     has been created and there should the staging repository ID returned in a log entry like this `[INFO]  * Closing 
     staging repository with ID "orgapachenifi-0000"`.  *The staging repository ID will be needed later for the release vote email.*

1. Browse to [https://repository.apache.org/#stagingRepositories](https://repository.apache.org/#stagingRepositories) and
login with your Apache committer credentials and you should see `orgapachenifi-nnnn`.  If you click on that you can 
inspect the various staged artifacts.

1. Validate that all the various aspects of the staged artifacts appear correct
    - Download the sources.  Do they compile cleanly?  If the result is a build does it execute?
    - Validate the hashes match.
    - Validate that the sources contain no unexpected binaries.
    - Validate the signature for the build and hashes.
    - Validate the LICENSE/NOTICE/Headers.  
    - Validate that the README is present and provides sufficient information to build and if necessary execute.
    
1. The validated artifacts all look good then push the branch to origin `git push origin NIFI-270`.

1. Create the signature and hashes for the source release and convenience binary files.
    1. ASCII armored GPG signatures (`--digest-algo=SHA512` select the SHA512 hash algorithm).
        ```
        $ gpg -a -b --digest-algo=SHA512 nifi-x.y.z-source-release.zip  # produces nifi-x.y.z-source-release.zip.asc 
        $ gpg -a -b --digest-algo=SHA512 nifi-x.y.z-bin.tar.gz          # produces nifi-x.y.z-bin.tar.gz.asc
        $ gpg -a -b --digest-algo=SHA512 nifi-x.y.z-bin.zip             # produces nifi-x.y.z-bin.zip.asc
        ```
    1. Generate md5 hash summaries.
        ```
        $ md5sum nifi-x.y.z-source-release.zip | cut -d" " -f1 > nifi-x.y.z-source-release.zip.md5
        $ md5sum nifi-x.y.z-bin.tar.gz | cut -d" " -f1 > nifi-x.y.z-bin.tar.gz.md5
        $ md5sum nifi-x.y.z-bin.zip | cut -d" " -f1 > nifi-x.y.z-bin.zip.md5
        ```
    1. Generate SHA1 hash summaries.
        ```
        $ sha1sum nifi-x.y.z-source-release.zip | cut -d" " -f1 >  nifi-x.y.z-source-release.zip.sha1
        $ sha1sum nifi-x.y.z-bin.tar.gz | cut -d" " -f1 >  nifi-x.y.z-bin.tar.gz.sha1
        $ sha1sum nifi-x.y.z-bin.zip | cut -d" " -f1 >  nifi-x.y.z-bin.zip.sha1
        ```

1. For reviewing of the release candidate, commit the source release and convenience binaries files along with their hashes and signatures to 
[https://dist.apache.org/repos/dist/dev/nifi-x.y.z](https://dist.apache.org/repos/dist/dev/nifi-x.y.z).

## Error recovery

If anything isn't correct about the staged artifacts you can drop the staged repo from repository.apache.org and delete the
local tag in git.  If you also delete the local branch and clear your local maven repository under org/apache/nifi then it is
as if the release never happened.  Before doing that though try to figure out what went wrong so the Release Guide can be
updated or corrected if necessary.
  
So, as has been described here you can test the release process until you get it right.  The `mvn versions:set ` and 
`mvn versions:commit ` commands can come in handy to help do this so you can set versions to something clearly release test related.

## Apache NiFi Community Release Vote
After the release is staged it's time to initiate a release vote within the NiFi community.  

Once the release vote is called for, the Apache NiFi Community has 72 hours to review the release candidate and vote by 
responding to the email thread calling for the vote.  The release vote is majority rule, there must be at least 3 
binding (PMC members) +1 votes and no more negative than positive. 

1. Send a vote request email to `dev@nifi.apache.org` with a subject of `[VOTE] Release Apache NiFi x.y.z`.  Use the 
  following as a template.
    ```
    Hello, 
    
    I am pleased to be calling this vote for the source release of Apache NiFi nifi-x.y.z.
    
    The source zip, including signatures, digests, etc. can be found at:
    https://repository.apache.org/content/repositories/orgapachenifi-nnnn
    
    The Git tag is nifi-x.y.z-RC1
    The Git commit ID is 72abf18c2e045e9ef404050e2bffc9cef67d2558
    https://git-wip-us.apache.org/repos/asf?p=nifi.git;a=commit;h=72abf18c2e045e9ef404050e2bffc9cef67d2558
    
    Checksums of nifi-x.y.z-source-release.zip:
    MD5: 5a580756a17b0573efa3070c70585698
    SHA1: a79ff8fd0d2f81523b675e4c69a7656160ff1214
    
    Release artifacts are signed with the following key:
    https://people.apache.org/keys/committer/joedeveloper.asc
    
    KEYS file available here:
    https://dist.apache.org/repos/dist/release/nifi/KEYS
    
    8 issues were closed/resolved for this release:
    https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12316020&version=12329307
    
    Release note highlights can be found here:
    https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Versionx.y.z
    
    The vote will be open for 72 hours.
    Please download the release candidate and evaluate the necessary items including checking hashes, signatures, build 
    from source, and test.  The please vote:
    
    [ ] +1 Release this package as nifi-0.0.1
    [ ] +0 no opinion
    [ ] -1 Do not release this package because because...
    ```
1. Send another helper email to `dev@nifi.apache.org` with a subject of `Apache NiFi x.y.z RCx Release Helper Guide`.
    ```
    Hello Apache NiFi community,
    
    Please find the associated guidance to help those interested in validating/verifying the release so they can vote.
    
    # Download latest KEYS file:
    https://dist.apache.org/repos/dist/dev/nifi/KEYS
    
    # Import keys file:
    gpg --import KEYS
    
    # [optional] Clear out local maven artifact repository
    
    # Pull down nifi-x.y.z source release artifacts for review:
    
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-x.y.z/nifi-x.y.z-source-release.zip
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-x.y.z/nifi-x.y.z-source-release.zip.asc
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-x.y.z/nifi-x.y.z-source-release.zip.md5
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-x.y.z/nifi-x.y.z-source-release.zip.sha1
    wget https://dist.apache.org/repos/dist/dev/nifi/nifi-x.y.z/nifi-x.y.z-source-release.zip.sha256
    
    # Verify the signature
    gpg --verify nifi-x.y.z-source-release.zip.asc
    
    # Verify the hashes (md5, sha1, sha256) match the source and what was provided in the vote email thread
    md5sum nifi-x.y.z-source-release.zip
    sha1sum nifi-x.y.z-source-release.zip
    sha256sum nifi-x.y.z-source-release.zip
    
    # Unzip nifi-x.y.z-source-release.zip
    
    # Verify the build works including release audit tool (RAT) checks
    cd nifi-x.y.z
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
1. After waiting 72 hours, if there are at least 3 binding (PMC members) +1 votes and no more negative votes than 
positive the vote passes and the release candidate is officially released.
1. If the vote passed, send another email to `dev@nifi.apache.org`
with a subject of `[RESULT][VOTE] Release Apache NiFi x.y.z`.  Use the following as a template.
    ```
    Apache NiFi Community,
    
    I am pleased to announce that the x.y.z release of Apache NiFi passes with
        X +1 (binding) votes
        Y -1 (binding) votes
        0 0 votes
        0 -1 votes
    
    Thanks to all who helped make this release possible.
    
    Here is the PMC vote thread: [INSERT URL OF PMC Vote Thread]
    ```

## Final Steps
After the vote is complete and the release is approved, these steps complete the release process.

[comment]: <> (some of these steps need further detail and/or examples)

1. Move convenience binaries and related artifacts from dist/dev to dist/release:  
    ```
    $ svn move -m "NIFI-<JIRA #>" https://dist.apache.org/repos/dist/dev/nifi/nifi-x.y.z https://dist.apache.org/repos/dist/release/nifi/x.y.z
    ```
1.  In repository.apache.org go to the staging repository and select `release` and follow the instructions on the site.

1.  Merge the release branch into master.
    ```
    $ git push asf NIFI-<JIRA #>
    ```
1.  Update the NiFi website to point to the new download(s).  Remove older release artifacts from download page (leave the current release and the previous one).  For the release just previous to this new one change the links to point to the archive location.  See current page as an example of the needed URL changes.  In addition to updating the download page as described delete artifacts other than the current/new release from the dist/nifi SVN storage.  They are already in the archive location so no need to do anything else.

1.  Update the [Migration Guide][migration-guide] on the Wiki.

1.  Update the NiFi Web Page to indicate NEWS of the release as appropriate

1.  If the release is on the latest development line, update the NiFi website documentation pages to match the release.
    1. From a nifi.tar.gz collect the docs/html/* files and svn commit them to https://svn.apache.org/repos/asf/nifi/site/trunk/docs/nifi-docs/html/
    1. From a nifi.tar.gz collect the nifi-framework-nar.nar/META-INF/bundled-dependencies/nifi-web-api.war/docs/rest-api/* files and svn commit them to https://svn.apache.org/repos/asf/nifi/site/trunk/docs/nifi-docs/rest-api/
    1. Run an instance of nifi
    1. Copy nifi/work/docs/components/* and svn commit to https://svn.apache.org/repos/asf/nifi/site/trunk/docs/nifi-docs/components/
    1. wget http://localhost:8080/nifi-docs/documentation and svn commit to https://svn.apache.org/repos/asf/nifi/site/trunk/docs/nifi-docs/index.html

1.  In Jira mark the release version as 'Released' and 'Archived' through 'version' management in the 'administration' console.

1.  Create a proper signed tag of the released codebase.  If the approved RC tag was `nifi-x.y.z-RC1` then create a 
    signed release tag of 'rel/nifi-x.y.z'.  
    ```
    $ git tag -s rel/nifi-x.y.z -m "NIFI-nnnn Signed release tag for approved release of nifi x.y.z" <COMMIT-ID-OF-RC-TAG>
    ```
    For instructions on setting up to sign your tag see [here][sign-tag-instructs].      
    
1.  Push the release tag to the ASF repository.
    ```
    $ git push asf rel/nifi-x.y.z rel/nifi.x.y.z
    ```

1.  Update the release notes with the final date of the release.

1.  After the vote has been complete for 24 hours send the release announcement.
  + See [here][release-announce] for an understanding of why you need to wait 24 hours
  + The announcement should be based on the template below and addressed to `announce@apache.org` and `dev@nifi.apache.org` 
    with a reply-to of `dev@nifi.apache.org`.
  + The subject should include "`[ANNOUNCE] Apache NiFi x.y.z release`".
  + (__NOTE:  the email has to be sent by the release manager of the build from their apache.org email address__).
    ```
    Hello
    
    The Apache NiFi team would like to announce the release of Apache NiFi 0.0.1.
    
    Apache NiFi is an easy to use, powerful, and reliable system to process and distribute data.  Apache NiFi was made for dataflow.  It supports highly configurable directed graphs of data routing, transformation, and system mediation logic.
    
    More details on Apache NiFi can be found here:
    http://nifi.apache.org/
    
    The release artifacts can be downloaded from here:
    http://nifi.apache.org/download.html
        
    Maven artifacts have been made available here:
    https://repository.apache.org/content/repositories/releases/org/apache/nifi/
         
    Issues closed/resolved for this list can be found here:
    https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12316020&version=12329373
    
    Release note highlights can be found here:
    https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version0.0.1
         
    Thank you
    The Apache NiFi team
    ```

[quickstart-guide]: http://nifi.apache.org/quickstart.html
[release-manager]: http://www.apache.org/dev/release-publishing.html#release_manager
[release-announce]: http://www.apache.org/dev/release.html#release-announcements
[apache-license]: http://apache.org/licenses/LICENSE-2.0
[apache-license-apply]: http://www.apache.org/dev/apply-license.html
[apache-legal-resolve]: http://www.apache.org/legal/resolved.html
[apache-encryption]: http://www.apache.org/licenses/exports/
[apache-release-policy]: http://www.apache.org/dev/release.html
[apache-release-guide]: http://www.apache.org/dev/release-publishing
[apache-pgp]: http://www.apache.org/dev/openpgp.html
[apache-release-signing]: http://www.apache.org/dev/release-signing.html
[apache-guide-publish-maven]: http://www.apache.org/dev/publishing-maven-artifacts.html
[release-notes]: https://cwiki.apache.org/confluence/display/NIFI/Release+Notes
[migration-guide]: https://cwiki.apache.org/confluence/display/NIFI/Migration+Guidance
[sign-tag-instructs]: http://gitready.com/advanced/2014/11/02/gpg-sign-releases.html
