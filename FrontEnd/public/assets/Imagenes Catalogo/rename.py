import os

# Directorio donde se encuentran las imágenes
directorio_imagenes = r'C:\Users\raude\Desktop\Imagenes Catalogo'  # Ruta correcta

# Diccionario de marcas para asignar una letra
marcas = {
    'Mae': 'A',
    'Artline': 'B',
    'Pelikan': 'C',
    'Henkel': 'D',
    'Marros': 'E',
    'Selanusa': 'F',
    'Rodin': 'G',
    'Interiorent': 'H',
    'Naviteck': 'I',
    'Kola Loka': 'J',
    'Eurocolor': 'K',
    'Azor': 'L',
    '8A': 'M',
    'Sajor': 'N',
    'Popular': 'O',
    'Jocar': 'P',
    'Gondi': 'Q',
    'Pascua': 'R',
    'Jc': 'S',
    'Manny': 'T',
    'Sunrise': 'U',
    'Selecto': 'V',
    'Makiko': 'W',
    'Papparazzi': 'X',
    'Janel': 'Y',
    'Mixto': 'Z'
}

# Función para renombrar las imágenes
def renombrar_imagenes(directorio):
    # Recorre todos los archivos en el directorio
    for foldername in os.listdir(directorio):
        folder_path = os.path.join(directorio, foldername)
        
        # Si es un directorio (marca)
        if os.path.isdir(folder_path):
            marca = marcas.get(foldername, None)
            if marca:
                print(f"Procesando carpeta: {foldername} con la marca: {marca}")
                categoria_num = 1  # Para las categorías, iniciamos en 1
                # Recorrer todas las subcarpetas y archivos
                for root, dirs, files in os.walk(folder_path):
                    print(f"Accediendo a carpeta: {root}")
                    contador_producto = 1  # Contador del producto dentro de la categoría
                    categoria_nombre = os.path.basename(root)  # Nombre de la subcarpeta
                    if categoria_nombre != "":  # Asegurarse de que la categoría no esté vacía
                        # Crear el nombre de SKU con la categoría correcta
                        for imagen in files:
                            if imagen.lower().endswith(('jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff', 'webp' )):
                                print(f"Encontrada imagen: {imagen}")
                                imagen_path = os.path.join(root, imagen)
                                nombre_producto, extension = os.path.splitext(imagen)

                                # El nombre del archivo será marca + categoría + producto
                                nuevo_nombre = f"{marca}{categoria_num:02d}{contador_producto:02d}{extension}"
                                
                                # Renombrar el archivo de imagen
                                nuevo_path = os.path.join(root, nuevo_nombre)
                                os.rename(imagen_path, nuevo_path)
                                print(f"Renombrado: {imagen} a {nuevo_nombre}")
                                
                                contador_producto += 1  # Aumentar el contador del producto
                        categoria_num += 1  # Aumentar la categoría después de procesar una subcarpeta

# Llamamos a la función para renombrar
renombrar_imagenes(directorio_imagenes)
