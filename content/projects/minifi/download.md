---
title: MiNiFi Download
menu:
  main:
    parent: "MiNiFi"
    name: Download
    weight: 6
---

<div class="downloads">

# MiNiFi Download

Apache NiFi [Project Keys](https://downloads.apache.org/nifi/KEYS) can be used to
[verify downloads](https://www.apache.org/info/verification.html).

Please allow up to 24 hours for mirrors to synchronize following the release of a new version.

Previous releases can be found in [release archives](https://archive.apache.org/dist/nifi/).
Please avoid repeated downloads from archives to avoid infrastructure rate limits.

### MiNiFi Java {{< param currentProjectVersion >}} [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param currentProjectVersion >}})

- Released: {{< param currentProjectVersionReleased >}}
#### Sources
 {{< download-links label="Source" extension=source-release.zip >}}
#### Binaries
 {{< download-links label="MiNiFi" project=minifi extension=-bin.zip >}}
 {{< download-links label="MiNiFi Toolkit" project=minifi qualifier=toolkit extension=-bin.zip >}}
 {{< download-links label="Command and Control" project=minifi qualifier=c2 extension=-bin.zip >}}

### MiNiFi C++ 0.15.0 [Release Notes](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=65145325#ReleaseNotesMiNiFi(C++)-Versioncpp-0.15.0)

- Released: 2023-09-01 
#### Sources
{{< cpp-download-links label="Source" version=0.15.0 extension=source.tar.gz >}}
#### Binaries
{{< cpp-download-links label="MiNiFi C++" version=0.15.0 extension=bin.tar.gz >}}

### MiNiFi C++ 0.14.0 [Release Notes](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=65145325#ReleaseNotesMiNiFi(C++)-Versioncpp-0.14.0)

- Released: 2023-04-17
#### Sources
{{< cpp-download-links label="Source" version=0.14.0 extension=source.tar.gz >}}
#### Binaries
{{< cpp-download-links label="MiNiFi C++" version=0.14.0 extension=bin-linux.tar.gz >}}

</div>