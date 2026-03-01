/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
    if (window.self !== window.top) {
        return;
    }

    document.addEventListener('DOMContentLoaded', function () {
        var banner = document.createElement('div');
        banner.id = 'nifi-v1-deprecation-notice';
        banner.innerHTML =
            '<strong>Apache NiFi Version 1 is no longer maintained.</strong> ' +
            'This documentation applies to NiFi 1.x. For the latest documentation, see ' +
            '<a href="https://nifi.apache.org/components/">NiFi Version 2 Documentation</a>.' +
            ' Visit <a href="https://nifi.apache.org/">nifi.apache.org</a> for more information.';

        var style = document.createElement('style');
        style.textContent =
            '#nifi-v1-deprecation-notice {' +
            '  background-color: #fff3cd;' +
            '  border-bottom: 2px solid #ffc107;' +
            '  color: #664d03;' +
            '  padding: 12px 24px;' +
            '  font-family: -apple-system, BlinkMacSystemFont, sans-serif;' +
            '  font-size: 14px;' +
            '  line-height: 1.5;' +
            '  text-align: center;' +
            '  position: sticky;' +
            '  top: 0;' +
            '  z-index: 10000;' +
            '}' +
            '#nifi-v1-deprecation-notice a {' +
            '  color: #664d03;' +
            '  font-weight: 600;' +
            '  text-decoration: underline;' +
            '}' +
            '#nifi-v1-deprecation-notice a:hover {' +
            '  color: #3d2e02;' +
            '}';

        document.head.appendChild(style);
        document.body.insertBefore(banner, document.body.firstChild);
    });
})();
