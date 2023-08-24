---
title: Apache NiFi Release Guidelines
containerEnabled: true
---

# Apache NiFi Release Guidelines

This document describes the steps required to build and release an official version of the project.

## Objective

Produce an official Apache NiFi release from a current source branch.

# Background Information

Following the release guide requires understanding several important terms and procedures.

## Reference Documentation

- Licensing
  - [Apache License V2.0][apache-license]
  - [Apache Legal License/Resolved][apache-legal-resolve]
  - [Apache How-to Apply License][apache-license-apply]
- Release Policy and Guidelines
  - [Apache Export Classifications][apache-encryption]
  - [Apache Release Policy][apache-release-policy]
  - [Apache Release Guide][apache-release-guide]
- Environment Configuration and Release Process
  - [Apache Cryptography with OpenPGP][apache-pgp]
  - [Apache Signing Releases][apache-release-signing]
  - [Apache Publishing Maven Releases][apache-guide-publish-maven]

## Glossary of Terms

- **Release Manager** (RM) - PMC Member acting as [Release Manager][apache-release-manager] for a particular version
- **Release Candidate** (RC) - Tagged iteration of the source branch proposed for a vote by the project community
- **Community** - [Group of people][apache-glossary-community] interested in the project, both users and maintainers
- **PMC** - [Project Management Committee][apache-glossary-pmc] members who oversee the project
- **Committer** - [Committers][apache-glossary-committer] have the privilege to commit changes to the project repository

## Variable References

The release guide references names and values that vary for each version. These values have been written as shell 
variable references.

For example, when referencing a variable named `${NIFI_VERSION}` in a tag such as `nifi-${NIFI_VERSION}`, the
variable reference should be replaced with the current value for the Release Candidate build. When preparing a release
of Apache NiFi `0.7.0`, the tag would be rendered as `nifi-0.7.0`.

The example values reflect the release details for Apache NiFi 0.7.0 Release Candidate 2.

| Variable            | Example Value      | Description                                                        |
|---------------------|--------------------|--------------------------------------------------------------------|
| ${BRANCH}           | main               | Source development branch on which the release is based            |
| ${NIFI_VERSION}     | 0.7.0              | Version number targeted for release                                |
| ${NEXT_VERSION}     | 0.8.0-SNAPSHOT     | Future version number for development after the release            |
| ${JIRA_TICKET}      | NIFI-2112          | Jira issue number for tracking release tasks                       |
| ${RC}               | 2                  | Release Candidate number starting with 1 for the first build       |
| ${RC_TAG_COMMIT_ID} |                    | Hexadecimal Git commit hash of the Release Candidate tag           |
| ${STAGING_REPO_ID}  | orgapachenifi-1000 | Nexus Repository identifier for staged Maven artifacts             |
| ${RM_USERID}        | username           | Apache account identifier of the Release Manager                   |
| ${RELEASE_TAG}      | rel/nifi-0.7.0     | Git repository tag associated with the source to be released       |
| ${VOTE_THREAD_URL}  |                    | URL for the Apache Mailing List archive of the release vote thread |

# Release Overview

The release process includes steps performed by the Release Manager as well as the project community.

## Process Summary

1. Community member suggests a release timeline and initiates a discussion email thread
2. PMC member volunteers to act as the Release Manager for the version
3. RM validates the source branch and stages the code, Maven artifacts, and distributable files for an RC build
4. RM sends a vote email thread for the RC build
5. PMC members and community contributors vote to approve or reject the RC build
    1. RM cancels a vote thread for a rejected RC build
    2. RM identifies issues for resolution and prepares a new RC build 
6. RM publishes build artifacts for an approved RC build

# Release Candidate Preparation

The Release Manager is responsible for creating, signing, and staging artifacts for a Release Candidate build.

## Configure Environment

- Follow the steps outlined in the [Quickstart Guide][nifi-quickstart-guide] to prepare the development system

- Configure Maven `settings.xml` with a profile named `signing` profile and a `server` entry for
   `repository.apache.org` as shown. [Sonatype][sonatype-maven-password] provides instructions for encrypting Maven
   passwords

```xml
<profile>
    <id>signing</id>
    <properties>
        <mavenExecutorId>forked-path</mavenExecutorId>
        <gpg.keyname>${RM_USERID}@apache.org</gpg.keyname>
        <gpg.passphrase>REPLACE-WITH-ENCRYPTED-GPG-PASSPHRASE</gpg.passphrase>
    </properties>
</profile>

<servers>
    <server>
        <id>repository.apache.org</id>
        <username>${RM_USERID}</username>
        <password>REPLACE-WITH-ENCRYPTED-REPOSITORY-PASSWORD</password>
    </server>
</servers>
```

