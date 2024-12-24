#!/bin/bash

CURRENT_VERSION=$(grep 'currentProjectVersion = ' config.toml | cut -d \" -f 2)

RESOURCES_DIR=resources
PREBUILD_DIR=prebuild

MAVEN_BASE_URL=https://repo1.maven.org/maven2

MANIFEST_JAR_URL="$MAVEN_BASE_URL/org/apache/nifi/nifi-runtime-manifest/$CURRENT_VERSION/nifi-runtime-manifest-$CURRENT_VERSION.jar"
MANIFEST_JAR_PATH=$RESOURCES_DIR/nifi-runtime-manifest.jar
MANIFEST_JSON=nifi-runtime-manifest.json
MANIFEST_DOCS_DIR=docs

NIFI_DOCS_ZIP_URL="$MAVEN_BASE_URL/org/apache/nifi/nifi-docs/$CURRENT_VERSION/nifi-docs-$CURRENT_VERSION-resources.zip"
NIFI_DOCS_ZIP_PATH=$RESOURCES_DIR/nifi-docs-resources.zip

# Create Hugo directories
if [ ! -d $RESOURCES_DIR ];then
  mkdir $RESOURCES_DIR
fi

# Download Runtime Manifest JAR and extract JSON to prebuild
echo "Downloading $MANIFEST_JAR_URL"
curl -o $MANIFEST_JAR_PATH $MANIFEST_JAR_URL
unzip -q -o -d $PREBUILD_DIR/assets $MANIFEST_JAR_PATH $MANIFEST_JSON $MANIFEST_DOCS_DIR/*

# Download Documentation Resources and extract to prebuild
echo "Downloading $NIFI_DOCS_ZIP_URL"
curl -o $NIFI_DOCS_ZIP_PATH $NIFI_DOCS_ZIP_URL
unzip -q -o -d $PREBUILD_DIR/public $NIFI_DOCS_ZIP_PATH

# Build components using prebuild directory with Hugo
hugo -s $PREBUILD_DIR
