import datetime

from peewee import DateTimeField, CharField, BooleanField, IntegerField, DoesNotExist

from api.models.base import BaseModel


class IP_Event(BaseModel):
    db_table = "IP_Event"
    ip_address = CharField(max_length=255)
    generation_count = IntegerField(default=0)
    created_at = DateTimeField(default=datetime.datetime.now)
    updated_at = DateTimeField(default=datetime.datetime.now)


def create(ip_address: str):
    print(f"attempting to create for: {ip_address}")
    record = IP_Event.create(ip_address=ip_address)
    return record


def update_generation_count(ip_address, new_count):
    query = IP_Event.update(generation_count=new_count).where(
        IP_Event.ip_address == ip_address
    )
    query.execute()


def get_count_by_ip(ip_address=str):
    print(f"by ip: {ip_address}")
    try:
        return IP_Event.get(IP_Event.ip_address == ip_address).generation_count
    except DoesNotExist:
        return None
