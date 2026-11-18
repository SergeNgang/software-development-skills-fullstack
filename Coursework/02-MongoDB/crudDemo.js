import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'fullstack_coursework';

if (!uri) {
  console.error('Error: MONGODB_URI is missing in .env');
  process.exit(1);
}

const client = new MongoClient(uri);

async function runCrudDemo() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);
    const tasksCollection = db.collection('tasks');

    
    await tasksCollection.deleteMany({});

    const singleResult = await tasksCollection.insertOne({
      title: 'Configure MongoDB Atlas Cluster',
      module: '02-MongoDB',
      completed: true,
      createdAt: new Date()
    });
    console.log('\n[CREATE] Inserted single task ID:', singleResult.insertedId);

    const manyResult = await tasksCollection.insertMany([
      { title: 'Practice MongoClient CRUD operations', module: '02-MongoDB', completed: false, createdAt: new Date() },
      { title: 'Build Express REST API', module: '03-ExpressJS', completed: false, createdAt: new Date() }
    ]);
    console.log(`[CREATE] Inserted ${manyResult.insertedCount} additional tasks.`);

    
    const allTasks = await tasksCollection.find({}).toArray();
    console.log('\n[READ] All tasks in collection:', allTasks);

   
    const updateResult = await tasksCollection.updateOne(
      { title: 'Practice MongoClient CRUD operations' },
      { $set: { completed: true } }
    );
    console.log(`\n[UPDATE] Matched ${updateResult.matchedCount}, Modified ${updateResult.modifiedCount} task.`);

    
    const deleteResult = await tasksCollection.deleteOne({ title: 'Build Express REST API' });
    console.log(`\n[DELETE] Deleted ${deleteResult.deletedCount} task.`);

  
    const remainingTasks = await tasksCollection.find({}).toArray();
    console.log('\n[FINAL STATE] Remaining tasks:', remainingTasks);
  } catch (error) {
    console.error('MongoDB operation failed:', error);
  } finally {
    await client.close();
    console.log('\nConnection closed.');
  }
}

runCrudDemo();