---
title: Registry
menu:
  main:
    parent: "Projects"
    name: Registry
    weight: 2
---

<div class="uk-column-1-3@l">
  <img id="registry-logo" src="/images/registry-logo.png" alt="Registry logo" />
</div>

<p class="description">A subproject of Apache NiFi to store and manage shared resources.</p>

<div class="uk-card uk-card-default uk-card-body uk-margin-bottom">

## Deprecation Notice

Apache NiFi Registry has been **deprecated** following a
[community vote](https://lists.apache.org/thread/3gs4nl28yngsdmxd6xglzmbh5jqbscl3) in Feburary 2026
and is planned for removal in Apache NiFi 3.0.

NiFi 2 introduced Git-based Flow Registry Clients for
GitHub, GitLab, Bitbucket, and Azure DevOps,
providing direct integration with existing version control infrastructure.
The Apache NiFi Team strongly encourages users to migrate to these alternatives.

This decision is reversible if sufficient contributors step forward to actively maintain
NiFi Registry, which would allow the deprecation status to be reconsidered.
The timeline for NiFi 3.0 is not yet established, providing significant time for migration planning.

</div>

# Features

Registry - a subproject of Apache NiFi - is a complementary application that provides a central location for storage and
management of shared resources across one or more instances of NiFi or MiNiFi.
       
Apache NiFi Registry provides the following features:

- Implementation of a Flow Registry for storing and managing versioned flows
- Integration with NiFi to allow storing, retrieving, and upgrading versioned flows from a Flow Registry
- Administration of the Registry for defining users, groups, and policies

## Documentation

- [Apache NiFi Registry Documentation](/docs/nifi-registry-docs/)
- [Apache NiFi Registry Wiki](https://cwiki.apache.org/confluence/display/NIFIREG)

## Videos

- {{< youtube-embed id="X_qhRVChjZY" title="Getting Started with Apache NiFi Registry" >}}
- {{< youtube-embed id="qD03ao3R-a4" title="Setting Up a Secure Apache NiFi Registry" >}}
- {{< youtube-embed id="DSO12fhnZ90" title="Setting Up a Secure NiFi to Integrate with a Secure NiFi Registry" >}}
- {{< youtube-embed id="kK7eVppg9Aw" title="Storing Versioned Flows in a Git Repository" >}}
