import { fastify } from 'fastify'
import { AlunoPostgress } from './src/database/aluno-postgress.js';
import { CursoPostgres } from './src/database/curso-postgress.js';


const server = fastify();

const databaseAluno = new AlunoPostgress();
const databaseCurso = new CursoPostgres();

//Cursos
 server.post('/cursos', async (request, reply) => {
    const { descricao, ementa } = request.body;
    
    await databaseCurso.create({
        descricao,
        ementa,
    })

    return reply.status(201).send();
})

server.post('/matriculas', async (request, reply) => {
    const { codigo_curso, codigo_aluno } = request.body;
    
    await databaseCurso.createMatricula({
        codigo_curso,
        codigo_aluno,
    })

    return reply.status(201).send();
})

server.get('/matriculas', async (request, reply) => {
    const search = request.query.search;

    const matriculas = await databaseCurso.listMatricula(search);

    return matriculas;
})

server.get('/matriculados', async (request, reply) => {
    const search = request.query.search;

    const matriculados = await databaseCurso.listMatriculados(search);

    return matriculados;
})

server.get('/cursos', async (request, reply) => {
    const search = request.query.search;

    const cursos = await databaseCurso.list(search);

    return cursos;
})

server.put('/cursos/:id', async (request, reply) => {
    const cursosId = request.params.id;
    const { descricao, ementa } = request.body;
    
    const curso = await databaseCurso.update(cursosId, {
        descricao,
        ementa,
    });

    return reply.status(204).send();
})

server.delete('/cursos/:id', async (request, reply) => {
    const cursosId = request.params.id;

    await databaseCurso.delete(cursosId);

    return reply.status(204).send();
})

server.delete('/matriculas/:idAluno/:idCurso', async (request, reply) => {
    const alunoId = request.params.idAluno;
    const cursoId = request.params.idCurso;

    await databaseCurso.deleteMatriculaAluno(alunoId,cursoId);

    return reply.status(204).send();
})


//Aluno
server.post('/alunos', async (request, reply) => {
    const { nome } = request.body;
    
    await databaseAluno.createAluno({
        nome,
    })

    return reply.status(201).send();
})

server.get('/alunos', async (request, reply) => {
    const search = request.query.search;

    const alunos = await databaseAluno.listAlunos(search);

    return alunos;
})

server.put('/alunos/:id', async (request, reply) => {
    const alunoId = request.params.id;
    const { nome } = request.body;

    const aluno = await databaseAluno.updateAluno(alunoId, {
        nome,
    });

    return reply.status(204).send();
})

server.delete('/alunos/:id', async (request, reply) => {
    const alunoId = request.params.id;

    await databaseAluno.deleteAluno(alunoId);

    return reply.status(204).send();
})

server.listen({
    port: 3333,
});
