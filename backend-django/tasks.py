import os
from invoke import task

DJANGO_SETTINGS = "backend.settings.dev"

# Deteksi platform: pty=True hanya untuk POSIX (Linux/macOS)
PTY_SUPPORTED = os.name != "nt"

@task
def dev(c):
    # runserver
    # poetry run invoke dev
    c.run(f"poetry run python manage.py runserver --settings={DJANGO_SETTINGS}", pty=PTY_SUPPORTED)

@task
def startapp(c, app):
    # poetry run invoke startapp myapp

    apps_dir = "apps"
    app_path = os.path.join(apps_dir, app)

    # pastikan folder apps/ ada
    if not os.path.exists(apps_dir):
        os.makedirs(apps_dir)

    # bikin folder myapp
    if not os.path.exists(app_path):
        os.makedirs(app_path)

    cmd = f"poetry run python manage.py startapp {app} apps/{app} --settings={DJANGO_SETTINGS}"
    c.run(cmd, pty=PTY_SUPPORTED)

@task
def makemigrations(c, app=""):
    # poetry run invoke makemigrate
    cmd = f"poetry run python manage.py makemigrations {app} --settings={DJANGO_SETTINGS}"
    c.run(cmd, pty=PTY_SUPPORTED)

@task
def migrate(c):
    # poetry run invoke migrate
    c.run(f"poetry run python manage.py migrate --settings={DJANGO_SETTINGS}", pty=PTY_SUPPORTED)

@task
def shell(c):
    # poetry run invoke shell
    c.run(f"poetry run python manage.py shell --settings={DJANGO_SETTINGS}", pty=PTY_SUPPORTED)

@task
def createsuperuser(c):
    # poetry run invoke createsuperuser
    c.run(f"poetry run python manage.py createsuperuser --settings={DJANGO_SETTINGS}", pty=PTY_SUPPORTED)
