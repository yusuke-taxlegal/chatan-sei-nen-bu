/**
 * 誕生日情報から年度ベースの卒部・Last Year判定を行うユーティリティ
 *
 * 日本の年度（4月〜翌3月）を採用
 * - 誕生月が1〜3月の場合は前年度生まれとして扱う
 * - 45歳になる年度の4月1日〜翌3月31日 が「Last Year」
 * - 46歳になる年度の4月1日以降 が「卒部」
 *
 * @param {string} birthDateString - 生年月日 (YYYY-MM-DD)
 * @returns {Object} { isGraduated: boolean, isLastYear: boolean }
 */
export const getGraduationStatus = (birthDateString) => {
  if (!birthDateString) {
    return { isGraduated: false, isLastYear: false }
  }

  const birth = new Date(birthDateString)
  if (isNaN(birth.getTime())) {
    return { isGraduated: false, isLastYear: false }
  }

  const birthYear = birth.getFullYear()
  const birthMonth = birth.getMonth() + 1

  // 1〜3月生まれは前年度扱い
  const birthFiscalYear = birthMonth >= 4 ? birthYear : birthYear - 1

  // 45歳になる年度の4月1日
  const lastYearStartDate = new Date(birthFiscalYear + 45, 3, 1) // 月は0始まり(3=4月)

  // 46歳になる年度の4月1日
  const graduationDate = new Date(birthFiscalYear + 46, 3, 1)

  const today = new Date()

  return {
    isGraduated: today >= graduationDate,
    isLastYear: today >= lastYearStartDate && today < graduationDate,
  }
}
