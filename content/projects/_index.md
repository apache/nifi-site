---
title: "Projects"
menu:
  main:
    weight: 4
---

# Projects

Apache NiFi includes several subprojects with various capabilities.

<div class="uk-card uk-card-default uk-margin-top">
  <div class="uk-card-body">
<div class="uk-column-1-4@l">
  <img id="minifi-logo" src="minifi/images/minifi-logo.svg" alt="MiNiFi logo">
</div>
    <div class="uk-margin-top">
MiNiFi supports data collection from the point of origin. It is a complementary data collection approach that
supplements the core tenets of NiFi in dataflow management, focusing on the collection of data at the source of its
creation. MiNiFi functions in the role of an agent for source sensors, systems, or servers. MiNiFi provides the
following features:

- Small size and low resource consumption
- Central management of agents
- Generation of data provenance with full chain of custody of information
- Integration with NiFi for follow-on dataflow management      
</div>

  <a class="uk-button uk-button-primary uk-button-small uk-margin-right" href="/projects/minifi/download">Download</a>
  
</div>
</div>



<div class="uk-card uk-card-default uk-margin-top">
  <div class="uk-card-body">
<div class="uk-column-1-4@l">
  <img id="minifi-logo" src="images/registry-logo.png" alt="Registy logo">
</div>
    <div class="uk-margin-top">
Registry is a complementary application that provides a central location for storage and management of shared resources
across one or more instances of NiFi or MiNiFi. Registry provides the following features:

- Implementation of a Flow Registry for storing and managing versioned flows
- Integration with NiFi to allow storing, retrieving, and upgrading versioned flows from a Flow Registry
- Administration of the Registry for defining users, groups, and policies
    </div>

  <a class="uk-button uk-button-primary uk-button-small uk-margin-right" href="/projects/registry">Download</a>

</div>
</div>

<div class="uk-card uk-card-default uk-margin-top">
  <div class="uk-card-body">
    <h3>Apache {{< project-label >}} Flow Design System</h3>
    <div class="uk-margin-top">
Flow Design System is an atomic reusable platform for providing a consistent set of user interface components for NiFi,
MiNiFi, and Registry, as well as any other open source web application. Features of the Flow Design System include:

- Implementation of the reusable user interface components
- Integration with NPM public registry
    

<a class="uk-button uk-button-primary uk-button-small uk-margin-right" href="/projects/fds">Download</a>

</div>
  </div>
</div>
