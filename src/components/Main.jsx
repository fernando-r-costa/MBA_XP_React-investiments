import { investments, reports } from "../data/data";

export default function Main() {
  let reportsSort = [];

  reportsSort = reports.sort((a, b) => a.month - b.month);

  function getShortMonthName(monthNumber) {
    const months = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];
    return months[monthNumber - 1] || "";
  }

  function processInvestmentData(investments, reportsSort) {
    const processedData = [];

    investments.forEach((investment) => {
      const investmentData = {
        description: investment.description,
        reports: [],
        totalValueChange: 0,
      };

      const investmentReports = reportsSort.filter((report) =>
        report.investmentId.includes(investment.id)
      );

      investmentReports.forEach((report, index) => {
        const currentReport = {
          month: getShortMonthName(report.month), // Obtém o nome abreviado do mês
          year: report.year,
          value: report.value,
          percentChange: 0,
        };

        if (index > 0) {
          const previousReport = investmentReports[index - 1];
          currentReport.percentChange =
            ((currentReport.value - previousReport.value) /
              previousReport.value) *
            100;
        }

        investmentData.reports.push(currentReport);

        if (index === 0) {
          investmentData.totalValueChange = currentReport.value;
        } else if (index === investmentReports.length - 1) {
          investmentData.totalValueChange =
            currentReport.value - investmentData.reports[0].value;
        }
      });

      processedData.push(investmentData);
    });

    return processedData;
  }

  const processedData = processInvestmentData(investments, reportsSort);
  console.log("🚀 ~ file: Main.jsx:47 ~ Main ~ processedData:", processedData);

  return (
    <main className="container mx-auto mt-4">
      {processedData.map((investment) => (
        <div key={investment.id} className="my-2 border-2 rounded-sm">
          <h2 className="text-center font-bold text-xl p-1">
            {investment.description}
          </h2>
          <h3 className="text-center font-bold text-lg p-1">
            Rendimento total:
            <span className={`${(investment.totalValueChange >= 0) ? 'text-green-600' : 'text-red-600'}`}>
              {` R$ ${investment.totalValueChange.toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
              })}
            (${((investment.totalValueChange / 1000) * 100).toLocaleString(
              "pt-BR",
              { maximumFractionDigits: 2 }
            )} %)`}
            </span>
          </h3>
          <table className="table-auto w-full my-2 border-b-2">
            <tbody>
              {investment.reports.map((report, index) => (
                <tr key={index}>
                  <td className="pl-5 font-semibold">{`${report.month.toLocaleString(
                    "pt-BR",
                    { month: "short" }
                  )}/${report.year}`}</td>
                  <td className={`font-semibold pr-5 ${(report.percentChange >= 0) ? 'text-green-600' : 'text-red-600'}`}>
                    {`${report.value.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      style: "currency",
                      currency: "BRL",
                    })}`}
                  </td>
                  <td className={`text-right font-semibold pr-5 ${(report.percentChange >= 0) ? 'text-green-600' : 'text-red-600'}`}>{`${report.percentChange.toLocaleString(
                    "pt-BR",
                    {
                      minimumFractionDigits: 2,
                    }
                  )} %`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </main>
  );
}
