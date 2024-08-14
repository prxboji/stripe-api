const STRIPE = require('./src/main');
const bot = new STRIPE();

(async () => {

    const createPaymentMethod = await bot.createPaymentMethod('4242424242424241', '09', '28', '550');
    if (createPaymentMethod.id) {
        console.log(createPaymentMethod);
        
    } else {
        console.log(`[DIED] ${createPaymentMethod.error.message}`);
    }

})();