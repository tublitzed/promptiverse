# FROM python:3.10.6-alpine
# ARG DEBIAN_FRONTEND=noninteractive


# WORKDIR /app

# COPY ./requirements.txt .


# # RUN apt-get update -y && \
# #   apt-get install -y --no-install-recommends gcc libglib2.0-0 libsm6 libxext6 libxrender-dev libpq-dev libgl1-mesa-glx && \
# #   rm -rf /var/lib/apt/lists/*

# RUN apk add --no-cache postgresql-libs g++ && \
#     apk add --no-cache --virtual .build-deps build-base musl-dev postgresql-dev build-base gcc python3-dev libffi-dev openssl-dev && \
#     python3 -m pip install -r requirements.txt --no-cache-dir
#     #  apk --purge del .build-deps


# # RUN pip3 install -r requirements.txt

# COPY . .

# ENTRYPOINT [ "python3" ]

# CMD [ "app.py" ]

# Start with a base image containing Python runtime
FROM python:3.10-slim-buster


# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# # Define environment variable
# ENV NAME World

# Run app.py when the container launches
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:80"]
