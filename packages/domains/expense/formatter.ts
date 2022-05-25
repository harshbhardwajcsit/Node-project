import { formatCommaSeparateStringToList } from "@nc/utils/helper";
import { UserExpense, ExpenseDAO } from "./types";

export function format(rawExpenses: Array<ExpenseDAO>) {
  let userExpenses: Array<UserExpense> = [];
  rawExpenses.forEach((expense) => {
    userExpenses.push({
      id: expense.id,
      merchant_name: expense.merchant_name,
      amount_in_cents: expense.amount_in_cents,
      currency: expense.currency,
      date_created: expense.date_created,
      status: expense.status,
    });
  });

  return userExpenses;
}

export function expenseQueryProcessor(payload: any) {
  if (payload.statuses) {
    payload.statuses = formatCommaSeparateStringToList(payload.statuses);
  }

  if (payload.merchants) {
    payload.merchants = formatCommaSeparateStringToList(payload.statuses);
  }

  if (payload.currencies) {
    payload.currencies = formatCommaSeparateStringToList(payload.currencies);
  }

  return payload;
}
