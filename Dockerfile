FROM python:3.9.2

COPY . /app

RUN useradd -d /app -s /bin/bash application \
    && chown application:application -R /app

USER application:application
WORKDIR /app

RUN python3 -m pip install --upgrade -U pip --no-warn-script-location 2>/dev/null 1>/dev/null \
    && python3 -m pip install -r requirements.txt --no-warn-script-location 1>/dev/null\
    && chmod 0770 ./startup.sh



ENTRYPOINT ["./startup.sh"]