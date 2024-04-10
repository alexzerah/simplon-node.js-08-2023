// Importation des modèles Sequelize
const { Reservation, Table, Client } = require('../models');
const logger = require('../utils/logger');
const Controller = require('./controller');

class ReservationController extends Controller {

    constructor(props) {
        super(props, props);
        this.paginate = this.paginate.bind(this);
    }

     async createReservation(req, res) {
        try {
            logger.info('Création d\'une réservation par ' + req.user);
            const {number_of_customers, date, name, note, status } = req.body;

            const r1 = Reservation.build({

                number_of_customers: number_of_customers,
                date: date,
                name: name,
                note: note,
                status: status,
            });
            //
            // await r1.save()
            // console.log("Réservation enregistrée");

            res.json({message: 'Votre reservation a bien été enregistrée'});
        } catch (error) {
            console.log(error);
            logger.error(error.message);
            res.status(400).json({ error: error.message });
        }
    };

// Contrôleur pour obtenir la liste des réservations
    async getReservations(req, res, next) {
        try {
            const results = await Reservation.findAll();
            const paginationResult = await this.paginate(req, results);
            res.status(200).json(paginationResult);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ReservationController;
