# Backend

## Running

```bash
uvicorn main:app --host 0.0.0.0 --port 8002
```

## Running with docker

```bash
docker build -t website_backend_image .
```

- Testing

```bash
docker run --rm -it --name website_backend_container -p 8002:8002 website_backend_image
```

- Running

```bash
docker run --rm --name website_backend_container -p 8002:8002 website_backend_image
```

## Testing with Curl

```bash
# will need to use local ip address if using WSL and hosted in Windows
curl localhost:8002/status
```
