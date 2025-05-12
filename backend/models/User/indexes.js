// models/User/indexes.js

export default (schema) => {
  // Remove this line to avoid duplicate index
  // schema.index({ email: 1 });

  // Keep this if you need a geospatial index
  schema.index({ location: "2dsphere" });
};