const fetch = require('node-fetch');
require('dotenv').config();

const helpers = require('./helpers/helpers');

class STRIPE {

    constructor ()
    {

        this.base_url = 'https://api.stripe.com';

        this.keys = {
            pk: process.env.PK,
            sk: process.env.SK
        }
    }

    async createPaymentMethod (ccn, exp_month, exp_year, cvc)
    {
        try {

            const req = await fetch(this.base_url + '/v1/payment_methods', {
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

    async createPaymentIntents (paymentId)
    {
        try {

            const amount = helpers.randomAmount();

            const req = await fetch(this.base_url + '/v1/payment_intents', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': 'Basic ' + btoa(this.keys.sk)
                },
                body: `automatic_payment_methods[enabled]=true&automatic_payment_methods[allow_redirects]=never&amount=${amount}&currency=usd&payment_method=${paymentId}`
            });

            const res = await req.json();
            return res;
            
        } catch (e) {
            return e;
        }
    }

    async confirmPaymentIntents (paymentIntentsId, email)
    {
        try {

            const req = await fetch(this.base_url + '/v1/payment_intents/' + paymentIntentsId + '/confirm', {
                method: 'POST',
                headers: {
                  'Authorization': 'Basic ' + btoa(this.keys.sk)
                },
                body: new URLSearchParams({
                  'receipt_email': email,
                })
            });

            const res = await req.json();
            return res;
            
        } catch (e) {
            return e;
        }
    }

}

module.exports = STRIPE;