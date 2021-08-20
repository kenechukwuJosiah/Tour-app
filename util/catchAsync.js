// module.exports = (fn) => (req, res, next) => {
//   try {
//     fn(req, res, next);
//   } catch (err) {
//     next(err);
//     console.log('ERROR 💥');
//   }
// };

module.exports = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};
