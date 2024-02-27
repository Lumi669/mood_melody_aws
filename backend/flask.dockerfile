FROM python:3.6-slim-buster

WORKDIR /app

COPY requirements.txt ./

# RUN pip install -r requirements.txt
# Use --no-cache-dir for pip install to minimize image size
RUN pip install --no-cache-dir -r requirements.txt


COPY . .


EXPOSE 4000


CMD ["flask", "run", "--host=0.0.0.0", "--port=4000"]
