"use server";

import { formSchema, FormSchema } from "@/schema/form";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
const prisma = new PrismaClient();

export const createForm = async (data: FormSchema) => {
  const validatedFields = formSchema.safeParse(data);
  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const form = await prisma.form.create({
    data: {
      name: data.name,
      description: data.description,
      userId: user.id,
    },
  });
  if (!form) {
    throw new Error("Form not created");
  }
  revalidatePath("/");
  return form.id;
};

export const GetForms = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const forms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return forms;
};

export const getFormById = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
  if (!form) {
    throw new Error("Form not found");
  }
  return form;
};

export const updateForm = async (id: string, jsonData: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const form = await prisma.form.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      content: jsonData,
    },
  });
  if (!form) {
    throw new Error("Form not found");
  }
  return form;
};

export const publishForm = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const form = await prisma.form.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      published: true,
    },
  });
  if (!form) {
    throw new Error("Form not found");
  }
  return form;
};

// export const getFormStats = async (id: string) => {
//   const user = "mrityunjay";
//   if (!user) {
//     throw new Error("User not found");
//   }
//   const stats = await prisma.form.aggregate({
//     where: {
//       id,
//       userId: user,
//     },
//     _sum: {
//       views: true,
//       submissions: true,
//     },
//   });

//   const totalViews = stats._sum.views || 0;
//   const totalSubmissions = stats._sum.submissions || 0;

//   return { totalViews, totalSubmissions };
// };

export const getSubmissionsByFormId = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const submissions = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      FormSubmission: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return submissions;
};

export const getFormContent = async (id: string) => {
  const form = await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    where: {
      id,
    },
  });
  return form;
};

export const submitFormToDatabase = async (id: string, jsonData: string) => {
  const form = await prisma.form.update({
    where: {
      id,
      published: true,
    },
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmission: {
        create: {
          submissionData: jsonData,
        },
      },
    },
  });
  if (!form) {
    throw new Error("Form not found");
  }
  return form;
};

export const deleteForm = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  // Delete all related form submissions
  await prisma.formSubmission.deleteMany({
    where: {
      formId: id,
    },
  });

  // Then delete the form
  return await prisma.form.delete({
    where: {
      id,
      userId: user.id,
    },
  });
};
