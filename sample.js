const STRIPE = require('./src/main');
const bot = new STRIPE();

(async () => {

    var cards = '4242424242424242|12|25|155';
    var ccn = cards.split('|')[0];
    var exp_month = cards.split('|')[1];
    var exp_year = cards.split('|')[2];
    var cvc = cards.split('|')[3];

    const createToken = await bot.createToken(ccn, exp_month, exp_year, cvc);
    if (createToken.id) {
        const createCharge = await bot.createCharge(createToken.id);
        console.log(createCharge);
    } else {
        console.log(`[DIED] ${createToken.error.message}`);
    }

})();