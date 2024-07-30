const fetch = require('node-fetch');
require('dotenv').config();

class STRIPE {

    constructor ()
    {
        this.keys = {
            pk: process.env.PK,
            sk: process.env.SK
        }
    }

    async createPaymentMethod (ccn, exp_month, exp_year, cvc)
    {
        try {

            const req = await fetch('https://api.stripe.com/v1/payment_methods', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Basic ' + btoa(this.keys.pk)
                },
                body: `type=card&card[number]=${ccn}&card[exp_month]=${exp_month}&card[exp_year]=${exp_year}&card[cvc]=${cvc}`
            });

            const res = await req.json();
            return res;
            
        } catch (e) {
            return e;
        }
    }

}

module.exports = STRIPE;