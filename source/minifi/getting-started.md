---
title: Apache NiFi MiNiFi FAQ
menu: minifi-topbar.html
containerEnabled: true
---

# Apache {{< project-label >}} MiNiFi

## Overview

Apache NiFi MiNiFi is an Apache NiFi project, designed to collect data at its source. MiNiFi was developed with the following objectives in mind:
* Small and lightweight footprint
* Central agent management
* Data provenance generation
* NiFi integration for follow-on dataflow management and chain of custody information


## Choose your flavour

MiNiFi comes in two different flavours.

### MiNiFi Java
The Java agent is built from the same codebase as NiFi, enabling it to run most of [NiFi's processors](http://nifi.apache.org/docs.html).
However, it results in a larger binary distribution and consumes greater system resources, compared to MiNiFi C++.
If you require maximum flexibility to make routing and processing decisions at your data's point of origin, the Java agent is a good fit.

- [Getting started with MiNiFi Java](minifi-java-agent-quick-start.html)
- [Downloads](download.html)
- [Source code](https://github.com/apache/nifi/tree/main/minifi)
- [Administrator's Guide](system-admin-guide.html)

### MiNiFi C++
The C++ agent is a native reimplementation of MiNiFi Java.
Due to the absence of a JVM, it consumes fewer system resources but has a [limited subset of processors](https://github.com/apache/nifi-minifi-cpp/blob/main/PROCESSORS.md), and their properties might slightly differ from NiFi.
If your primary concern is gathering and pushing data to downstream consumers while minimizing system impact, the C++ agent is a good fit.

- [Getting started with MiNiFi C++](minifi-cpp-agent-quick-start.html)
- [Source code](https://github.com/apache/nifi-minifi-cpp)
- [Downloads](download.html)
- [Documentation](https://github.com/apache/nifi-minifi-cpp/blob/main/README.md)
- [List of supported Processors](https://github.com/apache/nifi-minifi-cpp/blob/main/PROCESSORS.md)
- [Examples](https://github.com/apache/nifi-minifi-cpp/blob/main/examples/README.md)
