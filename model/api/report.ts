import { GroupMember } from "./groupMember";
import { ReportMotives } from "./reportMotives";

export interface Report {
  createdBy?: string;
  createdDate?: string;
  updatedDate?: string;
  groupMemberId?: number;
  id?: number;
  groupMember?: GroupMember;
  otherMotive?: string;
  reportMotives?: ReportMotives[];
}