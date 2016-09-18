import endpoints
import logging
from models.models                      import *
from protorpc                           import remote, message_types
from endpoints_proto_datastore.ndb      import EndpointsModel
from settings                           import WEB_CLIENT_ID
from request_models.user_rpc_messages   import *
from google.appengine.api               import urlfetch

EMAIL_SCOPE = endpoints.EMAIL_SCOPE
API_EXPLORER_CLIENT_ID = endpoints.API_EXPLORER_CLIENT_ID

@endpoints.api(name="train_manager_endpoint", version="v1", allowed_client_ids=[WEB_CLIENT_ID, API_EXPLORER_CLIENT_ID], scopes=[EMAIL_SCOPE], description="Endpoint for a background job on updating train locations")
class TrainManager(remote.Service):

    @endpoints.method(message_types.VoidMessage, message_types.VoidMessage, path="load_trains", http_method="post", name="getTrainObjects")
    def get_trains(self, request):
        page = "http://localhost:8080/schedule_json"

        try:
            result = urlfetch.fetch(page)
            if result.status_code == 200:
                logging.info(result.content)

        except urlfetch.Error:
            logging.info("json data")
