import { formatCommaSeparateStringToList } from "@nc/utils/helper";

export function format(payload) {
  return payload;
}

export function expenseQueryProcessor(payload) {
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
