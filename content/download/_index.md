---
title: "Download"
---

# Download

Previous releases are available in [release archives](https://archive.apache.org/dist/nifi/). Archive downloads are
subject to rate limiting.

OpenPGP [Project Keys](https://downloads.apache.org/nifi/KEYS) can be used for
[download verification](https://www.apache.org/info/verification.html).

<ul class="uk-tab" uk-switcher>
  <li><a class="uk-active" href="#nifi">NiFi</a></li>
  <li><a href="#minifi">MiNiFi</a></li>
  <li><a href="#registry">Registry</a></li>
  <li><a href="#fds">FDS</a></li>
</ul>

<ul class="uk-switcher">
  <li>

## Apache NiFi

### Apache NiFi {{< param currentProjectVersion >}} <a href="https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param currentProjectVersion >}}">Release Notes</a>

- Released: {{< param currentProjectVersionReleased >}}
- [Migration Guidance](https://cwiki.apache.org/confluence/display/NIFI/Migration+Guidance)

#### Sources
{{< download-links label="Download Source" project="nifi" extension="-source-release.zip">}}
#### Binaries
{{< download-links label="Download Standard" project="nifi" extension="-bin.zip">}}
{{< download-links label="Download Stateless" project="nifi" extension="-bin.zip" qualifier="stateless">}}
{{< download-links label="Download Kafka" project="nifi" extension=".zip" qualifier="kafka-connector-assembly">}}
{{< download-links label="Download Toolkit" project="nifi" extension="-bin.zip" qualifier="toolkit">}}
### Apache NiFi {{< param previousProjectVersion >}} <a href="https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param previousProjectVersion >}}">Release Notes</a>

- Released: {{< param previousProjectVersionReleased >}}
- [Migration Guidance](https://cwiki.apache.org/confluence/display/NIFI/Migration+Guidance)

#### Sources
{{< download-links version="previous" label="Download Source" project="nifi" extension="-source-release.zip">}}

#### Binaries
{{< download-links version="previous" label="Download Standard" project="nifi" extension="-bin.zip">}}
{{< download-links version="previous" label="Download Stateless" project="nifi" extension="-bin.zip" qualifier="stateless">}}
{{< download-links version="previous" label="Download Kafka" project="nifi" extension=".zip" qualifier="kafka-connector-assembly">}}
{{< download-links version="previous" label="Download Toolkit" project="nifi" extension="-bin.zip" qualifier="toolkit">}}

</li><li>

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

</li><li>

## Apache NiFi Registry

### Registry {{< param currentProjectVersion >}} [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param currentProjectVersion >}})
#### Sources
{{< download-links label="Apache NiFi Sources" extension=-source-release.zip >}}
#### Binaries
{{< download-links label="Apache NiFi Registry" qualifier="registry" extension=-bin.zip >}}

</li><li>

## Apache NiFi Flow Design System
### 0.3.0 [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-NiFiFlowDesignSystem0.3.0)

{{< fds-download-links label="Apache NiFi FDS Sources" version=0.3.0 >}}

### 0.2.0 [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-NiFiFlowDesignSystem0.2.0)

{{< fds-download-links label="Apache NiFi FDS Sources" version=0.2.0 site=archives >}}

### 0.1.0 [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-NiFiFlowDesignSystem0.1.0)

{{< fds-download-links label="Apache NiFi FDS Sources" version=0.1.0 site=archives >}}

</li></ul>