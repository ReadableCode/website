# Frontend Setup

```bash
cd frontend
docker build -t website_frontend_image .
docker run --rm -it --name website_frontend_container -p 8082:80 website_frontend_image
```

## Rebuilding on docker-compose

```bash
sudo docker-compose -f docker_compose_projects.yaml up --build -d website-frontend
```
