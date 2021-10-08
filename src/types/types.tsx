import { IUser } from "@/interfaces/user.interface";

export type ActionUserType =
  | {
      type: "SET";
      payload: IUser;
    }
  | {
      type: "RESET";
    };
