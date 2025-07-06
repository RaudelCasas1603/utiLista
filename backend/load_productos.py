#!/usr/bin/env python3
import os
import re
import pandas as pd
import psycopg2
import psycopg2.extras as extras
from dotenv import load_dotenv

# 1️⃣  Cargar credenciales
load_dotenv()
DB_CONN = {
    "host": os.getenv("DB_HOST", "localhost"),
    "dbname": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASS"),
    "port": os.getenv("DB_PORT", 5432),
}

CSV_PATH = "./utilista.csv"          # <-- Ajusta si cambiaste nombre
TABLE    = "productos"

# 2️⃣  Función para limpiar costo
def parse_cost(raw):
    if pd.isna(raw):
        return None
    # Elimina $ , y espacios
    clean = re.sub(r"[^\d.]", "", str(raw))
    return float(clean) if clean else None

def main():
    # 3️⃣  Cargar CSV
    df = pd.read_csv(CSV_PATH)

    # 4️⃣  Limpiar DataFrame
    if "id" in df.columns:
        df = df.drop(columns=["id"])           # deja a PG generar el id

    # Normaliza costo
    df["costo"] = df["costo"].apply(parse_cost)

    # Reemplaza NaN con None para INSERT
    df = df.where(pd.notnull(df), None)

    # Lista de columnas en el orden de la tabla
    cols = ["sku", "marca", "descripcion", "variantes",
            "costo", "categoria", "imagen"]

    tuples = [tuple(x) for x in df[cols].to_numpy()]

    query = f"""
        INSERT INTO {TABLE} ({', '.join(cols)})
        VALUES %s
    """

    try:
        conn = psycopg2.connect(**DB_CONN)
        cur  = conn.cursor()
        print("✅ Conexión exitosa a la base de datos.")

        extras.execute_values(cur, query, tuples, page_size=1000)
        conn.commit()
        print(f"✅ Se insertaron {len(tuples)} productos correctamente.")

    except Exception as e:
        print("❌ Error al insertar datos:", e)
        if conn:
            conn.rollback()
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    main()
