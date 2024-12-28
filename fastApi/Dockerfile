FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY langchain-tets.py .

EXPOSE 8000

# Run the application
CMD ["uvicorn", "langchain-tets:app", "--host", "0.0.0.0", "--port", "8000"]