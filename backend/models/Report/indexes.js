// models/Report/indexes.js
export default (schema) => {
  // ✅ Add 2dsphere index for geospatial query
  schema.index({ location: '2dsphere' });
  schema.index({ disasterType: 1, severity: -1, createdAt: -1 });


};