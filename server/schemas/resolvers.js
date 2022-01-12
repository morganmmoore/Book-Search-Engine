const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password');

                return userData;
            }

            throw new AuthenticationError('Please Log in!')
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('Incorrect login information. Try again.');
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect login information. Try again.');
            }

            const token = signToken(user);
            return { token, user }
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const updatedInfo = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { savedBooks: book }},
                    { new: true }
                );

                return updatedInfo;
            }

            throw new AuthenticationError("Please log in!")
        }
    }
};

module.exports = resolvers;