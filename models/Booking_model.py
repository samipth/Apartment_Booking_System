from models import Base
from sqlalchemy import ForeignKey, Column, Integer, Date
from sqlalchemy.orm import relationship
from datetime import datetime

class Booking(Base):
    __tablename__ = "Bookings"

    booking_id = Column("Booking_id", Integer, primary_key = True)
    user_id = Column("User_id", Integer, ForeignKey("Users.User_id"), nullable=False)
    apartment_id = Column("Apartment_id", Integer, ForeignKey("Apartments.Apartment_id"), nullable=False)
    booking_start_date = Column("Booking_start_date", Date, nullable=False)
    booking_end_date = Column("Booking_end_date", Date) 
    created_at = Column(Date, default = datetime.now)

    users = relationship("User")

    def __init__(self, user_id, apartment_id, start_date, end_date):
        self.user_id = user_id
        self.apartment_id = apartment_id
        self.booking_start_date = start_date
        self.booking_end_date = end_date

    def __repr__(self):
        return f"(Booking_id: {self.booking_id}, Client_id: {self.user_id}, Apartment_id: {self.apartment_id}"

