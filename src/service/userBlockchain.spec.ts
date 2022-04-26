import {
  createUserBlockchain,
  createTransactions,
  getAllTransactions,
  getLastBlockUser,
  isValid,
} from "./userBlockchain.service";
import { connect } from "mongoose";
import { IBlockChain } from "../model/blockchain";

describe("Will Testing UserBlockchain", () => {
  let conn: any;
  let lastblock: IBlockChain;
  beforeAll(async () => {
    const mongoPort = process.env.DB_PORT || 27017;
    const mongoUrl = process.env.DB_URL || "localhost";
    const dbName = "b-archive";
    conn = await connect(`mongodb://${mongoUrl}:${mongoPort}/${dbName}`);
  });

  test("Will Register new User", async () => {
    await createUserBlockchain("BFF123hr");
  });

  test("Will create Transactions", async () => {
    for (let i = 0; i < 5; i++) {
      const data = {
        hello: `example ${i}`,
        message: `exampleMessage ${i}`,
      };
      await createTransactions("BFF123hr", data);
    }
  });

  test("Will get All Transactions", async () => {
    const res = await getAllTransactions("BFF123hr");
    res?.transactionsBlock.sort((a, b) => a.iteration - b.iteration);
    lastblock = res!.transactionsBlock.slice(-1)[0];
    expect(res).toHaveProperty("transactionsBlock");
  });

  test("Will valid lastblock", async () => {
    const res = await getLastBlockUser("BFF123hr");
    console.log(res);
    expect(res).toEqual(lastblock);
  });

  test("Will valid chain", async () => {
    const transactions: IBlockChain[] = (await getAllTransactions("BFF123hr"))
      .transactionsBlock;
    const isValidTransactions = isValid(transactions);
    expect(isValidTransactions).toBeTruthy();
  });

  afterAll(() => {
    conn.disconnect();
  });
});
