import * as Excel from "exceljs";
import type {BalloonSaveData} from "../types";

export function toExcel(data: BalloonSaveData) {
    // Create a workbook
    const workbook = new Excel.Workbook()
    workbook.creator = '니나 계산기'
    workbook.lastModifiedBy = '니나 계산기'
    workbook.created = new Date()
    workbook.modified = new Date()

    // Add a worksheets
    const sheet = workbook.addWorksheet('별풍선')

    // Add rows
    const headers = ['ID', '닉네임', '도네 개수', '별풍선', '메시지']

    const headerRow = sheet.addRow(headers)
    headerRow.font = {bold: true}
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: '8DB4E2'},
    }

    // Enumerate data
    for (const balloonData of data.balloonData) {
        const row = [
            balloonData.uid,
            balloonData.nicknames.join(', '),
            balloonData.balloonCount,
            balloonData.balloonAmountSum,
        ]

        // If message is not undefined
        if (balloonData.messageData) {
            // Add message header if not exists
            if (headers.length === 3) headers.push('메시지')

            // Add message to the row
            row.push(balloonData.messageData[0])

            const addedRow = sheet.addRow(row)
            addedRow.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'C5D9F1'},
            }

            // Add messages to new rows
            for (let i = 1; i < balloonData.messageData.length; i++) {
                sheet.addRow(['', '', '', '', balloonData.messageData[i]])
            }
        } else {
            const addedRow = sheet.addRow(row)
            addedRow.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'C5D9F1'},
            }
        }
    }

    if (data.subData) {
        const sheet = workbook.addWorksheet('구독')

        const headers = ['ID', '닉네임', '월']
        const headerRow = sheet.addRow(headers)
        headerRow.font = {bold: true}
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: '8DB4E2'},
        }

        for (const subData of data.subData) {
            const row = [
                subData.uid,
                subData.nickname,
                subData.month,
            ]
            sheet.addRow(row)
        }
    }

    return workbook
}
