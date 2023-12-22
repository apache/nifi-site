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

## MiNiFi C++

The C++ agent is a native reimplementation of MiNiFi Java. It consumes fewer system resources but has a limited subset
of processors, with properties differing from MiNiFi Java Processors. The C++ agent supports gathering and pushing data
to downstream consumers while minimizing system impact.

## MiNiFi Java

The Java agent is built from the same codebase as NiFi, enabling it to run most of NiFi’s processors. The Java agent
provides maximum flexibility to make routing and processing decisions at the point of origin.
