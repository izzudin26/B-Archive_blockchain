import { connect } from "mongoose";
import * as NodeService from "./node.service";

describe("Node Service Testing", () => {
  let conn: any;
  beforeAll(async () => {
    const mongoPort = process.env.DB_PORT || 27017;
    const mongoUrl = process.env.DB_URL || "localhost";
    const dbName = "b-archive";
    conn = await connect(`mongodb://${mongoUrl}:${mongoPort}/${dbName}`);
  });

  test("Insert new Node", async () => {
      await NodeService.addNode("192.168.1.2")
      await NodeService.addNode("192.168.1.3")
  })

  test("Get All Nodes", async () => {
      const nodes = await NodeService.getNodes()
      expect(nodes.length).toEqual(2)
  })

  test("Will Delete Node", async () => {
      await NodeService.deleteNode("192.168.1.3")
  })

  test("Will Check After Remove", async () => {
      const nodes = await NodeService.getNodes()
      expect(nodes.length).toEqual(1)
      expect(nodes[0].uri).toBe("192.168.1.2")
  })

  test("Will Remove Last Node", async () => {
      await NodeService.deleteNode("192.168.1.2")
      const nodes = await NodeService.getNodes()
      expect(nodes.length).toEqual(0)
  })

  afterAll(() => {
    conn.disconnect();
  });
});
