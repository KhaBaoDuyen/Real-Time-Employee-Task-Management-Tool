import { db } from "./firebase.js";

async function test() {
  await db.collection("test").add({
    name: "hello firebase",
  });

  console.log("✅ Added!");
}

test();
