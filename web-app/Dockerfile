FROM python:3
LABEL maintainer="Sameen Islam <@samisnotinsane>"

WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY *.py /app/
COPY static /app/static
COPY templates /app/templates
RUN chmod a+x *.py

CMD ["./srv.py"]
