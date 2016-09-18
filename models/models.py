# User database, I like ndb.Expando because you can dynamically add columns
from google.appengine.ext import ndb
import logging

class User(ndb.Expando):
    account_name = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)        
    phone = ndb.StringProperty()
    employer = ndb.StringProperty()

    @classmethod
    def store_user(cls, user_data):
        if cls.exists(user_data.account_name):
            return False
        else:
            new_user_object = User(account_name = user_data.account_name,email = user_data.email,password = user_data.password,phone = user_data.phone,employer = user_data.phone)
            key = new_user_object.put()
            return (new_user_object, key)

    @classmethod
    def login_user(cls, user_data):
        if not cls.exists(user_data.account_name):
            return (False, "user account name does not exist")
        else:
            return (True, "user is logged in")

    @classmethod 
    def exists(cls, account_name):
        query = User.query(User.account_name == account_name)
        return query.get() != None

    @classmethod
    def match(cls, username, passwd):
        query = User.query(User.account_name == username and User.password == passwd)
        return query.get() != None

class TrainInstances(ndb.Expando):
    city = ndb.StringProperty(required=True)
    country = ndb.StringProperty(required=True)
    departure_timestamp = ndb.StringProperty(required=True)
    arrival_timestamp = ndb.StringProperty(required=True)





        