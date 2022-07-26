---
title: Apache NiFi Downloads
containerEnabled: true
---

# Apache {{< project-label >}} Downloads

Apache NiFi [Project Keys](https://downloads.apache.org/nifi/KEYS) can be used to
[verify downloads](https://www.apache.org/info/verification.html). 

Please allow up to 24 hours for mirrors to synchronize following the release of a new version.

Previous releases can be found in [release archives](https://archive.apache.org/dist/nifi/).
Please avoid repeated downloads from archives to avoid infrastructure rate limits.

## Releases

### {{< param currentProjectVersion >}}

- Released: {{< param currentProjectVersionReleased >}}
  - [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param currentProjectVersion >}})
  - [Migration Guidance](https://cwiki.apache.org/confluence/display/NIFI/Migration+Guidance)
- Sources
  - {{< download-links label="Apache NiFi Sources" extension=source-release.zip >}}
- Binaries 
  - {{< download-links label="Apache NiFi Binary" extension=bin.zip >}} 
  - {{< download-links label="Apache NiFi Stateless Binary" qualifier="stateless" extension=bin.tar.gz >}}
  - {{< download-links label="Apache NiFi Toolkit Binary" qualifier="toolkit" extension=bin.zip >}}

### {{< param previousProjectVersion >}}

- Released: {{< param previousProjectVersionReleased >}}
  - [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param previousProjectVersion >}})
  - [Migration Guidance](https://cwiki.apache.org/confluence/display/NIFI/Migration+Guidance)
- Sources
  - {{< download-links label="Apache NiFi Sources" extension=source-release.zip version=previous >}}
- Binaries
  - {{< download-links label="Apache NiFi Binary" extension=bin.zip version=previous >}}
  - {{< download-links label="Apache NiFi Stateless Binary" qualifier="stateless" extension=bin.tar.gz version=previous >}}
  - {{< download-links label="Apache NiFi Toolkit Binary" qualifier="toolkit" extension=bin.zip version=previous >}}

## Images

[Docker Hub](https://hub.docker.com) hosts container images of convenience binaries.

- [Apache NiFi](https://hub.docker.com/r/apache/nifi)
- [Apache NiFi Toolkit](https://hub.docker.com/r/apache/nifi-toolkit)
- [Apache NiFi Registry](https://hub.docker.com/r/apache/nifi-registry)
- [Apache NiFi MiNiFi](https://hub.docker.com/r/apache/nifi-minifi)
- [Apache NiFi MiNiFi C++](https://hub.docker.com/r/apache/nifi-minifi-cpp)
- [Apache NiFi MiNiFi C2](https://hub.docker.com/r/apache/nifi-minifi-c2)
