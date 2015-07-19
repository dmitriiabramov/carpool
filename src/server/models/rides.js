var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('Ride', {
        rideId: Sequelize.INTEGER,
        availableSeats: Sequelize.INTEGER,
        make: Sequelize.STRING,
        model: Sequelize.STRING,
        notes: Sequelize.STRING,
        arrivalTime: Sequelize.DATE,
        departureTime: Sequelize.DATE
    }, {
        classMethods: {
            associate: function(Models) {
                Models.Ride.belongsToMany(Models.User, { foreignKey: 'rideId', through: 'ride_passengers' });
                Models.User.belongsTo(Models.Ride, {as: 'driver'});
            }
        }
    });
};
