const randomAmount = () => {

    try {

        const randomNumber = Math.random();
        const randomValue = Math.floor(randomNumber * (15 - 5 + 1)) + 5;
        return randomValue;        
        
    } catch (e) {
        console.error('Error randomize amount:', error);
        return 'Amount Errors';
    }

}

module.exports = {
    randomAmount
}