---
title: Security Reporting
menu:
  main:
    name: Security Reporting
    parent: "Documentation"
    weight: 3
---

# Apache {{< project-label >}} Security

Apache NiFi welcomes the responsible reporting of security vulnerabilities. Project Management Committee members will
collaborate and respond to potential vulnerabilities, providing an assessment of the concern and a plan of action to
remediate verified issues.

## Reporting Policy

Please read the [Apache Project Security for Committers](https://www.apache.org/security/committers.html)
policy for general guidelines applicable disclosure of security issues for Apache Software Foundation projects.

Do not perform the following actions after discovering a potential security concern:

- Open a Jira disclosing a security vulnerability to the public
- Send a message to the project mailing lists disclosing a security vulnerability to the public
- Send a message to the project Slack instance disclosing a security vulnerability to the public

## Reporting Guidelines

Configuring dangerous operating system commands or custom scripts is not a project security vulnerability.
Authenticated and authorized users are responsible for the security of operating system commands and custom
code.

Apache NiFi provides a framework for developing processing pipelines using standard and custom
components. The framework supports configurable permissions that enable authorized users to execute code
using several standard components. Components such as ExecuteProcess and ExecuteStreamCommand support
running operating system commands, while other scripted components support executing custom code using
different programming languages. Configuring these components with untrusted commands or arguments is
contrary to best practices, but it does not constitute of security issue for remediation.

## Reporting Process

- Notify the project on initial discovery of a potential security vulnerability
- Provide a reasonable amount of time for an initial assessment and remediation plan
- Limit interaction to accounts under direct control or accounts with explicit permission of the owner
- Avoid privacy violations, destruction of data, and interruption or degradation of services
- Avoid spamming, social engineering, and methods to manipulate project members

## Reporting Methods

- Security Mailing List: [security@nifi.apache.org](mailto:security@nifi.apache.org)
    - Members of the Project Management Committee monitor this private mailing list and respond to disclosures

## Severity Ratings

Severity ratings represent the determination of project members based on an evaluation of
[Common Vulnerability Scoring System](https://www.first.org/cvss/) calculations.

- Critical: Arbitrary code execution from a remote attacker
- High: Compromise of integrity or availability through resource exhaustion
- Medium: Requires special configuration settings and significant mitigations are available
- Low: Minimal impact and significant difficulty of exploitation

# Published Vulnerabilities

The following announcements include published vulnerabilities that apply directly to Apache NiFi components.
 
{{< vulnerability
id="CVE-2025-27017"
title="Potential Insertion of MongoDB Password in Provenance Record"
published="2025-03-11"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.13.0 to 2.2.0"
fixedVersion="2.3.0"
jira="NIFI-14272"
pullRequest="9723"
reporter="Robert Creese" >}}

Apache NiFi 1.13.0 through 2.2.0 includes the username and password used to authenticate with MongoDB in the NiFi
provenance events that MongoDB components generate during processing. An authorized user with read access to the
provenance events of those processors may see the credentials information. Upgrading to Apache NiFi 2.3.0 is the
recommended mitigation, which removes the credentials from provenance event records.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2024-56512"
title="Missing Complete Authorization for Parameter and Service References"
published="2024-12-27"
severity="Low"
products="Apache NiFi"
affectedVersions="1.10.0 to 2.0.0"
fixedVersion="2.1.0"
jira="NIFI-13976"
pullRequest="9535"
reporter="Matt Gilman" >}}

