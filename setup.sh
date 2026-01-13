#!/bin/bash

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Emojis
ROCKET="🚀"
PACKAGE="📦"
SEED="🌱"
DOCKER="🐳"
CHECK="✅"
CLEAN="🧹"
WARNING="⚠️"
INFO="ℹ️"

echo -e "${BLUE}${ROCKET} Carambar API - Complete Setup${NC}"
echo "=========================================="
echo ""

# Check if Node.js is installed
echo -e "${INFO} Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}${WARNING} Node.js is not installed!${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}${CHECK} Node.js ${NODE_VERSION} detected${NC}"
echo ""

# Check if Docker is installed
echo -e "${INFO} Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}${WARNING} Docker is not installed!${NC}"
    echo "Please install Docker from https://docker.com"
    exit 1
fi

DOCKER_VERSION=$(docker --version)
echo -e "${GREEN}${CHECK} ${DOCKER_VERSION} detected${NC}"
echo ""

# Check if docker compose is installed
echo -e "${INFO} Checking Docker Compose installation..."
if ! command -v docker compose &> /dev/null; then
    echo -e "${RED}${WARNING} Docker Compose is not installed!${NC}"
    echo "Please install Docker Compose"
    exit 1
fi

COMPOSE_VERSION=$(docker compose --version)
echo -e "${GREEN}${CHECK} ${COMPOSE_VERSION} detected${NC}"
echo ""

# Clean previous setup (optional)
echo -e "${YELLOW}${CLEAN} Cleaning previous setup...${NC}"
if [ -f "database.sqlite" ]; then
    echo "Removing old database..."
    rm -f database.sqlite
fi

if [ -d "node_modules" ]; then
    echo "Removing old node_modules..."
    rm -rf node_modules
fi

if [ -d "dist" ]; then
    echo "Removing old build..."
    rm -rf dist
fi

echo -e "${GREEN}${CHECK} Cleanup complete${NC}"
echo ""

# Create .env if not exists
echo -e "${INFO} Checking .env file..."
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}${CHECK} .env file created${NC}"
    else
        echo -e "${YELLOW}${WARNING} .env.example not found, creating default .env${NC}"
        cat > .env << EOF
NODE_ENV=development
PORT=3000
API_VERSION=v1
DB_STORAGE=./database.sqlite
DB_LOGGING=true
EOF
        echo -e "${GREEN}${CHECK} Default .env file created${NC}"
    fi
else
    echo -e "${GREEN}${CHECK} .env file already exists${NC}"
fi
echo ""

# Install dependencies
echo -e "${PACKAGE} Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}${CHECK} Dependencies installed successfully${NC}"
else
    echo -e "${RED}${WARNING} Failed to install dependencies${NC}"
    exit 1
fi
echo ""

# Compile TypeScript
echo -e "${INFO} Compiling TypeScript..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}${CHECK} TypeScript compiled successfully${NC}"
else
    echo -e "${RED}${WARNING} Failed to compile TypeScript${NC}"
    exit 1
fi
echo ""

# Seed database
echo -e "${SEED} Seeding database with initial jokes..."
npm run seed
if [ $? -eq 0 ]; then
    echo -e "${GREEN}${CHECK} Database seeded successfully${NC}"
else
    echo -e "${RED}${WARNING} Failed to seed database${NC}"
    exit 1
fi
echo ""

# Stop any running containers
echo -e "${INFO} Stopping any running containers..."
docker compose down 2>/dev/null
echo ""

# Build Docker image
echo -e "${DOCKER} Building Docker image..."
docker compose build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}${CHECK} Docker image built successfully${NC}"
else
    echo -e "${RED}${WARNING} Failed to build Docker image${NC}"
    exit 1
fi
echo ""

# Start containers
echo -e "${DOCKER} Starting Docker containers..."
docker compose up -d
if [ $? -eq 0 ]; then
    echo -e "${GREEN}${CHECK} Containers started successfully${NC}"
else
    echo -e "${RED}${WARNING} Failed to start containers${NC}"
    exit 1
fi
echo ""

# Wait for server to be ready
echo -e "${INFO} Waiting for server to be ready..."
sleep 3

# Test API
echo -e "${INFO} Testing API health check..."
HEALTH_CHECK=$(curl -s http://localhost:3000/health 2>/dev/null)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}${CHECK} API is responding!${NC}"
else
    echo -e "${YELLOW}${WARNING} API might still be starting...${NC}"
fi
echo ""

# Display summary
echo "=========================================="
echo -e "${GREEN}${CHECK} Setup Complete!${NC}"
echo "=========================================="
echo ""
echo -e "${INFO} Available endpoints:"
echo "  🌐 API Base:        http://localhost:3000"
echo "  📚 Swagger Docs:    http://localhost:3000/api-docs"
echo "  ❤️  Health Check:    http://localhost:3000/health"
echo "  🎭 All Jokes:       http://localhost:3000/api/v1/jokes"
echo "  🎲 Random Joke:     http://localhost:3000/api/v1/jokes/random"
echo ""
echo -e "${INFO} Useful commands:"
echo "  📊 View logs:       docker compose logs -f"
echo "  ⏹️  Stop:            docker compose down"
echo "  🔄 Restart:         docker compose restart"
echo "  🔍 Container status: docker compose ps"
echo ""
echo -e "${BLUE}Happy coding! 🎉${NC}"
