// models/Report/virtuals.js
export default (schema) => {
  schema.virtual('requests', {
    ref: 'Request',
    localField: '_id',
    foreignField: 'relatedIncident'
  });

  schema.virtual('duration').get(function () {
    return Date.now() - this.createdAt;
  });
};