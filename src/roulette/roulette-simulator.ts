
/**
 * A rudimentary roulette simulator. 
 */
class RouletteSimulator {

    readonly maxNumbers = 37;

    public getNumberOfSpins(initialMoney: number, numNumbers: number, betAmount: number) {

        if (numNumbers <= 0) {
            throw 'numBets cannot be zero or negative';
        }

        if (numNumbers > initialMoney) {
            throw 'numBets cannot be greater than initialMoney';
        }

        if (initialMoney < 0) {
            throw 'initial money cannot be zero or negative';
        }

        let spins = 0;
        while (initialMoney >= 0) {
            // todo handle... when... we don't have enough bet
            initialMoney -= betAmount;

            // todo simulate it properly with a map... 
            // randomly divide the bets... 
            // it can get a little complicated... 
            // for now... numNumbers and amount is the same. 

            const ourNumbers = Array(numNumbers).fill(0).map((_v, i) => i);
            const winningNumber = Math.floor(Math.random() * this.maxNumbers);

            if (ourNumbers.some((ourNumber) => ourNumber === winningNumber)) {
                initialMoney += 36;
            }

            spins += 1;
        }

        return spins;
    }

    public bet(initialMoney: number, betAmount: number) {

        let spins = 0;
        while (initialMoney >= 0) {
            initialMoney -= betAmount;

            const ourNumbers = Array(2).fill(0).map((_v, i) => i);
            const winningNumber = Math.floor(Math.random() * this.maxNumbers);

            if (ourNumbers.some((ourNumber) => ourNumber === winningNumber)) {
                initialMoney += 36 * (betAmount / 2);
            }

            spins += 1;
        }

        return spins;
    }

}

const initial = 100;
const numSimulations = 5000;

const simulator = new RouletteSimulator();


console.log("Number of bets\t|\tAverage spins\t|\tHours to play\t|\tHours to lose 10K\t|\tDays to lose 10K");

for (let numBets = 1; numBets < 15; numBets++) {
    let sumSpins = 0;
    for (let i = 0; i < numSimulations; i++) {
        sumSpins += simulator.getNumberOfSpins(initial, numBets, numBets);
    }

    const avgSpins = Math.floor(sumSpins / numSimulations);
    const numHours = (avgSpins * 30) / 3600;
    const hoursToLose10K = Math.ceil(numHours * (10000 / initial));
    const daysToLose10K = Math.ceil(hoursToLose10K / 3);
    // const daysToLose10K = Math.ceil(hoursToLose10K / 24);

    console.log(numBets, "\t\t|\t", avgSpins, "\t\t|\t", Math.ceil(numHours), "\t\t|\t", hoursToLose10K, "\t\t\t|\t", daysToLose10K);
}

// for (let betAmount = 2; betAmount < 21; betAmount *= 2) {
//     let sumSpins = 0;
//     for (let i = 0; i < numSimulations; i++) {
//         sumSpins += simulator.bet(100, betAmount);
//     }

//     const avgSpins = Math.floor(sumSpins / numSimulations);
//     const numHours = Math.ceil((avgSpins * 30) / 3600);

//     console.log(betAmount, "betAmount", " \t| Average spins:", avgSpins, "\t|", numHours, "hours");
// }