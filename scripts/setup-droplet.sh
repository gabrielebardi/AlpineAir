#!/bin/bash

# Exit on any error
set -e

# Update system
echo "Updating system packages..."
apt update && apt upgrade -y

# Install required packages
echo "Installing required packages..."
apt install -y nginx certbot python3-certbot-nginx git curl

# Install Node.js
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2
echo "Installing PM2..."
npm install -g pm2

# Create application directory
echo "Creating application directory..."
mkdir -p /var/www/alpineair
chown -R $USER:$USER /var/www/alpineair

# Configure Nginx
echo "Configuring Nginx..."
cat > /etc/nginx/sites-available/alpineair << 'EOF'
server {
    server_name YOUR_DOMAIN;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/alpineair /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

echo "Basic setup complete!"
echo "Next steps:"
echo "1. Update server_name in /etc/nginx/sites-available/alpineair"
echo "2. Run: certbot --nginx -d YOUR_DOMAIN"
echo "3. Clone repository: git clone https://github.com/gabrielebardi/AlpineAir.git /var/www/alpineair"
echo "4. Set up environment variables in /var/www/alpineair/.env"
echo "5. Install dependencies and build: cd /var/www/alpineair && npm install && npm run build"
echo "6. Start application: pm2 start npm --name alpineair -- start" 