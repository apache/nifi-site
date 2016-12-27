---
title:     Apache NiFi Development Quickstart
---

# Apache NiFi Development Quickstart

## Source Code

Apache NiFi source code is version controlled using [Git][git] version control ([browse][gitbrowse]|[checkout][gitrepo]) and mirrored to [Github][githubrepo].
<br />The NiFi website source code is available ([browse][gitbrowsenifisite]|[checkout][gitreponifisite]).
<br />The NiFi Nar maven plugin source code is available ([browse][gitbrowsenifimaven]|[checkout][gitreponifimaven]).

## Issue Tracking

Track issues on the "NIFI" Project on the Apache Jira ([browse][jira]).

## Building

#### Configure your git client

We recommend running the following git config commands in order to ensure
that git checks out the repository in a consistent manner. These changes
are particularly important if running on Windows, as the git client has
trouble with long filenames otherwise. Additionally, in Windows, the
default behavior of the git client, when installed, is to set the
`core.autocrlf` configuration option to `true`, which can cause some of
the unit tests to fail.

```
git config --global core.longpaths true
git config --global core.autocrlf false
```

#### Checking out from Git

To check out the code:

```
git clone https://git-wip-us.apache.org/repos/asf/nifi.git
```
<br/>
Then checkout the 'master' branch (which should be the default)

```
git checkout master
```

<br/>
The master branch currently represents the next major release line (1.x). Substantial work here is underway to improve the NiFi's core framework and UI. If your interested in building the 0.x baseline which is still actively released to include new components and bug fixes please checkout the 0.x branch.
<br/>

```
git checkout -b 0.x origin/0.x
```

<br/>
This will checkout the 0.x branch locally and set it to track the 0.x branch in the remote named origin (the default name).
<br/>

### Linux Operating System Configuration

_NOTE_: If you are building on Linux, consider these best practices. Typical Linux defaults are not necessarily well tuned for the needs of an IO intensive application like NiFi.
For all of these areas, your distribution's requirements may vary.  Use these sections as advice, but consult your distribution-specific documentation for how best to achieve these recommendations.


#### Maximum File Handles

NiFi will at any one time potentially have a very large number of file handles open.  Increase the limits by
editing '/etc/security/limits.conf' to add something like

    *  hard  nofile  50000
    *  soft  nofile  50000

#### Maximum Forked Processes

NiFi may be configured to generate a significant number of threads.  To increase the allowable number edit '/etc/security/limits.conf'
    *  hard  nproc  10000
    *  soft  nproc  10000

And your distribution may require an edit to /etc/security/limits.d/90-nproc.conf by adding
    *  soft  nproc  10000

#### Increase the number of TCP socket ports available
This is particularly important if your flow will be setting up and tearing down a large number of sockets in small period of time.

    sudo sysctl -w net.ipv4.ip_local_port_range="10000 65000"

#### Set how long sockets stay in a TIMED_WAIT state when closed
You don't want your sockets to sit and linger too long given that you want to be able to quickly setup and teardown new sockets.  It is a good idea to read more about
it but to adjust do something like

    sudo sysctl -w net.ipv4.netfilter.ip_conntrack_tcp_timeout_time_wait="1"


#### Tell Linux you never want NiFi to swap
Swapping is fantastic for some applications.  It isn't good for something like
NiFi that always wants to be running.  To tell Linux you'd like swapping off you
can edit '/etc/sysctl.conf' to add the following line

    vm.swappiness = 0

#### Disable partition atime
For the partitions handling the various NiFi repos turn off things like 'atime'.
Doing so can cause a surprising bump in throughput.  Edit the '/etc/fstab' file
and for the partition(s) of interest add the 'noatime' option.

#### Additional guidance
Additional information on system administration and settings can be located in our [Administrator's Guide][adminguide].

### Build steps

1. You need a recent Java 8 (or newer) JDK for the 1.x NiFi line.  The 0.x line works on Java 7 or newer.
2. You need Apache [Maven 3.1.0][maven] or newer.
3. You need a recent git client for the 1.x NiFi line.
4. Ensure your MAVEN_OPTS provides sufficient memory.  Some build steps are fairly memory intensive
    - These settings have worked well `MAVEN_OPTS="-Xms1024m -Xmx3076m -XX:MaxPermSize=256m"`
5. Build the entire code base.  In the root dir of the source tree run `mvn -T C2.0 clean install`
   You can tweak the maven build settings as you like but the previous command will execute with 2 threads per core.

Now you should have a fully functioning build off the latest codebase.

## Running the application

#### ** WARNING **

Without any configuration, the application will run on port 8080 and does not require any credentials to modify
the flow. This means of running Apache NiFi should be used only for development/testing and in an environment where only
connections from trusted computers and users can connect to port 8080. Using iptables to allow only localhost connections
to 8080 is a good start, but on systems with multiple (potentially untrusted) users, also not a sufficient protection.

#### Decompress and launch

Running the above build will create a tar.gz (and zip) file in `./nifi-assembly/target`. This tar.gz should
contain the full application. Decompressing the tar.gz should make a directory for you containing several other
directories. `conf` contains application configuration, `bin` contains scripts
for launching the application. On linux and OSX, NiFi can be run using `bin/nifi.sh <command>` where
`<command>` is one of:

+ start: starts NiFi in the background
+ stop: stops NiFi that is running in the background
+ status: provides the current status of NiFi
+ run: runs NiFi in the foreground and waits to receive a Ctrl-C, which then shuts down NiFi.
+ install: (available in Linux only, not OSX): installs NiFi as a service that can then be controlled
via `service nifi start`, `service nifi stop`, `service nifi status`.


For Windows users, the following scripts exist in the `bin` directory:

+ `run-nifi.bat`: runs NiFi in the foreground and waits to receive a Ctrl-C, which then shuts down NiFi
+ `status-nifi.bat`: provides the current status of NiFi

The configuration that is to be used when launching NiFi, such as Java heap size, the user
to run as, which Java command to use, etc. are configurable via the `conf/bootstrap.conf` file.

The entire concept of how the application will integrate to a given OS and run as an
enduring service is something we're working hard on and would appreciate ideas for.  The user experience needs to
be excellent.

With the default settings you can point a web browser at `http://localhost:8080/nifi/`

Logging is configured by default to log to `./logs/nifi-app.log`. The following log message should indicate the web ui
is ready for use:

    2014-12-09 00:42:03,540 INFO [main] org.apache.nifi.web.server.JettyServer NiFi has started. The UI is available at the following URLs:

[adminguide]: https://nifi.apache.org/docs/nifi-docs/html/administration-guide.html
[maven]: https://maven.apache.org/
[jira]: https://issues.apache.org/jira/browse/NIFI
[git]: https://git-scm.com/
[gitbrowse]: https://git-wip-us.apache.org/repos/asf?p=nifi.git;a=summary
[gitbrowsenifisite]: https://git-wip-us.apache.org/repos/asf?p=nifi-site.git;a=summary
[gitbrowsenifimaven]: https://git-wip-us.apache.org/repos/asf?p=nifi-maven.git;a=summary
[gitrepo]: https://git-wip-us.apache.org/repos/asf/nifi.git
[gitreponifisite]: https://git-wip-us.apache.org/repos/asf/nifi-site.git
[gitreponifimaven]: https://git-wip-us.apache.org/repos/asf/nifi-maven.git
[githubrepo]: https://github.com/apache/nifihttps://git-wip-us.apache.org/repos/asf/nifi-maven.git
