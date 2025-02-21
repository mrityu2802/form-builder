"use server";

import { formSchema, FormSchema } from "@/schema/form";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createForm = async (data: FormSchema) => {
  const validatedFields = formSchema.safeParse(data);
  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }
  const user = "mrityunjay";
  if (!user) {
    throw new Error("User not found");
  }
  const form = await prisma.form.create({
    data: {
      name: data.name,
      description: data.description,
      userId: user,
    },
  });
  if (!form) {
    throw new Error("Form not created");
  }
  revalidatePath("/");
  return form.id;
};

export const GetForms = async () => {
  const user = "mrityunjay";
  if (!user) {
    throw new Error("User not found");
  }
  const forms = await prisma.form.findMany({
    where: {
      userId: user,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return forms;
};
