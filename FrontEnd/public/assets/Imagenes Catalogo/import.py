import os
import pandas as pd

# Directorio donde se encuentran las imágenes
directorio_imagenes = r'C:\Users\raude\Desktop\Imagenes Catalogo'  # Ruta correcta

# Crear lista para almacenar los datos
data = []

# Función para recorrer las carpetas y generar los SKUs
def generar_excel(directorio):
    # Recorre todos los archivos en el directorio
    for foldername in os.listdir(directorio):
        folder_path = os.path.join(directorio, foldername)
        
        # Si es un directorio (marca), usamos el nombre de la carpeta como marca
        if os.path.isdir(folder_path):
            marca = foldername  # Ahora tomamos el nombre de la carpeta como la marca
            print(f"Procesando carpeta: {foldername} con la marca: {marca}")
            # Recorrer todas las subcarpetas y archivos
            for root, dirs, files in os.walk(folder_path):
                print(f"Accediendo a carpeta: {root}")
                for imagen in files:
                    if imagen.lower().endswith(('jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff', 'webp')):
                        print(f"Encontrada imagen: {imagen}")
                        imagen_path = os.path.join(root, imagen)
                        nombre_producto, extension = os.path.splitext(imagen)

                        # El nombre del archivo será el SKU
                        sku = nombre_producto

                        # Crear un diccionario con los datos
                        data.append({
                            'SKU': sku,
                            'Marca': marca,
                            'Nombre': '',
                            'Descripción': '',  # Aquí puedes poner la descripción si la tienes
                            'Variantes': '',  # Aquí puedes poner las variantes si las tienes
                            'Costo': ''  # Aquí puedes poner el costo si lo tienes
                        })

# Llamamos a la función para generar los datos
generar_excel(directorio_imagenes)

# Crear el DataFrame
df = pd.DataFrame(data)

# Guardar los datos en un archivo Excel
excel_path = r'C:\Users\raude\Desktop\productos_catalogo.xlsx'  # Ruta donde se guardará el archivo Excel
df.to_excel(excel_path, index=False)

print(f"El archivo Excel ha sido generado en: {excel_path}")
