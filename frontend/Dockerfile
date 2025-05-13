# Use a minimal Nginx base image
FROM nginx:alpine

# Copy the Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy only .html files into Nginx's web root
COPY *.html /usr/share/nginx/html/

# Expose port 80 (default Nginx port)
EXPOSE 80
