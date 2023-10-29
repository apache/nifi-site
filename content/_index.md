---
title: "Apache NiFi"
---

<div class="uk-grid flow-container" uk-grid>
  <div class="uk-width-1-3@l uk-width-1-1@m">
    <p class="flow-summary uk-margin-large-top">
      <strong>Apache NiFi</strong> provides
      <br/>configurable, scalable, and reliable
      <br/>data transformation and distribution
    </p>
  </div>

  <div class="uk-width-2-3">
    <div class="uk-flex uk-flex-middle">
      {{< 
        process-group
        label="Unstructured Sources"
        running="32"
        queuedFiles="96"
        queuedSize="768.32 MB"
        inPorts="0"
        inFiles="0"
        inSize="0 bytes"
        readSize="0 bytes"
        writeSize="105.25 GB"
        outPorts="1"
        outFiles="1,024"
        outSize="512.50 GB"
      >}}
      <div class="horizontal-relationship"></div>
      {{<
        process-group-connection
        sourceLabel="processed"
        destinationLabel="archives"
      >}}
    </div>
    <div class="uk-flex">
      <div class="vertical-relationship"></div>
    </div>
    <div class="uk-flex uk-flex-middle flow-second-row">
      {{<
        process-group-connection
        sourceLabel="parsed"
        destinationLabel="structured"
      >}}
      <div class="horizontal-relationship"></div>
      {{<
        process-group
        label="Transformation"
        running="24"
        queuedFiles="256"
        queuedSize="24.96 MB"
        inPorts="1"
        inFiles="15,523"
        inSize="875.65 GB"
        readSize="750.35 GB"
        writeSize="725.65 GB"
        outPorts="0"
        outFiles="0"
        outSize="0 bytes"
      >}}
    </div>
    <div class="uk-flex flow-third-row">
      <div class="vertical-relationship"></div>
    </div>
    {{<
      process-group
      label="Event Streams"
      running="192"
      queuedFiles="768"
      queuedSize="960.72 MB"
      inPorts="0"
      inFiles="0"
      inSize="0 bytes"
      readSize="0 bytes"
      writeSize="25.75 GB"
      outPorts="1"
      outFiles="12,325"
      outSize="350.35 GB"
    >}}
  </div>

  <img src="/images/apache-nifi-drop-logo.svg"
       alt="Apache NiFi Logo"
       class="uk-position-center-left background-logo"
       width="550"
       height="720" />
</div>