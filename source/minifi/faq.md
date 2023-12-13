---
title: Apache NiFi MiNiFi FAQ
menu: minifi-topbar.html
containerEnabled: true
---

# Apache {{< project-label >}} MiNiFi FAQ

### How do you pronounce MiNiFi?

"minify" (_min_-uh-fahy) is the preferred pronunciation.


### What's the difference between MiNiFi Java and MiNiFi C++?

The Java agent is built from the same codebase as NiFi, enabling it to run most of [NiFi's processors](http://nifi.apache.org/docs.html).
However, it results in a larger binary distribution and consumes greater system resources.
If you require maximum flexibility to make routing and processing decisions at your data's point of origin, the Java agent is a good fit.

The C++ agent is a native reimplementation of MiNiFi Java.
Due to the absence of a JVM, it consumes fewer system resources but has a [limited subset of processors](https://github.com/apache/nifi-minifi-cpp/blob/main/PROCESSORS.md).
If your primary concern is gathering and pushing data to downstream consumers while minimizing system impact, the C++ agent is a good fit.

### Can I use MiNiFi Toolkit Converter for MiNiFi C++?

Unfortunately due to differences in naming, properties and processor availability in MiNiFi C++ and NiFi, the MiNiFi Toolkit Converter is not recommended for MiNiFi C++. To create a flow definition for MiNiFi C++, check out our [examples](https://github.com/apache/nifi-minifi-cpp/tree/main/examples).
