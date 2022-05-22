import { Expense } from "./types";
import { BadRequest, InternalError, NotFound } from "@nc/utils/errors";
import { to } from "@nc/utils/async";
import { getUserExpenses } from "./data/db-user-expense";
import { format } from "./formatter";

export async function getExpenses(userId): Promise<Array<Expense>> {
  if (!userId) {
    throw BadRequest("userId property is missing.");
  }

  const [dbError, rawExpenseList] = await to(getUserExpenses(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenseList) {
    throw NotFound(`Could not find expenses with user_id ${userId}`);
  }

  return format(rawExpenseList);
}
