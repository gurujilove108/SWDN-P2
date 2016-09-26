#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from endpoint_apis.login_endpoint 				import LoginEndpoint 
from endpoint_apis.signup_endpoint 				import SignupEndpoint
from endpoint_apis.schedule_endpoint 			import ScheduleEndpoint
from endpoint_apis.connection_endpoint 			import ConnectionEndpoint
from endpoint_apis.frontend_middleware_endpoint import FrontEndMiddlewareEndpoint

import endpoints
import logging

api = endpoints.api_server([
	LoginEndpoint,
	SignupEndpoint,
	ScheduleEndpoint,
	ConnectionEndpoint,
	FrontEndMiddlewareEndpoint
])