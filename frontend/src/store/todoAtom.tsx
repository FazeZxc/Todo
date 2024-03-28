import { atom } from "recoil";
export interface Todo{
    _id: string;
    title: string;
    createdby: string;
    status: string;
    dueDate: string;
    description: string;
  }
  
export const todoAtom = atom({
  key: "todoAtom",
  default: [] as Todo[],
});
