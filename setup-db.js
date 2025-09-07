const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Setting up Linkbird Platform Database...\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file...');
  const envContent = `# Database
DATABASE_URL="postgresql://username:password@localhost:5432/linkbird_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"

# Google OAuth (Get these from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
`;
  
  fs.writeFileSync('.env', envContent);
  console.log('✅ .env file created!');
} else {
  console.log('✅ .env file already exists');
}

console.log('\n📋 Next steps:');
console.log('1. Update the DATABASE_URL in .env with your PostgreSQL connection string');
console.log('2. Generate database migrations: npm run db:generate');
console.log('3. Run database migrations: npm run db:migrate');
console.log('4. (Optional) Set up Google OAuth credentials in .env');
console.log('5. Start the development server: npm run dev');
console.log('\n🎉 Setup complete!');
