const randomAmount = () => {

    try {

        const randomNumber = Math.random();
        const randomValue = Math.floor(randomNumber * (150 - 80 + 1)) + 80;
        return randomValue;     
        
    } catch (e) {
        return 'Amount Errors';
    }

}

module.exports = {
    randomAmount
}