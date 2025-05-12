// models/Request/virtuals.js
export default (schema) => {
  schema.virtual('timeRemaining').get(function () {
    if (!this.deadline) return null;
    return Math.max(0, this.deadline - Date.now());
  });
};