Lingoland Project Rules

unittest function names => test_<who>_<expected_behavior>


API Test Check Rule

    1- test status code
    2- test data type
    3- test response content

Priority of modules import

    1- Standard library (import os |or| from datetime import datetime)
    2- Django imports (from django.conf import setting)
    3- Third-party (from rest_framework import serializer)
    4- Local imports (from accounts.models import User)