class TicketService {

    private static readonly TICKET_LOWER_BOUND = 1000000;
    private static readonly TICKET_SPACE = 3000000;
    // private static readonly TICKET_POOL_SIZE = 300000;
    private static readonly TICKET_POOL_SIZE = 200000;
    // private static readonly TICKET_POOL_SIZE = 50;
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

        // console.debug("constructor()", "this.ticketPool", this.ticketPool);
    }

    // shuffle is too slow
    public shuffle() {
        // console.debug("shuffle()", "before", this.ticketPool);
        this.ticketPool.sort(() => Math.random() > 0.5 ? 1 : -1);
        // console.debug("shuffle()", "after", this.ticketPool);
    }

    public drawTicket(): number {
        const randIdx = Math.floor(Math.random() * this.ticketPool.length);
        const ticket = this.ticketPool[randIdx];
        this.ticketPool.splice(randIdx, 1);
        if (ticket === undefined) {
            throw "Ticket pool is empty";
        }

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
        // console.debug("getTickets()", tickets);
        return tickets;
    }

    private generateTicket(): number {
        return TicketService.TICKET_LOWER_BOUND + Math.floor(Math.random() * TicketService.TICKET_SPACE);
    }

    public static get instance(): TicketService {
        if (!TicketService._instance) {
            TicketService._instance = new TicketService(TicketService.TICKET_POOL_SIZE);
        }

        return TicketService._instance;
    }

}

export default TicketService;