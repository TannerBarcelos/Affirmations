const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    age: {
      type: Number,
      required: [true, 'Please add your age'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  { timestamps: true },
)

userSchema.statics.register = async function (name, email, password, age) {
  const userExists = await this.findOne({ email })

  if (userExists) {
    throw new Error('User with this email already exists. Please log in.')
  }

  const hashedPWD = await bcrypt.hash(password, await bcrypt.genSalt(12))

  const newUser = await this.create({
    name,
    email,
    age,
    password: hashedPWD,
  })
  return newUser
}

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    return user
  }
}

module.exports = mongoose.model('User', userSchema)
