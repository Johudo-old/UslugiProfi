import os
import uuid


def path_and_rename_avatar(instance, filename):
    upload_to = 'users_avatar'
    ext = filename.split('.')[-1]
    filename = '{}.{}'.format(uuid.uuid4().hex, ext)

    return os.path.join(upload_to, instance.email, filename)
