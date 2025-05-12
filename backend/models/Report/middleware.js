// // models/Report/middleware.js

// import geocoder from '../../utils/geocoder';

// export default (schema) => {
//   schema.pre('save', async function (next) {
//     if (this.isModified('address') && this.address) {
//       const loc = await geocoder.geocode(this.address);
//       this.location = {
//         type: 'Point',
//         coordinates: [loc[0].longitude, loc[0].latitude],
//         address: loc[0].formattedAddress
//       };
//     }
//     next();
//   });

//   schema.pre(/^find/, function (next) {
//     this.populate({
//       path: 'reportedBy',
//       select: 'name role verified'
//     });
//     next();
//   });
// };