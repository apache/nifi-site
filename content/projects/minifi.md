---
title: MiNiFi
menu:
  main:
    parent: "Projects"
    name: MiNiFi
    weight: 1
---

<div class="uk-column-1-3@l">
  <img id="minifi-logo" src="/images/minifi-logo.svg" alt="MiNiFi logo">
</div>

# Features

MiNiFi - a subproject of Apache NiFi - is a complementary data collection approach that supplements the core tenets of
NiFi in dataflow management, focusing on the collection of data at the source of its creation.

Apache NiFi MiNiFi provides the following features:

- Small size and low resource consumption
- Central management of agents
- Generation of data provenance with full chain of custody of information
- Integration with NiFi for follow-on dataflow management

MiNiFi functions in the role of an agent acting immediately at, or directly adjacent to, source sensors, systems, or
servers.

# Form Factors

MiNiFi is available as either a native binary for Linux or as platform-independent Java distribution.

The native version is a reimplementation of NiFi core concepts in C++, supporting a subset of standard processors while
limiting the impact on system resources.

The Java version supports most standard NiFi components, enabling flexible flow deployments without the runtime user
interface that standard NiFi provides.

## MiNiFi C++ Resources

- [Source](https://github.com/apache/nifi-minifi-cpp) {{< external-icon >}}
- [Issues](https://issues.apache.org/jira/projects/MINIFICPP/) {{< external-icon >}}
- [Installation](https://github.com/apache/nifi-minifi-cpp?tab=readme-ov-file#installing-as-a-service) {{< external-icon >}}
- [Configuration](https://github.com/apache/nifi-minifi-cpp/blob/main/CONFIGURE.md) {{< external-icon >}}
- [Processors](https://github.com/apache/nifi-minifi-cpp/blob/main/PROCESSORS.md) {{< external-icon >}}
- [Examples](https://github.com/apache/nifi-minifi-cpp/blob/main/examples/README.md) {{< external-icon >}}

## MiNiFi Java Resources

- [Source](https://github.com/apache/nifi/tree/main/minifi) {{< external-icon >}}
- [Issues](https://issues.apache.org/jira/projects/NIFI/) {{< external-icon >}}
- [Quick Start Guide](https://github.com/apache/nifi/blob/main/minifi/minifi-docs/src/main/markdown/minifi-java-agent-quick-start.md) {{< external-icon >}}
- [Administrator's Guide](https://github.com/apache/nifi/blob/main/minifi/minifi-docs/src/main/markdown/System_Admin_Guide.md) {{< external-icon >}}
- [Wiki](https://cwiki.apache.org/confluence/display/MiNiFi) {{< external-icon >}}
