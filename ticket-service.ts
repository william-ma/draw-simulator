class TicketService {

    static _instance: TicketService;
    private ticketPool: number[];

    private constructor(totalTickets: number) {
        this.ticketPool = Array(totalTickets).fill(0).map((_v, _i, arr) => {
            let ticket: number;
            do {
                ticket = this.generateTicket();
            } while (arr.some((v) => v === ticket));

            return ticket;
        });

        console.debug("constructor()", "this.ticketPool", this.ticketPool);
    }

    public shuffle() {
        console.debug("shuffle()", "before", this.ticketPool);
        this.ticketPool.sort(() => Math.random() > 0.5 ? 1 : -1);
        console.debug("shuffle()", "after", this.ticketPool);
    }

    public drawTicket(): number {
        const ticket = this.ticketPool.pop();
        if (ticket === undefined) {
            throw "Ticket pool is empty";
        }

        console.debug("drawTicket()", ticket);
        return ticket;
    }

    public getTickets(numTickets: number): number[] {
        const tickets = Array(numTickets).fill(0).map((_v, _i, arr) => {
            let ticket: number;
            do {
                ticket = this.ticketPool[Math.floor(Math.random() * this.ticketPool.length)];
            } while (arr.some((v) => v === ticket));

            return ticket;
        });
        console.debug("allocateTickets", tickets);
        return tickets;
    }

    private generateTicket(): number {
        return 100000 + Math.floor(Math.random() * 40000);
    }

    public static get instance(): TicketService {
        if (!TicketService._instance) {
            TicketService._instance = new TicketService(20);
        }

        return TicketService._instance;
    }

}

export default TicketService;