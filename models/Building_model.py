from models import Base
from sqlalchemy import ForeignKey, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

class Building(Base):
    __tablename__ = "Buildings"

    building_id = Column("Building_id", Integer, primary_key = True)
    building_number = Column("Building_number", String, nullable=False, unique=True)
    # Things = relationship("Thing", back_populates = "People", cascade="delete, merge, save-update")

    def __init__(self, building_number):
        self.building_number = building_number

    def __repr__(self):
        return f"Building(Building_id= '{self.building_id}', Building_number = '{self.building_number}')"