Apache NiFi 1.10.0 through 2.0.0 are missing fine-grained authorization checking for Parameter Contexts, referenced
Controller Services, and referenced Parameter Providers, when creating new Process Groups. Creating a new Process Group
can include binding to a Parameter Context, but in cases where the Process Group did not reference any Parameter values,
the framework did not check user authorization for the bound Parameter Context. Missing authorization for a bound
Parameter Context enabled clients to download non-sensitive Parameter values after creating the Process Group. Creating
a new Process Group can also include referencing existing Controller Services or Parameter Providers. The framework did
not check user authorization for referenced Controller Services or Parameter Providers, enabling clients to create
Process Groups and use these components that were otherwise unauthorized. This vulnerability is limited in scope to
authenticated users authorized to create Process Groups. The scope is further limited to deployments with
component-based authorization policies. Upgrading to Apache NiFi 2.1.0 is the recommended mitigation, which includes
authorization checking for Parameter and Controller Service references on Process Group creation.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2024-52067"
title="Potential Insertion of Sensitive Parameter Values in Debug Log"
published="2024-11-20"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.16.0 to 1.28.0 and 2.0.0-M1 to 2.0.0-M4"
fixedVersion="1.28.1 and 2.0.0"
jira="NIFI-13971"
pullRequest="9489"
reporter="David Handermann" >}}

Apache NiFi 1.16.0 through 1.28.0 and 2.0.0-M1 through 2.0.0-M4 include optional debug logging of Parameter Context values
during the flow synchronization process. An authorized administrator with access to change logging levels could enable debug logging
for framework flow synchronization, causing the application to write Parameter names and values to the application log.
Parameter Context values may contain sensitive information depending on application flow configuration.
Deployments of Apache NiFi with the default Logback configuration do not log Parameter Context values.
Upgrading to Apache NiFi 2.0.0 or 1.28.1 is the recommendation mitigation, eliminating Parameter value logging from the flow synchronization process regardless of the Logback configuration.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2024-45477"
title="Improper Neutralization of Input in Parameter Description"
published="2024-10-28"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.10.0 to 1.27.0 and 2.0.0-M1 to 2.0.0-M3"
fixedVersion="1.28.0 and 2.0.0-M4"
jira="NIFI-13675"
pullRequest="9195"
reporter="Muhammad Hazim Bin Nor Aizi" >}}

Apache NiFi 1.10.0 through 1.27.0 and 2.0.0-M1 through 2.0.0-M3 support a description field for Parameters in a Parameter Context
configuration that is vulnerable to cross-site scripting. An authenticated user, authorized to configure a Parameter Context,
can enter arbitrary JavaScript code, which the client browser will execute within the session context of the authenticated user.
Upgrading to Apache NiFi 1.28.0 or 2.0.0-M4 is the recommended mitigation.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2024-37389"
title="Improper Neutralization of Input in Parameter Context Description"
published="2024-07-08"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.10.0 to 1.26.0 and 2.0.0-M1 to 2.0.0-M3"
fixedVersion="1.27.0 and 2.0.0-M4"
jira="NIFI-13374"
pullRequest="8938"
reporter="Akbar Kustirama at abay.sh, GitHub user abaykan" >}}

Apache NiFi 1.10.0 through 1.26.0 and 2.0.0-M1 through 2.0.0-M3 support a description field in the Parameter Context
configuration that is vulnerable to cross-site scripting. An authenticated user, authorized to configure a Parameter
Context, can enter arbitrary JavaScript code, which the client browser will execute within the session context of the
authenticated user. Upgrading to Apache NiFi 1.27.0 or 2.0.0-M4 is the recommended mitigation.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2023-49145"
title="Improper Neutralization of Input in Advanced User Interface for Jolt"
published="2023-11-27"
severity="High"
products="Apache NiFi"
affectedVersions="0.7.0 to 1.23.2"
fixedVersion="1.24.0"
jira="NIFI-12403"
pullRequest="8060"
reporter="Dr. Oliver Matula, DB Systel GmbH" >}}

Apache NiFi 0.7.0 through 1.23.2 include the JoltTransformJSON Processor, which provides an advanced configuration user
interface that is vulnerable to DOM-based cross-site scripting. If an authenticated user, who is authorized to configure
a JoltTransformJSON Processor, visits a crafted URL, then arbitrary JavaScript code can be executed within the session
context of the authenticated user. Upgrading to Apache NiFi 1.24.0 or 2.0.0-M1 is the recommended mitigation.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2023-40037"
title="Incomplete Validation of JDBC and JNDI Connection URLs"
published="2023-08-18"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.21.0 to 1.23.0"
fixedVersion="1.23.1"
jira="NIFI-11920"
pullRequest="7586"
reporter="Matei 'Mal' Badanoiu" >}}

