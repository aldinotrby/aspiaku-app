# AspiAKU Development Starter Script
# Run this script to start development environment

Write-Host "🚀 Starting AspiAKU Development Environment..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js atau npm tidak ditemukan!" -ForegroundColor Red
    Write-Host "   Download dari: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Gagal install dependencies!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies sudah terinstall" -ForegroundColor Green
}

Write-Host ""

# Run linting check
Write-Host "🔍 Running code quality checks..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Ada warnings di code, tapi development server akan tetap jalan" -ForegroundColor Yellow
} else {
    Write-Host "✅ Code quality check passed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🌐 Starting development server..." -ForegroundColor Green
Write-Host "   - Local:   http://localhost:5173/" -ForegroundColor Cyan
Write-Host "   - Demo OTP: 123456" -ForegroundColor Cyan
Write-Host "   - Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Start development server
npm run dev