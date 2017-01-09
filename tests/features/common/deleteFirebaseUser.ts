import "./initialize";
import { createUser } from "./createFirebaseUser";
import * as admin from "firebase-admin";

export function deleteIfExistsAndRecreateUser(email: string, pwd: string, done: Function) {
    deleteUserAndReturnPromise(email)
      .then(() => createUser(email, pwd))
      .then(done);
}

export function deleteUserAndReturnPromise(email: string) {
  return (admin.auth() as any).getUserByEmail(email)
    .then((userRecord: any) => {
      return (admin.auth() as any).deleteUser(userRecord.uid);
    })
    .catch((x: any) => void x)
}

export function deleteFirebaseUser(email: string, done: Function) {
    deleteUserAndReturnPromise(email)
      .then(done);
}