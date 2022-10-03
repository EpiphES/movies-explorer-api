const Movie = require('../models/movie');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors');

const {
  movieNotFoundMessage,
  badRequestMessage,
  forbiddenMovieDeleteMessage,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink: trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => Movie.populate(movie, { path: 'owner' }))
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(badRequestMessage));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFoundMessage);
      }

      if (movie.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenMovieDeleteMessage);
      }
      Movie.findByIdAndDelete(req.params.cardId)
        .then((mycard) => res.send({ data: mycard }))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new BadRequestError(badRequestMessage));
          }
          return next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(badRequestMessage));
      }
      return next(err);
    });
};

// const likeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true, runValidators: true },
//   )
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError(cardNotFoundMessage);
//       }
//       return Card.populate(card, { path: 'owner' });
//     })
//     .then((card) => res.send({ data: card }))
//     .catch((err) => {
//       if (err.name === 'CastError' || err.name === 'ValidationError') {
//         return next(new BadRequestError(badRequestMessage));
//       }
//       return next(err);
//     });
// };

// const dislikeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   )
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError(cardNotFoundMessage);
//       }
//       return Card.populate(card, { path: 'owner' });
//     })
//     .then((card) => res.send({ data: card }))
//     .catch((err) => {
//       if (err.name === 'CastError' || err.name === 'ValidationError') {
//         return next(new BadRequestError(badRequestMessage));
//       }
//       return next(err);
//     });
// };

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
