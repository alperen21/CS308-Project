pip install virtualenv
brew install cairo
brew install python3 cairo pango gdk-pixbuf libffi
virtualenv project_env
source project_env/bin/activate
pip install -r requirements.txt