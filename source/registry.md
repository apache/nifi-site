---
title: Apache NiFi Registry
containerEnabled: true
---

<div class="large-6">
  <img id="registry-logo" src="/assets/images/registry-logo.png" alt="Registry logo" />
</div>

<p class="description">A subproject of Apache NiFi to store and manage shared resources.</p>

# Features

Registry - a subproject of Apache NiF - is a complementary application that provides a central location for storage and
management of shared resources across one or more instances of NiFi or MiNiFi.
       
Apache NiFi Registry provides the following features:

- Implementation of a Flow Registry for storing and managing versioned flows
- Integration with NiFi to allow storing, retrieving, and upgrading versioned flows from a Flow Registry
- Administration of the Registry for defining users, groups, and policies

## Releases

Apache NiFi [Project Keys](https://downloads.apache.org/nifi/KEYS) can be used to
[verify downloads](https://www.apache.org/info/verification.html).

Please allow up to 24 hours for mirrors to synchronize following the release of a new version.

### {{< param currentProjectVersion >}}
- [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param currentProjectVersion >}})
- Sources
  - {{< download-links label="Apache NiFi Sources" extension=source-release.zip >}}
- Binaries
  - {{< download-links label="Apache NiFi Registry" qualifier="registry" extension=bin.zip >}}

## Sources

- [Apache Gitbox](https://gitbox.apache.org/repos/asf?p=nifi.git)
- [GitHub](https://github.com/apache/nifi)

## Documentation

- [Apache NiFi Registry Documentation](docs/nifi-registry-docs/index.html)
- [Apache NiFi Registry Wiki](https://cwiki.apache.org/confluence/display/NIFIREG)

## Videos

- {{< youtube-embed id="X_qhRVChjZY" title="Getting Started with Apache NiFi Registry" >}}
- {{< youtube-embed id="qD03ao3R-a4" title="Setting Up a Secure Apache NiFi Registry" >}}
- {{< youtube-embed id="DSO12fhnZ90" title="Setting Up a Secure NiFi to Integrate with a Secure NiFi Registry" >}}
- {{< youtube-embed id="kK7eVppg9Aw" title="Storing Versioned Flows in a Git Repository" >}}
