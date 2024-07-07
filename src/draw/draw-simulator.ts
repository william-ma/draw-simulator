import DrawService from "./draw-service"

const ticketsToOwn = 10;
const ticketsToDraw = 10;
const ticketService = DrawService.instance;

function findWinningTicket(winningTickets: number[], tickets: number[]): number | undefined {
    for (const winningTicket of winningTickets) {
        if (tickets.some((ticket) => ticket === winningTicket)) {
            return winningTicket;
        }
    };

    return undefined;
}

function main() {
    const myTickets = ticketService.getTickets(ticketsToOwn);

    let winningTicket, counter = 0;
    do {
        const winningTickets = Array(ticketsToDraw).fill(0).map(() => ticketService.drawTicket());
        winningTicket = findWinningTicket(winningTickets, myTickets);
        counter++;
    } while (!winningTicket);

    console.log("My tickets:", myTickets);
    console.log("Winning ticket: ", winningTicket);
    console.log("Iterations: ", counter);
}

main();