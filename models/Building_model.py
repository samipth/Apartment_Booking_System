from models import Base
from sqlalchemy import ForeignKey, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

class Building(Base):
    __tablename__ = "Buildings"

    building_id = Column("Building_id", Integer, primary_key = True)
    user_id = Column("User_id", Integer, ForeignKey("Users.User_id"), nullable=False)
    num_rooms = Column("Number_of_rooms", Integer, nullable=False)
    building_location = Column("Building_location", String(50), nullable=False)
    # Things = relationship("Thing", back_populates = "People", cascade="delete, merge, save-update")

    def __init__(self, user_id, num_rooms, location):
        self.user_id = user_id
        self.num_rooms = num_rooms
        self.building_location = location

    def __repr__(self):
        return f"Building(Building_id= '{self.building_id}', Number_of_rooms = '{self.num_rooms}', Location = '{self.building_location}')"
