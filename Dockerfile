FROM python:3.10.6-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Run app.py when the container launches
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:3001"]
