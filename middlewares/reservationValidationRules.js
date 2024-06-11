const { body, validationResult } = require('express-validator');

const reservationValidationRules = () => {
    return [
        body('name').not().isEmpty().withMessage('Le nom de la réservation est obligatoire'),
        body('number_of_customers').isInt({ min: 1 }).withMessage("Le format du nombre de convive n'est pas bon (Nombre d'entier attendu)"),
        body('date').not().isEmpty().withMessage('La date de réservation est obligatoire'),
    ];
};

module.exports = {reservationValidationRules};