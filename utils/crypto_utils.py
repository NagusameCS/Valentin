from cryptography.fernet import Fernet
import os

def generate_key():
    """Generates a key and saves it into a file"""
    key = Fernet.generate_key()
    with open("secret.key", "wb") as key_file:
        key_file.write(key)

def load_key():
    """Loads the key from the current directory named `secret.key`"""
    if not os.path.exists("secret.key"):
        generate_key()
    return open("secret.key", "rb").read()

def encrypt_file(file_path):
    """Encrypts a file"""
    key = load_key()
    f = Fernet(key)
    with open(file_path, "rb") as file:
        file_data = file.read()
    encrypted_data = f.encrypt(file_data)
    with open(file_path, "wb") as file:
        file.write(encrypted_data)

def decrypt_file(file_path):
    """Decrypts a file"""
    key = load_key()
    f = Fernet(key)
    with open(file_path, "rb") as file:
        encrypted_data = file.read()
    decrypted_data = f.decrypt(encrypted_data)
    with open(file_path, "wb") as file:
        file.write(decrypted_data)

def encrypt_data(data):
    """Encrypts string data"""
    key = load_key()
    f = Fernet(key)
    return f.encrypt(data.encode()).decode()

def decrypt_data(encrypted_data):
    """Decrypts string data"""
    key = load_key()
    f = Fernet(key)
    return f.decrypt(encrypted_data.encode()).decode()
