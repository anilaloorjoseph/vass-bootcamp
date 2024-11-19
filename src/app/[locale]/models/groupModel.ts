import mongoose from "mongoose";
import { GroupData } from "../types/typescript";

const groupSchema = new mongoose.Schema<GroupData>({
  groupName: {
    type: String,
    required: true,
  },
});

const Group = mongoose.models.Group ?? mongoose.model("Group", groupSchema);

export default Group;
