from models import Base
from sqlalchemy import Column, String, Integer, Date, Enum
from sqlalchemy.orm import relationship
from datetime import datetime, date
from hash import hashed_password

class User(Base):
    __tablename__ = "Users"

    user_id = Column("User_id", Integer, primary_key = True)
    user_name = Column("User_name", String(100), nullable=False)
    user_phone = Column("User_phone", String(10), nullable=False)
    user_email = Column("User_email", String(100), nullable=False)
    user_password = Column("Password", String, nullable=False)
    user_birth_date = Column("User_Birth_date", Date, nullable=False)
    created_at = Column(Date, default = datetime.now)
    role = Column(Enum("Provider", "Client", name = "role_enum", create_type = False), nullable = False)

    apartments = relationship("Apartment")

    # Things = relationship("Thing", back_populates = "People", cascade="delete, merge, save-update")

    def __init__(self, name, phone, email, password, birth_date: date, role: str):
        self.user_name = name
        self.user_phone = phone
        self.user_email = email
        self.user_password = hashed_password(password)
        self.user_birth_date = birth_date
        self.role = role

    def __repr__(self):
        return f"User(name= '{self.user_name}', role='{self.role}', email='{self.user_email}')"