Apache NiFi 1.21.0 through 1.23.0 support JDBC and JNDI JMS access in several Processors and Controller Services with
connection URL validation that does not provide sufficient protection against crafted inputs. An authenticated and
authorized user can bypass connection URL validation using custom input formatting. The resolution enhances connection
URL validation and introduces validation for additional related properties. Upgrading to Apache NiFi 1.23.1 is the
recommended mitigation.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2023-36542"
title="Potential Code Injection with Properties Referencing Remote Resources"
published="2023-07-28"
severity="Medium"
products="Apache NiFi"
affectedVersions="0.0.2 to 1.22.0"
fixedVersion="1.23.0"
jira="NIFI-11744"
pullRequest="7426"
reporter="nbxiglk" >}}

Apache NiFi 0.0.2 through 1.22.0 include Processors and Controller Services that support HTTP URL references for
retrieving drivers, which allows an authenticated and authorized user to configure a location that enables custom code
execution. The resolution introduces a new Required Permission for referencing remote resources, restricting
configuration of these components to privileged users. The permission prevents unprivileged users from configuring
Processors and Controller Services annotated with the new Reference Remote Resources restriction. Upgrading to Apache
NiFi 1.23.0 is the recommended mitigation.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2023-34468"
title="Potential Code Injection with Database Services using H2"
published="2023-06-12"
severity="Medium"
products="Apache NiFi"
affectedVersions="0.0.2 to 1.21.0"
fixedVersion="1.22.0"
jira="NIFI-11653"
pullRequest="7349"
reporter="Matei 'Mal' Badanoiu" >}}

The DBCPConnectionPool and HikariCPConnectionPool Controller Services in Apache NiFi 0.0.2 through 1.21.0 allow an
authenticated and authorized user to configure a Database URL with the H2 driver that enables custom code execution.
The resolution validates the Database URL and rejects H2 JDBC locations. Upgrading to NiFi 1.22.0 disables H2 JDBC URLs
in the default configuration.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2023-34212"
title="Potential Deserialization of Untrusted Data with JNDI in JMS Components"
published="2023-06-12"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.8.0 to 1.21.0"
fixedVersion="1.22.0"
jira="NIFI-11614"
pullRequest="7313"
reporter="Veraxy00 of Qianxin TI Center and Matei 'Mal' Badanoiu" >}}

The JndiJmsConnectionFactoryProvider Controller Service along with the ConsumeJMS and PublishJMS Processors, in Apache
NiFi 1.8.0 through 1.21.0 allow an authenticated and authorized user to configure URL and library properties that enable
deserialization of untrusted data from a remote location. The resolution validates the JNDI URL and restricts locations
to a set of allowed schemes. Upgrading to NiFi 1.22.0 disables LDAP for JNDI URLs in the default configuration.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2023-22832"
title="Improper Restriction of XML External Entity References in ExtractCCDAAttributes"
published="2023-02-09"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.2.0 to 1.19.1"
fixedVersion="1.20.0"
jira="NIFI-11029"
pullRequest="6828"
reporter="Yi Cai of Chaitin Tech" >}}

The ExtractCCDAAttributes Processor in Apache NiFi 1.2.0 through 1.19.1 does not restrict XML External Entity
references. Flow configurations that include the ExtractCCDAAttributes Processor are vulnerable to malicious XML
documents that contain Document Type Declarations with XML External Entity references. The resolution disables Document
Type Declarations and disallows XML External Entity resolution in the ExtractCCDAAttributes Processor. Upgrading to NiFi
1.20.0 disables Document Type Declarations in the default configuration for ExtractCCDAAttributes.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2022-33140"
title="Improper Neutralization of Command Elements in Shell User Group Provider"
published="2022-06-15"
severity="High"
products="Apache NiFi and Apache NiFi Registry"
affectedVersions="1.10.0 to 1.16.2"
fixedVersion="1.20.0"
jira="NIFI-10114"
pullRequest="6122"
reporter="Anonymous" >}}

