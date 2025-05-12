// models/Request/indexes.js

export default (schema) => {
  schema.index({ location: '2dsphere' });
  schema.index({ status: 1 });
  schema.index({ urgency: 1, createdAt: -1 });
};