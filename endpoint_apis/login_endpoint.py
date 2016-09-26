import endpoints
import logging
from models.models                      import *
from protorpc                           import remote, message_types
from endpoints_proto_datastore.ndb      import EndpointsModel
from settings                           import WEB_CLIENT_ID
from request_models.user_rpc_messages   import *

EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

@endpoints.api(name="login_endpoint", version="v1", allowed_client_ids=[WEB_CLIENT_ID, API_EXPLORER_CLIENT_ID], scopes=[EMAIL_SCOPE], description="Endpoint for managing user login")
class LoginEndpoint(remote.Service):

    @endpoints.method(Text, Text, path="login_endpoint_test", http_method="POST", name="login_endpoint_test")
    def test(self, text_object):
        return Text(txt=text_object.txt)

"""
For a void return type, use message_types.VoidMessage
"""