const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

const JWT_SECRET = 'your_hardcoded_jwt_secret';//you can leave the code just like that

const resolvers = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email: username }] });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
      return { token, user };
    },
    getAllEmployees: async () => {
      return await Employee.find({});
    },
    searchEmployeeById: async (_, { id }) => {
      return await Employee.findById(id);
    }
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      return user;
    },
    addNewEmployee: async (_, { input }) => {
      const employee = new Employee(input);
      await employee.save();
      return employee;
    },
    updateEmployeeById: async (_, { id, input }) => {
      const employee = await Employee.findByIdAndUpdate(id, input, { new: true });
      return employee;
    },
    deleteEmployeeById: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return `Employee with ID ${id} was deleted.`;
    }
  }
};

module.exports = { resolvers };
