FROM gcc:12.2.0 AS buildDependencyWatcher

COPY ./DevEnvironnement/dependencyWatcher.cpp .

RUN c++ dependencyWatcher.cpp -o watcher -lcrypto

RUN strip -s watcher

FROM python:3.9.2

RUN useradd -md /app -s /bin/bash application \
    && chown application:application -R /app


USER application:application

WORKDIR /app

COPY requirements.txt .

RUN python3 -m pip install --upgrade -U pip --no-warn-script-location 2>/dev/null 1>/dev/null \
    && python3 -m pip install -r requirements.txt --no-warn-script-location 1>/dev/null

COPY --from=buildDependencyWatcher watcher /bin/watcher


ENTRYPOINT [ "watcher" ]