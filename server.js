  const express = require("express");
  const app = express();
  const cookieParser = require("cookie-parser");
  // const logger = require("morgan");
  const session = require("express-session");
  const expressLayouts = require("express-ejs-layouts");
  const methodOverride = require("method-override");
  const cors = require("cors");
  const path = require("path"); 
  const mongoose = require("mongoose");
  const sessionValues = require("./config/session");
  const MongoDBSession = require("connect-mongodb-session")(session);
  const {automatic} = require('./config/automatic')
  const MongoURI = "mongodb://localhost:27017/KELAJAK-biz";     //   KELAJAK-PUL-ber

  mongoose
    .connect(MongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Mongodb is running`);
    });
  const store = new MongoDBSession({
    uri: MongoURI,
    collection: "MYSession",
  });




  app.use(
    methodOverride("_method", {
      methods: ["POST", "GET"],
    })
  );
  app.locals.moment = require("moment");
  app.use(expressLayouts);
  // app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");


  app.use(express.static(path.join(__dirname, "public")));
  app.use(cors());
  app.use(
    session({ 
      secret: "secret",
      saveUninitialized: false,
      store: store,
      resave: false,

      cookie: {
        httpOnly: true,
        maxAge: sessionValues.session_time,
        sameSite: "strict",
      },
    })
  );

// automatic();
 








// PAGES
app.use("/", require("./router/web/index"));
app.use("/admin", require("./router/admin/index"));
// REST API
app.use("/filter", require("./router/filter"));
app.use("/team", require("./router/team"));
app.use("/auth", require("./router/auth")); // admin uchun
app.use("/user", require("./router/user")); // user uchun
app.use("/course", require("./router/course"));
app.use("/section", require("./router/section"));
app.use("/video", require("./router/video"));
app.use("/test_collection", require("./router/test_collection"));
app.use("/test", require("./router/test"));
app.use("/document", require("./router/doc"));
app.use("/contact", require("./router/contact"));
app.use("/mainvideo", require("./router/mainvideo"));
app.use("/addCourse", require("./router/addCourse"));
app.use("/balance", require("./router/balance")); // balansni to'ldirish uchun
app.use("/buy", require("./router/buy_course")); // kurs sotib olish
app.use("/chegirma", require("./router/chegirma")); // chegirma berish
app.use("/category", require("./router/category"));
app.use("/result", require("./router/result"));
app.use("/statistic", require("./router/statistic"));
app.use("/team", require("./router/team"));
app.use("/news", require("./router/news"));
app.use("/moderator", require("./router/moderator"));
app.use("/userall", require("./router/userall"));
app.use("/audio", require("./router/audio"));
app.use("/brand", require("./router/brand"));
app.use("/advertisement", require("./router/reklama"));

 // Ariza bilan ishlash uchun 
 
app.use("/davlat", require("./router/ariza/country"));

 

   


// USHBU URL MANZILLAR KODI HAMMASI ROUTERDAN OLIB KELINGAN
//  ==================   FREE ==================
app.use("/subject_FREE", require("./router/test/subject"));
//  ==================   FORMED ==================
app.use("/formed_FORM", require("./router/test/formed/form"));
app.use("/formed_THEME", require("./router/test/formed/theme"));
app.use("/formed_UNIT", require("./router/test/formed/unit"));
//  ==================   THEMED ==================
app.use("/themed_UNIT", require("./router/test/themed/unit"));
app.use("/themed_THEME", require("./router/test/themed/themes"));
//  ==================   VARIANTED ==================
app.use("/varianted_UNIT", require("./router/test/varianted/unit"));
app.use("/varianted_VARIANT", require("./router/test/varianted/variants"));
//  ==================   BLOCKED ==================
app.use("/blocked_UNIT", require("./router/test/block/unit"));
app.use("/blocked_VARIANT", require("./router/test/block/variant"));

//  ==================   TEST ==================
app.use("/test_FORMED", require("./router/test/formed/test"));
app.use("/test_VARIANTED", require("./router/test/varianted/test"));
app.use("/test_THEMED", require("./router/test/themed/test"));
app.use("/test_BLOKED", require("./router/test/block/test"));

const port = 3003; // Portni o'zgartir yuklashdan oldin.
app.listen(port, () => {
  console.log(`Server is running in ${port}`);
});
