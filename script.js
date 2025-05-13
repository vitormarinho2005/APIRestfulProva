const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

/**
 * Registra uma mensagem no arquivo logs.txt
 * @param {string} nomeAluno - Nome do aluno
 * @returns {string} id gerado
 */

function registrarLog(nomeAluno) {
    const id = uuidv4();
    const dataHora = new Date().toISOString();
    const mensagem = `${id} - ${dataHora} - ${nomeAluno}\n`;

    fs.appendFileSync('logs.txt', mensagem, 'utf8');

    return id;
}

module.exports = { registrarLog };