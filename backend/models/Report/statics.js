// models/Report/statics.js
export default (schema) => {
  schema.statics.findNearby = function (coordinates, maxDistance = 5000) {
    return this.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates },
          $maxDistance: maxDistance
        }
      },
      status: 'Active'
    }).sort({ severity: -1, createdAt: 1 });
  };
};