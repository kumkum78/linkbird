const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL || 'postgresql://postgres:ADGsf@887@localhost:5432/linkbird_db');

async function resetDatabase() {
  try {
    console.log('Connected to database');

    // Drop all tables in the correct order to avoid foreign key constraints
    const tables = [
      'campaign_leads',
      'campaigns', 
      'leads',
      'accounts',
      'sessions',
      'verification_tokens',
      'users'
    ];

    for (const table of tables) {
      try {
        await sql`DROP TABLE IF EXISTS ${sql(table)} CASCADE`;
        console.log(`✅ Dropped table: ${table}`);
      } catch (error) {
        console.log(`⚠️  Table ${table} may not exist:`, error.message);
      }
    }

    // Drop the drizzle schema if it exists
    try {
      await sql`DROP SCHEMA IF EXISTS drizzle CASCADE`;
      console.log('✅ Dropped drizzle schema');
    } catch (error) {
      console.log('⚠️  Drizzle schema may not exist:', error.message);
    }

    console.log('🎉 Database reset completed successfully!');
    console.log('📝 Now run: npm run db:migrate');
    
  } catch (error) {
    console.error('❌ Error resetting database:', error.message);
  } finally {
    await sql.end();
  }
}

resetDatabase();
