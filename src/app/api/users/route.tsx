import { db } from "@/lib/drizzle";
import { addresses, users } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const insertedUsers = await db
    .insert(users)
    .values({
      firstname: body.firstname,
      lastname: body.lastname,
      birthdate: body.birthdate,
    })
    .returning(); 

  const user = insertedUsers[0]; 
  if (!user || !user.id) {
    return NextResponse.json({ message: "Gagal menyimpan user" }, { status: 500 });
  }

  await db.insert(addresses).values({
    userId: user.id,
    street: body.address.street,
    city: body.address.city,
    province: body.address.province,
    postalCode: body.address.postal_code,
  });

  return NextResponse.json({ message: "User berhasil dibuat", user });
}

export async function GET() {
  const result = await db.select({
    id: users.id,
    firstname: users.firstname,
    lastname: users.lastname,
    birthdate: users.birthdate,
    address:{
      street: addresses.street,
      city: addresses.city,
      province: addresses.province,
      postal_code: addresses.postalCode
    }
    
  })
  .from(users)
  .leftJoin(addresses, eq(users.id, addresses.userId));

  return NextResponse.json(result);
}


export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ message: "ID tidak diberikan" }, { status: 400 });
    }

    await db.delete(addresses).where(eq(addresses.userId, body.id));
    const result = await db.delete(users).where(eq(users.id, body.id));

    return NextResponse.json({ message: "User berhasil dihapus", result });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Gagal menghapus user" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const userId = body.id;

  if (!userId) {
    return NextResponse.json({ message: "User ID tidak ditemukan." }, { status: 400 });
  }
  await db.update(users)
    .set({
      firstname: body.firstname,
      lastname: body.lastname,
      birthdate: body.birthdate,
    })
    .where(eq(users.id, userId));
  await db.update(addresses)
    .set({
      street: body.address.street,
      city: body.address.city,
      province: body.address.province,
      postalCode: body.address.postal_code,
    })
    .where(eq(addresses.userId, userId));

  return NextResponse.json({ message: "User berhasil diperbarui." });
}
