import { Repository } from "typeorm";
import { AppDataSouce } from "../db";
import { TitleEntity } from "../entities";
import { CreateTitleType } from "../types";

export const createTitle = async (
  data: CreateTitleType
): Promise<TitleEntity> => {
  const titleRepository = AppDataSouce.getRepository(TitleEntity);
  const newTitle = titleRepository.create(data);
  await titleRepository.save(newTitle);

  return newTitle;
};

export const readTitle = async (uuid: string): Promise<TitleEntity[]> => {
  const titleRepository: Repository<TitleEntity> =
    AppDataSouce.getRepository(TitleEntity);

  return titleRepository.find({
    where: {
      userId: {
        uuid,
      },
    },
  });
};
