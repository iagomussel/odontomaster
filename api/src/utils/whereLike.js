const { Op } = require("sequelize");
const WhereLike = function (model, search) {
  if (search == undefined) return {};
  let where = { [Op.or]: [] };
  for (colum in model.tableAttributes) {
    if (/VARCHAR/.test(model.tableAttributes[colum].type)) {
      where[Op.or].push({ [colum]: { [Op.like]: "%" + search + "%" } });
    }
  }
  return where;
};

module.exports = WhereLike;
