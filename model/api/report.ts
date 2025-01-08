import { GroupMember } from "./groupMember";
import { ReportMotives } from "./reportMotives";

export interface Report {
  createdBy?: string;
  createdDate?: string;
  groupMemberId?: number;
  id?: number;
  denunciatorId?: number;
  updatedBy?: string;
  updatedDate?: string;
  denunciator?: GroupMember;
  groupMember?: GroupMember;
  otherMotive?: string;
  reportMotives?: ReportMotives[];
}
