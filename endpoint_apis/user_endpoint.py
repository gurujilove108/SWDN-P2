import endpoints
import logging
from models.models                      import *
from protorpc                           import remote, message_types
from endpoints_proto_datastore.ndb      import EndpointsModel
from settings                           import WEB_CLIENT_ID
from request_models.user_rpc_messages   import *

EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

@endpoints.api(name="user_endpoint", version="v1", allowed_client_ids=[WEB_CLIENT_ID, API_EXPLORER_CLIENT_ID], scopes=[EMAIL_SCOPE], description="Endpoint for managing user login and signup")
class UserEndpoint(remote.Service):

    @endpoints.method(message_types.VoidMessage, message_types.VoidMessage, path="user_signup_path", http_method="POST", name="user_signup")
    def store_user(self, user_data):
        pass

"""
For a void return type, use message_types.VoidMessage
"""
