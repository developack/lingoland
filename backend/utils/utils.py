from django.utils.text import slugify


class Utils(object):

    @classmethod
    def __init__(cls):
        pass

    @classmethod
    def generate_unique_slug(cls, obj, model):
        base_slug = slugify(obj.title, allow_unicode=True)
        slug = base_slug
        counter = 1

        while model.objects.filter(slug=slug).exists():
            slug = f'{base_slug}-{counter}'
            counter += 1
        return slug