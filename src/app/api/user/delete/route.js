import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const client = await clientPromise;
    const db = client.db();

    const user = await db
      .collection("users")
      .findOne({ email: session.user.email }, { projection: { _id: 1 } });

    if (!user?._id) {
      return new Response("User not found", { status: 404 });
    }

    const userObjectId = new ObjectId(user._id);

    await Promise.all([
      db.collection("favorites").deleteMany({ userId: userObjectId }),
      db.collection("accounts").deleteMany({ userId: userObjectId }),
      db.collection("users").deleteOne({ _id: userObjectId }),
    ]);

    return new Response("User and related data deleted", { status: 200 });
  } catch (err) {
    console.error("Error deleting user:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
