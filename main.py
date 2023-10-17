from models import Base
from models.User_model import User
from models.Building_model import Building
from models.Apartment_model import Apartment
from models.Booking_model import Booking
from ariadne import ObjectType, QueryType, ScalarType, make_executable_schema
from ariadne.asgi import GraphQL
from graphql.type import GraphQLResolveInfo
from ariadne.asgi.handlers import GraphQLHTTPHandler
from ariadne.exceptions import HttpBadRequestError
from fastapi import FastAPI
from schema import type_defs
from db import session
from Middleware.JWTManager import JWTManager
from hash import hashed_password
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

query = QueryType()
user = QueryType()
mutate = ObjectType("Mutation")
datetime_scalar = ScalarType("Datetime")

@datetime_scalar.serializer
def resolve_serializer(value):
    return value.isoformat()


# Querying data of every Providers
@query.field("users")
def resolve_users(*_):
    users = session.query(User)
    return users

# Querying data of every Buildings
@query.field("buildings")
def resolve_buildings(*_):
    buildings = session.query(Building)
    return buildings

# Querying data of every Apartments
@query.field("apartments")
def resolve_apartments(*_):
    apartments = session.query(Apartment)
    return apartments

# Querying data of every Bookings
@query.field("bookings")
def resolve_bookings(*_):
    bookings = session.query(Booking)
    return bookings

@query.field("user")
def resolve_user(*_, id):
    provider = session.query(User).filter(User.user_id == id).first()
    return provider

@query.field("building")
def resolve_building(*_, id):
    building = session.query(Building).filter(Building.building_id == id).first()
    return building

@query.field("apartment")
def resolve_apartment(*_, id):
    apartment = session.query(Apartment).filter(Apartment.apartment_id == id).first()
    return apartment

@query.field("booking")
def resolve_booking(*_, id):
    provider = session.query(Booking).filter(Booking.booking_id == id).first()
    return provider

@mutate.field("register")
def resolve_register(*_, user):
    email_duplication = session.query(User).where(User.user_email == user["user_email"]).first()
    phone_duplication = session.query(User).where(User.user_phone == user["user_phone"]).first()
    if email_duplication:
        raise HttpBadRequestError("Email already in use!")
    elif phone_duplication:
        raise HttpBadRequestError("Phone number already in use!")
    data = User(user["user_name"], user["user_phone"], user["user_email"], user["user_password"], user["user_birth_date"], user["role"])
    session.add(data)
    session.commit()
    return data

@mutate.field("login")
def resolve_login(*_, email, user_password):
    email_present = session.query(User).where(User.user_email == email).first()
    if not email_present:
        raise HttpBadRequestError("User doesn't exists")
    
    password_hashed = hashed_password(user_password)
    if password_hashed != email_present.user_password: 
        return None
    token = JWTManager.generate_token({'sub': email})
    login_info = { 'email': email, 'token': token}
    return login_info

@user.field("user_profile")
def resolve_userprofile(*_, user_email):
    required_user = session.query(User).filter(User.user_email == user_email).first()
    return required_user

@mutate.field("addBuilding")
def resolve_addBuilding(*_, building):
    new_building = Building(building['user_id'], building["num_rooms"], building["building_location"])
    session.add(new_building)
    session.commit()
    return new_building

@mutate.field("addApartment")
def resolve_addApartment(*_, apartment):
    new_apartment = Apartment(apartment['building_id'], apartment["apartment_number"], apartment["apartment_size"], 
                              apartment['apartment_features'], apartment['apartment_isBooked'] , apartment['apartment_type'])
    session.add(new_apartment)
    session.commit()    
    return new_apartment

@mutate.field("deleteBuilding")
def resolve_deleteBuilding(*_, id):
    deleted_building = session.query(Building).filter(Building.building_id == id).first()
    session.delete(deleted_building)
    session.commit()
    return deleted_building

@mutate.field("addBooking")
def resolve_addBooking(*_, booking):
    new_booking = Booking(booking['client_id'], booking["apartment_id"], booking["start_date"], booking["end_date"], booking["issued_date"])
    session.add(new_booking)
    session.commit()
    return new_booking

@mutate.field("updateBooking")
def resolve_updateBooking(*_, id, booking):
    data = session.query(Booking).filter(Booking.booking_id == id).update({Booking.booking_end_date: booking["booking_end_date"]})
    session.commit()
    return session.query(Booking).filter(Booking.booking_id == id).first()

@mutate.field("updateBuilding")
def resolve_updateBuilding(*_, id, building):
    data = session.query(Building).filter(Building.building_id == id)
    if "provider_id" in building:
        data.update({Building.user_id: building["user_id"]})
    if "num_rooms" in building:
        data.update({Building.num_rooms: building["num_rooms"]})
    session.commit()
    return data.first()

# Authentication
def protect_route(resolver, obj, info: GraphQLResolveInfo, **args):
    non_routed_mutations = ["IntrospectionQuery","register", "login", "GetAllUsers", "apartments" ]
    mutation_name = info.operation.name.value
    if mutation_name in non_routed_mutations:
        return resolver(obj, info, **args)
    headers = info.context["request"].headers
    authorization_header = headers.get("Authorization")
    if not authorization_header:
        raise HttpBadRequestError("Authorization header missing or empty")
    token = authorization_header.split(" ")[-1]
    verified = JWTManager.verify_jwt(token)
    if not verified:
        raise HttpBadRequestError("Expired or invalid JWT")

    value = resolver(obj, info, **args)
    return value

# Create executable schema instance
schema = make_executable_schema(type_defs, query, mutate, datetime_scalar, user)

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["POST"],
        allow_headers=["access-control-allow-origin", "authorization", "content-type"],
    )
]

# Mount Ariadne GraphQL as sub-application for Starlette
app = FastAPI(debug=True, middleware=middleware)

app.mount("/graphql/", GraphQL(schema, debug=True, http_handler=GraphQLHTTPHandler(middleware=[protect_route])))