#!/usr/bin/env bash
deactivate;
export FLASK_DEBUG=1;
source "environments/test_env/bin/activate";
flask run;