The optional ShellUserGroupProvider in Apache NiFi 1.10.0 to 1.16.2 and Apache NiFi Registry 0.6.0 to 1.16.2 does not
neutralize arguments for group resolution commands, allowing injection of operating system commands on Linux and macOS
platforms. The ShellUserGroupProvider is not included in the default configuration. Command injection requires
ShellUserGroupProvider to be one of the enabled User Group Providers in the Authorizers configuration. Command injection
also requires an authenticated user with elevated privileges. Apache NiFi requires an authenticated user with
authorization to modify access policies to execute the command. Apache NiFi Registry requires an authenticated user with
authorization to read user groups to execute the command. NiFi and NiFi Registry version 1.16.3 has completely removed
the shell commands from the ShellUserGroupProvider that received user arguments.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2022-29265"
title="Improper Restriction of XML External Entity References in Multiple Components"
published="2022-04-29"
severity="Medium"
products="Apache NiFi"
affectedVersions="0.0.1 to 1.16.0"
fixedVersion="1.16.1"
jira="NIFI-9901"
pullRequest="5962"
reporter="David Handermann at exceptionfactory.com" >}}

Multiple components in Apache NiFi 0.0.1 to 1.16.0 do not restrict XML External Entity references in the default
configuration. The Standard Content Viewer service attempts to resolve XML External Entity references when viewing
formatted XML files. The following Processors attempt to resolve XML External Entity references when configured with
default property values: EvaluateXPath, EvaluateXQuery, and ValidateXml. Apache NiFi flow configurations that include
these Processors are vulnerable to malicious XML documents that contain Document Type Declarations with XML External
Entity references. Upgrading to NiFi 1.16.1 disables Document Type Declarations in the default configuration for these
processors, and disallows XML External Entity resolution in standard services.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2022-26850"
title="Insufficiently Protected Credentials for Single-User Authentication"
published="2022-03-27"
severity="Low"
products="Apache NiFi"
affectedVersions="1.14.0 to 1.15.3"
fixedVersion="1.16.0"
jira="NIFI-9785"
pullRequest="5856"
reporter="Jonathan Leitschuh at twitter.com/jlleitschuh" >}}

When creating or updating credentials for single-user access, NiFi wrote a copy of the Login Identity Providers
configuration to the operating system temporary directory. The Login Identity Providers configuration file contains the
username and a bcrypt hash of the configured password. On most platforms, the operating system temporary directory has
global read permissions. NiFi immediately moved the temporary file to the final configuration directory, which
significantly limited the window of opportunity for access. Bcrypt is a password-hashing algorithm that incorporates a
random salt and a specified cost factor, designed to maintain resistance to brute-force attacks. Use of the bcrypt
algorithm minimizes the impact of disclosing the single-user credentials stored in Login Identity Providers. NiFi 1.16.0
includes updates to replace the Login Identity Providers configuration without writing a file to the operating system
temporary directory.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2021-44145"
title="Potential Information Disclosure through XML External Entity Resoltion in TransformXML"
published="2021-12-15"
severity="Low"
products="Apache NiFi"
affectedVersions="0.1.0 to 1.15.0"
fixedVersion="1.15.1"
jira="NIFI-9399"
pullRequest="5542"
reporter="DangKhai at Viettel Cyber Security" >}}

In the TransformXML processor, an authenticated user could configure an XSLT file which, if it included malicious
external entity calls, may reveal sensitive information. The Secure processing property in TransformXML will now apply
to the configured XSLT file as well as flow files being transformed. Users running any previous NiFi release should
upgrade to 1.15.1.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2020-9486"
title="Potential Information Disclosure in Application Logs"
published="2020-08-18"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.10.0 to 1.11.4"
fixedVersion="1.12.0"
jira="NIFI-7377"
pullRequest="4222"
reporter="Andy LoPresto and Pierre Villard" >}}

