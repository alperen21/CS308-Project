#!/usr/bin/env bash
deactivate;
export FLASK_DEBUG=1;
flask run;
source "environments/test_env/bin/activate";