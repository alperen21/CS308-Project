#!/usr/bin/env bash

export FLASK_DEBUG=1;
source "environments/project_env/bin/activate";
flask run;