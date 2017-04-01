---
title:     Apache NiFi MiNiFi: Getting Started
---

# Getting started with MiNiFi

This page explains how to configure and deploy MiNiFi.

## MiNiFi Java

1. Install the appropriate OS level dependencies:
 - Java 1.8+
2. Download the relevant compressed binary from the [Downloads](download.html) page 
3. Copy and decompress the binary to your target deployment environment
4. Set the MINIFI_HOME environment variable to your decompressed binary directory
5. From $MINIFI_HOME, ./bin/minifi.sh {start|stop|run|restart|status|flowStatus|dump|install}

The agent logs to $MINIFI_HOME/logs/minifi-app.log

## MiNiFi C++

1. Install the appropriate OS level dependencies:
 #### RHEL/CentOS:
 - yum install -y epel-release
 - yum install -y leveldb

 #### Debian/Ubuntu:
 - apt install -y libleveldb-dev
 - apt install -y libxml2
2. Download the relevant compressed binary from the [Downloads](download.html) page
3. Copy and decompress the binary to your target deployment environment
4. Set the MINIFI_HOME environment variable to your decompressed binary directory
5. From $MINIFI_HOME, ./bin/minifi.sh {start|stop|run|restart|status|install}

The agent logs to $MINIFI_HOME/minifi-app.log.txt
