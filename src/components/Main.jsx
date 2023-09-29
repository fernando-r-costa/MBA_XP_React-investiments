import { useState } from "react";
import { investments, reports } from "../data/data";

export default function Main() {
  
  let reportsSort = [];

  reportsSort = reports.sort((a, b) => a.month - b.month);

  let teste = investments.map((investment) => (reportsSort.filter((report) => report.investmentId.includes(investment.id))))


  return (
    <main className="container mx-auto mt-4">
      {investments.map((investment) => (
        <div key={investment.id} className="my-2 border-2 rounded-sm">
          <h2 className="text-center font-semibold p-1">
            {investment.description}
          </h2>
          <h3 className="text-center font-semibold text-sm p-1">
            Rendimento total: {`R$ ${614.54}`}
          </h3>
          <table className="table-auto w-full my-2 border-b-2">
            <tbody>
              {reportsSort
                .filter((report) => report.investmentId.includes(investment.id))
                .map((report) => (
                  <tr key={report.month}>
                    <td>{`${report.month}/${report.year}`}</td>
                    <td>{`${report.value.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      style: "currency",
                      currency: "BRL",
                    })}`}
                    </td>
                    <td>{`${report.income} %`}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </main>
  );
}
