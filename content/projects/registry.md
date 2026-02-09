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

<div class="uk-alert-warning" uk-alert>
<h3>Deprecation Notice</h3>
<p>
Apache NiFi Registry has been <strong>deprecated</strong> following a
<a href="https://lists.apache.org/thread/3gs4nl28yngsdmxd6xglzmbh5jqbscl3">community vote</a>
and is planned for removal in Apache NiFi 3.0.
</p>
<p>
NiFi 2.x introduced Git-based Flow Registry Clients for
<strong>GitHub, GitLab, Bitbucket, and Azure DevOps</strong>,
providing direct integration with existing version control infrastructure.
Users are encouraged to migrate to these alternatives.
</p>
<p>
This decision is <strong>reversible</strong> — if sufficient contributors step forward to actively maintain
NiFi Registry, the deprecation status can be reconsidered.
There is no known timeline for NiFi 3.0, giving users significant time to plan migrations.
</p>
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
