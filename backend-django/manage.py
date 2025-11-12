#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
# import os
# import sys


# def main():
#     """Run administrative tasks."""
#     os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.dev')
#     try:
#         from django.core.management import execute_from_command_line
#     except ImportError as exc:
#         raise ImportError(
#             "Couldn't import Django. Are you sure it's installed and "
#             "available on your PYTHONPATH environment variable? Did you "
#             "forget to activate a virtual environment?"
#         ) from exc
#     execute_from_command_line(sys.argv)

# if __name__ == "__main__":
#     main()

import os
import sys
from dotenv import load_dotenv

def main():
    """Run administrative tasks."""
    # Otomatis pilih .env.local jika ada, kalau tidak ada pakai .env.prod
    if os.path.exists(".env.local"):
        load_dotenv(".env.local")
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings.dev")
        print("Running in DEVELOPMENT mode (.env.local)")
    else:
        load_dotenv(".env.prod")
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings.prod")
        print("Running in PRODUCTION mode (.env.prod)")

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Make sure it's installed and available on your PYTHONPATH."
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == "__main__":
    main()
