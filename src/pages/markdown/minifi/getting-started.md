---
title:     Apache NiFi MiNiFi: Getting Started
---

# Getting started with MiNiFi

This page explains how to configure and deploy MiNiFi agents.

The Java agent is able to run most of [NiFi's available processors](http://nifi.apache.org/docs.html), but is a larger binary distribution (49MB) and consumes greater system resources (24MB max JVM heapsize by default). If you need maximum flexibility to make routing and processing decisions at your data's point of origin, the Java agent is a good fit.

The C++ agent is a much smaller binary (3.2MB), consumes very low system memory (about 5MB at idle) but has [a limited subset of processors](https://github.com/apache/nifi-minifi-cpp#caveats). If your primary concern is gathering and pushing data to downstream consumers and minimizing system impact, the C++ agent is a good fit.


1. Install the appropriate OS level dependencies:

  #### MiNiFi Java:

  - Java 1.8+

  #### MiNiFi C++:
   ###### RHEL/CentOS:
   - yum install -y epel-release
   - yum install -y leveldb

   ###### Debian/Ubuntu:
   - apt install -y libleveldb-dev
   - apt install -y libxml2
2. Download the relevant compressed binary from the [Downloads](download.html) page 
3. Copy and decompress the binary to your target deployment environment
4. Set the MINIFI_HOME environment variable to your decompressed binary directory
5. From $MINIFI_HOME, ./bin/minifi.sh {start|stop|run|restart|status|flowStatus|dump|install}

*flowStatus* and *dump* are available only for MiNiFi Java.

For MiNiFi Java, the agent logs to $MINIFI_HOME/logs/minifi-app.log.

For MiNiFi C++, the agent logs to $MINIFI_HOME/logs/minifi-app.log.txt