The NiFi stateless execution engine produced log output which included sensitive property values. When a flow was
triggered, the flow definition configuration JSON was printed, potentially containing sensitive values in plaintext.
NiFi 1.12.0 implemented Argon2 secure hashing to provide a deterministic loggable value which does not reveal the
sensitive value. Users running any previous NiFi release should upgrade to 1.12.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2020-9487"
title="Potential Denial of Service with Token Authentication Requests"
published="2020-08-18"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.11.4"
fixedVersion="1.12.0"
jira="NIFI-7385"
pullRequest="4271"
reporter="Dennis Detering, IT Security Consultant at Spike Reply" >}}

The NiFi download token (one-time password) mechanism used a fixed cache size and did not authenticate a request to
create a download token, only when attempting to use the token to access the content. An unauthenticated user could
repeatedly request download tokens, preventing legitimate users from requesting download tokens. NiFi 1.12.0 disabled
anonymous authentication, implemented a multi-indexed cache, and limited token creation requests to
one concurrent request per user. Users running any previous NiFi release should upgrade to 1.12.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2020-9491"
title="Insecure TLS Protocol Versions for Cluster Communication"
published="2020-08-18"
severity="High"
products="Apache NiFi"
affectedVersions="1.2.0 to 1.11.4"
fixedVersion="1.12.0"
jira="NIFI-7407"
pullRequest="4263"
reporter="Juan Carlos Sequeiros and Andy LoPresto" >}}

The NiFi UI and API were protected by mandating TLS v1.2, as well as listening connections established by processors
like ListenHTTP and HandleHttpRequest. However intra-cluster communication such as cluster request replication,
Site-to-Site, and load balanced queues continued to support TLS 1.0 or 1.1. NiFI 1.12.0 refactored disparate internal
SSL and TLS code, reducing exposure for extension and framework developers to low-level primitives. NiFi 1.12. also
added support for TLS v1.3 on supporting JVMs. This version restricted all incoming TLS communications to TLS
1.2 or higher. Users running any previous NiFi release should upgrade to 1.12.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2020-13940"
title="Potential Information Disclosure through XML External Entity Resolution in Notification Service"
published="2020-08-18"
severity="Low"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.11.4"
fixedVersion="1.12.0"
jira="NIFI-7680"
pullRequest="4436"
reporter="Matt Burgess and Andy LoPresto" >}}

The notification service manager and various policy authorizer and user group provider objects allowed trusted
administrators to inadvertently configure a potentially malicious XML file. The XML file has the ability to make
external calls to services through XML External Entity resolution. NiFi 1.12.0 introduced an XML validator to prevent
malicious code from being parsed and executed. Users running any previous NiFi release should upgrade to 1.12.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2020-9482"
title="Application Bearer Token Remains Valid After Logout Completion"
published="2020-04-07"
severity="Medium"
products="Apache NiFi Registry"
affectedVersions="0.1.0 to 0.5.0"
fixedVersion="0.6.0"
jira="NIFIREG-361"
reporter="Andy LoPresto" >}}

If NiFi Registry uses an authentication mechanism other than PKI, when the user clicks Log Out, NiFi Registry
invalidates the authentication token on the client side but not on the server side. This permits the user's client-side
token to be used for up to 12 hours after logging out to make API requests to NiFi Registry. NiFi Registry 0.6.0
invalidates the server-side authentication token immediately after the user clicks the Log Out link.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2020-1942"
title="Potential Information Disclosure in Application Logs"
published="2020-02-04"
severity="Medium"
products="Apache NiFi"
affectedVersions="0.0.1 to 1.11.0"
fixedVersion="1.11.1"
jira="NIFI-7079"
pullRequest="4208"
reporter="Andy LoPresto" >}}

The flow fingerprint factory generated flow fingerprints which included sensitive property descriptor values. In the
event a node attempted to join a cluster and the cluster flow was not inheritable, the flow fingerprint of both the
cluster and local flow was printed, potentially containing sensitive values in plaintext. NiFi 1.11.1i implemented
Argon2 secure hashing to provide a deterministic loggable value which does not reveal the sensitive value. Users running
any previous NiFi release should upgrade to 1.11.1.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2020-1928"
title="Potential Information Disclosure in Application Debug Logs"
published="2020-01-22"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.10.0"
fixedVersion="1.11.0"
jira="NIFI-6948"
pullRequest="3935"
reporter="Andy LoPresto" >}}

