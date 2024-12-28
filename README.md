<!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->
# Apache NiFi Website

<img src="https://nifi.apache.org/images/apache-nifi-logo.svg" width="300" alt="Apache NiFi"/>

### Status

[![build](https://github.com/apache/nifi-site/workflows/build/badge.svg)](https://github.com/apache/nifi-site/actions/workflows/build.yml)
[![License](https://img.shields.io/github/license/apache/nifi-site)](https://github.com/apache/nifi-site/blob/main/LICENSE)

### Contacts

[![Track Issues](https://img.shields.io/badge/track-Issues-728e9b.svg?logo=jirasoftware)](https://issues.apache.org/jira/browse/NIFI)
[![Chat on Slack](https://img.shields.io/badge/chat-Slack-728e9b.svg?logo=slack)](https://s.apache.org/nifi-community-slack)
[![Contact Developers](https://img.shields.io/badge/contact-Developers-728e9b.svg?logo=apache)](https://lists.apache.org/list.html?dev@nifi.apache.org)
[![Contact Users](https://img.shields.io/badge/contact-Users-728e9b.svg?logo=apache)](https://lists.apache.org/list.html?users@nifi.apache.org)

### Community

[![Join Slack Community](https://img.shields.io/badge/join-Slack-728e9b.svg?logo=slack)](https://join.slack.com/t/apachenifi/shared_invite/zt-11njbtkdx-ZRU8FKYSWoEHRJetidy0zA)
[![Follow on LinkedIn](https://img.shields.io/badge/follow-Apache%20NiFi-728e9b.svg?logo=linkedin)](https://www.linkedin.com/company/apache-nifi/)
[![Follow on X](https://img.shields.io/badge/follow-apachenifi-728e9b.svg?logo=x)](https://x.com/apachenifi)

## Developing

The project website uses [Hugo](https://gohugo.io) to build static HTML and related resources.

### Prerequisites

- [Hugo](https://gohugo.io/getting-started/installing)

### Preparation

Prepare build artifacts using published component manifests for generated documentation.

```shell
bash prebuild.sh
```

### Building

Start Hugo Server to view rendered pages.

```shell
hugo server
```

Open a web browser to preview rendered pages.

```
http://localhost:1313
```

Run Hugo to generate pages in the `public` directory.

```shell
hugo
```

## Publishing

The Apache NiFi website uses [GitHub Actions](https://docs.github.com/en/actions) and
[Apache Software Foundation Infrastructure](https://infra.apache.org/project-site.html) configuration for automated
publishing.

See [Website Publishing](https://cwiki.apache.org/confluence/display/NIFI/Website+Publishing) for documentation.
