---
title: GPG (Gnu Privacy Guard / Open PGP) Signatures
containerEnabled: true
---

# Apache NiFi Release Signatures and Code Signing

The purpose of this document is to capture and describe the steps involved in generating and verifying cryptographic signatures of official releases of Apache NiFi, as well as configuring cryptographic signatures of individual code commits.  It is written for contributors, committers, and users of Apache NiFi (and related applications).  

## <a name="table-of-contents">Table of Contents</a>
  * [The Objective](#the-objective)
  * [Background Material](#background-material)
  * [Terms](#terms)
  * [Variable Reference Substitutions](#variable-reference-substitutions)
  * [Download GPG](#download-gpg)
  * [Setting up your key](#setting-up-your-key)
  * [Publish your key](#publish-your-key)
  * [Import another GPG key](#import-another-gpg-key)
  * [Verify a key](#verify-a-key)
  * [Web of trust](#web-of-trust)
  * [Set up Git with your key](#set-up-git-with-your-key)
  * [Sign commits](#sign-commits)
  * [Verifying a signature](#verifying-a-signature)
  * [Set up GitHub with your key](#set-up-github-with-your-key)
  * [Signing a release artifact](#signing-a-release-artifact)
  * [Verifying a release signature](#verifying-a-release-signature)
  * [Transfer a secret key](#transfer-a-secret-key)
  * [Troubleshooting](#troubleshooting)

## <a name="the-objective">The Objective</a>

Our aim is to instruct users on how to sign their commits, verify other's signatures, and do the same for official releases of Apache NiFi. 
  
## <a name="background-material">Background Material</a>

  - These documents are helpful for general environmental setup to perform GPG signing and signature verification: 
    - [Apache PGP Info][apache-pgp]
    - [Apache Release Signing][apache-release-signing]
    - [Git Ready: Signing Releases with GPG][git-sign-tag-instructs]
    - [RFC 4880: IETF Standard Spec for OpenPGP][rfc-4880]
    - [GitHub Blog: GPG Signature Verification][github-gpg-signing]
    - [Git Ready: gpg-sign releases][git-sign-tag-instructs]
    - [GitHub Help: Signing Commits Using GPG][github-help-gpg]
    - [GitHub Help: Telling Git About Your GPG Key][git-config-gpg]
    - [Git Docs: Git Tools Signing Your Work][git-gpg]
    - [PGP Web of Trust][web-of-trust]

## <a name="terms">Terms</a>

 * **Asymmetric Cryptography** - a type of cryptography which relies on *key pairs* -- a *public* and *private* key which are mathematically-related such that no other component key matches. This cryptography offers the following actions: **encrypt**, **decrypt**, **sign**, and **verify**
 * **Cryptographic Signature** - a series of bytes which are the result of a signing operation such that only the possessor of a specific private key could have generated this signature. A valid signature indicates that the possessor of said key performed the operation (non-repudiable)
 * **GNU Privacy Guard (GnuPG or GPG)** - an open-source implementation of encryption software compatible with the OpenPGP standard specified by [RFC 4880][rfc-4880]
 * **Pretty Good Privacy (PGP)** - an encryption program written by Phil Zimmermann to provide cryptographic protection (via confidentiality and integrity/authenticity) over data. It follows the OpenPGP standard as specified by [RFC 4880][rfc-4880]

## <a name="variable-reference-substitutions">Variable Reference Substitutions</a>

Throughout this guide, references must be made to names and values that will vary from release to release.  For clarity
those variable values have been written like Bash variable references.  When a term like
"```/tmp/src/nifi-${NIFI_VERSION}```" is seen in an instruction or email template it should be replaced with
"```/tmp/src/nifi-1.7.0```" when working the release of "Apache NiFi 1.7.0".

 * Substitutions used in tasks and email templates
    <pre>
    Reference            Example value       Description
    =========            ==============      ===========
    ${BRANCH}            master              the development branch on which the release is based.
    ${NIFI_VERSION}      1.7.0               the version currently in development on the release branch.
    ${NEXT_VERSION}      1.8.0-SNAPSHOT      the future version for development on the release branch.
    ${JIRA_TICKET}       NIFI-2112           the JIRA ticket created by the release manager for the release tasks.
    ${RC}                2                   the Release Candidate index start at 1 for the first release candidate.
    ${RC_TAG_COMMIT_ID}                      the 40 byte commit ID of the RC tag created during the Maven release process.
    ${STAGING_REPO_ID}   orgapachenifi-1088  the temporary repository ID where staged artifacts have been placed.
    ${RM_USERID}         johndoe             the Apache account ID of Release Manager.
    ${RELEASE_TAG}       rel/nifi-1.7.0      the Git repository tag for the source code as released.
    ${VOTE_THREAD_URL}   [1.7.0 vote thread][070-rc2-vote]   the URL for the Apache Pony Mail archive of the release vote thread.
    </pre>

    _To be practical but avoid confusion with future release details, these example values reflect the previous release
NiFi 1.7.0 RC2 release details._

*NOTE: The next version should be the next minor version if the release is based on a major version development branch (e.g master
or 0.x). The next version should be the next incremental version if the release is based on a minor version development branch (e.g
support/nifi-1.1.x or support/nifi-0.7.4). If this is the first incremental release (e.g. 1.2.1) for a minor release line the support
branch may need to be created.*

## <a name="download-gpg">Download GPG</a>

To get started, you should download the appropriate software for your operating system (links and version compatibility as of July 10, 2018). Follow the configuration instructions that come with your tool of choice:

### Mac OS X / macOS

* [GPG Suite][gpg-suite] -- macOS 10.9+ -- a GUI-based suite of GPG tools including command-line tool, Mail client integration, etc. 
* gpg via brew -- distribution of [GnuPG][gnupg] command-line tool via [brew][brew]. Install via `brew update && brew install gpg2`. You may also need `gpg-agent` depending on your system. 

### Linux
* Redhat/CentOS -- `yum install gnupg`
* Debian/Ubuntu -- `apt-get install gnupg`

### Windows
* [Gpg4win][gpg4win] -- Windows 7+ -- a GUI-based suite of GPG tools

## <a name="setting-up-your-key">Setting up your key</a>

*All following commands will use the command-line syntax to perform these operations unless otherwise noted. For instructions on performing these operations in a GUI-environment, refer to the resources listed above.*

To begin, run the `gpg` command with the `--gen-key` or `--full-generate-key` flag. You will be prompted for various information, and can accept the defaults other than **name** and **email**. The tool will prompt for a passphrase, and the key pair will be identified by the **user id** (**name** + **email**) and a **key fingerprint**. 

Example:

```
# Generate the key
🔓 0s @ 15:06:19 $ gpg --gen-key
Note: Use "gpg --full-generate-key" for a full featured key generation dialog.

GnuPG needs to construct a user ID to identify your key.

Real name: NiFi Test User
Email address: test@nifi.apache.org
You selected this USER-ID:
    "NiFi Test User <test@nifi.apache.org>"

Change (N)ame, (E)mail, or (O)kay/(Q)uit? o
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: key 71456940555DB64A marked as ultimately trusted
gpg: revocation certificate stored as '/Users/alopresto/.gnupg/openpgp-revocs.d/718FAE8D4F81CDED06EA652271456940555DB64A.rev'
public and secret key created and signed.

pub   rsa2048 2018-07-10 [SC] [expires: 2020-07-09]
      718FAE8D4F81CDED06EA652271456940555DB64A
uid                      NiFi Test User <test@nifi.apache.org>
sub   rsa2048 2018-07-10 [E] [expires: 2020-07-09]

# List all keys in the key ring
🔓 38s @ 15:07:11 $ gpg -k
gpg: checking the trustdb
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: depth: 0  valid:   6  signed:   4  trust: 0-, 0q, 0n, 0m, 0f, 6u
gpg: depth: 1  valid:   4  signed:  10  trust: 3-, 0q, 0n, 0m, 1f, 0u
gpg: depth: 2  valid:  10  signed:   1  trust: 8-, 0q, 0n, 0m, 2f, 0u
gpg: next trustdb check due at 2018-08-19
/Users/alopresto/.gnupg/pubring.gpg
-----------------------------------
pub   dsa2048 2010-08-19 [SC] [expires: 2018-08-19]
      85E38F69046B44C1EC9FB07B76D78F0500D026C4
uid           [ultimate] GPGTools Team <team@gpgtools.org>
uid           [ultimate] GPGMail Project Team (Official OpenPGP Key) <gpgmail-devel@lists.gpgmail.org>
uid           [ultimate] GPGTools Project Team (Official OpenPGP Key) <gpgtools-org@lists.gpgtools.org>
uid           [ultimate] [jpeg image of size 5871]
sub   elg2048 2010-08-19 [E] [expires: 2018-08-19]
sub   rsa4096 2014-04-08 [S] [expires: 2024-01-02]

...

pub   rsa2048 2018-07-10 [SC] [expires: 2020-07-09]
      718FAE8D4F81CDED06EA652271456940555DB64A
uid           [ultimate] NiFi Test User <test@nifi.apache.org>
sub   rsa2048 2018-07-10 [E] [expires: 2020-07-09]

# List a specific key with (formatted) fingerprint
🔓 0s @ 15:11:37 $ gpg --fingerprint 0x555DB64A
pub   rsa2048 2018-07-10 [SC] [expires: 2020-07-09]
      718F AE8D 4F81 CDED 06EA  6522 7145 6940 555D B64A
uid           [ultimate] NiFi Test User <test@nifi.apache.org>
sub   rsa2048 2018-07-10 [E] [expires: 2020-07-09]

```

You now have a key generated for your identity. Some Apache users will include "(CODE SIGNING KEY)" after their name to separate this key from other keys they use. This is optional. By default, keys use 2048 bit length. You can increase this to 4096 bits by using the `--full-generate-key` or `--default-new-key-algo rsa4096` flags when generating. 

The **key fingerprint** can be referred to by the last 8 hex digits (**short ID**) or last 16 hex digits (**long ID**), so for the remainder of this guide, our example key will have the **long ID** `7145 6940 555D B64A` (spaces optional) and **short ID** `555D B64A`, which we can reference in commands as `0x555DB64A`.  

### Trust vs. Validity

It is important to understand the difference between two closely related concepts -- **trust** and **validity**. Validity is how much *you* trust a *key*; that is *how well you have verified the key represents who it claims*. Trust (sometimes referred to as **ownertrust**) is how much transitive trust you give to that entity; how well do you believe *Person X* verifies keys that *they* sign? 

There are four levels of **trust** and five levels of **validity**. 

**Trust**
1. `unknown` -- you do not know how well the owner verifies keys
1. `none` -- you do not trust the owner to verify keys
1. `marginal` -- you trust the owner to verify keys
1. `full` -- you trust the owner to verify keys as well or better than you do

**Validity** 
1. `unknown` -- you do not know whether to trust this key
1. `never`/`none` -- you do not trust this key
1. `marginal` -- you have lightly verified that this key belongs to the owner
1. `full` -- you have verified that this key belongs to the owner
1. `ultimate` -- you have no doubt that this key belongs to the owner (likely because you generated it)

Your generated key is granted `ultimate` trust by default, because you just generated it. See [Web of Trust][web-of-trust] and [GNU Privacy Handbook][gnu-privacy-handbook] for more information and helpful diagrams. 

## <a name="publish-your-key">Publish your key</a>

To allow other users to encrypt data with your key, verify signatures made by your key, etc., you should publish your **PUBLIC** key. *Never share your **PRIVATE** (sometimes referred to as **SECRET**) key*. You can publish your public key to a *key server*, post it on your website, etc. The tools provide multiple ways to perform this task via `--export` and `--send-keys`. Refer to the references above for more information on this process. 

```
# Send the public key to a remote key server
🔓 0s @ 15:20:53 $ gpg --send-keys 0x555DB64A
gpg: sending key 71456940555DB64A to hkps://hkps.pool.sks-keyservers.net
```

## <a name="import-another-gpg-key">Import another GPG key</a>

For the key ecosystem to function, you'll want to import other public keys. These can come from key servers, public keys encoded as ASCII sent directly to you, or `KEYS` files posted on servers (such as [https://dist.apache.org/repos/dist/release/nifi/KEYS](https://dist.apache.org/repos/dist/release/nifi/KEYS)). 

```
# Download the KEYS file
🔓 4s @ 15:21:35 $ wget https://archive.apache.org/dist/nifi/KEYS
--2018-07-10 15:26:24--  https://archive.apache.org/dist/nifi/KEYS
...

# Import the KEYS file keys
🔓 1s @ 15:26:27 $ gpg -v --import KEYS
gpg: armor header: Version: GnuPG v1
gpg: armor header: Version: GnuPG v2.0.22 (GNU/Linux)
gpg: pub  rsa4096/9C4F7E9D98B1CC53 2010-10-23  Benson Margulies <bimargulies@apache.org>
gpg: using pgp trust model
gpg: key 9C4F7E9D98B1CC53: public key "Benson Margulies <bimargulies@apache.org>" imported
...
gpg: Total number processed: 17
gpg:               imported: 16
gpg:              unchanged: 1
gpg: 23 keys processed (26 validity counts cleared)
gpg: public key of ultimately trusted key 71456940555DB64A not found
gpg: public key of ultimately trusted key D735933E0D99CDD3 not found
gpg: public key of ultimately trusted key AFF2B36823B944E9 not found
gpg: public key of ultimately trusted key 6EC293152D90B61D not found
gpg: public key of ultimately trusted key 125A4E6851BF2B79 not found
gpg: public key of ultimately trusted key 76D78F0500D026C4 not found
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: depth: 0  valid:   6  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 6u
```

## <a name="verify-a-key">Verify a key</a>

When you first import an external key, the key is untrusted (**validity** level `never`). To mark a key as trusted, you will perform *key verification*, either *directly* or via *web of trust*. 

### Direct Verification

For entities you can contact directly via a trusted mechanism (voice call, in-person, etc.), you can exchange the **key fingerprint** personally and verify that the fingerprint they present matches what you have imported. Once verified, you can sign the key. Here I am imitating another user, using a previously-generated key (`0x2F7DEF69`) to sign the "imported" key that was generated above. 

```
# Signing an imported key with your own key
🔓 132s @ 15:36:12 $ gpg -v --sign-key 0x555DB64A

gpg: using pgp trust model
sec  rsa2048/71456940555DB64A
     created: 2018-07-10  expires: 2020-07-09  usage: SC
     trust: ultimate      validity: unknown
ssb  rsa2048/4FC72361977CEC0A
     created: 2018-07-10  expires: 2020-07-09  usage: E
[ unknown] (1). NiFi Test User <test@nifi.apache.org>

gpg: using "70ECB3E598A65A3FD3C4BACE3C6EF65B2F7DEF69" as default secret key for signing

sec  rsa2048/71456940555DB64A
     created: 2018-07-10  expires: 2020-07-09  usage: SC
     trust: ultimate      validity: unknown
 Primary key fingerprint: 718F AE8D 4F81 CDED 06EA  6522 7145 6940 555D B64A

     NiFi Test User <test@nifi.apache.org>

This key is due to expire on 2020-07-09.
Are you sure that you want to sign this key with your
key "Andy LoPresto <alopresto@apache.org>" (3C6EF65B2F7DEF69)

Really sign? (y/N) y
gpg: RSA/SHA512 signature from: "3C6EF65B2F7DEF69 Andy LoPresto <alopresto@apache.org>"
```

### Web of Trust

If it is infeasible to contact the key bearer directly, you can delegate that trust to a third-party who you already trust. For example, if you cannot directly contact Joe Witt, but you already trust Andy LoPresto (i.e. you have verified Andy's key and believe Andy would verify keys he trusts), you can sign Joe's key if Andy has already done so. You can choose to employ a lower level of validity (`marginal` vs. `full`) in that case depending on your transitive **ownertrust** in Andy's verification. See [Web of Trust][web-of-trust] and [GNU Privacy Handbook][gnu-privacy-handbook] for more information and helpful diagrams. 

## <a name="set-up-git-with-your-key">Set up Git with your key</a>

To sign commits via `git`, update your `~/.gitconfig` file. You can also do this by running `git --config ...` commands. This example file (not complete) is configured for our *NiFi Test User <test@nifi.apache.org>* (`0x555DB64A`) user. 

```
# ~/.gitconfig
[user]
    name = NiFi Test User
    email = test@nifi.apache.org
    signingkey = 555DB64A
[commit]
    gpgsign = true
    template = /path/to/template/.stCommitMsg
[gpg]
    program = /path/to/bin/gpg
```

See [Telling Git About Your GPG Key][git-config-gpg] for more on setting this up. 

## <a name="sign-commits">Sign commits</a>

Now when you commit work via git, you will run the command `git commit -S` to tell git to sign the commit. After doing that, `git log --show-signature` will show the signature:

```
🔓 0s @ 16:13:38 $ git log -1 --show-signature
commit bef91008bb86de9b541fbe1fd82ed37eef1784d5 (HEAD -> master, apache/master)
gpg: Signature made Tue Jul 10 11:15:07 2018 PDT
gpg:                using RSA key BD540AEC07AC788F5613EF1D6EC293152D90B61D
gpg: Good signature from "Andy LoPresto (CODE SIGNING KEY) <alopresto@apache.org>" [ultimate]
Author: Andy LoPresto <alopresto@apache.org>
Date:   Mon Jul 9 18:42:56 2018 -0700

    NIFI-5399 Added wildcard certificate documentation to Admin Guide.
    Clarified CN vs. SAN entries.

    This closes #2870.

    Signed-off-by: Pierre Villard <pierre.villard.fr@gmail.com>
```

See [git-sign-tag-instructs], [github-help-gpg], and [git-gpg] for more information on setting this up. 

## <a name="verifying-a-signature">Verifying a signature</a>

When viewing commits by other authors, each may have a signature. The validity of the signature depends on your trust of the signer's key. 

*NOTE: sometimes, the __author__ and __signer__ of a commit are different, especially in NiFi's RTC context.* The *author* is who wrote the code/content in the change, while the *signer* is the *committer* who actually merged the code to the `master` branch. 

For example, I have imported and trust Matt's key but do not trust Bryan's key. Here are two commits, both *authored* by Matt, but one (`06e8f88`) he committed himself (thus also *signed* by his key), and one (`26ea785`) that Bryan commited for him (and *signed* with Bryan's key). 

```
🔓 89s @ 16:16:27 $ git log --show-signature
commit fe31a06fdc4c76b94f47194d87f5a811b06e8f88
gpg: Signature made Thu Jun 14 09:21:47 2018 PDT
gpg:                using RSA key 507A205016328841C4BAC9EEDF61EC19432AEE37
gpg: checking the trustdb
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: depth: 0  valid:   6  signed:   4  trust: 0-, 0q, 0n, 0m, 0f, 6u
gpg: depth: 1  valid:   4  signed:   9  trust: 3-, 0q, 0n, 0m, 1f, 0u
gpg: depth: 2  valid:   9  signed:   1  trust: 7-, 0q, 0n, 0m, 2f, 0u
gpg: next trustdb check due at 2018-08-19
gpg: Good signature from "Matt Gilman (CODE SIGNING KEY) <mcgilman@apache.org>" [full]
Author: Matt Gilman <matt.c.gilman@gmail.com>
Date:   Wed Jun 13 09:28:44 2018 -0400

    NIFI-4907:
    - Minor adjustments following PR.
    - Avoiding additional find operation when authorizing components when populating component details.
    - Requiring access to provenance events when downloading content or submitting a replay as they may provide events details.
    - Updating the REST API docs detailing the required permissions.
    - Updating the wording in the documentation regarding the provenance and data policies.
    - Removed the event attributes from the authorization calls that were verifying access to provenance events.
    - Only checking content availability when the user is authorized for the components data.
    - Addressing typo in JavaDoc.

    This closes #2703

commit 8feac9ae54f84fbc86f957732e193e91726ea785
gpg: Signature made Tue Jun 12 09:50:48 2018 PDT
gpg:                using RSA key 5D277C87E312B3BB738A4076A0DDA9ED50711C39
gpg: Good signature from "Bryan Bende <bbende@apache.org>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 5D27 7C87 E312 B3BB 738A  4076 A0DD A9ED 5071 1C39
Author: Matt Gilman <matt.c.gilman@gmail.com>
Date:   Tue Jun 5 12:47:36 2018 -0400

    NIFI-5237:
    - Ensuring the proxy headers are considered when redirecting the user following a OIDC or Knox login exchange.

    This closes #2763.

    Signed-off-by: Bryan Bende <bbende@apache.org>

```

After importing and marking Bryan's key as trusted:

```
 1s @ 16:17:36 $ git log --show-signature
commit fe31a06fdc4c76b94f47194d87f5a811b06e8f88
gpg: Signature made Thu Jun 14 09:21:47 2018 PDT
gpg:                using RSA key 507A205016328841C4BAC9EEDF61EC19432AEE37
gpg: Good signature from "Matt Gilman (CODE SIGNING KEY) <mcgilman@apache.org>" [full]
Author: Matt Gilman <matt.c.gilman@gmail.com>
Date:   Wed Jun 13 09:28:44 2018 -0400

    NIFI-4907:
    - Minor adjustments following PR.
    - Avoiding additional find operation when authorizing components when populating component details.
    - Requiring access to provenance events when downloading content or submitting a replay as they may provide events details.
    - Updating the REST API docs detailing the required permissions.
    - Updating the wording in the documentation regarding the provenance and data policies.
    - Removed the event attributes from the authorization calls that were verifying access to provenance events.
    - Only checking content availability when the user is authorized for the components data.
    - Addressing typo in JavaDoc.

    This closes #2703

commit 8feac9ae54f84fbc86f957732e193e91726ea785
gpg: Signature made Tue Jun 12 09:50:48 2018 PDT
gpg:                using RSA key 5D277C87E312B3BB738A4076A0DDA9ED50711C39
gpg: Good signature from "Bryan Bende <bbende@apache.org>" [full]
Author: Matt Gilman <matt.c.gilman@gmail.com>
Date:   Tue Jun 5 12:47:36 2018 -0400

    NIFI-5237:
    - Ensuring the proxy headers are considered when redirecting the user following a OIDC or Knox login exchange.

    This closes #2763.

    Signed-off-by: Bryan Bende <bbende@apache.org>
```

See [GitHub Blog: GPG Signature Verification][github-gpg-signing] for more information on setting this up. 

## <a name="set-up-github-with-your-key">Set up GitHub with your key</a>

See [Adding a new GPG key to your GitHub account][github-new-key-account]. 

## <a name="signing-a-release-artifact">Signing a release artifact</a>

When signing a release artifact (an [RM duty][apache-nifi-release] only), you should generate detached GPG signatures (i.e. in a separate file, ASCII-armored (aka Base64-encoded)). These signatures should be named `file-being-signed.xyz.asc` and should be signed using the `SHA-512` hash algorithm. See [Configure GPG to always prefer stronger hashes](https://www.apache.org/dev/openpgp.html#key-gen-avoid-sha1) to configure this preference permanently. 

 ```
        $ gpg -a -b --digest-algo=SHA512 nifi-${NIFI_VERSION}-source-release.zip  # produces nifi-${NIFI_VERSION}-source-release.zip.asc
        $ gpg -a -b --digest-algo=SHA512 nifi-${NIFI_VERSION}-bin.zip             # produces nifi-${NIFI_VERSION}-bin.zip.asc
        $ gpg -a -b --digest-algo=SHA512 nifi-toolkit-${NIFI_VERSION}-bin.zip     # produces nifi-toolkit-${NIFI_VERSION}-bin.zip.asc
 ```

The output looks like below:

```
# Display the detached signature
🔓 0s @ 16:38:03 $ more nifi-1.7.0-source-release.zip.asc
-----BEGIN PGP SIGNATURE-----

iQIzBAABCgAdFiEEvVQK7AeseI9WE+8dbsKTFS2Qth0FAlspxKcACgkQbsKTFS2Q
th1Lrw/+JCd6dqM8xlTWvBeWMqKQyhkJ/rkiGjrldRKzQx3rczjeuFuSKhd5aRCi
3GUqdLHIoJ3NgOJ/kaoDtU1BsOCTDUs7kacXAR8NAHnTOx8W1e22xThp9hqXBGep
epxqWAftYBp+MTuvqw9ci2t+bDZUYlvjbRiOhN9mcPaJZ9u/0lxSsvAwKMY5kJQz
tfS17952kBEEYH7BpIiR8TNCg2Xdk+N6qsvW9ojpXQaiVMAso/B+I7TeJZlkvpuw
5rNZ9dTQ8s2MRR0cev7w8rF8VlzlbjU3HIWPUADVvdYmvn4JQRD/c0XoBpUlRFbx
4QEQbm5vdKnGGOrpCJ3W+T79iOSMLoRX/EPGLoqcizVGgl8LMUcZgN53w2Nm6ggA
UiwBZeXvC0nuveaN7MN5x4p19A0nicjIEB7tdL3oT69XaINjpC/l97VlahnILcjZ
K+Ik9c3RabJjKU5dPl1zPGKCRYAU62UvHZrXwTNuDx6oaLBDfIPnRs+QrRet6O7z
FoY3JIti3He2nP38pbXuZGthjzgxEqcst/tBBLORJ8Ak3l/oWze5dc9Dud9sgjg+
kJ2nIoN1c4Kkv1+menhoU37JWcqDHrYWe3cZ0GRMQLp1Mqt8MbN7dLF7YcKN3yNA
1GuwDc/VKXzv2AoDYPI36wPpho8jUIzEZtiRhiZ3vm+tkFnwGKc=
=gPIi
-----END PGP SIGNATURE-----
```

## <a name="verifying-a-release-signature">Verifying a release signature</a>

For an official Apache NiFi release, the source release archive (*nifi-${NIFI_VERSION}-source-release.zip*) will be accompanied by multiple checksum files and a GPG signature. The user who generated the GPG signature (the Release Manager) will have specified the user ID (name and email) used to sign it, and will have ensured their public key is present in the `KEYS` file listed in the vote email. Following the steps in the email, download the `KEYS` file and import it into your GPG keyring (it may report that no keys changed if you already had all of the published keys imported). Refer to [Import another GPG key](#import-another-gpg-key) for more details if necessary. 

```
# Verifying a good signature
🔓 0s @ 16:38:08 $ gpg --verify -v nifi-1.7.0-source-release.zip.asc
gpg: assuming signed data in 'nifi-1.7.0-source-release.zip'
gpg: Signature made Tue Jun 19 20:06:15 2018 PDT
gpg:                using RSA key BD540AEC07AC788F5613EF1D6EC293152D90B61D
gpg: using pgp trust model
gpg: Good signature from "Andy LoPresto (CODE SIGNING KEY) <alopresto@apache.org>" [ultimate]
gpg: binary signature, digest algorithm SHA512, key algorithm rsa4096
```

A signature by an untrusted key will have a result like:

```
# Verifying an untrusted signature
🔓 10s @ 16:46:24 $ gpg --verify -v nifi-registry-0.2.0-source-release.zip.asc
gpg: assuming signed data in 'nifi-registry-0.2.0-source-release.zip'
gpg: Signature made Fri Jun 15 17:19:30 2018 PDT
gpg:                using RSA key C09BA891AED45B8C2C231AFE1FB66A91F71B6207
gpg: Good signature from "Kevin Doran (CODE SIGNING KEY) <kdoran@apache.org>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: C09B A891 AED4 5B8C 2C23  1AFE 1FB6 6A91 F71B 6207
gpg: binary signature, digest algorithm SHA512, key algorithm rsa4096
```

Refer to [Verify a key](#verify-a-key) for steps to verify the untrusted key if necessary. 

A bad (incorrect, modified, malicious) signature will have a result like:

```
# Verifying a bad signature
🔓 0s @ 16:41:11 $ gpg --verify -v nifi-1.7.0-source-release.zip.asc
gpg: assuming signed data in 'nifi-1.7.0-source-release.zip'
gpg: Signature made Tue Jul 10 16:40:51 2018 PDT
gpg:                using RSA key 70ECB3E598A65A3FD3C4BACE3C6EF65B2F7DEF69
gpg: using pgp trust model
gpg: BAD signature from "Andy LoPresto <alopresto@apache.org>" [full]
gpg: binary signature, digest algorithm SHA512, key algorithm rsa4096
```

In this case, you should contact the RM and report this finding. 

## <a name="transfer-a-secret-key">Transfer a secret key</a>

This is a risky operation. The most vulnerable part of the system is the passphrase that encrypts the private key. If an attacker obtains a copy of the encrypted private key file, an attack on the passphrase is likely to be feasible. So it is vital to store the private key securely at all times.
There are very few occasions when this risk is justified. One of them is when you need to transfer your key to a new machine.

To export all secret keys to a temporary file:
```
gpg --export-secret-keys --armor --output exported_keys.sec
```

Move `exported_keys.sec` to the new machine, preferably with a pendrive.

Import this temporary file into the target keyring:
```
gpg --import exported_keys.sec 
```

Check for secret keys imported in the output. Listing secret keys for the target keyring should now show the existence of the secret key:
```
gpg --list-secret-keys
```

Finally make sure that the temporary file you used cannot be read. We recommend secure deletion. If you are working on Linux, for example, you can use the `shred` command:
```
shred exported_keys.sec
```

The keys you exported most likely had `ultimate` trust by default, because you generated them. However the trust level is not exported, so the key going to have `unknown` trust.
To restore `ultimate` trust, you need to edit the key `gpg --edit-key <keyId>` by typing `trust` command in the prompt.

Another option is to export the trustlevel of your keys: 
```
gpg --export-ownertrust > trustlevel.txt
```

To import them:
```
gpg --import-ownertrust < trustlevel.txt
```

## <a name="troubleshooting">Troubleshooting</a>

* IDE integration may require configuring `gpg` to use `no-tty` in `~/.gnupg/gpg.conf`. See [Git GPG signing from IDE](https://intellij-support.jetbrains.com/hc/en-us/community/posts/206502489-Git-GPG-commit-signing-commit-s-from-IDE-in-effective-way) or [How to sign git commits from within an IDE like IntelliJ?](https://stackoverflow.com/questions/46863981/how-to-sign-git-commits-from-within-an-ide-like-intellij). 

[apache-pgp]: https://www.apache.org/dev/openpgp.html
[apache-release-guide]: https://www.apache.org/dev/release-publishing
[apache-release-policy]: https://www.apache.org/dev/release.html
[apache-release-signing]: http://www.apache.org/dev/release-signing.html
[apache-signature-verify]: https://www.apache.org/dev/release-signing.html#verifying-signature
[apache-nifi-release]: https://nifi.apache.org/release-guide.html
[rfc-4880]: https://tools.ietf.org/html/rfc4880

[gpg-suite]: https://gpgtools.org
[gnupg]: https://gnupg.org
[brew]: https://brew.sh
[gpg4win]: https://gpg4win.org

[git-sign-tag-instructs]: http://gitready.com/advanced/2014/11/02/gpg-sign-releases.html
[github-gpg-signing]: https://blog.github.com/2016-04-05-gpg-signature-verification/
[github-help-gpg]: https://help.github.com/articles/signing-commits-using-gpg/
[git-gpg]: https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work
[git-config-gpg]: https://help.github.com/articles/telling-git-about-your-gpg-key/
[web-of-trust]: https://www.linux.com/learn/pgp-web-trust-core-concepts-behind-trusted-communication
[gnu-privacy-handbook]: https://www.gnupg.org/gph/en/manual/x334.html
[github-new-key-account]: https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account
