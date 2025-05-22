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

## Setup ith React

```bash
# install node on whatever system you are using
npm create vite@latest
# name the project
# select react
# select typescript
cd <project_name>
npm install
npm run dev
```

Following Video Linked [here](https://youtu.be/SqcY0GlETPk?si=zp1oVnPKeGMyo7Qe)
