---
title: Apache NiFi MiNiFi Downloads
menu:
  main:
    parent: "MiNiFi"
    name: Download
    weight: 6
---

<div class="downloads">

# Apache {{< project-label >}} MiNiFi Downloads

Apache NiFi [Project Keys](https://downloads.apache.org/nifi/KEYS) can be used to
[verify downloads](https://www.apache.org/info/verification.html).

Please allow up to 24 hours for mirrors to synchronize following the release of a new version.

Previous releases can be found in [release archives](https://archive.apache.org/dist/nifi/).
Please avoid repeated downloads from archives to avoid infrastructure rate limits.

## MiNiFi

### MiNiFi Java {{< param currentProjectVersion >}} [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param currentProjectVersion >}})

- Released: {{< param currentProjectVersionReleased >}}
#### Sources
 {{< download-links label="Apache NiFi Sources" extension=source-release.zip >}}
#### Binaries
 {{< download-links label="Apache NiFi MiNiFi Binary" project=minifi extension=-bin.zip >}}
 {{< download-links label="Apache NiFi MiNiFi Toolkit Binary" project=minifi qualifier=toolkit extension=-bin.zip >}}
 {{< download-links label="Apache NiFi MiNiFi Command and Control Binary" project=minifi qualifier=c2 extension=-bin.zip >}}

### MiNiFi C++ 0.15.0 [Release Notes](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=65145325#ReleaseNotesMiNiFi(C++)-Versioncpp-0.15.0)

- Released: 2023-09-01 
#### Sources
{{< cpp-download-links label="Apache NiFi MiNiFi C++ Sources" version=0.15.0 extension=source.tar.gz >}}
#### Binaries
{{< cpp-download-links label="Apache NiFi MiNiFi C++ Binary for Linux x86_64" version=0.15.0 extension=bin.tar.gz >}}

### MiNiFi C++ 0.14.0 [Release Notes](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=65145325#ReleaseNotesMiNiFi(C++)-Versioncpp-0.14.0)

- Released: 2023-04-17
#### Sources
{{< cpp-download-links label="Apache NiFi MiNiFi C++ Sources" version=0.14.0 extension=source.tar.gz >}}
#### Binaries
{{< cpp-download-links label="Apache NiFi MiNiFi C++ Binary for Linux x86_64" version=0.14.0 extension=bin-linux.tar.gz >}}

</div>

## MiNiFi Sources

### MiNiFi Java Source

<li><a href="https://github.com/apache/nifi">GitHub - Java Agent<span uk-icon="link"></span></a></li>
<li><a href="https://issues.apache.org/jira/issues/?jql=project%20%3D%20NIFI%20AND%20resolution%20%3D%20Unresolved%20AND%20component%20%3D%20%22MiNiFi%22%20ORDER%20BY%20priority%20DESC%2C%20updated%20DESC">
MiNiFi Java Issues<span uk-icon="link"></span></a></li>

### MiNiFi C++ Source

<li><a href="https://github.com/apache/nifi-minifi-cpp">GitHub - C++ Agent<span uk-icon="link"></span></a></li>
<li><a href="https://issues.apache.org/jira/browse/MINIFICPP">MiNiFi C++ Issues<span uk-icon="link"></span></a></li>

