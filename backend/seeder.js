import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config(); // to be able to use our variables

connectDB(); // to connect to our database

// import data to our database
const importData = async () => {
 try {
  await Order.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();

  const createdUsers = await User.insertMany(users);

  // this takes first user which is the admin user
  const adminUser = createdUsers[0]._id;

  // this takes all the products and adds the admin user to each product
  const sampleProducts = products.map(product => {
   return { ...product, user: adminUser };
  });

  await Product.insertMany(sampleProducts);

  console.log('Data Imported!'.green.inverse);
  process.exit();

 } catch(error) {
  console.error(`${error}`.red.inverse);
  process.exit(1);

 }
};

// destroy data
const destroyData = async () => {
 try {
  await Order.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();
  console.log('Data Destroyed!'.red.inverse);
  process.exit();

 } catch (error) {
  console.error(`${error}`.red.inverse);
  process.exit(1);
 }
};

// if run with -d destroy data, otherwise import data 
if (process.argv[2] === '-d') {
 destroyData();
} else {
 importData();
}
