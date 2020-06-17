import bcrypt from "bcrypt";
import User from "./schema";
import logger from "../logging/logger";
import {
  ControllerResponse,
  SignupStruct,
  SearchStruct,
  UpdateStruct,
} from "./interface";
import RESPONSES from "../responses/templates";
import { response } from "express";

class UserOperations {
  static async create({ user }: SignupStruct): Promise<ControllerResponse> {
    return new Promise((resolve) => {
      try {
        /** handle incomplete request */
        if (!user || !user.name || !user.businessName || !user.mobileNumber) {
          resolve(RESPONSES.INCOMPLETE_REQUEST());
        }

        /** make database entry */
        const NewUser = new User({
          ...user,
          createdAt: Date.now(),
          lastOpened: Date.now(),
        });

        NewUser.save()
          .then((resp) => resolve(RESPONSES.SUCCESS_OPERATION(resp)))
          .catch((err) => resolve(RESPONSES.ERROR(err)));
      } catch (err) {
        logger.error("Unexpected Error while creating new user", err.message);
        resolve(RESPONSES.ERROR(err));
      }
    });
  }

  static async search({ user }: SearchStruct): Promise<ControllerResponse> {
    return new Promise((resolve) => {
      try {
        /** handle incomplete request */
        if (!user || !(user.businessName || user.mobileNumber)) {
          resolve(RESPONSES.INCOMPLETE_REQUEST());
        }

        /** make database entry */
        User.findOne({
          $or: [
            { mobileNumber: user.mobileNumber },
            { businessName: user.businessName },
          ],
        })
          .then((resp) => resolve(RESPONSES.SUCCESS_OPERATION(resp)))
          .catch((err) => resolve(RESPONSES.ERROR(err)));
      } catch (err) {
        logger.error("Unexpected Error while searching new user", err.message);
        resolve(RESPONSES.ERROR(err));
      }
    });
  }

  static async update({ user }: UpdateStruct): Promise<ControllerResponse> {
    return new Promise((resolve) => {
      try {
        /** handle incomplete request */
        if (!user || !user.name || !user.businessName) {
          resolve(RESPONSES.INCOMPLETE_REQUEST());
        }

        /** update database entry by searching by mobile number */
        User.updateOne(
          { mobileNumber: user.mobileNumber },
          {
            name: user.name,
            businessName: user.businessName,
          }
        )
          .then((resp) => resolve(RESPONSES.SUCCESS_OPERATION(resp)))
          .catch((err) => RESPONSES.ERROR(err));
      } catch (err) {
        logger.error("Unexpected Error while creating new user", err.message);
        resolve(RESPONSES.ERROR(err));
      }
    });
  }
}

export default UserOperations;
