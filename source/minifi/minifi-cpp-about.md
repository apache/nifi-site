### MiNiFi C++
The C++ agent is a native reimplementation of MiNiFi Java.
Due to the absence of a JVM, it consumes fewer system resources but has a [limited subset of processors](https://github.com/apache/nifi-minifi-cpp/blob/main/PROCESSORS.md), and their properties might slightly differ from NiFi.
If your primary concern is gathering and pushing data to downstream consumers while minimizing system impact, the C++ agent is a good fit.
