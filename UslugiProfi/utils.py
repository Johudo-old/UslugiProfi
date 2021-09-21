def create_file_absolute_url(request, file):
    if file and hasattr(file, 'url'):
        photo_url = file.url
        return request.build_absolute_uri(photo_url)
    else:
        return None
