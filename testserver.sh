#!/usr/bin/env bash
deactivate;
export FLASK_DEBUG=1;
source "environments/test/bin/activate";
flask run;