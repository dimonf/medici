import { journalModel } from "../models/journals";
import { transactionModel } from "../models/transactions";

export async function syncIndexes(options?: { background: boolean }) {
  await journalModel.syncIndexes(options);
  await transactionModel.syncIndexes(options);
}