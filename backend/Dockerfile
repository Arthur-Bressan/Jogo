# Usar uma imagem base leve do Python
FROM python:3.10-slim

# Configurar diretório de trabalho
WORKDIR /app

# Copiar os arquivos necessários para o contêiner
COPY . /app

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt
RUN python3 create_db.py

# Expor a porta que o Flask usará (geralmente 5000)
EXPOSE 5000

# Definir a variável de ambiente para rodar o Flask
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Comando para rodar o servidor Flask
CMD ["flask", "run", "--host=0.0.0.0"]
