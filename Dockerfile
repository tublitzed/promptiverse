FROM python:3.10.6-slim-bullseye
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && \
  apt-get install -y --no-install-recommends libglib2.0-0 libsm6 libxext6 libxrender-dev libgl1-mesa-glx && \
  rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY . /app

ENTRYPOINT [ "python3" ]

CMD [ "app.py" ]
