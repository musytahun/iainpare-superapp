| Environment           | Command                                                                  |
| --------------------- | ------------------------------------------------------------------------ |
| Development (default) | `poetry run python manage.py runserver`                                  |
| Development explicit  | `poetry run python manage.py runserver --settings=backend.settings.dev`  |
| Production            | `poetry run python manage.py runserver --settings=backend.settings.prod` |
| Migrate DB dev        | `poetry run python manage.py migrate --settings=backend.settings.dev`    |
| Migrate DB prod       | `poetry run python manage.py migrate --settings=backend.settings.prod`   |
