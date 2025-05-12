// models/User/statics.js

export default (schema) => {
  schema.statics.findByEmail = function (email) {
    return this.findOne({ email }).select('+password');
  };

  schema.statics.findVolunteersNear = function (coordinates, maxDistance = 10000) {
    return this.find({
      role: 'volunteer',
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates },
          $maxDistance: maxDistance
        }
      }
    });
  };
};