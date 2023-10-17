from models import Base
from sqlalchemy import ForeignKey, Column, String, Integer, Enum, Boolean
from sqlalchemy.orm import relationship

class Apartment(Base):
    __tablename__ = "Apartments"

    apartment_id = Column("Apartment_id", Integer, primary_key = True)
    building_id = Column("Building_id", Integer, ForeignKey("Buildings.Building_id"), nullable=False)
    apartment_number = Column("Apartment_number", String, nullable=False)
    apartment_size = Column("Apartment_size(sqfeet)", Integer, nullable=False)
    apartment_features = Column("Apartment_features", String)
    apartment_isbooked = Column("Booking_Status", Boolean, nullable = False)
    apartment_type = Column(Enum("Sharable", "Non_Sharable", name = "apartment_enum2", create_type = False), nullable = False)
    # Things = relationship("Thing", back_populates = "People", cascade="delete, merge, save-update")

    def __init__(self, building_id, number, size, features, isbooked: bool, apartment_type: str):
        self.building_id = building_id
        self.apartment_number = number
        self.apartment_size = size
        self.apartment_features = features
        self.apartment_isbooked = isbooked
        self.apartment_type = apartment_type

    def __repr__(self):
        return f"Apartment(Apartment_id= '{self.apartment_id}', Booking_Status = '{self.apartment_isbooked}', Type = '{self.apartment_type}')"
