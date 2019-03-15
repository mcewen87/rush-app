const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

const { Intuition } = require("./models/intuition");

module.exports = function(app) {
  // => TEST
  app.get("/protected", function(req, res) {
    if (req.cookies.rushToken) {
      res.send({ auth: true });
    } else {
      res.send({ auth: false });
    }
  });

  // => SIGNOUT
  app.get("/signout", (req, res) => {
    res.clearCookie("rushToken");
    return res.sendStatus(200);
  });

  // => SINGIN
  app.post("/signin", requireSignin, Authentication.signin);

  // => SINGUP
  app.post("/signup", Authentication.signup);

  // => CREATE INTUITION
  app.post("/create", requireAuth, (req, res) => {
    const { title, body } = req.body;
    const newIntuition = new Intuition({
      title,
      body,
      author: req.user.id
    });
    newIntuition.save();
  });

  // => UPDATE INTUITION
  app.patch("/update", requireAuth, (req, res) => {
    const { title, body, id } = req.body;
    Intuition.findOneAndUpdate(
      {
        _id: id.toString()
      },
      {
        $set: {
          title: title
        },
        $set: {
          body: body
        }
      },
      {
        returnOriginal: false
      }
    ).then(() => {
      res.sendStatus(200);
    });
  });

  // => DELETE INTUITION
  app.delete("/delete", (req, res) => {
    const { id } = req.body;
    Intuition.deleteOne({
      _id: id.toString()
    }).then(() => res.sendStatus(200));
  });

  // =>  GET USER INTUITIONS
  app.get("/getIntuitions", requireAuth, (req, res) => {
    const userId = req.user.id;
    Intuition.find({ author: userId }).then(intuitions => {
      res.send(intuitions);
    });
  });
};