The sensitive parameter parser would log parsed property descriptor values for debugging purposes. This would expose
literal values entered a sensitive property when no parameter was present. NiFi 1.11.0 removed debug logging from the
class. Users running the 1.10.0 release should upgrade to 1.11.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2020-1933"
title="Potential Cross-Site Scripting in Uploaded Templates"
published="2020-01-22"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.10.0"
fixedVersion="1.11.0"
jira="NIFI-7023"
pullRequest="3991"
reporter="Jakub Palaczynski of ING Tech Poland" >}}

Malicious scripts could be injected to the UI through action by an unaware authenticated user in Firefox. Did not appear
to occur in other browsers. NiFi 1.11.0 adds sanitization of the error response ensures the XSS would not be executed.
Users running earlier versions should upgrade to 1.11.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2019-10080"
title="Potential Information Disclosure through XML External Entity Resolution in File Lookup Service"
published="2019-11-04"
severity="Low"
products="Apache NiFi"
affectedVersions="1.3.0 to 1.9.2"
fixedVersion="1.10.0"
jira="NIFI-6301"
pullRequest="3507"
reporter="RunningSnail" >}}

The XMLFileLookupService allowed trusted users to inadvertently configure a potentially malicious XML file. The XML file
has the ability to make external calls to services using XML External Entity resolution and reveal information such as
the versions of Java, Jersey, and Apache that the NiFI instance uses. NiFi 1.10.0 adds a validator to ensure the XML
file is not malicious. Users running a prior release should upgrade to 1.10.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2019-12421"
title="Application Bearer Token Remains Valid After Logout Completion"
published="2019-11-04"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.9.2"
fixedVersion="1.10.0"
jira="NIFI-6085"
pullRequest="3362"
reporter="Abdu Sahin" >}}

If NiFi uses an authentication mechanism other than PKI, when the user clicks Log Out, NiFi invalidates the
authentication token on the client side but not on the server side. This permits the user's client-side token to be used
for up to 12 hours after logging out to make API requests to NiFi. NiFi 1.10.0 invalidates the server-side
authentication token immediately after the user clicks the Log Out link. Users running a prior release should
upgrade to 1.10.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2019-10083"
title="Potential Information Disclosure in Process Group Resources"
published="2019-11-04"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.9.2"
fixedVersion="1.10.0"
jira="NIFI-6302"
pullRequest="3477"
reporter="Mark Payne" >}}

When updating a Process Group via the API, the response to the request includes all of its contents (at the top most
level, not recursively). The response included details about processors and controller services which the user may not
have had read access to. Requests to update or remove the process group will no longer return the contents of the
process group in the response in Apache NiFi 1.10.0. Users running a prior release should upgrade to 1.10.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2018-17192"
title="Improper Restriction of Browser Frame Access"
published="2018-10-26"
severity="Low"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.6.0"
fixedVersion="1.8.0"
jira="NIFI-5258"
pullRequest="2759"
reporter="Suchithra V N" >}}

The X-Frame-Options headers were applied inconsistently on some HTTP responses, resulting in duplicate or missing
security headers. Some browsers would interpret these results incorrectly, allowing clickjacking attacks. NiFi 1.8.0
consistently applies the security headers including X-Frame-Options. Users running a prior release should upgrade to
1.8.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2018-17193"
title="Improper Neutralization of Input in Proxy Request Headers"
published="2018-10-26"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.7.1"
fixedVersion="1.8.0"
jira="NIFI-5442"
pullRequest="2908"
reporter="Dan Fike with assistance from Patrick White" >}}

The message-page.jsp error page used the value of the HTTP request header X-ProxyContextPath without sanitization,
resulting in a potential reflected cross-site scripting attack. NiFi 1.8.0 correctly parses and sanitizes the request
attribute value. Users running a prior release should upgrade to 1.8.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2018-17194"
title="Potential Denial of Service with HTTP DELETE Cluster Replication Requests"
published="2018-10-26"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.7.1"
fixedVersion="1.8.0"
jira="NIFI-5628"
pullRequest="3035"
reporter="Mike Cole and Andy LoPresto" >}}

