const STRIPE = require('./src/main');
const bot = new STRIPE();

(async () => {

    const createPaymentMethod = await bot.createPaymentMethod('4242424242424242|09|28|550');
    console.log(createPaymentMethod);

})();