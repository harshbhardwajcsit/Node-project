import { Op as operator } from "sequelize";
import { ExpenseDAO } from "../types";
import { sortDirection } from "@nc/utils/types";

export async function queryUserExpense(request) {
  const {
    userId,
    statuses,
    merchants,
    minAmount,
    maxAmount,
    currencies,
    sort,
    pageSize = 10,
    pageNum,
  } = request;

  let subQuery = [];

  const sortBy = sort ? sort : sortDirection.ASC;
  subQuery.push({ user_id: { [operator.eq]: userId } });

  if (merchants) subQuery.push({ merchant_name: { [operator.in]: merchants } });

  if (minAmount)
    subQuery.push({ amount_in_cents: { [operator.gte]: minAmount } });

  if (maxAmount)
    subQuery.push({ amount_in_cents: { [operator.lt]: maxAmount } });

  if (currencies) subQuery.push({ currency: { [operator.in]: currencies } });

  if (statuses) subQuery.push({ status: { [operator.in]: statuses } });

  return ExpenseDAO.findAll({
    where: {
      [operator.and]: subQuery,
    },

    order: [["date_created", sortBy]],
    limit: pageSize,
    offset: pageNum * pageSize - pageSize,
  });
}
