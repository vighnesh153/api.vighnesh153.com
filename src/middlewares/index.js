const isLoggedIn = require('./isLoggedIn');
const errorHandler = require('./errorHandler');
const assignMetaToRequestAndLogger = require('./assignMetaToRequestAndLogger');
const handle404 = require('./404');
const statusCheck = require('./statusCheck');
const ensureRoles = require('./ensureRoles');
const caching = require('./caching');
const filterSortPaginate = require('./filterSortPaginate');

module.exports = {
  handle404,
  assignMetaToRequestAndLogger,
  caching,
  filterSortPaginate,
  ensureRoles,
  errorHandler,
  ensureAuthenticated: isLoggedIn,
  statusCheck,
};