- Confirm that the local Git workspace is configured with an `origin` remote pointing to a personal fork of the
project source, and an `upstream` remote pointing to the Apache Git Repository

```bash
git remote -v

upstream https://gitbox.apache.org/repos/asf/nifi.git (fetch)
upstream https://gitbox.apache.org/repos/asf/nifi.git (push)
origin   https://github.com/${RM_USERID}/nifi.git (fetch)
origin   https://github.com/${RM_USERID}/nifi.git (push)
```

## Update Tracking

- Create a [Jira issue](https://issues.apache.org/jira/browse/NIFI) for tracking the release process with the 
`Fix Version` field set to `${NIFI_VERSION}`. The Jira issue number will be referenced as `${JIRA_TICKET}` in subsequent
steps

- Create a new version under
[Jira Releases](https://issues.apache.org/jira/projects/NIFI?selectedItem=com.atlassian.jira.jira-projects-plugin:release-page&status=unreleased)
with the `Version name` set to the next minor release version number

- Create a new version section in project [Release Notes][nifi-release-notes] highlighting notable features and fixes

## Build Artifacts

- Create a new Release Candidate branch from the source development branch named with the Jira issue and RC number

```bash
git checkout -b ${JIRA_TICKET}-RC${RC} ${BRANCH}
```
- Run Maven build with `include-grpc` and `contrib-check` profiles

```bash
./mvnw -T 2C -Pinclude-grpc,contrib-check clean install
```

## Stage Artifacts

- Set the `GPG_TTY` environment variable to allow `gpg` password prompts for artifact signing

```bash
export GPG_TTY=$(tty)
```

- Run Maven release preparation with `signing` and `include-grpc` profiles using RC version numbers

```bash
./mvnw release:prepare -Psigning,include-grpc \
-DscmCommentPrefix="${JIRA_TICKET}-RC${RC} " \
-Dtag="nifi-${NIFI_VERSION}-RC${RC}" \
-DreleaseVersion="${NIFI_VERSION}" \
-DdevelopmentVersion="${NEXT_VERSION}" \
-Darguments="-DskipTests"
```

- Review release preparation results and use [rollback](https://maven.apache.org/maven-release/maven-release-plugin/rollback-mojo.html)
and [clean](https://maven.apache.org/maven-release/maven-release-plugin/clean-mojo.html) commands when necessary to
start over when encountering failures

- Run Maven release with `signing` and `include-grpc` profiles to deploy artifacts to the Apache Nexus Repository

```bash
./mvnw release:perform -Psigning,include-grpc \
-DscmCommentPrefix="${JIRA_TICKET}-RC${RC} " \
-Darguments="-DskipTests"
```

- Open the Apache Nexus [Staging Repository][apache-staging-repositories] and login to view the staging repository that
Maven release created

## Validate Artifacts

- Create local staging directory

```bash
STAGING_DIR=~/staging
mkdir ${STAGING_DIR}
cd ${STAGING_DIR}
```

- Download the source release and signature from the Apache Nexus Staging Repository

```bash
SOURCE_RELEASE_ZIP="https://repository.apache.org/service/local/repositories/${STAGING_REPO_ID}/content/org/apache/nifi/nifi/${NIFI_VERSION}/nifi-${NIFI_VERSION}-source-release.zip"
wget ${SOURCE_RELEASE_ZIP} 
wget ${SOURCE_RELEASE_ZIP}.asc
```

- Verify the source release signature using the `gpg` command

```bash
SOURCE_RELEASE_ZIP_FILE="nifi-${NIFI_VERSION}-source-release.zip"
gpg --verify ${SOURCE_RELEASE_ZIP_FILE}.asc ${SOURCE_RELEASE_ZIP_FILE}
```

- Extract source release archive files

```bash
unzip ${SOURCE_RELEASE_ZIP_FILE}
cd nifi-${NIFI_VERSION}
```

- Run Maven command to package binaries

```bash
./mvnw package -P include-grpc -pl \
:minifi-assembly,\
:minifi-c2-assembly,\
:minifi-tookit-assembly,\
:nifi-assembly,\
:nifi-kafka-connector-assembly,\
:nifi-toolkit-assembly,\
:nifi-registry-assembly,\
:nifi-registry-toolkit-assembly,\
:nifi-stateless-assembly
```

- Copy binaries to local artifacts directory

```bash
ARTIFACTS_DIR=~/staging/artifacts
mkdir ${ARTIFACTS_DIR}
cp minifi/minifi-assembly/target/minifi-${NIFI_VERSION}-bin.zip ${ARTIFACTS_DIR}
cp minifi/minifi-c2/minifi-c2-assembly/target/minifi-c2-${NIFI_VERSION}-bin.zip ${ARTIFACTS_DIR}
cp minifi/minifi-toolkit/minifi-toolkit-assembly/target/minifi-toolkit-${NIFI_VERSION}-bin.zip ${ARTIFACTS_DIR}
cp nifi-assembly/target/nifi-${NIFI_VERSION}-bin.zip ${ARTIFACTS_DIR}
cp nifi-external/nifi-kafka-connector-assembly/target/nifi-kafka-connector-assembly-${NIFI_VERSION}.zip ${ARTIFACTS_DIR}
cp nifi-registry/nifi-registry-assembly/target/nifi-registry-${NIFI_VERSION}-bin.zip ${ARTIFACTS_DIR}
cp nifi-registry/nifi-registry-toolkit/nifi-registry-toolkit-assembly/target/nifi-registry-toolkit-${NIFI_VERSION}-bin.zip ${ARTIFACTS_DIR}
cp nifi-stateless/nifi-stateless-assembly/target/nifi-stateless-${NIFI_VERSION}-bin.zip ${ARTIFACTS_DIR}
cp nifi-toolkit/nifi-toolkit-assembly/target/nifi-toolkit-${NIFI_VERSION}-bin.zip ${ARTIFACTS_DIR}
cp ${STAGING_DIR}/nifi-${NIFI_VERSION}-source-release.zip ${ARTIFACTS_DIR}
cp ${STAGING_DIR}/nifi-${NIFI_VERSION}-source-release.zip.asc ${ARTIFACTS_DIR}
cd ${ARTIFACTS_DIR}
```

- Create OpenPGP signatures for binary files from the cloned repository directory

```bash
gpg -a -b --digest-algo=SHA512 minifi-${NIFI_VERSION}-bin.zip
gpg -a -b --digest-algo=SHA512 minifi-c2-${NIFI_VERSION}-bin.zip
gpg -a -b --digest-algo=SHA512 minifi-toolkit-${NIFI_VERSION}-bin.zip
gpg -a -b --digest-algo=SHA512 nifi-${NIFI_VERSION}-bin.zip
gpg -a -b --digest-algo=SHA512 nifi-kafka-connector-assembly-${NIFI_VERSION}.zip
gpg -a -b --digest-algo=SHA512 nifi-registry-${NIFI_VERSION}-bin.zip
gpg -a -b --digest-algo=SHA512 nifi-registry-toolkit-${NIFI_VERSION}-bin.zip
gpg -a -b --digest-algo=SHA512 nifi-stateless-${NIFI_VERSION}-bin.zip
gpg -a -b --digest-algo=SHA512 nifi-toolkit-${NIFI_VERSION}-bin.zip
```

- Create SHA-256 hashes for binary files from the cloned repository directory

```bash
sh -c 'sha256sum $1 | cut -d " " -f 1 > $1.sha256' -- minifi-${NIFI_VERSION}-bin.zip
sh -c 'sha256sum $1 | cut -d " " -f 1 > $1.sha256' -- minifi-c2-${NIFI_VERSION}-bin.zip
sh -c 'sha256sum $1 | cut -d " " -f 1 > $1.sha256' -- minifi-toolkit-${NIFI_VERSION}-bin.zip
sh -c 'sha256sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-${NIFI_VERSION}-source-release.zip
sh -c 'sha256sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-${NIFI_VERSION}-bin.zip
sh -c 'sha256sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-kafka-connector-assembly-${NIFI_VERSION}.zip
sh -c 'sha256sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-registry-${NIFI_VERSION}-bin.zip
sh -c 'sha256sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-registry-toolkit-${NIFI_VERSION}-bin.zip
sh -c 'sha256sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-stateless-${NIFI_VERSION}-bin.zip
sh -c 'sha256sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-toolkit-${NIFI_VERSION}-bin.zip
```

- Create SHA-512 hashes for binary files from the cloned repository directory

```bash
sh -c 'sha512sum $1 | cut -d " " -f 1 > $1.sha256' -- minifi-${NIFI_VERSION}-bin.zip
sh -c 'sha512sum $1 | cut -d " " -f 1 > $1.sha256' -- minifi-c2-${NIFI_VERSION}-bin.zip
sh -c 'sha512sum $1 | cut -d " " -f 1 > $1.sha256' -- minifi-toolkit-${NIFI_VERSION}-bin.zip
sh -c 'sha512sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-${NIFI_VERSION}-source-release.zip
sh -c 'sha512sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-${NIFI_VERSION}-bin.zip
sh -c 'sha512sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-kafka-connector-assembly-${NIFI_VERSION}.zip
sh -c 'sha512sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-registry-${NIFI_VERSION}-bin.zip
sh -c 'sha512sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-registry-toolkit-${NIFI_VERSION}-bin.zip
sh -c 'sha512sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-stateless-${NIFI_VERSION}-bin.zip
sh -c 'sha512sum $1 | cut -d " " -f 1 > $1.sha256' -- nifi-toolkit-${NIFI_VERSION}-bin.zip
```

## Publish Artifacts

- Push the Release Candidate branch to the Apache Git Repository

```bash
git push upstream ${JIRA_TICKET}-RC${RC}
```

- Push the Release Candidate tag to the Apache Git Repository

```bash
git push upstream nifi-${NIFI_VERSION}-RC${RC}
```

- Checkout Apache Distribution Repository using Subversion

```bash
cd ${STAGING_DIR}
svn checkout https://dist.apache.org/repos/dist/dev/nifi
cd nifi
```

- Copy and commit binaries to Apache Distribution Repository

```bash
cp -r ${ARTIFACTS_DIR} nifi-${NIFI_VERSION}
svn add nifi-${NIFI_VERSION}
svn commit -m "${JIRA_TICKET} Uploaded NiFi ${NIFI_VERSION}-RC${RC} artifacts"
```

## Release Candidate Voting

The release vote process should take place for **72 hours** under standard circumstances.

The Release Manager is responsible for sending the initial vote thread and tabulating results.

The Release Manager sends an email to the NiFi Developers Mailing List calling for a vote on the Release Candidate.

```
TO: dev@nifi.apache.org
SUBJECT: [VOTE] Release Apache NiFi ${NIFI_VERSION}
```
 
```
Team,

I am pleased to be calling this vote for the source release of Apache NiFi ${NIFI_VERSION}.

Please review the following guide for how to verify a release candidate build:

https://cwiki.apache.org/confluence/display/NIFI/Release+Candidate+Verification

The source being voted on and the convenicen binaries are available in the Apache Repository:

https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}

The build artifacts are available in the Apache Nexus Repository:

https://repository.apache.org/content/repositories/${STAGING_REPO_ID}

Git Tag: nifi-${NIFI_VERSION}-RC${RC}
Git Commit ID: ${RC_TAG_COMMIT_ID}
GitHub Commit: https://github.com/apache/nifi/commit/${RC_TAG_COMMIT_ID}

Checksums of nifi-${NIFI_VERSION}-source-release.zip:

SHA256: ${SHA256_HASH}
SHA512: ${SHA512_HASH}

Release artifacts are signed with the following key:

https://people.apache.org/keys/committer/${RM_USERID}.asc

KEYS file is available in the Apache Repository:

https://dist.apache.org/repos/dist/release/nifi/KEYS

Issues resolved in this version: ${ISSUES_RESOLVED}

https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12316020&version=12329307

Release note highlights can be found on the project wiki:

https://cwiki.apache.org/confluence/display/NIFI/Release+Notes

The vote will be open for 72 hours.

Please download the release candidate and evaluate the necessary items including checking
hashes, signatures, build from source, and test.

Please vote:

[ ] +1 Release this package as nifi-${NIFI_VERSION}
[ ] +0 no opinion
[ ] -1 Do not release this package because...
```

PMC members can cast **binding** votes. Committers and community members can cast **non-binding** votes.

The Release Manager can cancel a vote in response to negative findings. Canceling a vote requires sending an email with
`[CANCEL]` in the subject line as follows:

```
SUBJECT: [CANCEL][VOTE] Release Apache NiFi ${NIFI_VERSION}-RC${RC}
```

Approving a Release Candidate build requires at least **3 binding** positive votes from project PMC members and more
positive votes than negative votes.

The Release Manager sends an email to the NiFi Developers Mailing List with the vote results.

```
TO: dev@nifi.apache.org
SUBJECT: [RESULT][VOTE] Release Apache NiFi ${NIFI_VERSION}-RC${RC}
```

```
Apache NiFi Community,

I am pleased to announce that the ${NIFI_VERSION} release of Apache NiFi passes:

    X +1 (binding) votes
    Y +1 (non-binding) votes
    0 0 votes
    0 -1 votes

Thanks to all who helped make this release possible!

Here is the vote thread: ${VOTE_THREAD_URL}
```

## Release Artifacts

- Release Maven artifacts contained in Staging Repository on the [Apache Nexus Repository][apache-staging-repositories]

- Move source and binary artifacts to the release directory on the Apache Distribution Repository

```bash
DIST_DEV_URL=https://dist.apache.org/repos/dist/dev/nifi/nifi-${NIFI_VERSION}
DIST_RELEASE_URL=https://dist.apache.org/repos/dist/release/nifi/${NIFI_VERSION}
svn move -m "${JIRA_TICKET}" ${DIST_DEV_URL} ${DIST_RELEASE_URL}
```

- Merge the Release Candidate branch into the source development branch

```bash
git checkout ${BRANCH}
git merge --no-ff ${JIRA_TICKET}-RC${RC}
git push upstream ${BRANCH}
```

- Create signed Git tag for the release version

```bash
export GPG_TTY=$(tty)
COMMIT_ID=`git rev-list -n 1 nifi-${NIFI_VERSION}-RC${RC}`
RELEASE_TAG="rel/nifi-${NIFI_VERSION}"
git tag -s ${RELEASE_TAG} -m "${JIRA_TICKET} Tagged NiFi ${NIFI_VERSION} ${COMMIT_ID}"
```

- Push Git tag to the Apache Git Repository

```bash
git push upstream ${RELEASE_TAG}
```

- Delete previous release version from the Apache Distribution Repository

```bash
PREVIOUS_VERSION="0.6.0"
PREVIOUS_RELEASE_URL="https://dist.apache.org/repos/dist/release/nifi/${PREVIOUS_VERSION}"
svn delete -m "${JIRA_TICKET}" ${PREVIOUS_RELEASE_URL}
```

- Update Docker files with the next release version

- Commit and push Docker version changes to the Apache Git Repository

```bash
git commit -m "${JIRA_TICKET} Updated Docker version to ${NEXT_VERSION}"
git push upstream ${BRANCH}
```

## Update Documentation

- Follow the [website publishing](https://cwiki.apache.org/confluence/display/NIFI/Website+Publishing) instructions for
generating and updating project documentation

- Clone the [Apache NiFi Website](https://github.com/apache/nifi-site/) repository

```bash
git clone https://gitbox.apache.org/repos/asf/nifi-site.git
cd nifi-site
```

- Update the current and previous version variables in
[config.toml](https://github.com/apache/nifi-site/blob/main/config.toml)

- Update the documentation `RewriteRule` to the new released version in
[.htaccess](https://github.com/apache/nifi-site/blob/main/static/.htaccess)

- Push changes to the `main` branch for automated build and publication

```bash
git push origin main
```

## Update Notes

- Update
[Jira Releases](https://issues.apache.org/jira/projects/NIFI?selectedItem=com.atlassian.jira.jira-projects-plugin:release-page&status=unreleased)
using the `Actions` button to `Release` the selected version

- Update the [Migration Guide][nifi-migration-guide] instructions

- Update project [Release Notes][nifi-release-notes] with the date of the release

## Announce Release

The Release Manager sends an email to the Apache Announcements List as well as project mailing lists.

```
TO: announce@apache.org, users@nifi.apache.org, dev@nifi.apache.org
SUBJECT: [ANNOUNCE] Apache NiFi ${NIFI_VERSION} Released
```

```
The Apache NiFi Team is pelased to announce the release of Apache NiFi ${NIFI_VERSION}.

Apache NiFi is an easy to use, powerful, and reliable system to process and distribute
data.

https://nifi.apache.org

The release artifacts can be downloaded from the project website.

https://nifi.apache.org/download.html

Maven artifacts have been released and mirrored according to Apache distribution processes.

Issues resolved in Apache NiFi ${NIFI_VERSION} are listed in Jira Release Notes.

https://issues.apache.org/jira/secure/ReleaseNote.jspa?projectId=12316020&version=12329373

Highlights of the release are available on the project wiki.

https://cwiki.apache.org/confluence/display/NIFI/Release+Notes

Thank you,
The Apache NiFi Team
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
