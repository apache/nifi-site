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

### NiFi {{< param currentProjectVersion >}} <a href="https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param currentProjectVersion >}}">Release Notes</a>

- Released: {{< param currentProjectVersionReleased >}}
- [Migration Guidance](https://cwiki.apache.org/confluence/display/NIFI/Migration+Guidance)

#### Sources
{{< download-links label="Source" project="nifi" extension="-source-release.zip">}}
#### Binaries
{{< download-links label="NiFi Standard" project="nifi" extension="-bin.zip">}}
{{< download-links label="NiFi Stateless" project="nifi" extension="-bin.zip" qualifier="stateless">}}
{{< download-links label="NiFi Kafka Connector" project="nifi" extension=".zip" qualifier="kafka-connector-assembly">}}
{{< download-links label="NiFi Toolkit" project="nifi" extension="-bin.zip" qualifier="toolkit">}}

### NiFi {{< param previousProjectVersion >}} <a href="https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param previousProjectVersion >}}">Release Notes</a>

- Released: {{< param previousProjectVersionReleased >}}
- [Migration Guidance](https://cwiki.apache.org/confluence/display/NIFI/Migration+Guidance)

#### Sources
{{< download-links version="previous" label="Source" project="nifi" extension="-source-release.zip">}}

#### Binaries
{{< download-links version="previous" label="NiFi Standard" project="nifi" extension="-bin.zip">}}
{{< download-links version="previous" label="NiFi Stateless" project="nifi" extension="-bin.zip" qualifier="stateless">}}
{{< download-links version="previous" label="NiFi Kafka Connector" project="nifi" extension=".zip" qualifier="kafka-connector-assembly">}}
{{< download-links version="previous" label="NiFi Toolkit" project="nifi" extension="-bin.zip" qualifier="toolkit">}}

</li>
<li>

## Apache NiFi MiNiFi

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
{{< cpp-download-links label="C++ Source" version=0.15.0 extension=source.tar.gz >}}
#### Binaries
{{< cpp-download-links label="MiNiFi C++" version=0.15.0 extension=bin.tar.gz >}}

### MiNiFi C++ 0.14.0 [Release Notes](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=65145325#ReleaseNotesMiNiFi(C++)-Versioncpp-0.14.0)

- Released: 2023-04-17

#### Sources
{{< cpp-download-links label="Source" version=0.14.0 extension=source.tar.gz >}}
#### Binaries
{{< cpp-download-links label="MiNiFi C++" version=0.14.0 extension=bin-linux.tar.gz >}}

</li>
<li>

## Apache NiFi Registry

### Registry {{< param currentProjectVersion >}} [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param currentProjectVersion >}})

- Released: {{< param currentProjectVersionReleased >}}

#### Sources
{{< download-links label="Source" extension=-source-release.zip >}}
#### Binaries
{{< download-links label="NiFi Registry" qualifier="registry" extension=-bin.zip >}}

### Registry {{< param previousProjectVersion >}} [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param previousProjectVersion >}})

- Released: {{< param previousProjectVersionReleased >}}

#### Sources
{{< download-links version="previous" label="Source" extension=-source-release.zip >}}
#### Binaries
{{< download-links version="previous" label="NiFi Registry" qualifier="registry" extension=-bin.zip >}}

</li>
<li>

## Apache NiFi Flow Design System

### FDS 0.3.0 [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-NiFiFlowDesignSystem0.3.0)

{{< fds-download-links label="Source" version=0.3.0 >}}

### FDS 0.2.0 [Release Notes](https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-NiFiFlowDesignSystem0.2.0)

{{< fds-download-links label="Source" version=0.2.0 site=archives >}}

</li>
</ul>