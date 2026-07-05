# Stage 1: Build frontend assets
FROM node:22-alpine AS node-builder
RUN apk add --no-cache php php-cli php-common php-mbstring php-xml php-dom php-tokenizer php-curl php-openssl php-json php-phar php-session php-fileinfo php-simplexml php-iconv curl git unzip
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --no-dev --no-scripts --no-autoloader
COPY package*.json ./
RUN npm ci
COPY . .
RUN composer dump-autoload --no-dev --optimize
RUN npm run build

# Stage 2: Production PHP-FPM + Nginx environment
FROM php:8.4-fpm-alpine

# Install system dependencies & PHP extension build dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    bash \
    postgresql-dev \
    sqlite-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    oniguruma-dev \
    icu-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql pdo_pgsql pgsql pdo_sqlite mbstring zip opcache gd pcntl bcmath

# Configure Nginx
RUN mkdir -p /run/nginx
RUN printf '%s\n' \
    'server {' \
    '    listen 80;' \
    '    server_name localhost;' \
    '    root /var/www/html/public;' \
    '    index index.php;' \
    '    charset utf-8;' \
    '    location / {' \
    '        try_files $uri $uri/ /index.php?$query_string;' \
    '    }' \
    '    location = /favicon.ico { access_log off; log_not_found off; }' \
    '    location = /robots.txt  { access_log off; log_not_found off; }' \
    '    error_page 404 /index.php;' \
    '    location ~ \.php$ {' \
    '        fastcgi_pass 127.0.0.1:9000;' \
    '        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;' \
    '        include fastcgi_params;' \
    '    }' \
    '    location ~ /\.(?!well-known).* {' \
    '        deny all;' \
    '    }' \
    '}' > /etc/nginx/http.d/default.conf

# Configure Supervisor
RUN mkdir -p /etc/supervisor/conf.d && printf '%s\n' \
    '[supervisord]' \
    'nodaemon=true' \
    'user=root' \
    'logfile=/var/log/supervisord.log' \
    'pidfile=/var/run/supervisord.pid' \
    '' \
    '[program:php-fpm]' \
    'command=php-fpm' \
    'stdout_logfile=/dev/stdout' \
    'stdout_logfile_maxbytes=0' \
    'stderr_logfile=/dev/stderr' \
    'stderr_logfile_maxbytes=0' \
    'autorestart=true' \
    '' \
    '[program:nginx]' \
    'command=nginx -g "daemon off;"' \
    'stdout_logfile=/dev/stdout' \
    'stdout_logfile_maxbytes=0' \
    'stderr_logfile=/dev/stderr' \
    'stderr_logfile_maxbytes=0' \
    'autorestart=true' \
    > /etc/supervisor/conf.d/supervisord.conf

# Configure Startup Script
RUN printf '%s\n' \
    '#!/bin/bash' \
    'if [ "${DB_CONNECTION}" = "sqlite" ] && [ ! -f "${DB_DATABASE:-database/database.sqlite}" ]; then' \
    '    mkdir -p $(dirname "${DB_DATABASE:-database/database.sqlite}")' \
    '    touch "${DB_DATABASE:-database/database.sqlite}"' \
    'fi' \
    '' \
    '# Wait for PostgreSQL if DB_CONNECTION is pgsql' \
    'if [ "${DB_CONNECTION}" = "pgsql" ]; then' \
    '    echo "Waiting for PostgreSQL database..."' \
    '    until pg_isready -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$DB_USERNAME"; do' \
    '        sleep 1' \
    '    done' \
    '    echo "PostgreSQL is ready."' \
    'fi' \
    '' \
    'php artisan migrate --force' \
    'php artisan config:cache' \
    'php artisan route:cache' \
    'php artisan view:cache' \
    '' \
    'exec supervisord -c /etc/supervisor/conf.d/supervisord.conf' \
    > /usr/local/bin/start.sh \
    && chmod +x /usr/local/bin/start.sh

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY --chown=www-data:www-data . .
COPY --from=node-builder --chown=www-data:www-data /app/vendor ./vendor
COPY --from=node-builder --chown=www-data:www-data /app/public/build ./public/build

# Fix permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/start.sh"]
