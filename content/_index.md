---
title: "Apache NiFi"
---

<p class="flow-summary">
  <strong>Apache NiFi</strong> provides
  <br/>configurable, scalable, and reliable
  <br/>data transformation and distribution
</p>

<div class="flow-container">
  <div class="first-process-group">
  {{< 
      process-group
      label="Object Stores"
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
  </div>

  <div class="first-connection">
    {{< process-group-connection >}}
  </div>

  <div class="second-connection">
    {{< process-group-connection >}}
  </div>

  <div class="second-process-group">
  {{<
      process-group
      label="Record Distribution"
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

  <div class="third-process-group">
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
</div>