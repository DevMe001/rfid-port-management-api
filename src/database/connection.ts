import { Sequelize } from "sequelize-typescript";
import Users from "./models/users.model";



const sequelize = new Sequelize({
	database: 'port-management',
	dialect: 'mysql',
	username: 'root',
	password: '',
	host: 'localhost',
	port: Number(process.env.PORT),
	models: [__dirname + '/**/*.model.ts']
});

// Add models to the Sequelize instance
sequelize.addModels([__dirname + './models/'],); // Add all your models here
// Synchronize the models with the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

export default sequelize;