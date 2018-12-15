const User = require('../../models/User');

module.exports = (app) => {
  /*
  sign up
  */
  app.post('/api/account/signup', (req,res,next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;

    if (!email) {
      return res.status(400).send({
        success : false,
        message : 'You must provide an email address.'
      });
    }
    if (!password) {
      return res.status(400).send({
        success : false,
        message: 'You must provide a password'
      });
    }

    if (!email && !password) {
      return res.status(400).send({
        success: false,
        message: 'You must provide an email & password'
      });
    }


    email = email.toLowerCase();
    email = email.trim();

//Verify unique email

    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.status(400).send({
          success: false,
          message: 'This email address is already taken'
        });
      }

//Save the new user
    const newUser = new User();

    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.save(err, user) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.status(201).send({
        success: true,
        message: 'Signed up'
      });
    });
  });

}); //signup endpoint complete
};