When a client request to a cluster node was replicated to other nodes in the cluster for verification, the
Content-Length was forwarded. On a DELETE request, the body was ignored, but if the initial request had a Content-Length
value other than 0, the receiving nodes would wait for the body and eventually timeout. NiFi 1.8.0 checks DELETE
requests and overwrites non-zero Content-Length header. Users running a prior release should upgrade to 1.8.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2018-17195"
title="Potential Cross-Site Request Forgery in Template Upload Resources"
published="2018-10-26"
severity="Critical"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.7.1"
fixedVersion="1.8.0"
jira="NIFI-5595"
pullRequest="3024"
reporter="Mike Cole" >}}

The template upload API endpoint accepted requests from different domain when sent in conjunction with ARP spoofing and
meddler in the middle (MITM) intervention, resulting in cross-site request forgery. The required attack vector is
complex, requiring a scenario with client certificate authentication, same subnet access, and injecting malicious code
into an unprotected (plaintext HTTP) website which the targeted user later visits, but the possible damage warranted a
Critical severity level. NiFi 1.8.0 applies Cross-Origin Resource Sharing (CORS) policy request filtering. Users running
a prior release should upgrade to 1.8.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2018-1309"
title="Improper Restriction of XML External Entity References in SplitXml"
published="2018-04-08"
severity="Medium"
products="Apache NiFi"
affectedVersions="0.1.0 to 1.5.0"
fixedVersion="1.6.0"
jira="NIFI-4869"
pullRequest="2466"
reporter="圆珠笔" >}}

Malicious XML content could cause information disclosure or remote code execution in the SplitXml Processor. NiFi 1.6.0
disables external general entity parsing and disallows document type declarations in SplitXml. Users running a prior
release should upgrade to 1.6.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2018-1310"
title="Potential Denial of Service in JMS Processors"
published="2018-04-08"
severity="Medium"
products="Apache NiFi"
affectedVersions="0.1.0 to 1.5.0"
fixedVersion="1.6.0"
jira="NIFI-4870"
pullRequest="2469"
reporter="圆珠笔" >}}

Malicious JMS content could cause denial of service in impacted Processors. See ActiveMQ CVE-2015-5254 announcement for
more information. NiFi 1.6.0 upgrades the activemq-client library to 5.15.3. Users running a prior release should
upgrade to 1.6.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2017-12632"
title="Improper Input Validation of HTTP Host Request Headers"
published="2018-01-12"
severity="Medium"
products="Apache NiFi"
affectedVersions="0.1.0 to 1.4.0"
fixedVersion="1.5.0"
jira="NIFI-4501"
pullRequest="2279"
reporter="Mike Cole" >}}

A malicious host header in an incoming HTTP request could cause NiFi to load resources from an external server. NiFi
1.5.0 sanitizes host headers and compares to a controlled whitelist property. Users running a prior release should
upgrade to 1.5.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2017-15697"
title="Potential Cross-Site Scripting in Proxy Request Headers"
published="2018-01-12"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.4.0"
fixedVersion="1.5.0"
jira="NIFI-4501"
pullRequest="2279"
reporter="Andy LoPresto" >}}

A malicious X-ProxyContextPath or X-Forwarded-Context header containing external resources or embedded code could cause
remote code execution. NiFi 1.5.0 includes corrected handling of these headers. Users running a prior release should
upgrade to 1.5.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2017-12623"
title="Improper Restriction of XML External Entity References in Template Upload Resources"
published="2017-10-02"
severity="High"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.3.0"
fixedVersion="1.4.0"
jira="NIFI-4353"
pullRequest="2128"
reporter="Paweł Gocyla with further information from Mike Cole" >}}

