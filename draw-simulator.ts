import TicketService from "./ticket-service"

const ticketService = TicketService.instance;

const myTickets = ticketService.getTickets(3);
// console.log("My tickets are: ", my_tickets);

for (let i = 0; i < 3; i++) {
    ticketService.shuffle();
    const drawnTicket = ticketService.drawTicket();
    if (myTickets.some((ticket) => ticket === drawnTicket)) {
        console.log("Winning ticket: ", drawnTicket);
        break;
    }
}