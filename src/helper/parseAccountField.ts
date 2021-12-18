import type { FilterQuery } from "mongoose";
import type { ITransaction } from "../models/transactions";

export function parseAccountField(
  account: string | string[] | undefined
): FilterQuery<ITransaction> {
  const filterQuery: FilterQuery<ITransaction> = {};
  let i, il, j, jl;

  if (Array.isArray(account) && account.length === 1) {
    const accounts = account[0].split(":");
    for (i = 0, il = accounts.length; i < il; i++) {
      filterQuery[`account_path.${i}`] = accounts[i];
    }
  } else if (Array.isArray(account)) {
    filterQuery["$or"] = new Array(account.length);
    for (i = 0, il = account.length; i < il; i++) {
      const accounts = account[i].split(":");
      filterQuery["$or"][i] = {};
      for (j = 0, jl = accounts.length; j < jl; j++) {
        filterQuery["$or"][i][`account_path.${j}`] = accounts[j];
      }
    }
  } else if (typeof account === "string") {
    const accounts = account.split(":");
    for (i = 0, il = accounts.length; i < il; i++) {
      filterQuery[`account_path.${i}`] = accounts[i];
    }
  }
  return filterQuery;
}