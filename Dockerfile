FROM python:3.9.2

LABEL VERSION=0.0.1
LABEL AUTHOR="Yannick Müller"
LABEL CONTACT="contact@ynnk.dev"

COPY . /app

RUN useradd -u 999 -d /app -s /bin/bash application \
    && chown application:application -R /app

USER application:application
WORKDIR /app

RUN python3 -m pip install --upgrade -U pip --no-warn-script-location 2>/dev/null 1>/dev/null \
    && python3 -m pip install -r requirements.txt --no-warn-script-location 1>/dev/null\
    && chmod 0770 ./startup.sh



ENTRYPOINT ["./startup.sh"]