import prisma from "../config/db";

type ModelName = keyof typeof prisma;

const getModel = (model: ModelName) => {
  // @ts-ignore
  return prisma.model;
};

export const createRecord = async (
  model: ModelName,
  data: any
) => {
  return getModel(model).create({ data });
};

export const findOneRecord = async (
  model: ModelName,
  where: any
) => {
  return getModel(model).findUnique({ where });
};

export const findManyRecords = async (
  model: ModelName,
  where?: any
) => {
  return getModel(model).findMany({ where });
};

export const deleteRecord = async (
  model: ModelName,
  where: any
) => {
  return getModel(model).delete({ where });
};
