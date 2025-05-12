// models/Request/middleware.js

export default (schema) => {
  schema.pre(/^find/, function (next) {
    this.populate({
      path: 'requestedBy',
      select: 'name phone avatar'
    }).populate({
      path: 'fulfilledBy',
      select: 'name phone avatar'
    });
    next();
  });
};