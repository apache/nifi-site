---
title: Apache NiFi MiNiFi
slug: index
menu: minifi-topbar.html
containerEnabled: true
---

<div class="large-6">
  <img id="minifi-logo" src="/assets/images/minifi/minifi-logo.svg" alt="MiNiFi logo">
</div>

<p class="description">A subproject of Apache NiFi to collect data from the point of origin.</p>

## Overview

Apache NiFi MiNiFi is an Apache NiFi project, designed to collect data at its source. MiNiFi was developed with the following objectives in mind:
* Small and lightweight footprint
* Central agent management
* Data provenance generation
* NiFi integration for follow-on dataflow management and chain of custody information

### MiNiFi Java
The Java agent is built from the same codebase as NiFi, enabling it to run most of [NiFi's processors](http://nifi.apache.org/docs.html).
However, it results in a larger binary distribution, consumes greater system resources, and requires JRE, compared to MiNiFi C++.
If you require maximum flexibility to make routing and processing decisions at your data's point of origin, the Java agent is a good fit.

### MiNiFi C++
The C++ agent is a native reimplementation of MiNiFi Java.
Due to the absence of a JVM, it consumes fewer system resources but has a [limited subset of processors](https://github.com/apache/nifi-minifi-cpp/blob/main/PROCESSORS.md), and their properties might slightly differ from NiFi.
If your primary concern is gathering and pushing data to downstream consumers while minimizing system impact, the C++ agent is a good fit.
