// models/Request/statics.js

export default (schema) => {
  schema.statics.findNearby = function (coordinates, maxDistance = 5000) {
    return this.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates },
          $maxDistance: maxDistance
        }
      },
      status: 'Pending'
    }).sort({ urgency: -1, createdAt: 1 });
  };
};