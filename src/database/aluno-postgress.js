import { sql } from '../database/db.js'

export class AlunoPostgress{
    
    async createAluno(alunos) {
        const { nome } = alunos;

        await sql`insert into aluno (nome) VALUES (${nome})`
    }

    async listAlunos(search = '') {
        let alunos;

        if (search) {
            alunos = await sql`select * from aluno where nome ilike ${'%' + search + '%'}`
        } else {
            alunos = await sql`select * from aluno`
        }

        return alunos;

    }

    async updateAluno(id, alunos) {

        const { nome } = alunos;

        await sql`update aluno set nome = ${nome} where codigo = ${id}`
    }

    async deleteAluno(id) {
        await sql`delete from aluno where codigo = ${id}`
    }
}