import { supabase } from "./supabase";
import { GroupMember, Groups, GroupsModel, Motive, MotiveModel, Report, ReportMotive } from "@/model/models";
import { mapper } from "@/model/mappings/mapper";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./authApi";

export const getMotives = async () => {
    const { data, error } = await supabase
        .from('motives')
        .select(`
            *
        `)

    if (error)
        throw error

    if (data && data.length) {
        return mapper.mapArray(data as Motive[], 'Motive', 'MotiveModel') as MotiveModel[]
    }
    return []
}

export const addReport = async (report: Report) => {
    const report_motives = report.reportmotive
    delete report.reportmotive
    const { error: reportError, data: reportData } = await supabase
        .from('report')
        .insert(report)
        .select()
        .single()

    if (reportError)
        throw reportError

    if (reportData && report_motives) {
        report_motives.forEach((report_motive) => {
            report_motive.report_id = reportData.id
        })
        const { error: reportMotiveError, data: reportMotiveData } = await supabase
            .from('report_motive')
            .insert(report_motives)
            .select()

        if (reportMotiveError)
            throw reportMotiveError

        if (reportMotiveData && reportMotiveData.length)
            return mapper.map((reportData as Report).reportmotive = reportMotiveData, 'Report', 'ReportModel') as ReportModel
    }

    return []
}