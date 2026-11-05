import os

class Config:
    # Local (por defecto) o la nube si existe DATABASE_URL
    USER = 'root'
    PASSWORD = ''
    HOST = 'localhost'
    DATABASE = 'db_productos'

    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        f'mysql+pymysql://{USER}:{PASSWORD}@{HOST}/{DATABASE}'
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Aiven exige conexión segura (SSL)
    if os.environ.get("DATABASE_URL"):
        SQLALCHEMY_ENGINE_OPTIONS = {
            "connect_args": {"ssl": {"ca": os.environ.get("SSL_CA", "ca.pem")}}
        }