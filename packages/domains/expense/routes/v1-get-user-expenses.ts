import { ApiError } from "@nc/utils/errors";
import { getExpenses } from "@nc/domain-expense/model";
import { Router } from "express";
import { to } from "@nc/utils/async";

export const router = Router();

router.get("/get-user-expenses", async (req, res, next) => {
  const [userExpensesError, userExpenses] = await to(
    getExpenses(req.query?.userId)
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
