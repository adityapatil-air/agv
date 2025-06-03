from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class ParkingSlot(Base):
    __tablename__ = "parking_slots"

    id = Column(Integer, primary_key=True, index=True)
    slot_number = Column(Integer, unique=True, index=True)
    is_occupied = Column(Boolean, default=False)
    current_vehicle = Column(String, nullable=True)
    entry_time = Column(DateTime, nullable=True)
    exit_time = Column(DateTime, nullable=True)
    duration_minutes = Column(Integer, nullable=True)
    payment_status = Column(Boolean, default=False)
    overtime_payment_status = Column(Boolean, default=False)

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    slot_id = Column(Integer, ForeignKey("parking_slots.id"))
    amount = Column(Float)
    payment_time = Column(DateTime, default=datetime.utcnow)
    payment_type = Column(String)  # initial or overtime
    qr_code = Column(String)
    is_paid = Column(Boolean, default=False)
    
    slot = relationship("ParkingSlot", back_populates="payments")

ParkingSlot.payments = relationship("Payment", back_populates="slot") 