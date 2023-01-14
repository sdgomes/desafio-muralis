const PDFDocument = require('pdfkit');
const xl = require('excel4node');
const wb = new xl.Workbook();

function title() {
    var dt = new Date();
    const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return `Despesas do mês de ${month[dt.getMonth()]}`
}

function formatDate(date) {
    var dt = new Date(date);

    var day = dt.getDate();
    day = day < 10 ? `0${day}` : day

    var month = dt.getMonth() + 1
    month = month < 10 ? `0${month}` : month

    var hour = dt.getHours()
    hour = hour < 10 ? `0${hour}` : hour

    var minute = dt.getMinutes()
    minute = minute < 10 ? `0${minute}` : minute

    return {
        date: `${day}/${month}/${dt.getFullYear()}`,
        time: `${hour}:${minute}`
    }
}

module.exports = {

    validFields(despesa) {
        /** Válida se todos os campos foram informados */
        var isValid = true;
        for (const key in despesa) {
            if (Object.hasOwnProperty.call(despesa, key)) {
                const element = despesa[key];
                if (typeof element === "object" && element !== null) {
                    for (const keyIntern in element) {
                        if (Object.hasOwnProperty.call(element, keyIntern)) {
                            const elementIntern = element[keyIntern];
                            if (!elementIntern && keyIntern != "complemento") {
                                isValid = false;
                            }
                        }
                    }
                } else {
                    if (!element) {
                        isValid = false;
                    }
                }
            }
        }
        return isValid;
    },

    convertPDF(data, res) {
        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(15).text(title(), 50, 40);

        data.forEach((despesa, i) => {
            const timer = formatDate(despesa.data)

            const lorem = `Preço: R$ ${despesa.valor} - ${despesa.descricao}\nPagamento: ${despesa.tipoPagamento} - ${timer.date} às ${timer.time}\nEstabelecimento: ${despesa.categoria.nome} - ${despesa.categoria.descricao}\n${despesa.endereco.logradouro}, ${despesa.endereco.numero}\n${despesa.endereco.bairro} - ${despesa.endereco.localidade}, ${despesa.endereco.uf} - ${despesa.endereco.cep} ${despesa.endereco.complemento}`;

            doc.moveDown(i == 0 ? 0.5 : 3)
                .font('Times-Roman', 12)
                .text(lorem, {
                    columns: 1,
                });
        });

        doc.end();

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
        });
    },
    buildExcel(datas, res) {
        const ws = wb.addWorksheet(title());

        const data = [];
        datas.forEach((despesa) => {
            const timer = formatDate(despesa.data)
            data.push({
                "valor": despesa.valor,
                "descricao": despesa.descricao,
                "data": `${timer.date} às ${timer.time}`,
                "pagamento": despesa.tipoPagamento,
                "edereco": `${despesa.endereco.logradouro}, ${despesa.endereco.numero} - ${despesa.endereco.bairro} - ${despesa.endereco.localidade}, ${despesa.endereco.uf} - ${despesa.endereco.cep} ${despesa.endereco.complemento}`,
                "categoria": `${despesa.categoria.nome} - ${despesa.categoria.descricao}`,
            })
        });

        const headingColumnNames = [
            "Valor",
            "Descrição",
            "Data Compra",
            "Tipo Pagamento",
            "Endereço",
            "Estabelecimento",
        ]

        let headingColumnIndex = 1;
        headingColumnNames.forEach(heading => {
            ws.cell(1, headingColumnIndex++).string(heading);
        });

        let rowIndex = 2;
        data.forEach(record => {
            let columnIndex = 1;
            Object.keys(record).forEach(columnName => {
                if (columnName == 'valor') {
                    console.log(columnName);
                    var style = wb.createStyle({ numberFormat: 'R$ #,##0.00; (R$ #,##0.00); -' });
                    var preco = record[columnName].replace(/\./g, "").replace(/\,/g, ".")
                    ws.cell(rowIndex, columnIndex++).number(parseFloat(preco)).style(style);
                } else {
                    ws.cell(rowIndex, columnIndex++)
                        .string(record[columnName])
                }

            });
            rowIndex++;
        });

        return wb.write('Despesas do mês.xlsx', res);
    }
}