const Result = require("../models/result");
const SELLING_Test = require("../models/test"); // selling
const SELLING_Audio = require("../models/audio"); // selling
const SELLING_Video = require("../models/video"); // selling
const SELLING_PDF = require("../models/doc"); // selling

const FREE_Mavzulashgan_Test = require("../models/test/themed/tests"); // free
const FREE_Sinflashgan_Test = require("../models/test/formed/tests"); // free
const FREE_Variantlashgan_Test = require("../models/test/varianted/test"); // free
const FREE_Bloklashgan_Test = require("../models/test/block/test"); // free

const data = {
  // userlarning ID si

  user: "61005d4aa13f361124b4336d",
  user2: "61005d83a13f361124b4337b",
  user3: "61005d94a13f361124b43389",
  user4: "61005daca13f361124b433a3",
  user5: "61005dbba13f361124b433b1",
  user6: "61005dd4a13f361124b433bf",
  user7: "61005de2a13f361124b433cd",

  // =============================   Bepul materillar uchun   =============================

  "610061cda13f361124b433f0": "ingliz_tili",
  "610061eba13f361124b433f9": "mavzu_1",
  "610061f8a13f361124b433fe": "mavzu_2",
  "61006200a13f361124b43403": "mavzu_3",
  "6100625ca13f361124b4340c": "Collection(1 - mavzu)",
  "61006273a13f361124b43414": "Collection(2 - mavzu)",
  "61006283a13f361124b4341c": "Collection(3 - mavzu)",

  // =============================   Pullik  materillar uchun   =============================

  "610058c5d0e12d0c541ee0dc": "nodejs",

  // -------------------------------------------------------------------------- Bloklashgan --------------------------------------------------------------------------
  "61005b3ad0e12d0c541ee156": "Bloklashtirilgan_bolim",

  "61005b58d0e12d0c541ee161": "blok_1",
  "61005b66d0e12d0c541ee16a": "blok_2",

  // -------------------------------------------------------------------------- Sinflashtirilgan --------------------------------------------------------------------------
  "61005979d0e12d0c541ee115": "Sinflashtrilgan bolim",

  "610059b0d0e12d0c541ee11d": "1 sinf",
  // ----------
  "61005a04d0e12d0c541ee12f": "1-mavzu ( 1-sinf )",
  "61005a19d0e12d0c541ee13a": "2-mavzu ( 1-sinf )",

  "610059c3d0e12d0c541ee124": "2 sinf ",
  // ----------
  "61005a2ad0e12d0c541ee143": "1-mavzu ( 2-sinf )",
  "61005a3cd0e12d0c541ee14c": "2-mavzu ( 2-sinf )",

  // -------------------------------------------------------------------------- Variantlashgan  --------------------------------------------------------------------------
  "61005925d0e12d0c541ee0f9": "Variantlahtirilgan bolim",

  "61005944d0e12d0c541ee102": "1 variant (variantlashgan - nodejs )",
  "61005951d0e12d0c541ee109": "2 variant (variantlashgan - nodejs )",

  // -------------------------------------------------------------------------- Mavzulashgan --------------------------------------------------------------------------

  "610058d9d0e12d0c541ee0e2": "MAvzulashtirilgan bo'lim",

  "610058fad0e12d0c541ee0eb": "1 mavzu (mavzulashgan-nodejs)",
  "61005f30a13f361124b433e1": "2 mavzu (mavzulashgan-nodejs)",
};

const automatic = async () => {
  setInterval(async () => {
    Result.insertMany([
      {
        result: 25,
        totalQuestion: 100,
        user_ID: "61005d4aa13f361124b4336d",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "610058fad0e12d0c541ee0eb",
      },
      {
        result: 30,
        totalQuestion: 100,
        user_ID: "61005d4aa13f361124b4336d",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "61005f30a13f361124b433e1",
      },
      {
        result: 35,
        totalQuestion: 100,
        user_ID: "61005d83a13f361124b4337b",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "610058fad0e12d0c541ee0eb",
      },
      {
        result: 40,
        totalQuestion: 100,
        user_ID: "61005d83a13f361124b4337b",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "61005f30a13f361124b433e1",
      },
      {
        result: 35,
        totalQuestion: 100,
        user_ID: "61005d94a13f361124b43389",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "610058fad0e12d0c541ee0eb",
      },
      {
        result: 55,
        totalQuestion: 100,
        user_ID: "61005d94a13f361124b43389",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "61005f30a13f361124b433e1",
      },
      {
        result: 45,
        totalQuestion: 100,
        user_ID: "61005daca13f361124b433a3",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "610058fad0e12d0c541ee0eb",
      },
      {
        result: 60,
        totalQuestion: 100,
        user_ID: "61005daca13f361124b433a3",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "61005f30a13f361124b433e1",
      },
      {
        result: 65,
        totalQuestion: 100,
        user_ID: "61005dbba13f361124b433b1",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "610058fad0e12d0c541ee0eb",
      },
      {
        result: 75,
        totalQuestion: 100,
        user_ID: "61005dbba13f361124b433b1",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "61005f30a13f361124b433e1",
      },
      {
        result: 80,
        totalQuestion: 100,
        user_ID: "61005dd4a13f361124b433bf",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "610058fad0e12d0c541ee0eb",
      },
      {
        result: 85,
        totalQuestion: 100,
        user_ID: "61005dd4a13f361124b433bf",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "61005f30a13f361124b433e1",
      },
      {
        result: 90,
        totalQuestion: 100,
        user_ID: "61005de2a13f361124b433cd",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "610058fad0e12d0c541ee0eb",
      },
      {
        result: 95,
        totalQuestion: 100,
        user_ID: "61005de2a13f361124b433cd",
        subject_ID: "610058c5d0e12d0c541ee0dc",
        unit_ID_THEMED: "610058d9d0e12d0c541ee0e2",
        theme_ID_THEMED: "61005f30a13f361124b433e1",
      },
    ])
      .then(() => {
        console.log("Data is created ");
      })
      .catch((error) => {
        console.log(error);
      });
  }, 100);
};
module.exports = { automatic };
