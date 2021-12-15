const Balance = require('../models/balance');

exports.fill_balance = async (req, res, next) => {
    const user = req.session.client
    if(!user) {
        res.status(400).json({ data: 'User is not defined to fill balance'})
    }
    const result = new Balance({
        amount: req.body.amount,
        userID: user._id
    })
    await result.save()
    // res.redirect(`https://pay.amediatv.uz/pay/payme/${user.uid}/${priceCheck.amount}`)
    .then(() => {
        res.json('ok')
    })
    .catch((error) => {
        res.json(error)
    })
};