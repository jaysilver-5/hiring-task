import { Response } from "express";
import { UserEntity } from "../../entities";
import { errorHandlerWrapper } from "../../utils";
import { titleService } from "../../services";
import httpStatus from "http-status";

const readTitleHandler = async (req, res: Response): Promise<void> => {
  const user: UserEntity = req.user;
  const titles = await titleService.readTitle(user.uuid);
  res.json(titles).status(httpStatus.OK);
};

export const readTitleController = errorHandlerWrapper(readTitleHandler);
