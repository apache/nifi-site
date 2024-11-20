---
title: "Download"
---

# Download

Previous releases are available in [release archives](https://archive.apache.org/dist/nifi/). Archive downloads are
subject to rate limiting.

OpenPGP [Project Keys](https://downloads.apache.org/nifi/KEYS) can be used for
[download verification](https://www.apache.org/info/verification.html).

<ul uk-tab>
  <li id="download-nifi"><a href="">NiFi</a></li>
  <li id="download-minifi"><a href="">MiNiFi</a></li>
  <li id="download-registry"><a href="">Registry</a></li>
  <li id="download-fds"><a href="">FDS</a></li>
</ul>

<script type="text/javascript">
window.addEventListener('uikit:init', () => {
    var hash = window.location.hash
    if (hash) {
        var hashDownloadId = hash.replace(/^#/, 'download-');
        var downloadElement = document.getElementById(hashDownloadId);
        if (downloadElement) {
            downloadElement.classList.add('uk-active');
        }
    }
});
</script>

<ul class="uk-switcher uk-width-1-2@l uk-width-2-3@m">
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
{{< download-links label="NiFi Toolkit" project="nifi" extension="-bin.zip" qualifier="toolkit">}}

### NiFi {{< param previousProjectVersion >}} <a href="https://cwiki.apache.org/confluence/display/NIFI/Release+Notes#ReleaseNotes-Version{{< param previousProjectVersion >}}">Release Notes</a>

<div class="uk-card uk-card-default uk-card-body uk-margin-bottom">

Apache NiFi 1.28 is the last minor release of the version 1 series. The project management committee may consider
critical bug fixes for essential framework features on an exceptional basis. Critical bug fixes do not include upgrading
project dependencies. Multiple fundamental dependencies in NiFi 1 cannot be upgraded. These dependencies
include [Jetty 9.4](https://github.com/jetty/jetty.project/issues/7958),
[Spring Framework 5.3](https://spring.io/blog/2024/08/14/spring-framework-6-1-12-6-0-23-and-5-3-39-available-now),
and [AngularJS 1.8](https://docs.angularjs.org/misc/version-support-status).
The Apache NiFi Team strongly encourages users to upgrade to NiFi 2.

</div>

- End of Support: 2024-12-08

{{< download-links version="previous" label="Source" project="nifi" extension="-source-release.zip">}}

{{< download-links version="previous" label="NiFi Standard" project="nifi" extension="-bin.zip">}}

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

### MiNiFi C++ {{< param minifiCppCurrentProjectVersion >}} [Release Notes](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=65145325#ReleaseNotesMiNiFi(C++)-Versioncpp-{{< param minifiCppCurrentProjectVersion >}})

- Released: {{< param minifiCppCurrentProjectVersionReleased >}}

#### Sources
{{< cpp-download-links label="C++ Source" extension=source.tar.gz >}}
#### Binaries
{{< cpp-download-links label="MiNiFi C++ Linux binaries" extension=bin-linux.tar.gz >}}
{{< cpp-download-links label="MiNiFi C++ Windows installer" extension=windows.msi >}}

### MiNiFi C++ {{< param minifiCppPreviousProjectVersion >}} [Release Notes](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=65145325#ReleaseNotesMiNiFi(C++)-Versioncpp-{{< param minifiCppPreviousProjectVersion >}})

- Released: {{< param minifiCppPreviousProjectVersionReleased >}}

#### Sources
{{< cpp-download-links version="previous" label="Source" extension=source.tar.gz >}}
#### Binaries
{{< cpp-download-links version="previous" label="MiNiFi C++" extension=bin.tar.gz >}}

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

- End of Support: 2024-12-08

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
