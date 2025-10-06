| Environment           | Command                                                                  |
| --------------------- | ------------------------------------------------------------------------ |
| Development (default) | `poetry run python manage.py runserver`                                  |
| Development explicit  | `poetry run python manage.py runserver --settings=backend.settings.dev`  |
| Production            | `poetry run python manage.py runserver --settings=backend.settings.prod` |
| Migrate DB dev        | `poetry run python manage.py migrate --settings=backend.settings.dev`    |
| Migrate DB prod       | `poetry run python manage.py migrate --settings=backend.settings.prod`   |

Task:
    # poetry run invoke dev -> runserver
    # poetry run invoke makemigrate
    # poetry run invoke migrate
    # poetry run invoke shell
    # poetry run invoke createsuperuser

Struktur folder backend
backend-django/
│── manage.py
│
│── backend/                     # Core project settings
│   ├── __init__.py
│   ├── settings/
│   │   ├── base.py              # Base config
│   │   ├── dev.py               # Dev config
│   │   └── prod.py              # Prod config
│   ├── urls.py
│   └── wsgi.py
│
│── apps/                        # Modular apps
│   ├── accounts/                # User & Auth
│   │   ├── __init__.py
│   │   ├── models.py            # CustomUser
│   │   ├── managers.py          # CustomUserManager
│   │   ├── schema.py            # Strawberry schema (Query & Mutation)
│   │   ├── services.py          # Business logic (ex: create_user, auth)
│   │   ├── selectors.py         # Query logic (ex: get_user, list_users)
│   │   ├── tests/               # Unit & integration tests
│   │   │   ├── test_models.py
│   │   │   └── test_schema.py
│   │   └── apps.py
│   │
│   ├── core/                    # Reusable base utilities
│   │   ├── __init__.py
│   │   ├── schema.py            # Core types (DateTime scalar, pagination, etc.)
│   │   ├── utils.py
│   │   └── mixins.py
│   │
│   └── another_app/             # Example: products, orders, etc.
│       ├── models.py
│       ├── schema.py
│       └── ...
│
│── schema/                      # Central GraphQL schema
│   ├── __init__.py
│   ├── query.py                 # Root Query (gabung dari apps)
│   ├── mutation.py              # Root Mutation (gabung dari apps)
│   └── schema.py                # strawberry.Schema(query=Query, mutation=Mutation)
│
└── 


myapp/
│── models.py       # definisi User model. defaultnya file sudah ada
│── services.py     # logika bisnis (bikin user, dll.)
│── selectors.py    # fungsi ambil/query data
│── types.py        # schema GraphQL type
│── schema.py       # query & mutation GraphQL
│── admin.py        # registrasi admin. defaultnya file sudah ada


| Layer              | Tanggung Jawab                                                                    |
| ------------------ | --------------------------------------------------------------------------------- |
| **schema.py**      | Deklarasi GraphQL (Query/Mutation) dan pemetaan resolver ke service atau selector |
| **selectors.py**   | Operasi `read-only` ke database (tanpa modifikasi data)                           |
| **services.py**    | Operasi `write` atau proses bisnis (buat, ubah, hapus, login, otorisasi, dll)     |
| **models.py**      | Struktur tabel dan relasi ORM                                                     |
| **permissions.py** | Validasi otorisasi pengguna berdasarkan role/permission                           |
