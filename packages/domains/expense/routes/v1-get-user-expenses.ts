import { ApiError } from "@nc/utils/errors";
import { getExpenses } from "@nc/domain-expense/model";
import { Router } from "express";
import { to } from "@nc/utils/async";
import { expenseQueryProcessor } from "../formatter";

export const router = Router();

router.get("/get-user-expenses", async (req, res, next) => {
  const [userExpensesError, userExpenses] = await to(
    getExpenses(expenseQueryProcessor(req.query))
  );

  if (userExpensesError) {
    return next(
      new ApiError(
        userExpensesError,
        userExpensesError.status,
        `Could not get user expense details: ${userExpensesError}`,
        userExpensesError.title,
        req
      )
    );
  }

  if (!userExpenses) {
    return res.json({});
  }

  return res.json(userExpenses);
});