Any authenticated user (valid client certificate but without ACL permissions) could upload a template which contained
malicious code and accessed sensitive files via an XML External Entity (XXE) attack. NiFi 1.14.0 properly handles XML
External Entities. Users running a prior release should upgrade to 1.4.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2017-15703"
title="Deserialization of Untrusted Data in Template Upload Resources"
published="2017-10-02"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.0.0 to 1.3.0"
fixedVersion="1.4.0"
jira="NIFI-4357"
pullRequest="2134"
reporter="Mike Cole" >}}

Any authenticated user (valid client certificate but without ACL permissions) could upload a template which contained
malicious code and cause a denial of service via Java deserialization. NiFi 1.4.0 properly handles Java deserialization.
Users running a prior release should upgrade to 1.4.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2017-7665"
title="Potential Cross-Site Scripting in User Interface Components"
published="2017-05-08"
severity="Medium"
products="Apache NiFi"
affectedVersions="0.0.1 to 0.7.3 and 1.0.0 to 1.2.0"
fixedVersion="0.7.4 and 1.3.0"
jira="NIFI-3906"
pullRequest="1818"
reporter="Matt Gilman" >}}

There are certain user input components in the Apache NiFi UI which had been guarding for some forms of cross-site
scripting issues but were insufficient. NiFi 0.7.4 and 1.3.0 add more complete user input sanitization. Users running a
prior release should upgrade to 0.7.4 or 1.3.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2017-7667"
title="Potential Cross-Frame Scripting from Improper Frame Access Restrictions"
published="2017-05-08"
severity="Medium"
products="Apache NiFi"
affectedVersions="0.0.1 to 0.7.3 and 1.0.0 to 1.2.0"
fixedVersion="0.7.4 and 1.3.0"
jira="NIFI-3907"
reporter="Matt Gilman" >}}

Apache NiFi needs to establish the response header telling browsers to only allow framing with the same origin. NiFi
0.7.4 and 1.3.0 set the response header. Users running a prior release should upgrade to 0.7.4 or 1.3.0.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2017-5635"
title="Improper Authentication of Replicated Cluster HTTP Requests"
published="2017-02-20"
severity="Medium"
products="Apache NiFi"
affectedVersions="0.7.0 to 0.7.1 and 1.1.0 to 1.1.1"
fixedVersion="0.7.2 and 1.1.2"
jira="NIFI-3487"
reporter="Leonardo Dias and Matt Gilman" >}}

In a cluster environment, if an anonymous user request is replicated to another node, the originating node identity is
used rather than the anonymous user. NiFi 0.7.2 and 1.1.2 remove the negative check for anonymous user before building
the proxy chain and throwing an exception, and evaluating each user in the proxy chain iteration and comparing against a
static constant anonymous user. Users running a prior release should upgrade to 0.7.2 or 1.1.2.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2017-5636"
title="Improper Authentication of Replicated Cluster HTTP Requests"
published="2017-02-20"
severity="Medium"
products="Apache NiFi"
affectedVersions="0.7.0 to 0.7.1 and 1.1.0 to 1.1.1"
fixedVersion="0.7.2 and 1.1.2"
jira="NIFI-3487"
reporter="Andy LoPresto" >}}

In a cluster environment, the proxy chain serialization and deserialization is vulnerable to an injection attack where a
carefully crafted username could impersonate another user and gain their permissions on a replicated request to another
node. NiFi 0.7.2 and 1.1.2 modify the tokenization code and sanitization of user-provided input. Users running a prior
release should upgrade to 0.7.2 or 1.1.2.

{{</ vulnerability >}}

{{< vulnerability
id="CVE-2016-8748"
title="Potential Cross-Site Scripting in Connection Details Dialog"
published="2016-12-19"
severity="Medium"
products="Apache NiFi"
affectedVersions="1.0.0 and 1.1.0"
fixedVersion="1.0.1 and 1.1.1"
jira="NIFI-3154"
pullRequest="1305"
reporter="Matt Gilman" >}}

There is a cross-site scripting vulnerability in connection details dialog when accessed by an authorized user. The user
supplied text was not being properly handled when added to the DOM. The vulnerability was resolved after reviewing the
pull request when merging changes. Users running a prior release should upgrade to 1.0.1 or 1.1.1.

{{</ vulnerability >}}
