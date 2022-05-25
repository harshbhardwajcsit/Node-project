import { UserExpense, ExpenseDAO } from "./types";
import { BadRequest, InternalError, NotFound } from "@nc/utils/errors";
import { to } from "@nc/utils/async";
import { queryUserExpense } from "./data/db-user-expense";
import { format } from "./formatter";

export async function getExpenses(req): Promise<Array<UserExpense>> {
  if (!req.userId) {
    throw BadRequest("userId property is missing.");
  }

  const [dbError, rawExpenseList] = await to(queryUserExpense(req));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenseList) {
    throw NotFound(`Could not find expenses with user_id ${req.userId}`);
  }

  return format(rawExpenseList);
}
