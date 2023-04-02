#!/bin/bash

if [ -z ${SQL_CONNECTION+x} ]; then
  echo "You need to provide a SQL_CONNECTION with the -e flag"
  echo ""
  echo "For example -e SQL_CONNECTION=mysql://<YourUser>:<YourPassword>@<SqlServerIp>/<Database>"
  echo ""
  exit -1
fi

#Start the server on port 80
python3 -m uvicorn main:app --host 0.0.0.0 --port 80