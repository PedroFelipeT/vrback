import { sql } from '../database/db.js'

export class CursoPostgres {

    async create(cursos) {
        const { descricao, ementa } = cursos;

        await sql`insert into curso (descricao, ementa) VALUES (${descricao}, ${ementa})`
    }

    async list(search = '') {
        let cursos;

        if (search) {
            cursos = await sql`select * from curso where descricao ilike ${'%' + search + '%'}`
        } else {
            cursos = await sql`select * from curso`
        }

        return cursos;

    }

    async listMatriculados(search = '') {
        let matriculas;


        matriculas = await sql`SELECT * from curso_aluno`


        return matriculas;

    }

    async createMatricula(matriculas) {
        const { codigo_curso, codigo_aluno } = matriculas;

        await sql`insert into curso_aluno (codigo_curso, codigo_aluno) values (${codigo_curso}, ${codigo_aluno});`
    }

    async listMatricula(search = '') {
        let matriculas;


        matriculas = await sql`SELECT codigo_curso, COUNT(codigo_curso)::Integer AS quantidade FROM curso_aluno GROUP BY codigo_curso;`


        return matriculas;

    }

    async update(id, cursos) {

        const { descricao, ementa } = cursos;

        await sql`update curso set descricao = ${descricao}, ementa = ${ementa} where codigo = ${id}`
    }

    async delete(id) {
        await sql`delete from curso where codigo = ${id}`
    }

    async deleteMatriculaAluno(idAluno, idCurso) {
        await sql`delete from curso_aluno where codigo_aluno = ${idAluno} and codigo_curso = ${idCurso}`
    }

}